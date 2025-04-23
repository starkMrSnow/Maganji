import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Outlet } from 'react-router-dom'; // Outlet is used to render dynamic content
import '../Layout/layout.css';
import './home.css';
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
import { BsFire } from "react-icons/bs";
import { RiNetflixFill } from "react-icons/ri";
import { IoCartSharp } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { FaLightbulb } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa6";
import { useState } from "react";
import { baseUrl, getCookie } from "../../utils";

const data = [
  {
    name: 'Jan',
    savings: 4000,
    spending: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    savings: 3000,
    spending: 1398,
    amt: 2210,
  },
  {
    name: 'March',
    savings: 2000,
    spending: 9800,
    amt: 2290,
  },
  {
    name: 'April',
    savings: 2780,
    spending: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    savings: 1890,
    spending: 4800,
    amt: 2181,
  },
  {
    name: 'June',
    savings: 2390,
    spending: 3800,
    amt: 2500,
  },
  {
    name: 'July',
    savings: 3490,
    spending: 4300,
    amt: 2100,
  },
];
export default function Layout() {
  const navigate = useNavigate(); // For navigation

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount : "",
    phoneNo: ""
  })
  
  const inputChange = (event) => {
    console.log(`Event: ${event.target.value}`);
    
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const HomeDetails = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${baseUrl}/home`,{
      method: 'GET',
      headers: {
        'Authorization' : `Token ${token}`,
        'Content-Type' : 'application/json'
      }
    });
  }

  HomeDetails();

  const initiateDeposit = async (event) => {
      event.preventDefault();
      const response = await fetch(`${baseUrl}/deposit`, {
        method:'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          'X-CSRFToken': getCookie('csrftoken') 
        },
        body: JSON.stringify(formData)
      })
      console.log(formData);

    }

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
          <h2>Dashboard</h2>
          <CiSearch className="search-icon" />
          <input type="text" placeholder="Search..." className="search-bar" />
          <CiBellOn className='bell' />
        </div>
        
        {/* Dynamic Content Goes Here */}
        <div className="home-page-content">
          <div className='grid-container'>
                <div className='left'>
                  <div className='wallet'>
                   <h4> Wallet Balance:</h4> 
                   <p>Ksh.12,798</p>
                   <button className='deposit-button' onClick={() => setShowForm(true)}>DEPOSIT</button>
                   {showForm && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <form className="bg-white p-6 rounded-lg shadow-lg w-96" onSubmit={initiateDeposit} method="post">
                        <label>Amount:</label>
                          <input 
                            type="text" 
                            name="amount"
                            onChange={inputChange}
                            className="search-bar" 
                            placeholder="Amount"
                          />
                          <input 
                            type="text" 
                            name="phoneNo"
                            onChange={inputChange}
                            className="search-bar" 
                            placeholder="Phone Number"
                          />
                        <div className="flex justify-end mt-4">
                          <button 
                            onClick={() => setShowForm(false)} 
                            className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                          >
                            Cancel
                          </button>
                          <button 
                            type="submit" 
                            className="bg-green-600 text-white px-4 py-2 rounded-md"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                   <div className='cards'>
                   <div className="budget-amount">
                   <p> Budget amount</p>
                   <p>Ksh.43,000</p>
                    </div>     
                       <div className='budget-balance'>
                          <p>Budget balance</p>
                          <p>Ksh.12,000</p>
                       </div>
                       <button className='withdraw-button'>WITHDRAW</button>
                   </div>                 
                  </div>
                  <div className="nested-grid">
      <div className="nested-left">
        <p>Recent Transactions</p>
            <div className='rect-bar'>
              <BsFire className='gas'/>
              <p className='bar-one'>Gas</p>
              <p className='amount-one'>Ksh.1,200</p>
              </div>
            <div className='rect-bar'>
              <RiNetflixFill className='netflix'/>
              <p className='bar-two'>Netflix</p>
              <p className='amount-two'>Ksh.2,000</p>
            </div>
            <div className='rect-bar'>
            <IoCartSharp className='cart' />
            <p className='bar-three'>Shopping</p>
              <p className='amount-three'>Ksh.2,000</p>
            </div>
      </div>
      <div className="nested-right">
        <p>Activity</p>
       <li>
        <ul>
           You spent more than 45% of 
             your salary last month on
                partying
        </ul>
       </li>
       <li>
       <ul>
       You are saving last month incredibly
       increased by a whoping 35%
        </ul>
       </li>
      </div>

    </div>
   <div>
   <div className='chart-container'>
     Analytics
   <ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="savings" stroke="#8884d8" strokeWidth={2} />
<Line type="monotone" dataKey="spending" stroke="#ff7300" strokeWidth={2} />
  </LineChart>
</ResponsiveContainer>
   </div>
   </div>
                </div>
                <div className='right'>
                <div className='right-box'>
                      <p>Upcoming Transactions</p>

                      <div className='upcomming-transactions'>
                        <IoHome className='upcoming-icon'/>
                        <h4 className='spacing'>Rent</h4>
                        <small className='up-color1'>2 days</small>
                        <p className='upcomming-amount1'>10,000</p>
                      </div>
                      <div className='upcomming-transactions'>
                      <FaLightbulb className='upcoming-icon' />
                      <h4 className='spacing'>Electricity</h4>
                      <small className='up-color2'>5 days</small>
                      <p className='upcomming-amount2'>10,000</p>
                      </div>

                      <div className='upcomming-transactions'>
                      <FaCarSide className='upcoming-icon'/>
                      <h4 className='spacing'>Car Service</h4>
                      <small className='up-color3'>5 days</small>
                      <p className='upcomming-amount3'>10,000</p>
                      </div>

                    </div>

                </div>
          </div>
        
        </div>
      </div>
    </div>
  );
}

