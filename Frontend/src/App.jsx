import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ChiefWardenRegister from "./pages/ChiefWardenRegister";
import MessMenu from "./pages/MessMenu";
import AddAccountant from "./pages/AddAccountant";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password/:token' element={<ResetPassword />} />
          <Route path='/chief-warden-register' element={<ChiefWardenRegister />} />
          <Route path="/mess-menu" element={<MessMenu />} />
          <Route path="/add-accountant" element={<AddAccountant />} />
          <Route path='*' element={<Dashboard />} />
        </Routes>
        <ToastContainer/>
      </div>
    </BrowserRouter>
  )
}