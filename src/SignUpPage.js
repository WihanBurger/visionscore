import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import GridMotion from "./components/GridMotion"; 
import "./SignUpPage.css";

const allChampions = [
  "Aatrox", "Ahri", "Akali", "Ashe", "Azir", "Darius", "Ekko", "Ezreal", "Garen", "Irelia", 
  "Jinx", "Kaisa", "Katarina", "Kayn", "LeeSin", "Lucian", "Lux", "MissFortune", "Pyke", "Riven", 
  "Sett", "Sylas", "Thresh", "Vayne", "Yasuo", "Yone", "Zed", "Zoe", "Vi", "Caitlyn", "Jayce", 
  "Viktor", "Jhin", "Senna", "Aphelios", "Samira", "Nilah", "Zeri", "Smolder", "Aurora", 
  "Hwei", "Briar", "Naafiri", "Milio", "KSante", "Renata", "Belveth", "Vex", "Gwen", "Viego", 
  "Rell", "Seraphine", "Lillia", "Ornn", "Qiyana", "Neeko", "Yuumi", "Bard", "Volibear", "Urgot",
  "Talon", "Swain", "Sion", "Pantheon", "Nautilus", "Mordekaiser", "Leona", "KhaZix", "Kindred"
];

function SignUpPage() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: "",
    summonerName: "",
    region: "NA1",
    password: ""
  });

  const randomSplashes = useMemo(() => {
    const shuffled = [...allChampions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 40).map(champ => 
      `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ}_0.jpg`
    );
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing up user:", formData);
    navigate("/"); 
  };

  return (
    <div className="signup-page-wrapper">
      
      <div className="signup-grid-background">
        <GridMotion 
          items={randomSplashes} 
          gradientColor="#012831" 
        />
      </div>

      <div className="signup-form-container">
        <div className="glass-panel signup-card">
          
          <div className="signup-header">
            <h1 className="signup-title">JOIN THE VISION</h1>
            <p className="signup-subtext">Create an account to save your builds and comparisons.</p>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="input-group">
              <label>Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                className="champ-search-input" 
                placeholder="teemo@yordle.com" 
                required 
              />
            </div>

            <div className="input-row">
              <div className="input-group" style={{ flex: 2 }}>
                <label>Summoner Name</label>
                <input 
                  type="text" 
                  name="summonerName" 
                  value={formData.summonerName} 
                  onChange={handleChange} 
                  className="champ-search-input" 
                  placeholder="Faker#T1" 
                  required 
                />
              </div>

              <div className="input-group region-group" style={{ flex: 1 }}>
                <label>Region</label>
                <select 
                  name="region" 
                  value={formData.region} 
                  onChange={handleChange} 
                  className="property-dropdown region-select"
                >
                  <option value="NA1">NA</option>
                  <option value="EUW1">EUW</option>
                  <option value="EUN1">EUNE</option>
                  <option value="KR">KR</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                className="champ-search-input" 
                placeholder="••••••••" 
                required 
              />
            </div>

            <button type="submit" className="compare-btn signup-btn">
              Create Account
            </button>
          </form>

          <div className="signup-footer">
            <p>Already have an account? <Link to="/">Log In</Link></p>
          </div>

        </div>
      </div>
      
    </div>
  );
}

export default SignUpPage;