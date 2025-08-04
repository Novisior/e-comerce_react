import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {

      console.log("Email:", email);
      console.log("Password:", password);

      let userData;
      if (email.includes("admin")) {
        userData = {
          id: "1",
          email: email,
          name: email.split("@")[0],
          role: "admin",
          token: "fake-admin-token"
        };
      } else {
        userData = {
          id: "2",
          email: email,
          name: email.split("@")[0],
          role: "user",
          token: "fake-user-token"
        };
      }


      onLogin(userData);

      // TODO: Replace simulation with real API call:
      /*
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin({
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          role: data.user.role, // 'admin' or 'user'
          token: data.token
        });
      } else {
        setError(data.message || 'Login failed');
      }
      */
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterRedirect = () => {
    alert(" no need to register you can login with any emailnd pass you want for user acess and any mail including "admin" for admin acess... and dont delete existing records add new one for testing purposes");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <div className="error-message">{error}</div>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          placeholder="Enter your email (include 'admin' for admin access ) "
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p style={{ marginTop: "1rem" }}>Don't have an account?</p>
        <button
          type="button"
          onClick={handleRegisterRedirect}
          className="register-btn"
          disabled={loading}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
