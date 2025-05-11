//import { useState } from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import MovieDetail from "./Pages/MovieDetail";
import { ThemeProviderWrapper } from "./context/ThemeContext";

function App() {
  return (
    <>
      <ThemeProviderWrapper>
        <BrowserRouter>
          <ToastContainer position="top-center" autoClose={3000} />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/movie/:id" element={<MovieDetail />}></Route>
          </Routes>
        </BrowserRouter>
      </ThemeProviderWrapper>
    </>
  );
}

export default App;
