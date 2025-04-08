// TicketConfirmation.jsx
import { useLocation, Link } from 'react-router-dom';

export default function TicketConfirmation() {
  const location = useLocation();
  const { formData } = location.state || {};

  if (!formData) {
    return (
      <div className="container py-5">
        <h2>Oops! No ticket data found.</h2>
        <Link to="/" className="btn btn-primary mt-3">Go Back</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Ticket Purchase Confirmed!</h2>
      <p>Thank you, <strong>{formData.firstName} {formData.lastName}</strong>! Your tickets have been secured.</p>
      <p className="mb-4">You're going to see Sum41 in concert!</p>

      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Ticket Details</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Quantity: {formData.Quantity}</li>
            <li className="list-group-item">Name: {formData.FirstName} {formData.LastName}</li>
            <li className="list-group-item">Email: {formData.Email}</li>
            <li className="list-group-item">Phone: {formData.Phone}</li>
            <li className="list-group-item">City: {formData.City}, {formData.Province}</li>
            <li className="list-group-item">Country: {formData.Country}</li>
          </ul>
        </div>
      </div>

      <Link to="/" className="btn btn-dark mt-4">Back to Home</Link>
    </div>
  );
}
