import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import "./LearnMore.css";

function LearnMore() {
  const navigate = useNavigate();

  return (
    <div className="learnmore-container">
      <Card className="learnmore-card">
        <h1>About Ledgerly</h1>
        <p>
          Welcome to <strong>Ledgerly</strong> – your secure and smart digital wallet. 
          Ledgerly allows you to manage your money, transfer funds and track your 
          transactions with ease and confidence.
        </p>

        <h2>Key Features</h2>
        <ul>
          <li><strong>Add & Manage Funds:</strong> Top up your wallet securely in just a few clicks.</li>
          <li><strong>Instant Transfers:</strong> Send money to friends and family instantly.</li>
          <li><strong>Transaction History:</strong> Keep track of every transaction with detailed logs.</li>
          <li><strong>Secure Authentication:</strong> We use encrypted tokens and best security practices.</li>
          <li><strong>User-Friendly Dashboard:</strong> Simple, intuitive design for effortless navigation.</li>
        </ul>

        <h2>Our Mission</h2>
        <p>
          Ledgerly is built to make financial management seamless and safe. 
          Our mission is to empower users to control their money confidently 
          and securely.
        </p>

        <button className="secondary-btn" onClick={() => navigate(-1)}>
          Back to Dashboard
        </button>
      </Card>
    </div>
  );
}

export default LearnMore;
