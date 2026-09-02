import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      await axios.post(
        "https://lifelink-backend-qb67.onrender.com/api/auth/register",
        formData
      );

      setMessage(
        "Registration successful! Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      {/* LEFT SIDE */}
      <div className="register-info">

        <div className="register-brand">
          <span>🩸</span>
          <span>LifeLink</span>
        </div>

        <div className="register-info-content">

          <p className="register-small-heading">
            JOIN THE LIFELINK COMMUNITY
          </p>

          <h1>
            Become A
            <br />
            <span>Life Saver.</span>
          </h1>

          <p className="register-info-text">
            Create your LifeLink account and become part
            of a community helping people find blood when
            they need it most.
          </p>

          <div className="register-benefits">

            <div className="register-benefit">
              <span>🩸</span>
              <div>
                <strong>Donate Blood</strong>
                <p>Help someone in need.</p>
              </div>
            </div>

            <div className="register-benefit">
              <span>🔎</span>
              <div>
                <strong>Find Blood</strong>
                <p>Search available donors.</p>
              </div>
            </div>

            <div className="register-benefit">
              <span>❤️</span>
              <div>
                <strong>Save Lives</strong>
                <p>Every donation matters.</p>
              </div>
            </div>

          </div>

        </div>

        <p className="register-copyright">
          © 2026 LifeLink. All rights reserved.
        </p>

      </div>


      {/* RIGHT SIDE */}
      <div className="register-form-section">

        <div className="register-card">

          <div className="register-header">

            <div className="register-blood-icon">
              🩸
            </div>

            <h2>Create Account</h2>

            <p>
              Join the LifeLink Blood Bank community
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            {/* FULL NAME */}
            <div className="register-input-group">

              <label>Full Name</label>

              <div className="register-input-wrapper">

                <span>👤</span>

                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* EMAIL */}
            <div className="register-input-group">

              <label>Email Address</label>

              <div className="register-input-wrapper">

                <span>✉️</span>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>


            {/* PASSWORD */}
            <div className="register-input-group">

              <label>Password</label>

              <div className="register-input-wrapper">

                <span>🔒</span>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="register-password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>

              </div>

            </div>


            {/* BUTTON */}
            <button
              type="submit"
              className="register-button"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create LifeLink Account →"}
            </button>

          </form>


          {/* SUCCESS MESSAGE */}
          {message && (
            <div className="register-success">
              {message}
            </div>
          )}


          {/* ERROR MESSAGE */}
          {error && (
            <div className="register-error">
              {error}
            </div>
          )}


          {/* LOGIN LINK */}
          <div className="login-link-section">

            <p>
              Already have an account?
            </p>

            <Link to="/login">
              Login to your account
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;