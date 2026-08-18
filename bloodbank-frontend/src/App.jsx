import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DonorList from "./pages/DonorList";
import AddDonor from "./pages/AddDonor";
import EditDonor from "./pages/EditDonor";
import DonorDetails from "./pages/DonorDetails";

import ProtectedRoute from "./components/ProtectedRoute";


// ===============================
// ADMIN PROTECTED ROUTE
// ===============================
function AdminRoute({ children }) {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Login nahi hai
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Login hai but ADMIN nahi hai
  if (role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}


function App() {

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* ================= HOME ================= */}
        <Route
          path="/"
          element={<Home />}
        />


        {/* ================= LOGIN ================= */}
        <Route
          path="/login"
          element={<Login />}
        />


        {/* ================= REGISTER ================= */}
        <Route
          path="/register"
          element={<Register />}
        />


        {/* ================= DASHBOARD ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        {/* ================= DONOR DETAILS ================= */}
        <Route
          path="/donor/:id"
          element={
            <ProtectedRoute>
              <DonorDetails />
            </ProtectedRoute>
          }
        />


        {/* ================= DONORS ================= */}
        <Route
          path="/donors"
          element={
            <ProtectedRoute>
              <DonorList />
            </ProtectedRoute>
          }
        />


        {/* ================= ADD DONOR ================= */}
        <Route
          path="/add-donor"
          element={
            <AdminRoute>
              <AddDonor />
            </AdminRoute>
          }
        />


        {/* ================= EDIT DONOR ================= */}
        <Route
          path="/edit-donor/:id"
          element={
            <AdminRoute>
              <EditDonor />
            </AdminRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
