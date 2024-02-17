import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './homepage';
import Page from './page';
import ExpenseViewer from './expenseview';
import List from './list';
import PieChart from './pie';
import SignupPage from './signup';
import LoginPage from './login';
import ExpenseForm from './expense';
import BarChart from './bar';

const App = () => { 
  const [data, setData] = useState({});

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/page' element={<Page />} />
        <Route path='/exview' element={<ExpenseViewer />} />
        <Route path='/list' element={<List />} />
        <Route path='/pie' element={<PieChart />} />
        <Route path='/bar' element={<BarChart />} />
        <Route path="/signup" element={<SignupPage setData={setData} />} />
        <Route path="/login" element={<LoginPage setData={setData} />} />
        <Route path="/expense" element={<ExpenseForm />} />
      </Routes>
    </Router>
  );
}

export default App;

