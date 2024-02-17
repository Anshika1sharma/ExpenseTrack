import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import "./list.css";

const List = () => {
  const [data, setData] = useState([]);
  const [categoryTotals, setCategoryTotals] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { username } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      console.log(`username in list : ${username}`);
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

  return (
    <div className='main-part'>
      <h1 className='heading-main'>LIST VIEW</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='main-area'>
        <div className='left-area'>

        {Object.keys(categoryTotals).length === 0 ? (
        <div>
        <p className="no-data-message">No data available for the list.<br /> Please login your id and <br /> add your expenses in Expense Tracker.</p>
        </div>
      ) : (
        <ul>
            {data.map((item, index) => (
              <li key={index}>
                <span className='keys'>Expense Name</span> - <span className='values'>{item.expenseName}</span> <br />
                <span className='keys'>Expense Cost</span> - <span className='values'>{item.expenseCost}</span> <br />
                <span className='keys'>Expense Category</span> - <span className='values'>{item.selectedOption}</span>
              </li>
            ))}
          </ul>
          )}
          
          </div>

          <div className='right-area'>
            <h2>Category Totals</h2>
            <ul>
              {Object.keys(categoryTotals).map((category) => (
                <li key={category}><span className='cat'>{category}</span>: <span className='total'> {categoryTotals[category]}</span></li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@500&display=swap" rel="stylesheet" />
      </div>
    </div>
  );
};

export default List;


