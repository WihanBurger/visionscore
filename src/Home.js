import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBar from "./components/SearchBar";
import FeaturedCarousel from "./components/FeaturedCarousel";
import CustomClassChart from "./components/CustomClassChart";
import Footer from "./components/Footer";

import "./App.css";

function Home() {
  return (
    <div>
      <div className="hero">
        <div className="text-container">
          <h1 className="title">VISIONSCORE</h1>
          <p className="subtext">
            “Because reading abilities mid-fight is a bad strategy.”
          </p>
        </div>
      </div>

      <div
        className="search-container"
        style={{ marginTop: "100px", marginBottom: "60px" }}
      >
        <SearchBar />
      </div>

      <div>
        <h2 className="sub-title">Featured</h2>
      </div>
      <div className="featured-section" style={{ marginBottom: "80px" }}>
        <FeaturedCarousel />
      </div>

      <div>
        <h2 className="sub-title">Dataset Overview</h2>
      </div>
      <CustomClassChart />

      <Footer />
    </div>
  );
}

export default Home;
