import { useState } from 'react';

const TicketForm = () => {
  const [formData, setFormData] = useState({
    ConcertId: 1,
    Email: '',
    FirstName: '',
    LastName: '',
    Phone: '',
    Quantity: 1,
    CreditCard: '',
    Expiration: '',
    SecurityCode: '',
    Address: '',
    City: '',
    Province: '',
    PostalCode: '',
    Country: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://<your-api-endpoint>', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert('Ticket submitted!');
      } else {
        alert('Failed to submit');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      <input name="Email" placeholder="Email" onChange={handleChange} required />
      <input name="FirstName" placeholder="First Name" onChange={handleChange} required />
      <input name="LastName" placeholder="Last Name" onChange={handleChange} required />
      <input name="Phone" placeholder="Phone" onChange={handleChange} required />
      <input name="CreditCard" placeholder="Credit Card" onChange={handleChange} required />
      <input name="Expiration" placeholder="MM/YY" onChange={handleChange} required />
      <input name="SecurityCode" placeholder="CVV" onChange={handleChange} required />
      <input name="Address" placeholder="Address" onChange={handleChange} required />
      <input name="City" placeholder="City" onChange={handleChange} required />
      <input name="Province" placeholder="Province" onChange={handleChange} required />
      <input name="PostalCode" placeholder="Postal Code" onChange={handleChange} required />
      <input name="Country" placeholder="Country" onChange={handleChange} required />
      <button type="submit">Purchase Ticket</button>
    </form>
  );
};

export default TicketForm;
