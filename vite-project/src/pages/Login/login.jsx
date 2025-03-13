import { useNavigate } from 'react-router-dom';
import './login.css';
import logo from '../../assets/Logo.png';

const Login = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup');  // Redirects to the Sign-Up page
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <img src={logo} alt="Maganjii Logo" className="logo" />
        </div>
        
        <div className="tab-container">
          <div className="tab active">Login</div>
          <div className="tab" onClick={handleSignUpClick}>Sign up</div>
        </div>
        
        <form className="login-form">
          <input
            type="text"
            placeholder="Username"
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
          />
          <button type="submit" className="login-button">
            Login
          </button>
          <div className="forgot-password">
            <a href="#forgot">Forgot password?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
