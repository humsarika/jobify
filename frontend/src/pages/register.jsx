import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "Job Seeker" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      console.log(res.data);
      navigate("/login"); // ✅ Redirect to login after registration
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Register</h2>
        {error && <p className="auth-error">{error}</p>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <input className="auth-input" type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <input className="auth-input" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input className="auth-input" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <select className="auth-input" name="role" value={formData.role} onChange={handleChange}>
            <option value="Job Seeker">Job Seeker</option>
            <option value="Recruiter">Recruiter</option>
          </select>
          <button className="auth-button" type="submit">Register</button>
        </form>
        <p className="auth-footer">Already have an account? <Link className="auth-link" to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
