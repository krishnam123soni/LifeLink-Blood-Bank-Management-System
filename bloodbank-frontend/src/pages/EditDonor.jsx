import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditDonor() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // Load donor details
  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const response = await axios.get(
          `https://lifelink-backend-qb67.onrender.com/api/donors/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFormData(response.data);
      } catch (err) {
        console.error("Error loading donor:", err);
        setError("Unable to load donor details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonor();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Update donor
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");
    setMessage("");

    try {
      await axios.put(
        `https://lifelink-backend-qb67.onrender.com/api/donors/${id}`,
        {
          ...formData,
          age: Number(formData.age),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Donor updated successfully! ✅");

      setTimeout(() => {
        navigate("/donors");
      }, 1000);
    } catch (err) {
      console.error("UPDATE ERROR:", err);
      console.error("STATUS:", err.response?.status);
      console.error("RESPONSE:", err.response?.data);

      const status = err.response?.status;

      if (status === 401) {
        setError("401 Unauthorized: Please logout and login again.");
      } else if (status === 403) {
        setError("403 Forbidden: Your account is not authorized as ADMIN.");
      } else if (status === 404) {
        setError("404 Not Found: Donor update API was not found.");
      } else if (status >= 500) {
        setError(
          `Server Error (${status}): Check the Spring Boot console for the exact error.`
        );
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError(
          `Unable to update donor. HTTP status: ${status ?? "unknown"}`
        );
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-danger"></div>
        <p className="mt-3">Loading donor details...</p>
      </div>
    );
  }

  return (
    <div className="edit-donor-page">

      <style>
        {`
          .edit-donor-page {
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

            animation: editFade 0.7s ease;
          }

          @keyframes editFade {
            from {
              opacity: 0;
              transform: translateY(20px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .edit-card {
            border-radius: 20px !important;
            background: rgba(255,255,255,0.96) !important;
            backdrop-filter: blur(10px);
          }

          .edit-input {
            transition: all 0.3s ease;
          }

          .edit-input:focus {
            border-color: #e63946;
            box-shadow: 0 0 0 0.2rem rgba(230,57,70,0.15);
          }

          .update-btn,
          .back-btn {
            transition: all 0.3s ease;
          }

          .update-btn:hover {
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

          <h1 className="fw-bold">
            ✏️ Edit Donor
          </h1>

          <p className="text-muted fs-5">
            Update donor information
          </p>

        </div>

        <div className="row justify-content-center">

          <div className="col-lg-8">

            <div className="card border-0 shadow-lg edit-card">

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
                      className="form-control form-control-lg edit-input"
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
                        className="form-control form-control-lg edit-input"
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
                        className="form-select form-select-lg edit-input"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
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
                      className="form-select form-select-lg edit-input"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Blood Group</option>
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
                        className="form-control form-control-lg edit-input"
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
                        className="form-control form-control-lg edit-input"
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
                      className="form-control form-control-lg edit-input"
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
                      className="form-control edit-input"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    ></textarea>

                  </div>

                  {/* Available */}
                  <div className="form-check mb-4">

                    <input
                      type="checkbox"
                      name="available"
                      className="form-check-input"
                      checked={formData.available}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          available: e.target.checked,
                        })
                      }
                    />

                    <label className="form-check-label fw-semibold">
                      Donor is currently available
                    </label>

                  </div>

                  {/* Messages */}
                  {message && (
                    <div className="alert alert-success text-center">
                      {message}
                    </div>
                  )}

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
                      className="btn btn-danger btn-lg flex-fill update-btn"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Updating...
                        </>
                      ) : (
                        "✏️ Update Donor"
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

export default EditDonor;