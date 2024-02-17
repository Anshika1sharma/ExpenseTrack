import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./expenseview.css";

const ExpenseViewer = () => {
  const location = useLocation();
  const { username } = location.state || {};
  const navigate = useNavigate();

  const handleListClick = () => {
    navigate('/list', { state: { username } });
  };

  const handleBarChartClick = () => {
    navigate('/bar', { state: { username } });
  };

  const handlePieChartClick = () => {
    navigate('/pie', { state: { username } });
  };


  return (
    <div className='view-box'>
      <h1 className='view-heading'>View Your Expenses</h1>
      <div className='choice-box'>
      
      <p className='parag'>Effortlessly monitor your daily expenses, uncover patterns, and watch your savings grow. Take charge of your financial destiny.</p>
      <div>
        <button className='choice' onClick={handleListClick}>LIST VIEWER</button>
      </div>
      <div>
        <button  className='choice' onClick={handleBarChartClick}>BAR CHART VIEWER</button>
      </div>
      <div>
        <button className='choice' onClick={handlePieChartClick}>PIE CHART VIEWER</button>
      </div>
      <div>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Song+Myung&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@500&display=swap" rel="stylesheet" />
      </div>
      </div>
    </div>
  );
};

export default ExpenseViewer;
