import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Schema
const schema = yup.object({
  email: yup.string().email("Invalid email").required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phone: yup.string().required(),
  quantity: yup.number().min(1).required(),
  creditCard: yup.string().matches(/^\d{16}$/, "Must be 16 digits").required(),
  expiration: yup.string().matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "MM/YY").required(),
  securityCode: yup.string().length(3, "3 digits").required(),
  address: yup.string().required(),
  city: yup.string().required(),
  province: yup.string().required(),
  postalCode: yup.string().required(),
  country: yup.string().required()
});

export default function TicketForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://nscc-0292233-tickethub-ckcdbrhvf7cxbxc2.canadacentral-01.azurewebsites.net/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // Validation
      if (response.ok) {
        alert("Purchase submitted successfully!");
      } else {
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
