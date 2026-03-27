import { useState } from 'react';
import axios from 'axios';
import './styles/Login.scss';
import { useNavigate } from 'react-router-dom';


function Login({ setToken, setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const url = isLogin 
      ? 'https://auth-dashboard-app-l1iq.onrender.com/api/auth/login'
      : 'https://auth-dashboard-app-l1iq.onrender.com/api/auth/register';

    try {
        const res = await axios.post(url, form);
        if (isLogin) {
            setToken(res.data.token);
            setUser(res.data.user); 
            navigate('/dashboard');
        } else {
            setMessage('Registration successful! Please login.');
            setIsLogin(true);
            setForm({ name: '', email: '', password: '' });
        }
        } catch (err) {
        setMessage(err.response?.data?.message || 'Something went wrong');
        }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="glass-container">
        <div className="glass-card">

          <div className="logo-container">
            <img src="/minuted_logo.png" alt="Company Logo" className="main-logo" />
          </div>

          <h1>{isLogin ? 'Login' : 'Create Account'}</h1>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input 
                type="text" 
                name="name" 
                placeholder="Full Name" 
                value={form.name}
                onChange={handleChange} 
                required 
              />
            )}

            <input 
              type="email" 
              name="email" 
              placeholder="Email Address" 
              value={form.email}
              onChange={handleChange} 
              required 
            />

            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />

              <span
                className="toggle-eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
            
            <button type="submit" disabled={loading}>
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <p 
            className="toggle" 
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage('');
              setForm({ name: '', email: '', password: '' });
            }}
          >
            {isLogin 
              ? "Don't have an account? Create one" 
              : "Already have an account? Sign in"}
          </p>

          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;