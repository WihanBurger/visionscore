import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function CustomNavbar() {
  const [lastChamp, setLastChamp] = useState(
    localStorage.getItem("lastViewedChamp") || "Aatrox",
  );
  const [lastCompare, setLastCompare] = useState(
    localStorage.getItem("lastViewedCompare") || "Aatrox",
  );

  useEffect(() => {
    const updateRecentLinks = () => {
      setLastChamp(localStorage.getItem("lastViewedChamp") || "Aatrox");
      setLastCompare(localStorage.getItem("lastViewedCompare") || "Aatrox");
    };
    window.addEventListener("recentUpdate", updateRecentLinks);
    return () => {
      window.removeEventListener("recentUpdate", updateRecentLinks);
    };
  }, []);

  return (
    <Navbar expand="lg" className="custom-navbar" fixed="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="nav-brand">
          VisionScore
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto nav-links">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} to={`/champions/${lastChamp}`}>
              Champion
            </Nav.Link>

            <Nav.Link as={NavLink} to={`/compare/${lastCompare}`}>
              Compare
            </Nav.Link>

            <Nav.Link as={NavLink} to="/timeline">
            Timeline
            </Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
