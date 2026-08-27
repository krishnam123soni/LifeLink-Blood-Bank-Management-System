import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
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
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        formData
      );

      console.log("LOGIN RESPONSE:", response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      setMessage("Login successful!");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setMessage("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* LEFT SIDE */}
      <div className="login-info">

        <div className="brand">
          <span className="brand-icon">🩸</span>
          <span>LifeLink</span>
        </div>

        <div className="info-content">

          <p className="small-heading">
            WELCOME TO LIFELINK
          </p>

          <h1>
            Every Drop
            <br />
            Can Save A <span>Life.</span>
          </h1>

          <p className="info-text">
            Connect with blood donors, find available blood,
            and help save lives through our simple and secure
            blood bank management system.
          </p>

          <div className="info-cards">

            <div className="info-card">
              <span>🩸</span>

              <div>
                <strong>Find Blood</strong>
                <p>Search available blood donors.</p>
              </div>
            </div>

            <div className="info-card">
              <span>❤️</span>

              <div>
                <strong>Save Lives</strong>
                <p>Become a blood donor today.</p>
              </div>
            </div>

          </div>

        </div>

        <p className="copyright">
          © 2026 LifeLink. All rights reserved.
        </p>

      </div>


      {/* RIGHT SIDE */}
      <div className="login-form-section">

        <div className="login-card">

          <div className="login-header">

            <div className="blood-icon">
              🩸
            </div>

            <h2>Welcome Back</h2>

            <p>
              Login to your LifeLink account
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            {/* EMAIL */}
            <div className="input-group-custom">

              <label>Email Address</label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ✉️
                </span>

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
            <div className="input-group-custom">

              <label>Password</label>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔒
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>

              </div>

            </div>


            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login to LifeLink →"}
            </button>

          </form>


          {/* MESSAGE */}
          {message && (
            <div
              className={`login-message ${
                message.includes("successful")
                  ? "success-message"
                  : "error-message"
              }`}
            >
              {message}
            </div>
          )}


          {/* REGISTER */}
          <div className="register-section">

            <p>
              Don't have an account?
            </p>

            <Link to="/register">
              Create a new account
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;