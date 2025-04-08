import { useState } from 'react'

const TicketForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    creditCard: '',
    expiration: '',
    securityCode: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    country: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitting:', formData)
    // POST to API logic here
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white"
    >
      <input name="email" placeholder="Email" onChange={handleChange} className="input" />
      <input name="firstName" placeholder="First Name" onChange={handleChange} className="input" />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} className="input" />
      <input name="phone" placeholder="Phone" onChange={handleChange} className="input" />
      <input name="creditCard" placeholder="Credit Card" onChange={handleChange} className="input" />
      <input name="expiration" placeholder="MM/YY" onChange={handleChange} className="input" />
      <input name="securityCode" placeholder="CVV" onChange={handleChange} className="input" />
      <input name="address" placeholder="Address" onChange={handleChange} className="input" />
      <input name="city" placeholder="City" onChange={handleChange} className="input" />
      <input name="province" placeholder="Province" onChange={handleChange} className="input" />
      <input name="postalCode" placeholder="Postal Code" onChange={handleChange} className="input" />
      <input name="country" placeholder="Country" onChange={handleChange} className="input" />

      <div className="md:col-span-2 text-right">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded mt-2 transition"
        >
          Purchase Ticket
        </button>
      </div>
    </form>
  )
}

export default TicketForm
