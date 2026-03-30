import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section brand-section">
          <h3 className="footer-brand">VISIONSCORE</h3>
          <p className="footer-tagline">Stop guessing. Start winning.</p>
        </div>

        <div className="footer-section links-section">
          <h4>Navigation</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/champions/Aatrox">Champions</Link>
            </li>
            <li>
              <Link to="/compare/Aatrox">Compare</Link>
            </li>
            <li>
              <Link to="/timeline">Timeline</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section legal-section">
          <h4>Legal</h4>
          <ul>
            <li>
              <a href="#privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="#terms">Terms of Service</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} VisionScore. VisionScore isn't
          endorsed by Riot Games and doesn't reflect the views or opinions of
          Riot Games or anyone officially involved in producing or managing
          League of Legends.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
