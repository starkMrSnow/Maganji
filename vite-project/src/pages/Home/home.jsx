import React from 'react';
import './home.css';
import logo from '../../assets/Logo.png';
import { MdDashboard } from "react-icons/md";
import { IoWallet } from "react-icons/io5";
import { GiStairsGoal } from "react-icons/gi";
import { GrTransaction } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

export default function Home() {
  return (
    <div>
        <div className='sidebar'>
        <img src={logo} alt="Logo" className="logo" />

            <div className='pos'>
            <button><MdDashboard className="icon" /> Dashboard</button>
            <button><IoWallet className="icon" /> Spending Habits</button>
            <button><GiStairsGoal className="icon" /> Goals</button>
            <button><GrTransaction className="icon" /> Transactions</button>
            <button><CgProfile className="icon" /> Profile</button>
            <button><IoIosSettings className="icon" /> Settings</button>
            </div>
        </div>
        <div className="navbar">
        <CiSearch className='search-icon' />
        <input
          type="text"
          placeholder="Search..."
          className="search-bar"
        />
      </div>
      
    </div>
  );
}
