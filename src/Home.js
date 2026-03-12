import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from "./components/SearchBar";
import FeaturedCarousel from "./components/FeaturedCarousel";

import "./App.css";

function Home() {
  return (
    <div>
      <div className="hero">
        <div className="text-container">
          <h1 className="title">VISIONSCORE</h1>
          <p className="subtext">“Because reading abilities mid-fight is a bad strategy.”</p>
        </div>
      </div>

      <div className="search-container">
        <SearchBar />
      </div>
      <div><h2 className="sub-title">Featured</h2></div>
      <div className="featured-section">
    <FeaturedCarousel />
  </div>
    </div>
  );
}

export default Home;