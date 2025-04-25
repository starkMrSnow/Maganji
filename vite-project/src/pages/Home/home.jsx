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
import { useState, useEffect } from "react";
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
const [selectedFile, setSelectedFile] = useState(null);
const [password, setPassword] = useState("");

const FileChange = (event) => {
  setSelectedFile(event.target.files[0]); // Capture actual file
};

const PasswordChange = (event) => {
  setPassword(event.target.value);
};

const formData = new FormData();
formData.append("mpesaFile", selectedFile);
formData.append("password", password);

const token = localStorage.getItem("token");

const [transactions, setTransactions] = useState([]);
const [activities, setActivities] = useState([]);
const [upcoming, setUpcoming] = useState([]);
const [analyticsData, setAnalyticsData] = useState([]);


const [wallet, setWallet] = useState({
  wallet_balance: 0,
  budget_amount: 0,
  budget_balance: 0
});

const HomeDetails = async () => {
  
  try{
    const response = await fetch(`${baseUrl}/home`,{
      method: 'GET',
      headers: {
        'Authorization' : `Token ${token}`,
        'Content-Type' : 'application/json'
      }
    });
    const data = await response.json();
    setWallet({
      wallet_balance: data.wallet_balance,
      budget_amount: data.budget_amount,
      budget_balance: data.budget_balance
    });
  } catch (error){
    console.error("Failed to fecth home details", error)
  }
};

  //  This runs HomeDetails() ONLY when the component first mounts, Try to remove this if code crashes
  useEffect(() => {
    HomeDetails();
  }, []);

  const initiateDeposit = async (event) => {
      event.preventDefault();
      const response = await fetch(`${baseUrl}/deposit`,{
        method: 'POST',
        headers: {
          'Authorization' : `Token ${token}`
        },
        body:formData
      });
      const data = await response.json();
      console.log(data)
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
                   <p>Ksh.{wallet.wallet_balance.toLocaleString()}</p>
                   <button className='deposit-button' onClick={() => setShowForm(true)}>DEPOSIT</button>
                   {showForm && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <form className="bg-white p-6 rounded-lg shadow-lg w-96" onSubmit={initiateDeposit} method="post" enctype="multipart/form-data">
                        <label>MPESA file:</label>
                        <input 
                          type="file" 
                          name="mpesaFile"
                          accept="application/pdf"
                          required
                          onChange={FileChange}
                          className="search-bar" 
                          placeholder="M-PESA file"
                        />
                        <label>PDF Password:</label>
                        <input 
                          type="text" 
                          name="password"
                          onChange={PasswordChange}
                          className="search-bar" 
                          placeholder="PDF Password"
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
                   <p>Ksh.{wallet.budget_amount.toLocaleString()}</p>
                    </div>     
                       <div className='budget-balance'>
                          <p>Budget balance</p>
                          <p>Ksh.{wallet.budget_balance.toLocaleString()}</p>
                       </div>
                       <button className='withdraw-button'>WITHDRAW</button>
                   </div>                 
                  </div>
                  <div className="nested-grid">
      <div className="nested-left">
        <p>Recent Transactions</p>
        {transactions.map((tx, index) => (
  <div className='rect-bar' key={index}>
    <BsFire className='gas'/>
    <p className='bar-one'>{tx.name}</p>
    <p className='amount-one'>Ksh.{tx.amount.toLocaleString()}</p>
  </div>
))}
      </div>
      <div className="nested-right">
        <p>Activity</p>
        {activities.map((activity, index) => (
  <li key={index}><ul>{activity}</ul></li>
))}
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

