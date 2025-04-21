import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import '../Layout/layout.css';
import './goals.css';
import { BsPencilSquare } from "react-icons/bs";
import logo from '../../assets/Logo.png';
import { MdDashboard } from "react-icons/md";
import { IoWallet } from "react-icons/io5";
import { GiStairsGoal } from "react-icons/gi";
import { GrTransaction } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { CiSearch, CiBellOn } from "react-icons/ci";
import { baseUrl } from '../../utils';
// import { baseUrl, getCookie } from '../../utils';

export default function Layout() {
  const [isNewGoal, setIsNewGoal] = useState(false);
  const [newGoalData, setNewGoalData] = useState({
    goalName: "",
    targetAmount: "",
    startingAmount: "",
    maturityDate: "",
  });

  const [activeGoalButton, setActiveGoalButton] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState(null);

  const navigate = useNavigate();

  const handleSaveClick = () => {
    alert(`Saving money to goal: ${selectedGoal?.goal}`);
  };
  
  const handleWithdrawClick = () => {
    alert(`Withdrawing from goal: ${selectedGoal?.goal}`);
  };
  
  const handleGoalClick = (goalType, event) => {
    if (goalType === 'new goal') {
      setIsNewGoal(true);
      setActiveGoalButton(event.target);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewGoalData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${baseUrl}/goal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify({
          goal: newGoalData.goalName,
          amount: newGoalData.targetAmount,
          maturity_date: newGoalData.maturityDate,
          status: "inactive"
        })
        
      });
  
      if (!response.ok) {
        throw new Error('Failed to create goal');
      }
  
      const data = await response.json();
      console.log('New goal created:', data);
      await fetchGoals();
      setIsNewGoal(false);
      setNewGoalData({
        goalName: '',
        targetAmount: '',
        startingAmount: '',
        maturityDate: '',
      });
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  const [goals, setGoals] = useState([]);

useEffect(() => {
  fetchGoals();
}, []);

const fetchGoals = async () => {
  try {
    const response = await fetch(`${baseUrl}/goal`);
    const data = await response.json();
    setGoals(data); // Assuming your API returns an array of goals
    console.log("Fetched goals data:", data);

  } catch (error) {
    console.error('Error fetching goals:', error);
  }
};


  return (
    <div className="layout-container">
      {/* Sidebar */}
      <div className="sidebar">
        <img src={logo} alt="Logo" className="logo" />
        <div className="pos">
          <button onClick={() => navigate("/home")}><MdDashboard className="icon" /> Dashboard</button>
          <button onClick={() => navigate("/budget")}><IoWallet className="icon" /> Budget</button>
          <button onClick={() => navigate("/spendinghabits")}><BsPencilSquare className="icon" /> Spending Habits</button>
          <button onClick={() => navigate("/goals")}><GiStairsGoal className="icon" /> Goals</button>
          <button onClick={() => navigate("/transaction")}><GrTransaction className="icon" /> Transaction</button>
          <button onClick={() => navigate("/profile")}><CgProfile className="icon" /> Profile</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <div className="navbar">
          <h2>Goals </h2>
          <CiSearch className="search-icon" />
          <input type="text" placeholder="Search..." className="search-bar" />
          <CiBellOn className='bell' />
        </div>

        <div className="page-content">
          <h2> GOALS </h2>
          <div className="goals-container">
          {goals.map((goal, index) => {
           const name = goal.goal || "Untitled";
          return (
         <button
            key={index}
            className="goal-card other"
            onClick={(e) => {
              setSelectedGoal(goal);
              setActiveGoalButton(e.target);
            }}
          >
            {name.toUpperCase()} <br /> 🎯
          </button>
  );
})}


  <button className="goal-card other" onClick={(e) => handleGoalClick('new goal', e)}>NEW GOAL</button>
          </div>
          {selectedGoal && (
              <div className="goal-details" style={{ top: activeGoalButton?.offsetTop, left: activeGoalButton?.offsetLeft }}>
                <h3>{selectedGoal.goal}</h3>
                <p>Due Date: {selectedGoal.maturity_date || "N/A"}</p>
                <p>Amount Saved: {selectedGoal.startingAmount || "Ksh 0"}</p>

                <button className="save-button" onClick={handleSaveClick}>Save</button>
                <button className="withdraw-button" onClick={handleWithdrawClick}>Withdraw</button>
                <button className="close-button" onClick={() => setSelectedGoal(null)}>X</button>
              </div>
            )}


          {/* New Goal Form */}
          {isNewGoal && (
            <form className="new-goal-form" style={{ color: 'black', top: activeGoalButton?.offsetTop, left: activeGoalButton?.offsetLeft }} onSubmit={handleFormSubmit}>
              <h3>Create a New Goal</h3>
              <label  style={{ color: 'black' }}>
                Goal Name:
                <input
                  type="text"
                  name="goalName"
                  value={newGoalData.goalName}
                  onChange={handleFormChange}
                  required
                  style={{ color: 'black' }}
                />
              </label>
              <label  style={{ color: 'black' }}>
                Target Amount:
                <input
                  type="number"
                  name="targetAmount"
                  value={newGoalData.targetAmount}
                  onChange={handleFormChange}
                  required
                  style={{ color: 'black' }}
                />
              </label>
              <label  style={{ color: 'black' }}>
                Starting Amount:
                <input
                  type="number"
                  name="startingAmount"
                  value={newGoalData.startingAmount}
                  onChange={handleFormChange}
                  required
                  style={{ color: 'black' }}
                />
              </label>
              <label  style={{ color: 'black' }}>
                Maturity Date:
                <input
                  type="date"
                  name="maturityDate"
                  value={newGoalData.maturityDate}
                  onChange={handleFormChange}
                  required
                  style={{ color: 'black' }}
                />
              </label>
              <button type="submit" className="submit-goal-button">Create Goal</button>
            </form>
          )}

          {/* Reward Section */}
          <div className="reward-section">
            <div className="rewards-card"> REWARDS <br /> 🏆</div>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
}
