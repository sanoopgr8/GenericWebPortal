import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import './App.css'
import Login from './Login'
import Signup from './Signup'
import Verify from './Verify'
import Settings from './Settings'

function Home({ user, setUser }) {
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      fetch('/api/hello')
        .then(response => response.text())
        .then(data => setMessage(data))
        .catch(error => console.error('Error fetching data:', error))
    }
  }, [user])

  if (!user) {
    return (
      <div className="container">
        <h1>Web Portal</h1>
        <Login onLogin={setUser} />
        <p>Don't have an account?</p>
        <Link to="/signup">
          <button className="secondary-button">Sign Up</button>
        </Link>
      </div>
    )
  }

  return (
    <div className="app-layout">
      <nav className="sidebar">
        <div className="sidebar-header">
          <div className="logo-icon">WP</div>
        </div>
        <div className="nav-items">
          <button
            className="nav-item active"
            title="Home"
            onClick={() => navigate('/')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span className="nav-label">Home</span>
          </button>
          <button
            className="nav-item"
            title="Settings"
            onClick={() => navigate('/settings')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M12 1v6m0 6v6m-6-6h6m6 0h-6M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24M4.93 19.07l4.24-4.24m5.66-5.66l4.24-4.24"></path>
            </svg>
            <span className="nav-label">Settings</span>
          </button>
        </div>
        <div className="sidebar-footer">
          <button
            className="nav-item logout"
            title="Logout"
            onClick={() => setUser(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span className="nav-label">Logout</span>
          </button>
        </div>
      </nav>
      <main className="main-content">
        <div className="container">
          <h1>Web Portal</h1>
          <div className="card">
            <h2>Welcome, {user}!</h2>
            <p>Backend says:</p>
            <h2 className="message">{message || 'Loading...'}</h2>
          </div>
        </div>
      </main>
    </div>
  )
}

function SignupPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Web Portal</h1>
      <Signup />
      <p>Already have an account?</p>
      <button className="secondary-button" onClick={() => navigate('/')}>Back to Login</button>
    </div>
  )
}

function App() {
  const [user, setUser] = useState(null)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/settings" element={<Settings user={user} />} />
      </Routes>
    </Router>
  )
}

export default App
