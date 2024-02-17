import React, { useEffect, useState, useRef } from 'react'; 
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Chart } from 'chart.js/auto';
import './bar.css';

const BarChart = () => {
  const [data, setData] = useState([]);
  const [categoryTotals, setCategoryTotals] = useState({});
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [chartData, setChartData] = useState({
    xValues: [],
    yValues: [],
    barColors: ["red", "yellow", "navy", "lightgreen", "darksalmon", "lightpink", "brown", "purple"],
  });
  const location = useLocation();
  const { username } = location.state || {};
  

  useEffect(() => {
    const fetchData = async () => {
      console.log(`username in bar : ${username}`);
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

  useEffect(() => {
    console.log("Location state:", location.state);
  }, [location.state]);
  

  useEffect(() => {
    const { barColors } = chartData;
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      if (Object.keys(categoryTotals).length === 0) {
        return;
      }
      const ctx = chartRef.current.getContext('2d');
      const xValues = Object.keys(categoryTotals);
      const yValues = Object.values(categoryTotals);

      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          legend: { display: false },
          title: {
            display: true,
            text: 'Expenses',
          },
        },
      });
    }
  }, [categoryTotals, chartData]);

  return (
    <div className="chart-container">
      <h1 className='chart-title'>Bars of Insight</h1>
      <div className='paragraph-area'>
        <p className='paraside'>Dive into the details of your expenses <br />with our intuitive bar chart, where <br /> every bar represents a category,<br /> offering a clear and concise overview <br /> of your financial landscape.</p>
        
      </div>

      {Object.keys(categoryTotals).length === 0 ? (
        <div>
          <p className="no-data-message">No data available for the bar.<br /> Please login your id and <br /> add your expenses in Expense Tracker.</p>
        </div>
      ) : (
        <div className='bar-side'>
          <canvas
            id="barChart"
            className="chart-canvas"
            ref={chartRef}
          ></canvas>
        </div>
      )}
      <div>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@1,200&display=swap" rel="stylesheet" />
      </div>
    </div>
  );
};

export default BarChart;
