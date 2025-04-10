import {React,useState} from 'react';
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
  const [showForm, setShowForm] = useState(false);
  const handleButtonClick = () => {
    setShowForm(!showForm); 
  };
  const [formData, setFormData] = useState({
    budgetName : "",
    amount : "",
    dueDate : "",
  })
  const handleBudgetSubmit= async(event) => {
    const status = await handleBudgetSubmit(event, formData, 'signup');
  }
    
  const inputChange = (event) => {
    
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

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
        
          
        </div>  
      </div>
      <div className="main-content">
      
        <div className="navbar">
        <h2>My Budget</h2>
          <CiSearch className="search-icon" />
          <input type="text" placeholder="Search..." className="search-bar" />
          <CiBellOn className='bell' />
        </div>
      
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
        <br/>
        <button className='add 'onClick={ handleButtonClick}> Add Budget</button>
        {/* Conditionally render the form if showForm is true */}
        {showForm && (

          <div className="body">
          <form onSubmit={handleBudgetSubmit} method="post" enctype="multipart/form-data">
            <div class="form-container">
    
            <label for ="Budget Name">Budget Name: </label><br/>
            <input type="text" name="budgetName" placeholder="Add Budget" required onChange={inputChange}/><br/>
          

           <label for ="Amount">Amount: </label><br/>
           <input type="integers" name="amount" minlength="1"required onChange={inputChange}/><br/>


           <label for ="Due Date">Due Date: </label><br/>
           <input type="date" name="dueDate" onChange={inputChange}/><br/>

         
          <button>Create Budget</button>
          </div>
        </form>
        </div>
                  )}
      </div>
    </div>
  );}