import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom'; // Outlet for dynamic content
import '../Layout/layout.css';
import logo from '../../assets/Logo.png';
import { MdDashboard } from "react-icons/md";
import { IoWallet } from "react-icons/io5";
import { GiStairsGoal } from "react-icons/gi";
import { GrTransaction } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { CiSearch, CiBellOn } from "react-icons/ci";
import './spendinghabits.css';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { MdDateRange } from "react-icons/md";

// Pie Chart Data
const data = [
  { name: 'Food', value: 400 },
  { name: 'Transport', value: 300 },
  { name: 'Entertainment', value: 300 },
  { name: 'Shopping', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={8}>
      {`${data[index].name}: ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function SpendingHabits() {
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
          <h2>Spending..</h2>
          <CiSearch className="search-icon" />
          <input type="text" placeholder="Search..." className="search-bar" />
          <CiBellOn className='bell' />
        </div>
        
        {/* Spending Habits Content */}
        <div className="spending-page-content">
          <h3>My spending Overview</h3>
          <div className="spending-chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  activeShape={null}
                  activeIndex={-1} 
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <h3 className='month'>THIS MONTH ksh.21,478</h3>

            <div className='position'>
              <MdDateRange />
              <div className="dropdown">
                <button className="dropdown-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                   Month
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
          </div>
        </div>
      </div>
    </div>
  );
}