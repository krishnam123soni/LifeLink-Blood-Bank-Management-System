import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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

    try {
      await axios.post(
        "http://localhost:8080/api/auth/register",
        formData
      );

      setMessage("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow border-0">

            <div className="card-body p-4">

              <div className="text-center mb-4">

                <div style={{ fontSize: "50px" }}>
                  🩸
                </div>

                <h2 className="fw-bold">
                  Create Account
                </h2>

                <p className="text-muted">
                  Join LifeLink Blood Bank
                </p>

              </div>

              <form onSubmit={handleSubmit}>

                {/* Full Name */}
                <div className="mb-3">

                  <label className="form-label">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* Email */}
                <div className="mb-3">

                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* Password */}
                <div className="mb-3">

                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                </div>

                <button
                  type="submit"
                  className="btn btn-danger w-100"
                >
                  Create Account
                </button>

              </form>

              {/* Success */}
              {message && (
                <div className="alert alert-success mt-3">
                  {message}
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="alert alert-danger mt-3">
                  {error}
                </div>
              )}

              <div className="text-center mt-3">

                <p className="mb-0">
                  Already have an account?
                </p>

                <Link to="/login">
                  Login here
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;