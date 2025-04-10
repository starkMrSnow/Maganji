import {React,useState, useEffect} from 'react';
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

  const handleBudgetSubmit = async (event) => {
    event.preventDefault();
    console.log("token in budget send : ", localStorage.getItem("token"));
    
    try {
      
      const response = await fetch(`${baseUrl}/budget`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log("Budget created");
        budgetList(); // refresh list
        setShowForm(false); // hide form after submission
      } else {
        const err = await response.json();
        console.error("Failed to create budget:", err);
      }
    } catch (error) {
      console.error("Error submitting budget:", error);
    }
  };
  
    
  const inputChange = (event) => {
    
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  const [budgets, setBudgets] = useState([])

  const budgetList = async () => {
    try{
      const response = await fetch(`${baseUrl}/budget`,
        {method: "GET",
          credentials: "include",
          headers: {"Authorization": `Token ${localStorage.getItem("token")}`}
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
  {budgets.length === 0 ? (
    <h4>No budgets available</h4>
  ) : (
    budgets.map((item, index) => (
      <div className='budget-rect-bar' key={index}>
        <p className='budget-one'>{item.budget}</p>
        <p className='Firstamount'>- Ksh.{item.amount}</p>
        <p className='duedate'>{item.due_date}</p>
      </div>
    ))
  )}
</div>
        <br/>
        <button className='add 'onClick={ handleButtonClick}> Add Budget</button>
      
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