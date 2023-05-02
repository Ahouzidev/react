import React from "react";
import { Outlet, Link, Routes, Route } from "react-router-dom";
import "./style.css";
import ExcelUpload from "./ExcelUpload";
import logo from './ofppt.png';

const Home = () => {
  return (
    <div className="header">
      <form>
        <nav className="navbar">
          <img className="logo" src={logo} alt="Logo" />
        </nav>
        <div className="center">
          <h1>Comparer deux fichiers </h1>
          <h2>excel avec react.js</h2>
          <div className="buttons">
          <Link to="/FileUpload">
    <button>Comparer fichier</button>
  </Link>
          </div>
        </div>
      </form>
      <Outlet />
    </div>
  );
};

export default Home;
