import TicketForm from './TicketForm'
import './App.css' // keep your own overrides if needed

function App() {
  return (
    <div className="bg-dark text-white min-vh-100 d-flex flex-column">
      
      {/* Hero */}
      <div
        className="bg-image d-flex align-items-center justify-content-center text-center text-white"
        style={{
          backgroundImage: `url("/sum41.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '60vh',
          position: 'relative',
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-75" />
        <div className="position-relative z-2 px-3">
        </div>
      </div>

      {/* Title */}
      <div className="text-center my-5 container">
        <h2 className="fw-bold display-6">Sum 41 Reunion Tour 2025</h2>
        <p className="text-white">The final mosh pit. Lock in your tickets now.</p>
        <p className="text-white">Secure your spot before it’s sold out — limited seats available.</p>
      </div>

      {/* Form + Poster Row */}
      <div className="container my-5">
        <div className="row g-5 align-items-start justify-content-center">
          {/* Form */}
          <div className="col-md-6">
            <div className="bg-secondary p-4 rounded shadow">
              <TicketForm />
            </div>
          </div>

          {/* Image */}
          <div className="col-md-6 text-center">
            <img
              src="/sum412.jpg"
              alt="Sum 41 poster"
              className="img-fluid rounded shadow"
              style={{ maxHeight: '500px', objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 mt-auto bg-black text-secondary">
        © 2025 Sum 41 Fan Club — Follow us on 
        <a href="#" className="text-info mx-1">Twitter</a> | 
        <a href="#" className="text-danger mx-1">Instagram</a>
      </footer>
    </div>
  )
}

export default App
