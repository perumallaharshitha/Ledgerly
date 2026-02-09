import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import "./Auth.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format";
    if (!password) return "Password is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.detail || "Invalid email or password");
        return;
      }

      const data = await res.json();
      onLogin(data.user);
    } catch {
      setError("Server not responding. Try again later.");
    }
  };

  return (
    <div className="auth-wrapper">
      <Card className="auth-card">
        <h2>Welcome Back</h2>
        <p>Login to your Ledgerly account</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>
        </form>

        <p className="auth-link">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </Card>
    </div>
  );
}

export default Login;
