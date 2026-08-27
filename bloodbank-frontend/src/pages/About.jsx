import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-page">

      {/* ================= HERO ================= */}

      <section className="about-hero-section">

        <div className="about-hero-content">

          <div className="about-badge">
            🩸 LIFE SAVING PLATFORM
          </div>

          <h1>
            Every Drop Can
            <span> Save a Life.</span>
          </h1>

          <p>
            LifeLink connects blood donors with people in need,
            making blood donation simple, secure and accessible.
          </p>

          <div className="about-hero-buttons">
            <a href="/donate" className="about-primary-btn">
              🩸 Donate Blood
            </a>

            <a href="/donors" className="about-secondary-btn">
              🔎 Find Donors
            </a>
          </div>

        </div>


        <div className="about-blood-visual">

          <div className="blood-circle">

            <div className="blood-drop">
              🩸
            </div>

            <div className="floating-card card-one">
              ❤️ Save Lives
            </div>

            <div className="floating-card card-two">
              👥 Connect People
            </div>

            <div className="floating-card card-three">
              🩸 Donate Today
            </div>

          </div>

        </div>

      </section>


      {/* ================= MISSION ================= */}

      <section className="about-mission">

        <div className="section-label">
          OUR MISSION
        </div>

        <h2>
          Making Blood Donation
          <span> Easier & Faster</span>
        </h2>

        <p>
          LifeLink is a blood bank management platform designed
          to simplify the complete blood donation process.
          From finding donors to submitting donation requests,
          LifeLink brings everything together in one place.
        </p>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section className="about-how">

        <div className="section-heading">

          <div className="section-label">
            HOW IT WORKS
          </div>

          <h2>
            Simple Steps.
            <span> Real Impact.</span>
          </h2>

          <p>
            Donating blood with LifeLink is simple and organized.
          </p>

        </div>


        <div className="about-steps">

          <div className="about-step-card">

            <div className="step-number">
              01
            </div>

            <div className="step-icon">
              👤
            </div>

            <h3>
              Create Account
            </h3>

            <p>
              Register your LifeLink account and securely
              access the platform.
            </p>

          </div>


          <div className="about-step-card">

            <div className="step-number">
              02
            </div>

            <div className="step-icon">
              📝
            </div>

            <h3>
              Submit Request
            </h3>

            <p>
              Fill out the donation form and select your
              preferred donation slot.
            </p>

          </div>


          <div className="about-step-card">

            <div className="step-number">
              03
            </div>

            <div className="step-icon">
              ✅
            </div>

            <h3>
              Get Approved
            </h3>

            <p>
              Your request is reviewed by the administrator
              before approval.
            </p>

          </div>


          <div className="about-step-card">

            <div className="step-number">
              04
            </div>

            <div className="step-icon">
              ❤️
            </div>

            <h3>
              Save a Life
            </h3>

            <p>
              Once approved, your donor profile becomes
              available to help others.
            </p>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section className="about-features">

        <div className="section-heading">

          <div className="section-label">
            WHY LIFELINK
          </div>

          <h2>
            Everything You Need
            <span> in One Place</span>
          </h2>

        </div>


        <div className="feature-grid">

          <div className="feature-card">

            <div className="feature-icon">
              🔐
            </div>

            <h3>
              Secure Authentication
            </h3>

            <p>
              Secure login and role-based access keep
              user information protected.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🔎
            </div>

            <h3>
              Find Blood Donors
            </h3>

            <p>
              Search available donors using blood group
              and location.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              📅
            </div>

            <h3>
              Donation Scheduling
            </h3>

            <p>
              Choose an available date and time slot
              for blood donation.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              📊
            </div>

            <h3>
              Smart Dashboard
            </h3>

            <p>
              Track your donation requests and their
              current status.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              👨‍💼
            </div>

            <h3>
              Admin Management
            </h3>

            <p>
              Administrators can manage donors and
              approve donation requests.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🎫
            </div>

            <h3>
              Donation Token
            </h3>

            <p>
              Every donation request receives a unique
              token for easy tracking.
            </p>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="about-cta">

        <div>

          <div className="cta-icon">
            🩸
          </div>

          <h2>
            Your One Donation
            <br />
            Can Make a Difference.
          </h2>

          <p>
            Be a donor. Be someone's hope.
          </p>

          <a
            href="/donate"
            className="cta-button"
          >
            Donate Blood Now →
          </a>

        </div>

      </section>

    </div>
  );
}

export default About;