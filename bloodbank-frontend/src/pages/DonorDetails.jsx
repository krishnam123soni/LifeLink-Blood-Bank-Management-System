import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function DonorDetails() {
  const { id } = useParams();

  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/donors/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDonor(response.data);
      } catch (err) {
        console.error("Error fetching donor:", err);
        setError("Unable to load donor details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonor();
  }, [id, token]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-danger"></div>
        <p className="mt-3">Loading donor details...</p>
      </div>
    );
  }

  if (error || !donor) {
    return (
      <div className="container py-5 text-center">
        <h3>{error || "Donor not found."}</h3>

        <Link
          to="/donors"
          className="btn btn-danger mt-3"
        >
          ← Back to Donors
        </Link>
      </div>
    );
  }

  return (
    <div className="donor-details-page">

      <style>
        {`
          .donor-details-page {
            min-height: 100vh;
            padding: 50px 20px 70px;

            background:
              linear-gradient(
                rgba(255,255,255,.90),
                rgba(255,255,255,.94)
              ),
              url("https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1920&q=85");

            background-size: cover;
            background-position: center;

            animation: detailsFade .7s ease;
          }

          .details-card {
            max-width: 850px;
            margin: auto;

            background: rgba(255,255,255,.97);

            border-radius: 22px;

            box-shadow:
              0 12px 35px rgba(0,0,0,.12);

            overflow: hidden;
          }

          .details-header {
            background: #e52f45;
            color: white;
            padding: 35px;
            text-align: center;
          }

          .details-avatar {
            width: 90px;
            height: 90px;

            margin: 0 auto 15px;

            border-radius: 50%;

            background: white;
            color: #e52f45;

            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 38px;
            font-weight: 800;
          }

          .details-header h1 {
            font-weight: 800;
            margin-bottom: 5px;
          }

          .details-header p {
            margin: 0;
            opacity: .9;
          }

          .blood-badge-large {
            display: inline-block;

            margin-top: 15px;

            padding: 9px 18px;

            background: white;
            color: #e52f45;

            border-radius: 20px;

            font-weight: 800;
            font-size: 18px;
          }

          .details-body {
            padding: 35px;
          }

          .detail-item {
            padding: 18px;

            background: #fafafa;

            border-radius: 12px;

            transition: .3s;
          }

          .detail-item:hover {
            transform: translateY(-3px);

            box-shadow:
              0 7px 18px rgba(0,0,0,.08);
          }

          .detail-label {
            color: #777;
            font-size: 14px;
            margin-bottom: 5px;
          }

          .detail-value {
            font-size: 17px;
            font-weight: 700;
          }

          .available-status {
            display: inline-block;

            padding: 10px 18px;

            border-radius: 20px;

            background: #dff7e8;
            color: #159447;

            font-weight: 800;
          }

          .unavailable-status {
            display: inline-block;

            padding: 10px 18px;

            border-radius: 20px;

            background: #ffe2e5;
            color: #dc3545;

            font-weight: 800;
          }

          .details-actions {
            display: flex;
            gap: 15px;

            margin-top: 30px;
          }

          .details-actions a {
            flex: 1;
          }

          @keyframes detailsFade {
            from {
              opacity: 0;
              transform: translateY(20px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (max-width: 768px) {
            .details-body {
              padding: 20px;
            }

            .details-header {
              padding: 30px 20px;
            }

            .details-actions {
              flex-direction: column;
            }
          }
        `}
      </style>

      <div className="details-card">

        {/* HEADER */}

        <div className="details-header">

          <div className="details-avatar">
            {donor.fullName
              ? donor.fullName.charAt(0).toUpperCase()
              : "D"}
          </div>

          <h1>
            {donor.fullName}
          </h1>

          <p>
            📍 {donor.city}
          </p>

          <span className="blood-badge-large">
            🩸 {donor.bloodGroup}
          </span>

        </div>


        {/* DETAILS */}

        <div className="details-body">

          <div className="row g-3">

            <div className="col-md-6">
              <div className="detail-item">

                <div className="detail-label">
                  Age
                </div>

                <div className="detail-value">
                  {donor.age} years
                </div>

              </div>
            </div>


            <div className="col-md-6">
              <div className="detail-item">

                <div className="detail-label">
                  Gender
                </div>

                <div className="detail-value">
                  {donor.gender}
                </div>

              </div>
            </div>


            <div className="col-md-6">
              <div className="detail-item">

                <div className="detail-label">
                  Phone
                </div>

                <div className="detail-value">
                  📞 {donor.phone}
                </div>

              </div>
            </div>


            <div className="col-md-6">
              <div className="detail-item">

                <div className="detail-label">
                  Email
                </div>

                <div className="detail-value">
                  ✉️ {donor.email}
                </div>

              </div>
            </div>


            <div className="col-12">
              <div className="detail-item">

                <div className="detail-label">
                  Address
                </div>

                <div className="detail-value">
                  📍 {donor.address}
                </div>

              </div>
            </div>


            <div className="col-12 text-center mt-3">

              {donor.available ? (

                <span className="available-status">
                  🟢 AVAILABLE FOR DONATION
                </span>

              ) : (

                <span className="unavailable-status">
                  🔴 NOT AVAILABLE
                </span>

              )}

            </div>

          </div>


          {/* ACTIONS */}

          <div className="details-actions">

            <Link
              to={`/edit-donor/${donor.id}`}
              className="btn btn-primary btn-lg"
            >
              ✏️ Edit Donor
            </Link>

            <Link
              to="/donors"
              className="btn btn-outline-danger btn-lg"
            >
              ← Back to Donors
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DonorDetails;