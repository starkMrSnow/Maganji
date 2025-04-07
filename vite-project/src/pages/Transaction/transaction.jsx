import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'; // Outlet is used to render dynamic content
import '../Layout/layout.css';
import './transaction.css';
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
import { FaCirclePlus } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";




 export default function Transactions() {
    const navigate = useNavigate(); // For navigation
    const [dropdownOpen, setDropdownOpen] = useState(false);
  
    const months = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
  

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
          <h2>Transaction</h2>
          <CiSearch className="search-icon" />
          <input type="text" placeholder="Search..." className="search-bar" />
          <CiBellOn className='bell' />
        </div>
        
        {/* Dynamic Content Goes Here */}
        <div className="page-content">
           {/* Balance */}
           <div className="transaction-container">
            <div className="balance-section">
              <p className="balance"> TOTAL TRANSACTION <br />Ksh. 16,000</p>
            </div>
            <div className= "transaction-history">
            <div className="pos">
                         <MdDateRange />
                         <div className="dropdown">
                           <button className="dropdown-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                              Month <IoMdArrowDropdown />
                           </button>
                           {dropdownOpen && (
                             <div className="dropdown-menu" style={{ maxHeight: '120px', overflowY: 'auto', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }}>
                               {months.map((month, index) => (
                                 <div 
                                   key={index} 
                                   className="dropdown-item" 
                                   style={{ padding: '5px', cursor: 'pointer', transition: 'background 0.3s' }}
                                   onMouseEnter={(e) => e.target.style.background = '#f0f0f0'}
                                   onMouseLeave={(e) => e.target.style.background = 'white'}
                                 >
                                   {month}
                                 </div>
                               ))}
                             </div>
                           )}
                         </div>
                       </div>
            <h3>TRANSACTIONS</h3>
            <div className="transaction-item">
              <span className="transaction-name">Shopping</span>
              <span className="transaction-amount expense">- Ksh. 4,750 </span>
            </div>

            <div className="transaction-item">
             <span className="transaction-name">Rent</span>
             <span className="transaction-amount expense">- Ksh. 7750 </span>
            </div>

            <div className="transaction-item">
              <span className="transaction-name">Netflix</span>
              <span className="transaction-amount expense">- Ksh. 1200</span>
           </div>

           <div className="transaction-item">   
              <span className="transaction-name">Wi-FI</span>
              <span className="transaction-amount expense">- Ksh. 1500</span>
           </div>

           <div className="transaction-item">    
              <span className="transaction-name">Electricity</span>
              <span className="transaction-amount expense">- Ksh. 500</span>
           </div>

           <div className="transaction-item">
              <span className="transaction-name">Spotify-subscription</span>
              <span className="transaction-amount expense">- Ksh. 300</span>
           </div>

          </div>

          <Outlet />
        </div>
      </div>
    </div>
</div>
);
}