import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TicketForm from './TicketForm'
import TicketConfirmation from './TicketConfirmation'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

function HomeLayout() {
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
      </div>

      {/* Info */}
      <div className="text-center my-5 container">
        <p className="text-white">
          Secure your spot before it’s sold out — limited seats available.
        </p>
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

          {/* Poster Image */}
          <div className="col-md-6 text-center">
            <img
              src="/sum412.jpg"
              alt="Sum 41 poster"
              className="img-fluid rounded shadow"
              style={{ maxHeight: '685px', objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url("/sum41header.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '30vh',
          marginTop: '30px'
        }}
      ></div>

      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/confirmation" element={<TicketConfirmation />} />
      </Routes>
    </Router>
  )
}

export default App
