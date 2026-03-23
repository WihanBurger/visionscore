import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function CustomNavbar() {
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

            <Nav.Link as={NavLink} to="/champions">
              Champions
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;