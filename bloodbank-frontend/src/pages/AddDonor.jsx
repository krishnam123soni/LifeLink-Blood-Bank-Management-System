import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function AddDonor() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    available: true,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const age = Number(formData.age);
    const phonePattern = /^[0-9]{10}$/;

    if (!age || age < 18 || age > 100) {
      setError("Age must be between 18 and 100.");
      return;
    }

    if (!phonePattern.test(formData.phone)) {
      setError("Phone number must contain exactly 10 digits.");
      return;
    }

    if (!token) {
      setError("Please login before adding a donor.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "https://lifelink-backend-qb67.onrender.com/api/donors",
        {
          ...formData,
          age: Number(formData.age),
          available: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Donor added successfully! 🩸");

      setTimeout(() => {
        navigate("/donors");
      }, 1000);
    } catch (err) {
      console.error("Error adding donor:", err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Unable to add donor. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-donor-page">

      <style>
        {`
          .add-donor-page {
            min-height: 100vh;
            padding: 40px 15px 70px;

            background:
              linear-gradient(
                rgba(255,255,255,0.88),
                rgba(255,255,255,0.92)
              ),
              url("https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1920&q=80");

            background-size: cover;
            background-position: center;
            background-attachment: fixed;

            animation: pageFade 0.7s ease;
          }

          @keyframes pageFade {
            from {
              opacity: 0;
              transform: translateY(20px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .add-donor-card {
            border-radius: 20px !important;
            background: rgba(255,255,255,0.96) !important;
            backdrop-filter: blur(10px);
            overflow: hidden;
            border-top: 5px solid #e63946 !important;
          }

          .add-donor-title {
            color: #222;
          }

          .add-donor-title span {
            color: #e63946;
          }

          .form-label {
            color: #333;
          }

          .donor-input {
            transition: all 0.3s ease;
          }

          .donor-input:focus {
            border-color: #e63946;
            box-shadow: 0 0 0 0.2rem rgba(230,57,70,0.15);
          }

          .submit-btn,
          .back-btn {
            transition: all 0.3s ease;
          }

          .submit-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(220,53,69,0.3);
          }

          .back-btn:hover {
            transform: translateX(-4px);
          }
        `}
      </style>

      <div className="container">

        {/* Heading */}
        <div className="text-center mb-4">

          <h1 className="fw-bold add-donor-title">
            🩸 Add New <span>Donor</span>
          </h1>

          <p className="text-muted fs-5">
            Register a new blood donor with LifeLink
          </p>

        </div>

        {/* Form */}
        <div className="row justify-content-center">

          <div className="col-lg-8">

            <div className="card border-0 shadow-lg add-donor-card">

              <div className="card-body p-4 p-md-5">

                <form onSubmit={handleSubmit}>

                  {/* Full Name */}
                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      className="form-control form-control-lg donor-input"
                      placeholder="Enter full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* Age + Gender */}
                  <div className="row">

                    <div className="col-md-6 mb-3">

                      <label className="form-label fw-semibold">
                        Age
                      </label>

                      <input
                        type="number"
                        name="age"
                        min="18"
                        className="form-control form-control-lg donor-input"
                        placeholder="Enter age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                      />

                    </div>

                    <div className="col-md-6 mb-3">

                      <label className="form-label fw-semibold">
                        Gender
                      </label>

                      <select
                        name="gender"
                        className="form-select form-select-lg donor-input"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >

                        <option value="">
                          Select Gender
                        </option>

                        <option value="Male">
                          Male
                        </option>

                        <option value="Female">
                          Female
                        </option>

                        <option value="Other">
                          Other
                        </option>

                      </select>

                    </div>

                  </div>

                  {/* Blood Group */}
                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      Blood Group
                    </label>

                    <select
                      name="bloodGroup"
                      className="form-select form-select-lg donor-input"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      required
                    >

                      <option value="">
                        Select Blood Group
                      </option>

                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>

                    </select>

                  </div>

                  {/* Phone + Email */}
                  <div className="row">

                    <div className="col-md-6 mb-3">

                      <label className="form-label fw-semibold">
                        Phone
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        className="form-control form-control-lg donor-input"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />

                    </div>

                    <div className="col-md-6 mb-3">

                      <label className="form-label fw-semibold">
                        Email
                      </label>

                      <input
                        type="email"
                        name="email"
                        className="form-control form-control-lg donor-input"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>

                  {/* City */}
                  <div className="mb-3">

                    <label className="form-label fw-semibold">
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      className="form-control form-control-lg donor-input"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* Address */}
                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      Address
                    </label>

                    <textarea
                      name="address"
                      rows="3"
                      className="form-control donor-input"
                      placeholder="Enter complete address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    ></textarea>

                  </div>

                  {/* Success */}
                  {message && (
                    <div className="alert alert-success text-center">
                      {message}
                    </div>
                  )}

                  {/* Error */}
                  {error && (
                    <div className="alert alert-danger text-center">
                      {error}
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="d-flex gap-3">

                    <Link
                      to="/donors"
                      className="btn btn-outline-secondary btn-lg flex-fill back-btn"
                    >
                      ← Back
                    </Link>

                    <button
                      type="submit"
                      className="btn btn-danger btn-lg flex-fill submit-btn"
                      disabled={loading}
                    >

                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Saving...
                        </>
                      ) : (
                        <>
                          🩸 Add Donor
                        </>
                      )}

                    </button>

                  </div>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddDonor;