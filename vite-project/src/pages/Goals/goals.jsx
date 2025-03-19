import React from 'react';
import { Outlet } from 'react-router-dom'; // Outlet is used to render dynamic content
import '../Layout/layout.css';
import './goals.css';
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

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <div className="sidebar">
        <img src={logo} alt="Logo" className="logo" />
        <div className="pos">
          <button onClick={() => navigate("/home")}>
            <MdDashboard className="icon" /> Dashboard
          </button>
          <button onClick={() => navigate("/spendinghabits")}>
            <IoWallet className="icon" /> Spending Habits
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
          <button onClick={() => navigate("/settings")}>
            <IoIosSettings className="icon" /> Settings
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Navbar */}
        <div className="navbar">
          <h2>My Goals </h2>
          <CiSearch className="search-icon" />
          <input type="text" placeholder="Search..." className="search-bar" />
          <CiBellOn className='bell' />
        </div>
        
        {/* Dynamic Content Goes Here */}
        <div className="page-content">
          <h2> GOALS </h2>
          <div className ="goals-container">
          <button className="goal-card emergency" >EMERGENCY</button>
          <button className="goal-card business" >START A BUSINESS</button>
          <button className="goal-card retirement" >RETIREMENT</button>
          <button className="goal-card debt" >DEBT</button>
          <button className="goal-card travel" >TRAVEL</button>
          <button className="goal-card other" >OTHER</button>
          </div>

          <div className="reward-section">
            <div className="rewards-card"> REWARDS 🏆</div>
          </div>
          

          

          
        
          

          

          
          <Outlet />
        </div>
      </div>
    </div>
  );
}


