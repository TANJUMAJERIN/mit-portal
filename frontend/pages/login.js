import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/login", {
        email,
        registrationNo,
        password,
      });

      setUserData(response.data.userData);
      // Redirect or render the personalized dashboard component
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Registration No. (optional)"
          value={registrationNo}
          onChange={(e) => setRegistrationNo(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {userData && <PersonalizedDashboard userData={userData} />}
    </div>
  );
};

const PersonalizedDashboard = ({ userData }) => {
  // Render the personalized dashboard using the userData
  return (
    <div>
      <h2>Welcome, {userData.name}!</h2>
      {/* Display user information and other components */}
    </div>
  );
};

export default LoginPage;
