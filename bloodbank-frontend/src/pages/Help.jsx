import React, { useState } from "react";
import "./Help.css";

function Help() {

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How can I donate blood?",
      answer:
        "Login to your LifeLink account and click on Donate Blood. Fill in your personal information, blood group, city, address and select an available donation date and time slot. Then submit your request."
    },
    {
      question: "What happens after I submit a donation request?",
      answer:
        "After submitting the form, your request is saved with PENDING status. The administrator reviews your information and can approve or reject your request."
    },
    {
      question: "How can I check my donation request status?",
      answer:
        "Login to your account and open the Dashboard. Your latest donation request and its current status will be displayed there."
    },
    {
      question: "What does PENDING status mean?",
      answer:
        "PENDING means your donation request has been successfully submitted but the administrator has not approved or rejected it yet."
    },
    {
      question: "What happens when my request is APPROVED?",
      answer:
        "When the administrator approves your request, your donor information can be added to the donor list and your request status changes to APPROVED."
    },
    {
      question: "I cannot login. What should I do?",
      answer:
        "First check that your email and password are correct. Make sure there are no extra spaces in your email. If you still cannot login, contact the administrator."
    }
  ];

  return (
    <div className="help-page">

      {/* ================= HERO ================= */}

      <section className="help-hero">

        <div className="help-hero-content">

          <div className="help-badge">
            💬 LIFELINK SUPPORT
          </div>

          <h1>
            How Can We
            <span> Help You?</span>
          </h1>

          <p>
            Find answers to common questions about blood donation,
            requests, accounts and using the LifeLink platform.
          </p>

        </div>

        <div className="help-hero-visual">

          <div className="help-circle">

            <div className="help-main-icon">
              ❓
            </div>

            <div className="help-floating help-float-one">
              🩸 Donate
            </div>

            <div className="help-floating help-float-two">
              📊 Track
            </div>

            <div className="help-floating help-float-three">
              ❤️ Help
            </div>

          </div>

        </div>

      </section>


      {/* ================= QUICK HELP ================= */}

      <section className="quick-help-section">

        <div className="help-section-heading">

          <div className="help-section-label">
            QUICK HELP
          </div>

          <h2>
            Need Help With
            <span> Something?</span>
          </h2>

          <p>
            Quickly find the information you are looking for.
          </p>

        </div>


        <div className="quick-help-grid">

          <div className="quick-help-card">

            <div className="quick-icon">
              🩸
            </div>

            <h3>
              Donate Blood
            </h3>

            <p>
              Learn how to submit a blood donation request.
            </p>

            <a href="/donate">
              Start Donation →
            </a>

          </div>


          <div className="quick-help-card">

            <div className="quick-icon">
              📊
            </div>

            <h3>
              Track Request
            </h3>

            <p>
              Check whether your donation request is pending
              or approved.
            </p>

            <a href="/dashboard">
              Open Dashboard →
            </a>

          </div>


          <div className="quick-help-card">

            <div className="quick-icon">
              🔎
            </div>

            <h3>
              Find Donors
            </h3>

            <p>
              Search available blood donors on LifeLink.
            </p>

            <a href="/donors">
              Find Donors →
            </a>

          </div>

        </div>

      </section>


      {/* ================= STATUS GUIDE ================= */}

      <section className="status-guide">

        <div className="help-section-heading">

          <div className="help-section-label">
            REQUEST STATUS
          </div>

          <h2>
            Understand Your
            <span> Request Status</span>
          </h2>

        </div>


        <div className="status-grid">

          <div className="status-card status-pending">

            <div className="status-icon">
              ⏳
            </div>

            <div>
              <h3>PENDING</h3>

              <p>
                Your donation request has been submitted and
                is waiting for administrator review.
              </p>
            </div>

          </div>


          <div className="status-card status-approved">

            <div className="status-icon">
              ✅
            </div>

            <div>
              <h3>APPROVED</h3>

              <p>
                Your request has been approved by the
                administrator.
              </p>
            </div>

          </div>


          <div className="status-card status-rejected">

            <div className="status-icon">
              ❌
            </div>

            <div>
              <h3>REJECTED</h3>

              <p>
                Your request was not approved by the
                administrator.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* ================= FAQ ================= */}

      <section className="faq-section">

        <div className="help-section-heading">

          <div className="help-section-label">
            FAQ
          </div>

          <h2>
            Frequently Asked
            <span> Questions</span>
          </h2>

          <p>
            Here are some common questions about LifeLink.
          </p>

        </div>


        <div className="faq-container">

          {faqs.map((faq, index) => (

            <div
              className={`faq-item ${
                openFaq === index ? "faq-open" : ""
              }`}
              key={index}
            >

              <button
                className="faq-question"
                onClick={() => toggleFaq(index)}
              >

                <span>
                  {faq.question}
                </span>

                <span className="faq-arrow">
                  {openFaq === index ? "−" : "+"}
                </span>

              </button>


              {openFaq === index && (

                <div className="faq-answer">

                  <p>
                    {faq.answer}
                  </p>

                </div>

              )}

            </div>

          ))}

        </div>

      </section>


      {/* ================= SUPPORT CTA ================= */}

      <section className="help-support">

        <div className="support-content">

          <div className="support-icon">
            💙
          </div>

          <h2>
            Still Need Help?
          </h2>

          <p>
            If you are facing a problem that is not covered here,
            please contact the LifeLink administrator.
          </p>

          <div className="support-buttons">

            <a
              href="mailto:support@lifelink.com"
              className="support-primary"
            >
              📧 Contact Support
            </a>

            <a
              href="/"
              className="support-secondary"
            >
              🏠 Back to Home
            </a>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Help;