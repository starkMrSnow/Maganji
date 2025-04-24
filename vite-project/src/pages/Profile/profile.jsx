import React, {useState} from 'react';
import { Outlet } from 'react-router-dom'; // Outlet is used to render dynamic content
import '../Layout/layout.css';
import './profile.css';
import { BsPencilSquare } from "react-icons/bs";
import logo from '../../assets/Logo.png';
import { MdDashboard } from "react-icons/md";
import { IoWallet } from "react-icons/io5";
import { GiStairsGoal } from "react-icons/gi";
import { GrTransaction } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { CiBellOn } from "react-icons/ci";

export default function Layout() {
  const navigate = useNavigate(); // For navigation
  //const location = useLocation();
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    phone: ''
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleLogout = () => {
    // Add logout logic
    console.log("Logged out");
  };
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = () => {
    // Add logout logic
    console.log("Changes saved:",formData);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const isProfilePage = location.pathname === "/profile";



  return (
    <div className="layout-container">
      {/* Sidebar */}
      <div className="sidebar">
        <img src={logo} alt="Logo" className="logo" />
        <div className="pos">
        <button onClick={() => navigate("/home")}>
            <MdDashboard className="icon" /> Dashboard
          </button>
          <button onClick={() => navigate("/budget")}>
            < IoWallet className="icon" /> Budget
          </button>
          <button onClick={() => navigate("/spendinghabits")}>
            <BsPencilSquare className="icon" /> Spending Habits
          </button>
          <button onClick={() => navigate("/goals")}>
            <GiStairsGoal className="icon" /> Goals
          </button>
          <button onClick={() => navigate("/transaction")}>
            <GrTransaction className="icon" /> Transaction
          </button>
          <button onClick={() => navigate("/profile")}>
            <CgProfile className="icon" /> Profile
          </button>
          {/* <button onClick={() => navigate("/settings")}>
            <IoIosSettings className="icon" /> Settings
          </button> */}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Navbar */}
        <div className="navbar">
          <h2>My Profile.</h2>
          <CiSearch className="search-icon" />
          <input type="text" placeholder="Search..." className="search-bar" />
          <CiBellOn className='bell' />
        </div>
        
        {/* Dynamic Content Goes Here */}
        <div className="page-content">
        {isProfilePage ? (
            <div className="profile-page">
              <div className="profile-header">
                <div className="profile-picture-container">
                  <img
                    src={profileImage || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="profile-picture"
                  />
                  <label htmlFor="fileUpload" className="custom-upload-label">
    {profileImage ? 'Change Photo' : 'Add Photo'}
  </label>
  <input
    type="file"
    id="fileUpload"
    onChange={handleImageUpload}
    className="hidden-upload"
    accept="image/*"
  />
                </div>
            
              </div>

              <div className="profile-details">
                <label>
                  Full Name:
                  <input
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={!isEditing} />
                </label>

                <label>
                  Email:
                  <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}/>
                </label>

                <label>
                  Username:
                  <input
                   type="text"
                   name="username"
                   value={formData.username}
                   onChange={handleInputChange}
                   disabled={!isEditing} />
                </label>

                <label>
                  Phone Number:
                  <input 
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}/>
                </label>
                <div className="button-group">
                {!isEditing ? (
                    <button onClick={handleEdit} className="edit-button">Edit</button>
                  ) : (
                    <button onClick={handleSave} className="save-button">Save Changes</button>
                  )}
                  <button onClick={handleLogout} className="logout-button">Logout</button>
                  </div>
              </div>
            </div>
          ) : (
          <Outlet />
          )}
        </div>
      </div>
    </div>
  );
}
