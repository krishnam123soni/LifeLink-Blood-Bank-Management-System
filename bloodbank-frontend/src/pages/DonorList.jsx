import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function DonorList() {
  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";

  const [donors, setDonors] = useState([]);
  const [bloodGroup, setBloodGroup] = useState("");
  const [searchText, setSearchText] = useState("");
  const [availability, setAvailability] = useState("all");

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // =========================
  // PAGINATION
  // =========================

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 6;

  // =========================
  // SORTING
  // =========================

  const [sortField, setSortField] = useState("none");
  const [sortDirection, setSortDirection] = useState("asc");

  const token = localStorage.getItem("token");

  // =========================
  // FETCH ALL DONORS
  // =========================

  const fetchDonors = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await axios.get(
        "http://localhost:8080/api/donors",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDonors(response.data);
    } catch (error) {
      console.error("Error fetching donors:", error);
      setMessage("Unable to load donors.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE DONOR
  // =========================

  const deleteDonor = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this donor?"
      )
    ) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:8080/api/donors/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDonors((current) =>
        current.filter((donor) => donor.id !== id)
      );

      setMessage("Donor deleted successfully! 🗑️");

      setCurrentPage((page) => {
        const remainingDonors = donors.length - 1;
        const totalPages = Math.ceil(
          remainingDonors / pageSize
        );

        if (totalPages > 0 && page >= totalPages) {
          return totalPages - 1;
        }

        return page;
      });

    } catch (error) {
      console.error("Error deleting donor:", error);
      setMessage("Unable to delete donor.");
    }
  };

  // =========================
  // FILTER DONORS
  // =========================

  const filteredDonors = useMemo(() => {
    const search = searchText.toLowerCase().trim();

    return donors.filter((donor) => {

      const matchesSearch =
        !search ||
        donor.fullName
          ?.toLowerCase()
          .includes(search) ||
        donor.city
          ?.toLowerCase()
          .includes(search) ||
        donor.phone
          ?.toString()
          .includes(search) ||
        donor.bloodGroup
          ?.toLowerCase()
          .includes(search);

      const matchesBloodGroup =
        !bloodGroup ||
        donor.bloodGroup === bloodGroup;

      const matchesAvailability =
        availability === "all" ||
        (availability === "available" &&
          donor.available === true) ||
        (availability === "unavailable" &&
          donor.available === false);

      return (
        matchesSearch &&
        matchesBloodGroup &&
        matchesAvailability
      );
    });
  }, [
    donors,
    searchText,
    bloodGroup,
    availability,
  ]);

  // =========================
  // SORT DONORS
  // =========================

  const sortedDonors = useMemo(() => {
    const sorted = [...filteredDonors];

    if (sortField === "none") {
      return sorted;
    }

    sorted.sort((a, b) => {
      let valueA = a[sortField];
      let valueB = b[sortField];

      // AGE
      if (sortField === "age") {
        valueA = Number(valueA) || 0;
        valueB = Number(valueB) || 0;

        return sortDirection === "asc"
          ? valueA - valueB
          : valueB - valueA;
      }

      // TEXT FIELDS
      valueA = String(valueA || "").toLowerCase();
      valueB = String(valueB || "").toLowerCase();

      const result = valueA.localeCompare(valueB);

      return sortDirection === "asc"
        ? result
        : -result;
    });

    return sorted;
  }, [
    filteredDonors,
    sortField,
    sortDirection,
  ]);

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(
    sortedDonors.length / pageSize
  );

  const paginatedDonors = useMemo(() => {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;

    return sortedDonors.slice(
      startIndex,
      endIndex
    );
  }, [
    sortedDonors,
    currentPage,
  ]);

  // =========================
  // RESET PAGE WHEN FILTER/SORT CHANGES
  // =========================

  useEffect(() => {
    setCurrentPage(0);
  }, [
    searchText,
    bloodGroup,
    availability,
    sortField,
    sortDirection,
  ]);

  // =========================
  // RESET ALL
  // =========================

  const resetFilters = () => {
    setSearchText("");
    setBloodGroup("");
    setAvailability("all");

    setSortField("none");
    setSortDirection("asc");

    setCurrentPage(0);
    setMessage("");
  };

  // =========================
  // FETCH ON PAGE LOAD
  // =========================

  useEffect(() => {
    fetchDonors();
  }, []);

  return (
    <div className="donor-page">

      <style>{`

        .availability-badge {
          display: inline-block;
          margin-top: 15px;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 800;
          font-size: 14px;
          letter-spacing: 0.5px;
        }

        .available-badge {
          background: #dff7e8;
          color: #159447;
          border: 1px solid #159447;
        }

        .unavailable-badge {
          background: #ffe2e5;
          color: #dc3545;
          border: 1px solid #dc3545;
        }

        .donor-page {
          min-height: 100vh;
          padding: 0 0 70px;

          background:
            linear-gradient(
              rgba(255,255,255,.88),
              rgba(255,255,255,.93)
            ),
            url("https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1920&q=85");

          background-size: cover;
          background-position: center;
          background-attachment: fixed;

          animation: donorFade .7s ease;
        }

        /* HERO */

        .donor-hero {
          min-height: 350px;
          margin: 0 auto 35px;
          padding: 50px 7%;

          display: flex;
          align-items: center;

          background:
            linear-gradient(
              90deg,
              rgba(255,255,255,.98) 35%,
              rgba(255,255,255,.45)
            ),
            url("https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1600&q=85");

          background-size: cover;
          background-position: center;

          box-shadow:
            0 8px 25px rgba(0,0,0,.08);
        }

        .donor-hero-content {
          max-width: 610px;
          animation: donorLeft .8s ease;
        }

        .donor-hero h1 {
          font-size: clamp(42px,5vw,68px);
          line-height: 1;
          font-weight: 900;
          margin-bottom: 18px;
        }

        .donor-hero h1 span {
          color: #e52f45;
        }

        .donor-hero p {
          font-size: 20px;
          color: #555;
          line-height: 1.6;
          max-width: 570px;
        }

        .donor-hero-btn {
          display: inline-block;
          margin-top: 15px;

          background: #e52f45;
          color: #fff;

          padding: 13px 25px;
          border-radius: 8px;

          text-decoration: none;

          transition: .3s;
        }

        .donor-hero-btn:hover {
          color: #fff;
          transform: translateY(-4px);

          box-shadow:
            0 10px 20px rgba(229,47,69,.3);
        }

        /* CONTAINER */

        .donor-container {
          width: 92%;
          max-width: 1250px;
          margin: auto;
        }

        /* HEADING */

        .donor-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;

          gap: 20px;
          margin-bottom: 25px;
        }

        .donor-heading h2 {
          font-size: 42px;
          font-weight: 800;
          margin: 0;
        }

        /* SEARCH */

        .search-card {
          background: rgba(255,255,255,.96);

          border-radius: 18px;
          padding: 28px;

          box-shadow:
            0 8px 25px rgba(0,0,0,.10);

          margin-bottom: 25px;

          animation: cardUp .6s ease;
        }

        .search-card h3 {
          text-align: center;
          font-weight: 800;
          margin-bottom: 22px;
        }

        .filter-grid {
          display: grid;

          grid-template-columns:
            1.5fr
            1fr
            1fr
            1fr;

          gap: 15px;
        }

        .filter-input,
        .filter-select {
          width: 100%;

          padding: 14px 16px;

          border: 1px solid #d8dce2;
          border-radius: 9px;

          font-size: 16px;

          background: white;
          color: #222;

          outline: none;

          transition: .3s;
        }

        .filter-input:focus,
        .filter-select:focus {
          border-color: #e52f45;

          box-shadow:
            0 0 0 3px rgba(229,47,69,.12);
        }

        .filter-select {
          cursor: pointer;
        }

        .filter-select option {
          background: white;
          color: #222;
        }

        /* SORT */

        .sort-direction-btn {
          border: 1px solid #e52f45;

          background: white;
          color: #e52f45;

          padding: 11px 20px;

          border-radius: 8px;

          cursor: pointer;

          font-size: 15px;
          font-weight: 700;

          transition: .3s;
        }

        .sort-direction-btn:hover {
          background: #e52f45;
          color: white;

          transform: translateY(-2px);
        }

        .filter-buttons {
          display: flex;

          justify-content: center;

          gap: 12px;

          margin-top: 18px;

          flex-wrap: wrap;
        }

        .filter-btn {
          border: 0;

          background: #e52f45;
          color: white;

          padding: 11px 25px;

          border-radius: 8px;

          cursor: pointer;

          font-size: 16px;

          transition: .3s;
        }

        .filter-btn:hover {
          transform: translateY(-3px);

          box-shadow:
            0 8px 18px rgba(229,47,69,.3);
        }

        .reset-btn {
          border: 1px solid #e52f45;

          background: white;
          color: #e52f45;

          padding: 11px 25px;

          border-radius: 8px;

          cursor: pointer;

          font-size: 16px;

          transition: .3s;
        }

        .reset-btn:hover {
          background: #e52f45;
          color: white;

          transform: translateY(-3px);
        }

        /* RESULT COUNT */

        .result-count {
          display: flex;
          justify-content: space-between;
          align-items: center;

          margin-bottom: 20px;

          padding: 15px 20px;

          background: rgba(255,255,255,.92);

          border-radius: 10px;

          box-shadow:
            0 4px 15px rgba(0,0,0,.06);
        }

        .result-count strong {
          color: #e52f45;
        }

        /* DONOR GRID */

        .donor-grid {
          display: grid;

          grid-template-columns:
            repeat(
              auto-fill,
              minmax(300px,1fr)
            );

          gap: 25px;
        }

        /* DONOR CARD */

        .donor-card {
          background: rgba(255,255,255,.96);

          border-radius: 18px;

          padding: 25px;

          box-shadow:
            0 5px 20px rgba(0,0,0,.10);

          transition: .35s;

          animation: cardUp .6s ease both;
        }

        .donor-card:hover {
          transform: translateY(-9px);

          box-shadow:
            0 18px 35px rgba(0,0,0,.16);
        }

        .donor-card-top {
          display: flex;

          justify-content: space-between;

          align-items: flex-start;
        }

        .donor-name {
          font-size: 25px;

          font-weight: 800;

          margin: 0;
        }

        .blood-badge {
          background: #e52f45;

          color: white;

          font-weight: 800;

          font-size: 17px;

          padding: 8px 13px;

          border-radius: 8px;

          transition: .3s;
        }

        .donor-card:hover .blood-badge {
          transform: scale(1.1);
        }

        .donor-city {
          color: #666;

          margin: 7px 0 20px;

          font-size: 17px;
        }

        .donor-line {
          border: 0;

          border-top: 1px solid #ddd;

          margin-bottom: 20px;
        }

        .donor-info {
          margin: 10px 0;

          font-size: 16px;
        }

        /* ACTIONS */

        .actions {
          display: flex;

          gap: 10px;

          margin-top: 20px;
        }

        .edit-action,
        .delete-action,
        .details-action {
          flex: 1;

          padding: 10px;

          border-radius: 8px;

          text-align: center;

          text-decoration: none;

          transition: .3s;

          cursor: pointer;

          font-size: 16px;
        }

        .edit-action {
          color: #0d6efd;

          border: 1px solid #0d6efd;

          background: white;
        }

        .delete-action {
          color: #dc3545;

          border: 1px solid #dc3545;

          background: white;
        }

        .details-action {
          color: #198754;

          border: 1px solid #198754;

          background: white;
        }

        .edit-action:hover,
        .delete-action:hover,
        .details-action:hover {
          transform: translateY(-3px);

          color: white;
        }

        .edit-action:hover {
          background: #0d6efd;
        }

        .delete-action:hover {
          background: #dc3545;
        }

        .details-action:hover {
          background: #198754;
        }

        /* STATUS */

        .status-box {
          padding: 14px;

          border-radius: 9px;

          background: rgba(255,255,255,.96);

          text-align: center;

          margin-bottom: 20px;

          box-shadow:
            0 4px 15px rgba(0,0,0,.06);
        }

        .no-result {
          padding: 60px 20px;

          text-align: center;

          background: rgba(255,255,255,.96);

          border-radius: 18px;

          box-shadow:
            0 8px 25px rgba(0,0,0,.08);
        }

        .no-result-icon {
          font-size: 60px;

          margin-bottom: 15px;
        }

        /* PAGINATION */

        .pagination-container {
          display: flex;

          justify-content: center;

          align-items: center;

          gap: 8px;

          margin-top: 35px;

          flex-wrap: wrap;
        }

        .pagination-btn,
        .pagination-number {
          border: 1px solid #e52f45;

          background: white;

          color: #e52f45;

          padding: 9px 15px;

          border-radius: 8px;

          font-weight: 700;

          cursor: pointer;

          transition: .3s;
        }

        .pagination-btn:hover:not(:disabled),
        .pagination-number:hover {
          background: #e52f45;

          color: white;

          transform: translateY(-2px);
        }

        .pagination-number.active {
          background: #e52f45;

          color: white;
        }

        .pagination-btn:disabled {
          opacity: .45;

          cursor: not-allowed;
        }

        /* ANIMATIONS */

        @keyframes donorFade {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes donorLeft {
          from {
            opacity: 0;

            transform: translateX(-40px);
          }

          to {
            opacity: 1;

            transform: translateX(0);
          }
        }

        @keyframes cardUp {
          from {
            opacity: 0;

            transform: translateY(20px);
          }

          to {
            opacity: 1;

            transform: translateY(0);
          }
        }

        /* MOBILE */

        @media (max-width: 900px) {

          .filter-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {

          .donor-hero {
            min-height: 330px;

            padding: 40px 6%;

            background-position:
              65% center;
          }

          .donor-heading {
            flex-direction: column;

            align-items: flex-start;
          }

          .filter-grid {
            grid-template-columns: 1fr;
          }

          .filter-buttons {
            flex-direction: column;
          }

          .filter-btn,
          .reset-btn,
          .sort-direction-btn {
            width: 100%;
          }

          .result-count {
            flex-direction: column;

            align-items: flex-start;

            gap: 5px;
          }

          .pagination-container {
            gap: 6px;
          }

          .pagination-btn,
          .pagination-number {
            padding: 8px 12px;

            font-size: 14px;
          }
        }

      `}</style>

      {/* =========================
          HERO
      ========================= */}

      <section className="donor-hero">

        <div className="donor-hero-content">

          <h1>
            DONATE <span>BLOOD!!!</span>
          </h1>

          <p>
            Your one donation can make a difference.
            Donate blood, save lives and help someone
            who needs you.
          </p>

          {isAdmin && (
            <Link
              to="/add-donor"
              className="donor-hero-btn"
            >
              🩸 Become a Donor
            </Link>
          )}

        </div>

      </section>

      <div className="donor-container">

        {/* =========================
            HEADING
        ========================= */}

        <div className="donor-heading">

          <div>

            <h2>
              Blood Donors
            </h2>

            <p className="text-muted">
              Find available blood donors.
            </p>

          </div>

          {isAdmin && (
            <Link
              to="/add-donor"
              className="btn btn-danger btn-lg"
            >
              ➕ Add Donor
            </Link>
          )}

        </div>

        {/* MESSAGE */}

        {message && (
          <div className="status-box">
            {message}
          </div>
        )}

        {/* =========================
            FILTER CARD
        ========================= */}

        <div className="search-card">

          <h3>
            🔎 Search & Filter Donors
          </h3>

          <div className="filter-grid">

            {/* SEARCH */}

            <input
              type="text"
              className="filter-input"
              placeholder="Search by name, city or phone..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(0);
              }}
            />

            {/* BLOOD GROUP */}

            <select
              className="filter-select"
              value={bloodGroup}
              onChange={(e) => {
                setBloodGroup(e.target.value);
                setCurrentPage(0);
              }}
            >

              <option value="">
                All Blood Groups
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

            {/* AVAILABILITY */}

            <select
              className="filter-select"
              value={availability}
              onChange={(e) => {
                setAvailability(e.target.value);
                setCurrentPage(0);
              }}
            >

              <option value="all">
                All Availability
              </option>

              <option value="available">
                🟢 Available
              </option>

              <option value="unavailable">
                🔴 Not Available
              </option>

            </select>

            {/* SORT */}

            <select
              className="filter-select"
              value={sortField}
              onChange={(e) => {
                setSortField(e.target.value);
                setCurrentPage(0);
              }}
            >

              <option value="none">
                Sort Donors
              </option>

              <option value="fullName">
                Name
              </option>

              <option value="age">
                Age
              </option>

              <option value="city">
                City
              </option>

              <option value="bloodGroup">
                Blood Group
              </option>

            </select>

          </div>

          <div className="filter-buttons">

            <button
              className="filter-btn"
              onClick={() => {
                setMessage("");
                setCurrentPage(0);
              }}
            >
              🔍 Search
            </button>

            <button
              className="sort-direction-btn"
              onClick={() => {
                setSortDirection((prev) =>
                  prev === "asc"
                    ? "desc"
                    : "asc"
                );

                setCurrentPage(0);
              }}
            >
              {sortDirection === "asc"
                ? "⬆️ Ascending"
                : "⬇️ Descending"}
            </button>

            <button
              className="reset-btn"
              onClick={resetFilters}
            >
              🔄 Reset Filters
            </button>

          </div>

        </div>

        {/* =========================
            RESULT COUNT
        ========================= */}

        {!loading && (
          <div className="result-count">

            <span>
              Showing{" "}
              <strong>
                {paginatedDonors.length}
              </strong>{" "}
              donor
              {paginatedDonors.length !== 1
                ? "s"
                : ""}
            </span>

            <span className="text-muted">
              Total donors: {donors.length}
            </span>

          </div>
        )}

        {/* =========================
            LOADING
        ========================= */}

        {loading ? (

          <div className="text-center py-5">

            <div className="spinner-border text-danger" />

            <p className="mt-3">
              Loading donors...
            </p>

          </div>

        ) : filteredDonors.length === 0 ? (

          <div className="no-result">

            <div className="no-result-icon">
              🩸
            </div>

            <h3 className="fw-bold">
              No Donors Found
            </h3>

            <p className="text-muted">
              Try changing your search or filter.
            </p>

            <button
              className="reset-btn"
              onClick={resetFilters}
            >
              🔄 Clear Filters
            </button>

          </div>

        ) : (

          <>
            {/* =========================
                DONOR CARDS
            ========================= */}

            <div className="donor-grid">

              {paginatedDonors.map((donor) => (

                <div
                  className="donor-card"
                  key={donor.id}
                >

                  <div className="donor-card-top">

                    <div>

                      <h3 className="donor-name">
                        {donor.fullName}
                      </h3>

                      <p className="donor-city">
                        📍 {donor.city}
                      </p>

                    </div>

                    <span className="blood-badge">
                      {donor.bloodGroup}
                    </span>

                  </div>

                  <hr className="donor-line" />

                  <p className="donor-info">
                    <strong>Age:</strong>{" "}
                    {donor.age}
                  </p>

                  <p className="donor-info">
                    <strong>Gender:</strong>{" "}
                    {donor.gender}
                  </p>

                  <p className="donor-info">
                    <strong>Phone:</strong>{" "}
                    {donor.phone}
                  </p>

                  <p className="donor-info">
                    <strong>Email:</strong>{" "}
                    {donor.email}
                  </p>

                  <div
                    className={
                      donor.available
                        ? "availability-badge available-badge"
                        : "availability-badge unavailable-badge"
                    }
                  >
                    {donor.available
                      ? "🟢 AVAILABLE"
                      : "🔴 NOT AVAILABLE"}
                  </div>

                  {/* ACTIONS */}

                  <div className="actions">

                    <Link
                      to={`/donor/${donor.id}`}
                      className="details-action"
                    >
                      👤 Details
                    </Link>

                    {isAdmin && (
                      <>

                        <Link
                          to={`/edit-donor/${donor.id}`}
                          className="edit-action"
                        >
                          ✏️ Edit
                        </Link>

                        <button
                          onClick={() =>
                            deleteDonor(donor.id)
                          }
                          className="delete-action"
                        >
                          🗑️ Delete
                        </button>

                      </>
                    )}

                  </div>

                </div>

              ))}

            </div>

            {/* =========================
                PAGINATION
            ========================= */}

            {totalPages > 1 && (

              <div className="pagination-container">

                <button
                  className="pagination-btn"
                  disabled={currentPage === 0}
                  onClick={() =>
                    setCurrentPage(
                      (prev) => prev - 1
                    )
                  }
                >
                  ← Previous
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => (

                    <button
                      key={index}
                      className={`pagination-number ${
                        currentPage === index
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setCurrentPage(index)
                      }
                    >
                      {index + 1}
                    </button>

                  )
                )}

                <button
                  className="pagination-btn"
                  disabled={
                    currentPage ===
                    totalPages - 1
                  }
                  onClick={() =>
                    setCurrentPage(
                      (prev) => prev + 1
                    )
                  }
                >
                  Next →
                </button>

              </div>

            )}

          </>

        )}

      </div>

    </div>
  );
}

export default DonorList;