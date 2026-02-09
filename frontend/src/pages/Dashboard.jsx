import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import "./Dashboard.css";

function Dashboard({ onLogout, user }) {
  const navigate = useNavigate();

  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [addAmount, setAddAmount] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");

  const fetchDashboard = async () => {
    try {
      const [balRes, txRes] = await Promise.all([
        fetch("http://localhost:5000/api/wallet/balance", {
          credentials: "include",
        }),
        fetch("http://localhost:5000/api/transactions", {
          credentials: "include",
        }),
      ]);

      if (balRes.ok) {
        const bal = await balRes.json();
        setBalance(bal.wallet_balance);
      }

      if (txRes.ok) {
        const txns = await txRes.json();
        setTransactions(txns);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleAddMoney = async (e) => {
    e.preventDefault();
    if (!addAmount) return;

    await fetch("http://localhost:5000/api/wallet/add-money", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(addAmount) }),
    });

    setAddAmount("");
    fetchDashboard();
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!transferAmount || !recipientEmail) return;

    await fetch("http://localhost:5000/api/wallet/transfer", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Number(transferAmount),
        to_email: recipientEmail,
      }),
    });

    setTransferAmount("");
    setRecipientEmail("");
    fetchDashboard();
  };

  return (
    <div className="dashboard-container">
      <Card className="header-card">
        <div className="header-left">
          <h1>Ledgerly Dashboard</h1>
          <p>Welcome, {user.email}</p>
        </div>

        <div className="header-actions">
          <button
            className="logout-btn"
            onClick={() => navigate("/learn-more")}
          >
            Learn More
          </button>

          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </Card>

      <Card className="balance-card">
        <h2>Current Balance</h2>
        <p>${balance.toFixed(2)}</p>
      </Card>

      <div className="money-grid">
        <Card>
          <h3>Add Money</h3>
          <form onSubmit={handleAddMoney}>
            <input
              type="number"
              placeholder="Enter amount"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
            />
            <button type="submit">Add Money</button>
          </form>
        </Card>

        <Card>
          <h3>Transfer Money</h3>
          <form onSubmit={handleTransfer}>
            <input
              type="email"
              placeholder="Recipient email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
            />
            <button type="submit">Transfer</button>
          </form>
        </Card>
      </div>

      <Card>
        <h3>Transaction History</h3>

        {transactions.length === 0 ? (
          <p>No transactions yet</p>
        ) : (
          <div className="transaction-table">
            <div className="transaction-row header">
              <span>Type</span>
              <span>Amount</span>
              <span>Date</span>
            </div>

            {transactions.map((txn) => {
              const isSent = txn.from_user_email === user.email;

              return (
                <div
                  key={txn._id}
                  className={`transaction-row ${
                    isSent ? "sent" : "received"
                  }`}
                >
                  <span>{isSent ? "Sent" : "Received"}</span>
                  <span className={isSent ? "negative" : "positive"}>
                    {isSent
                      ? `-$${txn.amount.toFixed(2)}`
                      : `+$${txn.amount.toFixed(2)}`}
                  </span>
                  <span>
                    {new Date(txn.createdAt).toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}

export default Dashboard;
