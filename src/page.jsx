import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './page.css';

const Page = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state || {};
  console.log(`usernameP: ${username}`);

  const handleExpenseClick = () => {
    navigate('/expense', { state: { username } });
  };

  const handleExViewClick = () => {
    navigate('/exview', { state: { username } });
  };

  return (
    <div className='contentbox'>
      <h4 className='heading-line'>Navigate Your Money Journey</h4>
      <div className='text-area'>
        <p className='para'>Empower your financial future by understanding where every penny goes – because every expense tells a story.</p>
        <div className='buttons'>
        <div>
          <button className="expens" onClick={handleExpenseClick}>EXPENSE TRACKER</button>
        </div>
        <div>
          <button className="expens" onClick={handleExViewClick}> EXPENSE VIEWER</button>
        </div>
        </div>
      </div>
      <div className='img-area'>
        <img
          src="https://media.istockphoto.com/id/635987156/photo/piggy-bank-with-business-stuff.jpg?s=612x612&w=0&k=20&c=1eI6o1tasbeEDmxvvkZV_jUjwaaQ6cBpR77NFCc4FAM="
          alt="piggy"
        />
      </div>
      
      <div>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@1,900&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@1,500&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@1,200&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin ="true" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital@1&display=swap" rel="stylesheet" />
      </div>
    </div>
  );
};

export default Page;
