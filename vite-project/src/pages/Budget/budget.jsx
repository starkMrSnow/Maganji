import React from 'react';
import { Outlet } from 'react-router-dom'; // Outlet is used to render dynamic content
import '../Layout/layout.css';
import './budget.css';
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
import { baseUrl } from '../../utils';
import { useState, useEffect } from 'react';


export default function Layout() {
  const navigate = useNavigate(); // For navigation

  const [budgets, setBudgets] = useState([])

  const budgetList = async () => {
    try{
      const response = await fetch(`${baseUrl}/budget`,
        {method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Budget data:", data);
        setBudgets(data);
      }
      else {
        console.error("Failed to get the budgets");
      }
      }
    catch (error) {
        console.error ("Error fetching budgets: ", error);
      }
    };

useEffect( ()=> {
  budgetList();
}, [])
 

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
        <h2>My Budget</h2>
          <CiSearch className="search-icon" />
          <input type="text" placeholder="Search..." className="search-bar" />
          <CiBellOn className='bell' />
        </div>
        
        {/* Dynamic Content Goes Here */}
        <div className="budget-page-content">
            <div className='budget-rect-bar'>
            <p className='budget-one'>Rent</p>
            <p className='Firstamount'>- Ksh.1,200</p>
            </div>
            <div className='budget-rect-bar'>
            <p className='budget-one'>Water</p>
            <p className='Firstamount'>- Ksh.1,200</p>
            </div>
            <div className='budget-rect-bar'>
            <p className='budget-one'>Wifi</p>
            <p className='Firstamount'>- Ksh.1,200</p>
            </div>
            <div className='budget-rect-bar'>
            <p className='budget-one'>Electiricty</p>
            <p className='Firstamount'>- Ksh.1,200</p>
            </div>
            
        </div>
      </div>
    </div>
  );}