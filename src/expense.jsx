import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./expense.css";

const ExpenseForm = () => {
  const [expenseName, setExpenseName] = useState("");
  const [expenseCost, setExpenseCost] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [expensesList, setExpensesList] = useState([]);
  const location = useLocation(); 
  const { username } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`username in ExpenseForm useEffect: ${username}`);
  }, [username]);

  useEffect(() => {
    console.log("Location state:", location.state);
  }, [location.state]);
  

  const handleExpenseNameChange = (e) => {
    setExpenseName(e.target.value);
  };

  const handleExpenseCostChange = (e) => {
    setExpenseCost(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleViewButtonClick = () => {
    navigate('/exview', { state: { username } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://expensetracker-9790f-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expenseName,
          expenseCost,
          selectedOption,
          username
        }),
      }
    );
    console.log(`2nd : ${username}`);
    const newExpense = {
      expenseName,
      expenseCost,
      selectedOption,
      username
    };

    setExpensesList([...expensesList, newExpense]);
    setExpenseName("");
    setExpenseCost("");
    setSelectedOption("");
  };

  return (
    <div className="full-area">
      <h1>Expense Tracker</h1>
      <div className="form-area">
      <h3 className="form-heading">Track your expenses</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="expenseName">Expense Name:</label>
          <input
            type="text"
            id="expenseName"
            value={expenseName}
            onChange={handleExpenseNameChange}
          />
        </div>
        <div>
          <label htmlFor="expenseCost">Expense Cost:</label>
          <input
            type="text"
            id="expenseCost"
            value={expenseCost}
            onChange={handleExpenseCostChange}
          />
        </div>
        <div>
          <label htmlFor="expenseType">Expense Type:</label>
          <select
            id="expenseType"
            onChange={handleSelectChange}
            value={selectedOption}
          >
            <option value="">Select an option</option>
            <option value="Food expense">Food expense</option>
            <option value="Transportation">Transportation</option>
            <option value="Utilities">Utilities</option>
            <option value="Education">Education</option>
            <option value="HealthCare">HealthCare</option>
            <option value="Fixed Expenses">Fixed Expenses</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Emergency Fund">Emergency Fund</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      
      <div>
        <button className="view-button" onClick={handleViewButtonClick}>EXPENSE VIEWER</button>
      </div>
    
      </div>

      <div style={{ marginLeft: "20px" }}>
      <div className="data-area">
      <h2 className="data-heading">Entered Expenses</h2>
        <div className="data-box">
        
        <ul>
          {expensesList.map((expense, index) => (
            <li className="listdata" key={index}>
              <p>Expense : {expense.expenseName} </p> 
              <p>Expense Cost : {expense.expenseCost}</p> 
              <p>Expense Category: {expense.selectedOption}</p>
            </li>
          ))}
        </ul>
        </div>
      </div>
      </div>
      <div>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin ="true" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital@1&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Fjalla+One&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&display=swap" rel="stylesheet" />
      </div>
    </div>
  );
};

export default ExpenseForm;