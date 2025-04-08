import TicketForm from './TicketForm'
import './App.css' // keep your own overrides if needed
import Header from './components/Header'
import Footer from './components/Footer'


function App() {
  return (
    <div className="bg-dark text-white min-vh-100 d-flex flex-column">
      <Header />
      {/* Hero */}
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url("/sum41.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '60vh',
          position: 'relative',
        }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100" />
        <div className="position-relative z-2 px-3">
        </div>
      </div>

      {/* Info */}
      <div className="text-center my-5 container">
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
              style={{ maxHeight: '685px', objectFit: 'contain' }}
            />
          </div>
        </div>
        <div
        className="d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url("/sum41header.jpg")`,
          backgroundSize: '',
          backgroundPosition: 'center',
          height: '30vh',
          position: 'relative',
          marginTop: '30px'
        }}
      ></div>
      {/* Footer */}
      <Footer />
      </div>

      
    </div>
  )
}

export default App
