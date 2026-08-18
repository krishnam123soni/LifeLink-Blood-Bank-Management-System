import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          "http://localhost:8080/api/donors",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDonors(response.data);
      } catch (err) {
        console.error("Dashboard donor error:", err);
        setError("Unable to load donor statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchDonors();
  }, [token]);

  const totalDonors = donors.length;

  const availableDonors = donors.filter(
    (donor) => donor.available === true
  ).length;

  const unavailableDonors = totalDonors - availableDonors;

  const getBloodCount = (group) => {
    return donors.filter(
      (donor) =>
        donor.bloodGroup === group &&
        donor.available === true
    ).length;
  };

  const bloodGroups = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ];

  /*
    Latest donors.
    Backend agar newest first deta hai to wahi order rahega.
    Agar nahi, to first 5 records show honge.
  */
  const recentDonors = donors.slice(0, 5);

  return (
    <div className="dashboard-page">

      <style>
        {`
          .dashboard-page {
            min-height: 100vh;
            padding: 45px 20px 70px;

            background:
              linear-gradient(
                rgba(255,255,255,0.90),
                rgba(255,255,255,0.94)
              ),
              url("https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=85");

            background-size: cover;
            background-position: center;
            background-attachment: fixed;

            animation: dashboardFade 0.7s ease;
          }

          .dashboard-header {
            margin-bottom: 35px;
          }

          .dashboard-header h1 {
            font-size: 42px;
            font-weight: 800;
          }

          .dashboard-header span {
            color: #e52f45;
          }

          .dashboard-header p {
            font-size: 18px;
            color: #666;
          }

          .stat-card {
            border: 0;
            border-radius: 18px;
            background: rgba(255,255,255,0.96);
            box-shadow: 0 8px 25px rgba(0,0,0,0.09);
            transition: all 0.35s ease;
            overflow: hidden;
          }

          .stat-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 18px 35px rgba(0,0,0,0.16);
          }

          .stat-icon {
            font-size: 45px;
          }

          .stat-number {
            font-size: 40px;
            font-weight: 800;
            color: #e52f45;
          }

          .stat-title {
            font-size: 18px;
            font-weight: 700;
          }

          .blood-card {
            border: 0;
            border-radius: 16px;
            background: rgba(255,255,255,0.96);
            box-shadow: 0 6px 20px rgba(0,0,0,0.08);
            transition: all 0.3s ease;
          }

          .blood-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 14px 28px rgba(0,0,0,0.14);
          }

          .blood-group {
            font-size: 28px;
            font-weight: 800;
            color: #e52f45;
          }

          .blood-count {
            font-size: 25px;
            font-weight: 700;
          }

          /* Recent Donors */

          .recent-card {
            border: 0;
            border-radius: 18px;
            background: rgba(255,255,255,0.96);
            box-shadow: 0 8px 25px rgba(0,0,0,0.09);
            overflow: hidden;
          }

          .recent-header {
            padding: 25px;
            border-bottom: 1px solid #eee;
          }

          .recent-donor {
            padding: 18px 25px;
            border-bottom: 1px solid #eee;
            transition: all 0.3s ease;
          }

          .recent-donor:last-child {
            border-bottom: none;
          }

          .recent-donor:hover {
            background: #fff5f6;
            transform: translateX(5px);
          }

          .recent-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #e52f45;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            font-weight: 800;
          }

          .recent-name {
            font-weight: 700;
            font-size: 17px;
          }

          .recent-city {
            color: #777;
            font-size: 14px;
          }

          .recent-blood {
            background: #e52f45;
            color: white;
            padding: 7px 11px;
            border-radius: 8px;
            font-weight: 800;
          }

          .available-badge {
            color: #198754;
            font-weight: 700;
            font-size: 14px;
          }

          .unavailable-badge {
            color: #dc3545;
            font-weight: 700;
            font-size: 14px;
          }

          .action-card {
            border: 0;
            border-radius: 18px;
            background: rgba(255,255,255,0.96);
            box-shadow: 0 8px 25px rgba(0,0,0,0.09);
          }

          .action-btn {
            transition: all 0.3s ease;
          }

          .action-btn:hover {
            transform: translateY(-3px);
          }

          @keyframes dashboardFade {
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

            .dashboard-header h1 {
              font-size: 32px;
            }

            .recent-donor {
              padding: 15px;
            }
          }
        `}
      </style>


      <div className="container">

        {/* HEADER */}

        <div className="dashboard-header">

          <h1>
            Welcome to <span>LifeLink</span> 👋
          </h1>

          <p>
            Blood Bank Management Dashboard
          </p>

        </div>


        {/* LOADING */}

        {loading && (
          <div className="text-center py-5">

            <div className="spinner-border text-danger"></div>

            <p className="mt-3">
              Loading dashboard...
            </p>

          </div>
        )}


        {/* ERROR */}

        {error && (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        )}


        {!loading && !error && (
          <>

            {/* STATISTICS */}

            <div className="row g-4 mb-5">

              {/* Total Donors */}

              <div className="col-md-6 col-lg-3">

                <div className="stat-card h-100">

                  <div className="card-body p-4">

                    <div className="stat-icon">
                      👥
                    </div>

                    <div className="stat-number">
                      {totalDonors}
                    </div>

                    <div className="stat-title">
                      Total Donors
                    </div>

                    <p className="text-muted mb-0">
                      Registered donors
                    </p>

                  </div>

                </div>

              </div>


              {/* Available */}

              <div className="col-md-6 col-lg-3">

                <div className="stat-card h-100">

                  <div className="card-body p-4">

                    <div className="stat-icon">
                      ✅
                    </div>

                    <div className="stat-number">
                      {availableDonors}
                    </div>

                    <div className="stat-title">
                      Available Donors
                    </div>

                    <p className="text-muted mb-0">
                      Ready to donate
                    </p>

                  </div>

                </div>

              </div>


              {/* Blood Groups */}

              <div className="col-md-6 col-lg-3">

                <div className="stat-card h-100">

                  <div className="card-body p-4">

                    <div className="stat-icon">
                      🩸
                    </div>

                    <div className="stat-number">
                      {
                        new Set(
                          donors.map(
                            (donor) => donor.bloodGroup
                          )
                        ).size
                      }
                    </div>

                    <div className="stat-title">
                      Blood Groups
                    </div>

                    <p className="text-muted mb-0">
                      Groups represented
                    </p>

                  </div>

                </div>

              </div>


              {/* Not Available */}

              <div className="col-md-6 col-lg-3">

                <div className="stat-card h-100">

                  <div className="card-body p-4">

                    <div className="stat-icon">
                      ⏳
                    </div>

                    <div className="stat-number">
                      {unavailableDonors}
                    </div>

                    <div className="stat-title">
                      Not Available
                    </div>

                    <p className="text-muted mb-0">
                      Currently unavailable
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* BLOOD GROUP AVAILABILITY */}

            <div className="mb-5">

              <div className="text-center mb-4">

                <h2 className="fw-bold">
                  🩸 Blood Group Availability
                </h2>

                <p className="text-muted">
                  Current donors available by blood group
                </p>

              </div>


              <div className="row g-4">

                {bloodGroups.map((group) => {

                  const count = getBloodCount(group);

                  return (
                    <div
                      className="col-6 col-md-3"
                      key={group}
                    >

                      <div className="blood-card text-center p-4">

                        <div className="blood-group">
                          {group}
                        </div>

                        <div className="blood-count">
                          {count}
                        </div>

                        <div className="text-muted">
                          Available Donors
                        </div>

                      </div>

                    </div>
                  );

                })}

              </div>

            </div>


            {/* RECENT DONORS */}

            <div className="recent-card mb-5">

              <div className="recent-header">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <h2 className="fw-bold mb-1">
                      👥 Recent Donors
                    </h2>

                    <p className="text-muted mb-0">
                      Recently registered blood donors
                    </p>

                  </div>

                  <Link
                    to="/donors"
                    className="btn btn-outline-danger"
                  >
                    View All
                  </Link>

                </div>

              </div>


              {recentDonors.length === 0 ? (

                <div className="text-center p-5">

                  <div style={{ fontSize: "45px" }}>
                    🩸
                  </div>

                  <h5 className="fw-bold mt-3">
                    No donors registered yet
                  </h5>

                  <p className="text-muted">
                    Add your first donor to see them here.
                  </p>

                  <Link
                    to="/add-donor"
                    className="btn btn-danger"
                  >
                    ➕ Add Donor
                  </Link>

                </div>

              ) : (

                recentDonors.map((donor) => (

                  <div
                    className="recent-donor"
                    key={donor.id}
                  >

                    <div className="row align-items-center">

                      {/* Donor */}

                      <div className="col-md-5">

                        <div className="d-flex align-items-center gap-3">

                          <div className="recent-avatar">
                            {donor.fullName
                              ? donor.fullName
                                  .charAt(0)
                                  .toUpperCase()
                              : "D"}
                          </div>

                          <div>

                            <div className="recent-name">
                              {donor.fullName}
                            </div>

                            <div className="recent-city">
                              📍 {donor.city}
                            </div>

                          </div>

                        </div>

                      </div>


                      {/* Blood */}

                      <div className="col-md-2 mt-3 mt-md-0">

                        <span className="recent-blood">
                          {donor.bloodGroup}
                        </span>

                      </div>


                      {/* Age */}

                      <div className="col-md-2 mt-3 mt-md-0">

                        <span className="text-muted">
                          Age:{" "}
                        </span>

                        <strong>
                          {donor.age}
                        </strong>

                      </div>


                      {/* Availability */}

                      <div className="col-md-3 mt-3 mt-md-0">

                        {donor.available ? (

                          <span className="available-badge">
                            ● Available
                          </span>

                        ) : (

                          <span className="unavailable-badge">
                            ● Not Available
                          </span>

                        )}

                      </div>

                    </div>

                  </div>

                ))

              )}

            </div>


            {/* QUICK ACTIONS */}

            <div className="action-card">

              <div className="card-body p-4">

                <h3 className="fw-bold mb-3">
                  Quick Actions
                </h3>

                <div className="d-flex gap-3 flex-wrap">

                  <Link
                    to="/donors"
                    className="btn btn-danger action-btn"
                  >
                    🩸 Find Blood
                  </Link>

                  {role === "ADMIN" && (
                    <Link
                      to="/add-donor"
                      className="btn btn-outline-danger action-btn"
                    >
                      ➕ Add Donor
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="btn btn-outline-dark action-btn"
                  >
                    🚪 Logout
                  </button>

                </div>

              </div>

            </div>

          </>

        )}

      </div>

    </div>
  );
}

export default Dashboard;