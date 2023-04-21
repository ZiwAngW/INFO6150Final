import React, { useState } from 'react';
import './mailList.css';

const MailList = () => {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    setSubscribed(true);
  };

  return (
    <div className="mail">
      <h1 className="mailTitle">Stay in touch!</h1>
      <span className="mailDesc">Sign up and we'll send the best deals to you</span>
      {subscribed ? (
        <div className="mailMessage">You are subscribed!</div>
      ) : (
        <div className="mailInputContainer">
          <input type="text" placeholder="Your Email" />
          <button onClick={handleSubscribe}>Subscribe</button>
        </div>
      )}
    </div>
  );
};

export default MailList;
