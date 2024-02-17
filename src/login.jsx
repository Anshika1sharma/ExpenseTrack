import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./login.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [usersData, setUsersData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://expensetracker-9790f-default-rtdb.firebaseio.com/signup_user.json"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        const usersArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setUsersData(usersArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (!username || !password) {
      setErrorMessage("Please enter both username and password");
      return;
    }

    const userExists = usersData.some(
      (user) => user.username === username && user.password === password
    );

    if (userExists) {
      navigate('/page', { state: { username } });
    } else {
      setErrorMessage("Invalid username or password");
      alert("Please double check your username and password");
      navigate('/');
    }
  };

  return (
    <div className="big">
    <div className="box">
    <div >
      <h1>Login Page</h1>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div style={{ color: "red" }}>{errorMessage}</div>
      <button onClick={handleLogin}>Login</button>
    </div>
    

    <div>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
    <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap" rel="stylesheet" />
    </div>
    </div>
    </div>
  );
};

export default LoginPage;
