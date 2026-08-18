import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <>
      <style>
        {`
          .lifelink-navbar {
            background: #e52f45;
          }

          .lifelink-nav-btn {
            transition: all 0.3s ease;
            border-radius: 8px;
          }

          .lifelink-nav-btn:hover {
            transform: translateY(-3px);
            background: #222 !important;
            color: white !important;
            box-shadow: 0 6px 15px rgba(0,0,0,0.2);
          }

          .lifelink-logo {
            transition: all 0.3s ease;
          }

          .lifelink-logo:hover {
            transform: scale(1.05);
          }

          .logout-btn {
            border: none;
            transition: all 0.3s ease;
          }

          .logout-btn:hover {
            transform: translateY(-3px);
            background: #222 !important;
            color: white !important;
            box-shadow: 0 6px 15px rgba(0,0,0,0.2);
          }
        `}
      </style>

      <nav className="navbar navbar-expand-lg navbar-dark bg-danger shadow lifelink-navbar">

        <div className="container">

          {/* Logo */}
          <Link
            className="navbar-brand fw-bold fs-4 lifelink-logo"
            to="/"
          >
            🩸 LifeLink
          </Link>

          {/* Navigation */}
          <div className="d-flex gap-2 flex-wrap">

            <Link
              className="btn btn-light lifelink-nav-btn"
              to="/"
            >
              🏠 Home
            </Link>

            <Link
              className="btn btn-light lifelink-nav-btn"
              to="/donors"
            >
              🩸 Donors
            </Link>

            {/* Show Dashboard only when logged in */}
            {token && (
              <Link
                className="btn btn-light lifelink-nav-btn"
                to="/dashboard"
              >
                📊 Dashboard
              </Link>
            )}

            {/* Login/Register when NOT logged in */}
            {!token && (
              <>
                <Link
                  className="btn btn-light lifelink-nav-btn"
                  to="/login"
                >
                  🔐 Login
                </Link>

                <Link
                  className="btn btn-light lifelink-nav-btn"
                  to="/register"
                >
                  📝 Register
                </Link>
              </>
            )}

            {/* Logout when logged in */}
            {token && (
              <button
                onClick={handleLogout}
                className="btn btn-light logout-btn"
              >
                ↪️ Logout
              </button>
            )}

          </div>

        </div>

      </nav>
    </>
  );
}

export default Navbar;