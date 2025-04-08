import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

// Schema
const schema = yup.object({
  email: yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  firstName: yup.string()
    .matches(/^[A-Za-z\s\-]+$/, "First name must contain only letters")
    .required("First name is required"),

  lastName: yup.string()
    .matches(/^[A-Za-z\s\-]+$/, "Last name must contain only letters")
    .required("Last name is required"),

  phone: yup.string()
    .matches(/^\d{10}$/, "Phone must be exactly 10 digits")
    .required("Phone is required"),

  quantity: yup.number()
    .min(1, "At least 1 ticket is required")
    .required("Quantity is required"),

  creditCard: yup.string()
    .matches(/^\d{16}$/, "Credit card must be 16 digits")
    .required("Credit card number is required"),

  expiration: yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiration must be in MM/YY format")
    .required("Expiration is required"),

  securityCode: yup.string()
    .matches(/^\d{3}$/, "CVV must be 3 digits")
    .required("CVV is required"),

  address: yup.string()
    .required("Address is required"),

  city: yup.string()
    .matches(/^[A-Za-z\s\-]+$/, "City must contain only letters")
    .required("City is required"),

  province: yup.string()
    .matches(/^[A-Za-z]{2}$/, "Use 2-letter province code (e.g., NS, ON)")
    .required("Province is required"),

  postalCode: yup.string()
    .matches(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, "Invalid Canadian postal code format")
    .required("Postal code is required"),

  country: yup.string()
    .matches(/^[A-Za-z\s\-]+$/, "Country must contain only letters")
    .required("Country is required")
});


export default function TicketForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
    
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const payload = {
      ConcertId: 0, // Default hardcoded for now (you could make this dynamic later)
      ...data
    };
  
    console.log("Submitting payload:", payload);
  
    try {
      const response = await fetch("https://nscc-0292233-tickethub-ckcdbrhvf7cxbxc2.canadacentral-01.azurewebsites.net/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        navigate('/confirmation', { state: { formData: data } });
      } else {
        const errText = await response.text();
        console.error("Server returned error:", errText);
        alert("Failed to submit ticket. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting ticket:", error);
      alert("An error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="needs-validation row g-3" noValidate>
      {[
        { name: 'quantity', label: 'Quantity', type: 'number' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'firstName', label: 'First Name' },
        { name: 'lastName', label: 'Last Name' },
        { name: 'phone', label: 'Phone' },
        { name: 'creditCard', label: 'Credit Card' },
        { name: 'expiration', label: 'MM/YY' },
        { name: 'securityCode', label: 'CVV' },
        { name: 'address', label: 'Address' },
        { name: 'city', label: 'City' },
        { name: 'province', label: 'Province' },
        { name: 'postalCode', label: 'Postal Code' },
        { name: 'country', label: 'Country' }
      ].map(({ name, label, type = 'text' }) => (
        <div key={name} className="col-md-6">
          <label htmlFor={name} className="form-label">{label}</label>
          <input
            type={type}
            className={`form-control ${errors[name] ? 'is-invalid' : ''}`}
            id={name}
            {...register(name)}
          />
          <div className="invalid-feedback">
            {errors[name]?.message}
          </div>
        </div>
      ))}

      <div className="col-12 text-center mt-3">
        <button type="submit" className="btn btn-dark px-4">
          Purchase Ticket
        </button>
      </div>
    </form>
  );
}
