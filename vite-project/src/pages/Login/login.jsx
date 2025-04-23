import { useNavigate } from 'react-router-dom';
import { useState} from 'react';
import './login.css';
import { baseUrl, getCookie } from '../../utils';
import logo from '../../assets/Logo.png';

const Login = () => {
  const navigate = useNavigate();
const [formData, setFormData] = useState({
    phoneNo:"",
    password : "",
  })

  const inputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }
  
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
  
    const response = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });
  
    if (response.ok) {
      const data = await response.json(); // Extract the JSON data from the response
      console.log("Login response data:", data);
  
      // Set the token into localStorage
      localStorage.setItem("token", data.token);  // Storing the token 
  
      // Navigate to another page or update state as needed
      navigate("/home")
    } else {
      const errorData = await response.json();
      console.error("Login failed:", errorData);
    }
  };
  
  
  const handleSignUpClick = () => {
    navigate('/signup');  // Redirects to the Sign-Up page
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <img src={logo} alt="Maganji Logo" className="logo" />
        </div>
        
        <div className="tab-container">
          <div className="tab active">Login</div>
          <div className="tab" onClick={handleSignUpClick}>Sign up</div>
        </div>
        
        <form className="login-form" onSubmit={handleLoginSubmit} method="post">
          <input
            required
            type="text"
            onChange={inputChange}
            placeholder="Phone Number"
            className="login-input"
            name="phoneNo"
          />
          <input
            required
            type="password"
            onChange={inputChange}
            placeholder="Password"
            name="password"
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
