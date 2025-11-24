import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

function Settings({ user }) {
    const navigate = useNavigate()
    const [config, setConfig] = useState({
        host: '',
        port: 587,
        username: '',
        password: '',
        protocol: 'smtp',
        auth: true,
        starttls: true,
        fromEmail: '',
        fromName: ''
    })
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        if (!user) {
            navigate('/')
            return
        }

        fetch('/api/settings/mail')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch settings')
                return res.json()
            })
            .then(data => setConfig(data))
            .catch(err => setError('Could not load settings'))
    }, [user, navigate])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setConfig(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')
        setError('')

        try {
            const res = await fetch('/api/settings/mail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            })

            if (res.ok) {
                setMessage('Settings saved successfully!')
            } else {
                setError('Failed to save settings')
            }
        } catch (err) {
            setError('Error saving settings')
        }
    }

    return (
        <div className="app-layout">
            <nav className="sidebar">
                <div className="sidebar-header">
                    <div className="logo-icon">WP</div>
                </div>
                <div className="nav-items">
                    <button
                        className="nav-item"
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
                        className="nav-item active"
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
                        onClick={() => navigate('/')}
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
                    <div className="card">
                        <h2>Mail Server Settings</h2>

                        {message && <div className="success-message">{message}</div>}
                        {error && <div className="error-message-box">{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>SMTP Host</label>
                                <input
                                    type="text"
                                    name="host"
                                    value={config.host}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>SMTP Port</label>
                                <input
                                    type="number"
                                    name="port"
                                    value={config.port}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={config.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={config.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>From Email</label>
                                <input
                                    type="email"
                                    name="fromEmail"
                                    value={config.fromEmail}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>From Name</label>
                                <input
                                    type="text"
                                    name="fromName"
                                    value={config.fromName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="auth"
                                        checked={config.auth}
                                        onChange={handleChange}
                                    />
                                    SMTP Auth
                                </label>

                                <label>
                                    <input
                                        type="checkbox"
                                        name="starttls"
                                        checked={config.starttls}
                                        onChange={handleChange}
                                    />
                                    STARTTLS
                                </label>
                            </div>

                            <button type="submit">Save Settings</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Settings
