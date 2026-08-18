import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    }
  };

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow border-0">

            <div className="card-body p-4">

              <div className="text-center mb-4">
                <div style={{ fontSize: "50px" }}>🩸</div>

                <h2 className="fw-bold">
                  Welcome Back
                </h2>

                <p className="text-muted">
                  Login to your LifeLink account
                </p>
              </div>

              <form onSubmit={handleSubmit}>

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
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />

                </div>

                <button
                  type="submit"
                  className="btn btn-danger w-100"
                >
                  Login
                </button>

              </form>

              {message && (
                <div className="alert alert-info mt-3">
                  {message}
                </div>
              )}

              <div className="text-center mt-3">

                <p className="mb-0">
                  Don't have an account?
                </p>

                <Link to="/register">
                  Create an account
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;