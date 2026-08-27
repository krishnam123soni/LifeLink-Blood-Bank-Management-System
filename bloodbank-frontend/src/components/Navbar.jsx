import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");

    window.location.reload();
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <style>
        {`

        /* =========================
           NAVBAR
        ========================= */

        .lifelink-navbar {
          background: linear-gradient(
            135deg,
            #e52f45,
            #c92339
          );

          padding: 7px 0;

          box-shadow:
            0 4px 15px rgba(0,0,0,0.12);

          min-height: 58px;
        }


        /* =========================
           CONTAINER
        ========================= */

        .lifelink-navbar .container {
          max-width: 1400px;
        }


        /* =========================
           LOGO
        ========================= */

        .lifelink-logo {
          font-size: 21px !important;

          white-space: nowrap;

          margin-right: 12px;

          transition: 0.3s ease;
        }


        .lifelink-logo:hover {
          transform: scale(1.03);
        }


        /* =========================
           NAVIGATION
        ========================= */

        .navbar-nav-custom {
          display: flex;

          align-items: center;

          justify-content: flex-end;

          gap: 6px;

          flex-wrap: nowrap;

          white-space: nowrap;

          margin-left: auto;
        }


        /* =========================
           NAV BUTTONS
        ========================= */

        .lifelink-nav-btn {
          border: none;

          border-radius: 22px;

          padding: 6px 11px;

          font-size: 14px;

          font-weight: 600;

          white-space: nowrap;

          line-height: 1.2;

          transition: all 0.25s ease;
        }


        .lifelink-nav-btn:hover {
          transform: translateY(-2px);

          background: #222 !important;

          color: white !important;

          box-shadow:
            0 5px 12px rgba(0,0,0,0.2);
        }


        /* =========================
           LOGOUT
        ========================= */

        .logout-btn {
          border: none;

          border-radius: 22px;

          padding: 6px 12px;

          font-size: 14px;

          font-weight: 600;

          white-space: nowrap;

          transition: all 0.25s ease;
        }


        .logout-btn:hover {
          transform: translateY(-2px);

          background: #222 !important;

          color: white !important;

          box-shadow:
            0 5px 12px rgba(0,0,0,0.2);
        }


        /* =========================
           ROLE BADGE
        ========================= */

        .role-badge {
          display: flex;

          align-items: center;

          justify-content: center;

          padding: 6px 12px;

          border-radius: 22px;

          background: rgba(255,255,255,0.18);

          color: white;

          font-size: 11px;

          font-weight: 700;

          white-space: nowrap;

          min-width: 68px;

          transition: all 0.25s ease;
        }


        .role-badge:hover {
          background: rgba(255,255,255,0.28);

          transform: translateY(-1px);
        }


        /* =========================
           MOBILE TOGGLER
        ========================= */

        .navbar-toggler {
          border: none !important;

          box-shadow: none !important;

          font-size: 22px;
        }


        /* =========================
           DESKTOP - ONE LINE
        ========================= */

        @media (min-width: 992px) {

          .lifelink-navbar .navbar-collapse {
            display: flex !important;

            flex-basis: auto;
          }

          .navbar-nav-custom {
            flex-wrap: nowrap;

            overflow: visible;
          }

        }


        /* =========================
           TABLET / MOBILE
        ========================= */

        @media (max-width: 991px) {

          .lifelink-navbar {
            padding: 8px 0;
          }


          .navbar-nav-custom {

            margin-top: 12px;

            padding-top: 10px;

            border-top:
              1px solid rgba(255,255,255,0.2);

            width: 100%;

            flex-direction: column;

            align-items: stretch;

            gap: 6px;
          }


          .lifelink-nav-btn {

            width: 100%;

            text-align: left;

            border-radius: 18px;
          }


          .logout-btn {

            width: 100%;

            text-align: left;

            border-radius: 18px;
          }


          .role-badge {

            width: fit-content;

            margin-top: 3px;
          }

        }

        `}
      </style>


      <nav className="navbar navbar-expand-lg navbar-dark lifelink-navbar">

        <div className="container">


          {/* =========================
              LOGO
          ========================= */}

          <Link
            className="navbar-brand fw-bold lifelink-logo"
            to="/"
            onClick={closeMenu}
          >
            🩸 LifeLink
          </Link>


          {/* =========================
              MOBILE BUTTON
          ========================= */}

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>


          {/* =========================
              NAVIGATION
          ========================= */}

          <div
            className={`collapse navbar-collapse ${
              menuOpen ? "show" : ""
            }`}
          >

            <div className="navbar-nav-custom">


              {/* =========================
                  HOME
              ========================= */}

              <Link
                className="btn btn-light lifelink-nav-btn"
                to="/"
                onClick={closeMenu}
              >
                🏠 Home
              </Link>


              {/* =========================
                  DONORS
              ========================= */}

              <Link
                className="btn btn-light lifelink-nav-btn"
                to="/donors"
                onClick={closeMenu}
              >
                🩸 Donors
              </Link>


              {/* =========================
                  DASHBOARD
              ========================= */}

              {token && (
                <Link
                  className="btn btn-light lifelink-nav-btn"
                  to="/dashboard"
                  onClick={closeMenu}
                > 
                  📊 Dashboard
                </Link>
              )}


              {/* =========================
                  DONATE BLOOD
              ========================= */}

              {token &&  (
                <Link
                  className="btn btn-light lifelink-nav-btn"
                  to="/donation-requests"
                  onClick={closeMenu}
                >
                  🩸 Donate Blood
                </Link>
              )}


              {/* =========================
                  ABOUT
              ========================= */}

              <Link
                className="btn btn-light lifelink-nav-btn"
                to="/about"
                onClick={closeMenu}
              >
                ℹ️ About
              </Link>


              {/* =========================
                  HELP
              ========================= */}

              <Link
                className="btn btn-light lifelink-nav-btn"
                to="/help"
                onClick={closeMenu}
              >
                ❓ Help
              </Link>


              {/* =========================
                  LOGOUT
              ========================= */}

              {token && (
                <button
                  onClick={handleLogout}
                  className="btn btn-light logout-btn"
                >
                  ↪️ Logout
                </button>
              )}


              {/* =========================
                  USER / ADMIN
                  LAST
              ========================= */}

              {token && (
                <div className="role-badge">
                  {role === "ADMIN"
                    ? "👑 ADMIN"
                    : "👤 USER"}
                </div>
              )}


              {/* =========================
                  LOGIN + REGISTER
              ========================= */}

              {!token && (
                <>
                  <Link
                    className="btn btn-light lifelink-nav-btn"
                    to="/login"
                    onClick={closeMenu}
                  >
                    🔐 Login
                  </Link>

                  <Link
                    className="btn btn-light lifelink-nav-btn"
                    to="/register"
                    onClick={closeMenu}
                  >
                    📝 Register
                  </Link>
                </>
              )}

            </div>

          </div>

        </div>

      </nav>
    </>
  );
}

export default Navbar;