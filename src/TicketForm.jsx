import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

// Schema with real-world validations
const schema = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  firstName: yup.string().matches(/^[A-Za-z\s'-]+$/, "Only letters allowed").required("First name required"),
  lastName: yup.string().matches(/^[A-Za-z\s'-]+$/, "Only letters allowed").required("Last name required"),
  phone: yup
    .string()
    .matches(/^(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/, "Enter a valid phone number")
    .required("Phone is required"),
  quantity: yup.number().min(1, "At least 1 ticket").required("Quantity is required"),
  creditCard: yup
    .string()
    .matches(/^\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}$/, "Enter a valid 16-digit card number")
    .required("Credit card required"),
    expiration: yup
    .string()
    .required("Expiration date is required")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format must be MM/YY")
    .test("notExpired", "Card is expired", function (value) {
      if (!value) return false;
  
      const [expMonth, expYear] = value.split("/").map(Number);
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear() % 100; // Get last 2 digits
  
      return (
        expYear > currentYear || (expYear === currentYear && expMonth >= currentMonth)
      );
    }),
  securityCode: yup
    .string()
    .matches(/^\d{3}$/, "Enter a 3-digit CVV")
    .required("CVV required"),
  address: yup.string().required("Address required"),
  city: yup.string().matches(/^[A-Za-z\s'-]+$/, "Only letters allowed").required("City required"),
  province: yup
    .string()
    .matches(/^[A-Za-z]{2,3}$/, "Enter a valid province code")
    .required("Province required"),
  postalCode: yup
    .string()
    .matches(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, "Enter a valid Canadian postal code")
    .required("Postal code required"),
  country: yup.string().matches(/^[A-Za-z\s]+$/, "Enter a valid country name").required("Country required"),
});

export default function TicketForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const mappedData = {
      ConcertId: 0, // hardcoded for now
      Email: data.email,
      FirstName: data.firstName,
      LastName: data.lastName,
      Phone: data.phone,
      Quantity: data.quantity,
      CreditCard: data.creditCard,
      Expiration: data.expiration,
      SecurityCode: data.securityCode,
      Address: data.address,
      City: data.city,
      Province: data.province,
      PostalCode: data.postalCode,
      Country: data.country,
    };
  
    try {
      const response = await fetch(
        "https://nscc-0292233-tickethub-ckcdbrhvf7cxbxc2.canadacentral-01.azurewebsites.net/api/customers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mappedData),
        }
      );
  
      if (response.ok) {
        navigate("/confirmation", { state: { formData: mappedData } });
      } else {
        const errorText = await response.text();
        console.error("Failed to submit:", errorText);
        alert("Server error:\n" + errorText);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Check console for details.");
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="needs-validation row g-3" noValidate>
      {[
        { name: "quantity", label: "Quantity", type: "number" },
        { name: "email", label: "Email", type: "email" },
        { name: "firstName", label: "First Name" },
        { name: "lastName", label: "Last Name" },
        { name: "phone", label: "Phone" },
        { name: "creditCard", label: "Credit Card" },
        { name: "expiration", label: "MM/YY" },
        { name: "securityCode", label: "CVV" },
        { name: "address", label: "Address" },
        { name: "city", label: "City" },
        { name: "province", label: "Province" },
        { name: "postalCode", label: "Postal Code" },
        { name: "country", label: "Country" }
      ].map(({ name, label, type = "text" }) => (
        <div key={name} className="col-md-6">
          <label htmlFor={name} className="form-label">{label}</label>
          <input
            type={type}
            className={`form-control ${errors[name] ? "is-invalid" : ""}`}
            id={name}
            {...register(name)}
          />
          <div className="invalid-feedback text-dark">{errors[name]?.message}</div>
        </div>
      ))}

      <div className="col-12 text-center mt-3">
        <button type="submit" className="btn btn-primary px-4">
          Purchase Ticket
        </button>
      </div>
    </form>
  );
}
