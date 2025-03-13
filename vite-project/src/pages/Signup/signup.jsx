import { useNavigate } from 'react-router-dom';
import './signup.css';
import logo from '../../assets/Logo.png';

const SignUp = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/');  // Redirects to the login page
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="logo-container">
          <img src={logo} alt="Maganjii Logo" className="logo" />
        </div>
        <div className="links">
          <span onClick={handleLoginClick} className="link">Login</span>
          <span className="active">Sign up</span>
        </div>
        <form className="signup-form">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
          <input type="text" placeholder="Phone number" />
          <input type="email" placeholder="Gmail" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm password" />
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
