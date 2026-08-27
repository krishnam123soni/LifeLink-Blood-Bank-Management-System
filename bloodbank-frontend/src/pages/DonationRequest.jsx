import { useState, useEffect } from "react";
import axios from "axios";

function DonationRequest() {

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    donationDate: "",
    donationSlot: "",
    message: ""
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [myRequest, setMyRequest] = useState(null);
const [loadingRequest, setLoadingRequest] = useState(true);

  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "phone") {
    const onlyNumbers = value.replace(/\D/g, "");

    setFormData((prev) => ({
      ...prev,
      phone: onlyNumbers
    }));

    return;
  }

  setFormData((prev) => ({
    ...prev,
    [name]: value
  }));
};


  // =========================
  // GET AVAILABLE SLOTS
  // =========================

  useEffect(() => {

    const fetchAvailableSlots = async () => {

      if (!formData.donationDate) {

        setAvailableSlots([]);

        return;
      }

      try {

        setLoadingSlots(true);
        setError("");

        const response = await axios.get(
          `http://localhost:8080/api/donation-requests/available-slots?date=${formData.donationDate}`
        );

        setAvailableSlots(response.data);

        // Agar selected slot available nahi hai
        if (!response.data.includes(formData.donationSlot)) {

          setFormData((prev) => ({
            ...prev,
            donationSlot: ""
          }));
        }

      } catch (error) {

        console.error(
          "Error fetching available slots:",
          error
        );

        setAvailableSlots([]);

        setError(
          "Unable to load available donation slots."
        );

      } finally {

        setLoadingSlots(false);
      }
    };

    fetchAvailableSlots();

  }, [formData.donationDate]);


  // =========================
  // SUBMIT DONATION REQUEST
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setSuccess("");
    setError("");
    setToken("");

    try {

      const jwtToken = localStorage.getItem("token");

      // Login check
      if (!jwtToken) {

        setError(
          "Please login before submitting a donation request."
        );

        return;
      }

      const response = await axios.post(

        "http://localhost:8080/api/donation-requests",

        {
          ...formData,
          age: Number(formData.age)
        },

        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json"
          }
        }

      );

      console.log(
        "Donation request successful:",
        response.data
      );

      // Success message
      setSuccess(
        "Donation request submitted successfully!"
      );

      // Token number
      setToken(
        response.data.tokenNumber
      );
      setMyRequest(response.data);

      // Reset form
      setFormData({
        fullName: "",
        age: "",
        gender: "",
        bloodGroup: "",
        phone: "",
        email: "",
        city: "",
        address: "",
        donationDate: "",
        donationSlot: "",
        message: ""
      });

      setAvailableSlots([]);

    } catch (error) {

      console.error(
        "Donation request error:",
        error
      );

      console.error(
        "Status:",
        error.response?.status
      );

      console.error(
        "Backend response:",
        error.response?.data
      );

      if (error.response?.data?.message) {

        setError(
          error.response.data.message
        );

      } else if (error.response?.data) {

        setError(
          JSON.stringify(error.response.data)
        );

      } else {

        setError(
          "Failed to submit donation request."
        );
      }
    }
  };


  // =========================
  // UI
  // =========================

  return (

    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-8">

          <div className="card shadow border-0">

            <div className="card-body p-4">

              {/* HEADER */}

              <div className="text-center mb-4">

                <div
                  style={{
                    fontSize: "55px"
                  }}
                >
                  🩸
                </div>

                <h2 className="fw-bold">
                  Donate Blood
                </h2>

                <p className="text-muted">
                  Your donation can help save a life.
                </p>

              </div>


             {/* MY DONATION REQUEST / STATUS */}

{myRequest && (

  <div className="alert alert-info mt-3">

    <h5 className="fw-bold mb-3">
      🩸 My Donation Request
    </h5>

    <div className="mb-2">
      <strong>Token Number:</strong>{" "}
      {myRequest.tokenNumber}
    </div>

    <div className="mb-2">
      <strong>Name:</strong>{" "}
      {myRequest.fullName}
    </div>

    <div className="mb-2">
      <strong>Blood Group:</strong>{" "}
      {myRequest.bloodGroup}
    </div>

    <div className="mb-2">
      <strong>Donation Date:</strong>{" "}
      {myRequest.donationDate}
    </div>

    <div className="mb-2">
      <strong>Donation Slot:</strong>{" "}
      {myRequest.donationSlot}
    </div>

    <div>
      <strong>Status:</strong>{" "}

      <span
        className={
          myRequest.status === "APPROVED"
            ? "badge bg-success"
            : myRequest.status === "REJECTED"
            ? "badge bg-danger"
            : "badge bg-warning text-dark"
        }
      >
        {myRequest.status}
      </span>

    </div>

  </div>

)}


              {/* ERROR */}

              {error && (

                <div className="alert alert-danger">

                  {error}

                </div>

              )}


              {/* FORM */}

              <form onSubmit={handleSubmit}>

                {/* FULL NAME */}

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


                {/* AGE + GENDER */}

                <div className="row">

                  {/* AGE */}

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Age
                    </label>

                    <input
                      type="number"
                      name="age"
                      className="form-control"
                      placeholder="Enter your age"
                      min="18"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  {/* GENDER */}

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Gender
                    </label>

                    <select
                      name="gender"
                      className="form-select"
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


                {/* BLOOD GROUP */}

                <div className="mb-3">

                  <label className="form-label">
                    Blood Group
                  </label>

                  <select
                    name="bloodGroup"
                    className="form-select"
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

                    <option value="O+">O+</option>
                    <option value="O-">O-</option>

                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>

                    <option value="I don't know">
                      I don't know
                    </option>

                  </select>

                  <small className="text-muted">
                    Don't know your blood group? No problem.
                  </small>

                </div>


                {/* PHONE + EMAIL */}

                <div className="row">

                  {/* PHONE */}

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Phone Number
                    </label>

                   <input
  type="tel"
  name="phone"
  className="form-control"
  placeholder="10 digit mobile number"
  maxLength="10"
  pattern="[6-9][0-9]{9}"
  value={formData.phone}
  onChange={handleChange}
  required
/>

                  </div>


                  {/* EMAIL */}

                  <div className="col-md-6 mb-3">

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

                </div>


                {/* CITY + DATE */}

                <div className="row">

                  {/* CITY */}

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />

                  </div>


                  {/* DATE */}

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Donation Date
                    </label>

                    <input
                      type="date"
                      name="donationDate"
                      className="form-control"
                      value={formData.donationDate}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>


                {/* DONATION SLOT */}

                <div className="mb-3">

                  <label className="form-label">
                    Donation Slot
                  </label>

                  <select
                    name="donationSlot"
                    className="form-select"
                    value={formData.donationSlot}
                    onChange={handleChange}
                    required
                    disabled={
                      !formData.donationDate ||
                      loadingSlots
                    }
                  >

                    <option value="">

                      {!formData.donationDate

                        ? "First select donation date"

                        : loadingSlots

                        ? "Loading available slots..."

                        : availableSlots.length === 0

                        ? "No slots available"

                        : "Select a time slot"

                      }

                    </option>


                    {availableSlots.map((slot) => (

                      <option
                        key={slot}
                        value={slot}
                      >
                        {slot}
                      </option>

                    ))}

                  </select>


                  {formData.donationDate &&
                    !loadingSlots && (

                    <small className="text-muted">

                      {availableSlots.length > 0

                        ? `${availableSlots.length} slot(s) available`

                        : "No slots available for this date."

                      }

                    </small>

                  )}

                </div>


                {/* ADDRESS */}

                <div className="mb-3">

                  <label className="form-label">
                    Address
                  </label>

                  <textarea
                    name="address"
                    className="form-control"
                    rows="3"
                    placeholder="Enter your complete address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  ></textarea>

                </div>


                {/* MESSAGE */}

                <div className="mb-4">

                  <label className="form-label">
                    Message
                  </label>

                  <textarea
                    name="message"
                    className="form-control"
                    rows="3"
                    placeholder="Any additional information (optional)"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>

                </div>


                {/* SUBMIT */}

                <button
                  type="submit"
                  className="btn btn-danger w-100 py-2"
                >
                  🩸 Submit Donation Request
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default DonationRequest;