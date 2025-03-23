import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify({ name: res.data.name, role: res.data.role }));
      navigate("/dashboard"); // ✅ Redirect to dashboard after login
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid Credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Login</h2>
        {error && <p className="auth-error">{error}</p>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <input className="auth-input" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input className="auth-input" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <button className="auth-button" type="submit">Login</button>
        </form>
        <p className="auth-footer">Don't have an account? <Link className="auth-link" to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
