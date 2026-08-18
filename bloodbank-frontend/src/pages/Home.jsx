import { Link } from "react-router-dom";
import lifelinkBg from "../assets/lifelink-bg.png";

function Home() {
  return (
    <div className="home-page">

      <style>
        {`
          .home-page {
  min-height: 100vh;
  color: #202124;
  overflow-x: hidden;

  background-image:
    linear-gradient(
       90deg,
      rgba(255, 255, 255, 0.48) 0%,
      rgba(255, 255, 255, 0.25) 45%
      rgba(255, 255, 255, 0.05) 75%
    ),
    url(${lifelinkBg});

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

          .home-navbar {
            background: #e52f45;
            padding: 12px 5%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.15);
          }

          .home-logo {
            color: white;
            font-size: 28px;
            font-weight: 800;
            text-decoration: none;
          }

          .home-nav {
            display: flex;
            gap: 10px;
          }

          .home-nav a {
            background: white;
            color: #222;
            padding: 10px 18px;
            border-radius: 8px;
            text-decoration: none;
            transition: all 0.3s ease;
          }

          .home-nav a:hover {
            transform: translateY(-4px);
            background: #222;
            color: white;
            box-shadow: 0 8px 18px rgba(0,0,0,0.2);
          }

          .hero-section {
            min-height: 470px;
            padding: 55px 6%;
            display: flex;
            align-items: center;
            gap: 50px;
           
            background: transparent;
          }

          .hero-content {
            flex: 1;
            animation: slideLeft 0.8s ease;
          }

          .hero-content h1 {
            font-size: clamp(42px, 5vw, 68px);
            line-height: 1.05;
            font-weight: 800;
            margin-bottom: 20px;
          }

          .hero-content h1 span {
            color: #e52f45;
          }

          .hero-content p {
            font-size: 20px;
            line-height: 1.7;
            color: #555;
            max-width: 600px;
          }

          .hero-buttons {
            display: flex;
            gap: 15px;
            margin-top: 28px;
            flex-wrap: wrap;
          }

          .hero-btn {
            padding: 13px 25px;
            border-radius: 8px;
            text-decoration: none;
            font-size: 17px;
            transition: all 0.3s ease;
          }

          .hero-btn-primary {
            background: #e52f45;
            color: white;
          }

          .hero-btn-secondary {
            border: 2px solid #e52f45;
            color: #e52f45;
          }

          .hero-btn:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 20px rgba(229,47,69,0.25);
          }

          .hero-image {
            flex: 1;
            height: 360px;
            border-radius: 20px;
            background-image:
              url("https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1000&q=85");
            background-size: cover;
            background-position: center;
            box-shadow: 0 15px 35px rgba(0,0,0,0.18);
            animation: slideRight 0.8s ease;
          }

          .services-section {
            padding: 55px 6%;
            background: rgba(250, 250, 250, 0.78);
          }

          .section-title {
            text-align: center;
            margin-bottom: 40px;
          }

          .section-title h2 {
            font-size: 34px;
            font-weight: 800;
          }

          .section-title span {
            color: #e52f45;
          }

          .services-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 25px;
          }

          .service-card {
            background: rgba(255, 255, 255, 0.92);
            padding: 35px 25px;
            text-align: center;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.08);
            transition: all 0.35s ease;
          }

          .service-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 18px 35px rgba(0,0,0,0.15);
          }

          .service-icon {
            font-size: 55px;
            margin-bottom: 15px;
          }

          .service-card h3 {
            font-weight: 700;
            margin-bottom: 10px;
          }

          .service-card p {
            color: #666;
            line-height: 1.6;
          }

          .service-card a {
            display: inline-block;
            margin-top: 15px;
            padding: 10px 25px;
            border: 1px solid #e52f45;
            border-radius: 7px;
            color: #e52f45;
            text-decoration: none;
            transition: all 0.3s ease;
          }

          .service-card a:hover {
            background: #e52f45;
            color: white;
          }

          @keyframes slideLeft {
            from {
              opacity: 0;
              transform: translateX(-40px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideRight {
            from {
              opacity: 0;
              transform: translateX(40px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @media (max-width: 768px) {
            .home-navbar {
              flex-direction: column;
              gap: 15px;
            }

            .home-nav {
              flex-wrap: wrap;
              justify-content: center;
            }

            .hero-section {
              flex-direction: column;
              padding: 40px 5%;
            }

            .hero-image {
              width: 100%;
              height: 280px;
            }

            .services-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Your Health <br />
            Is Our <span>Priority.</span>
          </h1>

          <p>
            Donate blood, save lives and help people in need.
            LifeLink makes it easy to find blood donors and
            become a donor yourself.
          </p>

          <div className="hero-buttons">
            <Link
              to="/donors"
              className="hero-btn hero-btn-primary"
            >
              🩸 Find Blood
            </Link>

            <Link
              to="/add-donor"
              className="hero-btn hero-btn-secondary"
            >
              Become a Donor
            </Link>
          </div>
        </div>

        <div className="hero-image"></div>
      </section>

      {/* SERVICES */}
      <section className="services-section">
        <div className="section-title">
          <h2>
            OUR <span>SERVICES</span>
          </h2>

          <p>
            Simple and reliable blood bank services
          </p>
        </div>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">
              🩸
            </div>

            <h3>Find Blood</h3>

            <p>
              Search available donors by blood group
              and find the blood you need.
            </p>

            <Link to="/donors">
              Search Donors
            </Link>
          </div>

          <div className="service-card">
            <div className="service-icon">
              👥
            </div>

            <h3>Become a Donor</h3>

            <p>
              Register yourself as a donor and
              help save someone's life.
            </p>

            <Link to="/add-donor">
              Register Now
            </Link>
          </div>

          <div className="service-card">
            <div className="service-icon">
              🏥
            </div>

            <h3>LifeLink</h3>

            <p>
              A simple and secure blood bank
              management system.
            </p>

            <Link to="/dashboard">
              Get Started
            </Link>
          </div>
        </div>
      </section> Types of Lara kick off password anybody zero one antibody zero one d by d u dy zero zero one so
    </div>
  );
}
export default Home;
