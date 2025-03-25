import { useNavigate } from 'react-router-dom';
import './signup.css';
import {useState} from 'react';
import logo from '../../assets/Logo.png';
import { baseUrl, getCookie } from "../../utils"

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName : "",
    lastName : "",
    phoneNo : "",
    email : "",
    nationalID: "",
    password : "",
    confirmation: ""
  })

  const inputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }
  console.log(getCookie('csrftoken'))

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${baseUrl}/signup`, {
      method:'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        'X-CSRFToken': getCookie('csrftoken') 
      },
      body: JSON.stringify(formData)
    })
    console.log(response.json())
    navigate("/home");
  }

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
        <form className="signup-form" onSubmit={handleSignupSubmit} method="post">
          <input type="text" placeholder="First name" required onChange={inputChange} name="firstName"/>
          <input type="text" placeholder="Last name" required onChange={inputChange} name="lastName"/>
          <input type="text" placeholder="Phone number" required onChange={inputChange} name="phoneNo"/>
          <input type="email" placeholder="Email" required onChange={inputChange} name="email"/>
          <input type="text" placeholder="National ID" required onChange={inputChange} name="nationalID"/>
          <input type="password" placeholder="Password" required onChange={inputChange} name="password"/>
          <input type="password" placeholder="Confirm password" required onChange={inputChange} name="confirmation"/>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
