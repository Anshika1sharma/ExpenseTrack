import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignup = async () => {
    const res = await fetch(
      "https://expensetracker-9790f-default-rtdb.firebaseio.com/signup_user.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          confirmPassword,
        }),
      }
    );

    if (!username || !password || !confirmPassword) {
      setErrorMessage("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    alert("Signup successful!");
    navigate("/", { state: { username } }); 
  };

  return (
    <div className="big">
      <div className="box">
        <div>
          <h1>Signup Page</h1>
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
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
        </div>
        <div style={{ color: "red" }}>{errorMessage}</div>
        <button onClick={handleSignup}>Signup</button>

      </div>
      <div>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap"
          rel="stylesheet"
        />
      </div>
    </div>
  );
};

export default SignupPage;
