import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Chart } from 'chart.js/auto';
import "./pie.css";

const PieChart = () => {
  const [data, setData] = useState([]);
  const [categoryTotals, setCategoryTotals] = useState({});
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [chartData, setChartData] = useState({
    xValues: [],
    yValues: [],
    pieColors: ["red", "green", "blue", "orange", "brown","yellow","lightcoral","darksalmon"]
  });
  const location = useLocation();
  const { username } = location.state || {};
  


  useEffect(() => {
    const fetchData = async () => {
      console.log(`username in pie : ${username}`);
      try {
        setLoading(true);

        const response = await axios.get('https://expensetracker-9790f-default-rtdb.firebaseio.com/expenses.json');
        const dataArray = Array.isArray(response.data) ? response.data : Object.values(response.data || []);
        
        const userSpecificData = dataArray.filter(item => item.username === username);
        setData(userSpecificData);

        const totals = {};
        userSpecificData.forEach((item) => {
          const { selectedOption, expenseCost } = item;
          totals[selectedOption] = (totals[selectedOption] || 0) + parseFloat(expenseCost);
        });
        setCategoryTotals(totals);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const handlebackClick = () => {
    navigate('/page');
  };


  useEffect(() => {
    const { pieColors } = chartData;

    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      const xValues = Object.keys(categoryTotals);
      const yValues = Object.values(categoryTotals);

      chartInstanceRef.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: pieColors,
            data: yValues
          }]
        },
        options: {
          legend: { display: true },
          title: {
            display: true,
            text: "Expenses"
          }
        }
      });
    }
  }, [categoryTotals, chartData]); 

  return (
    <div className='back-area'>
    <h1 className='pies'>Pie Chart Precision</h1>
    <div className='para-area'>
    <p className='pie-lines'>Precision meets visual appeal.<br /> Our pie chart brings clarity to your spending habits, making it easy to allocate resources wisely and achieve financial goals.</p>
    </div>

    <div className='pie-area'>

    {Object.keys(categoryTotals).length === 0 ? (
        <div>
        <p className="no-data-message">No data available for the pie.<br /> Please login your id and <br /> add your expenses in Expense Tracker.</p>
        </div>
      ) : (
        <canvas id="myChart" ref={chartRef} style={{ width: '400px', maxWidth: '450px', height: '400px' }}></canvas>
      )}
    
    </div>
    
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@1,200&display=swap" rel="stylesheet" />
    </div>
    </div>
  );
};

export default PieChart;




