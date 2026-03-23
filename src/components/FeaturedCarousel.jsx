import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Carousel.css";

function FeaturedCarousel() {
  const [champions, setChampions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [version, setVersion] = useState("14.4.1");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChamps = async () => {
      try {
        const versionRes = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
        const versions = await versionRes.json();
        const latestVersion = versions[0];
        setVersion(latestVersion);

        const res = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`
        );
        const data = await res.json();

        const champArray = Object.values(data.data);
        const randomChamps = champArray
          .sort(() => 0.5 - Math.random())
          .slice(0, 10);

        setChampions(randomChamps);
      } catch (err) {
        console.error("Error fetching champions:", err);
      }
    };

    fetchChamps();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % champions.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + champions.length) % champions.length);
  };

  const handleCardClick = (position, champId) => {
    if (position === "active") {
      navigate(`/champions/${champId}`);
    } else if (position === "next") {
      nextSlide();
    } else if (position === "prev") {
      prevSlide();
    }
  };

  if (champions.length === 0) return <div className="carousel-loading">Loading Featured Champions...</div>;

  return (
    <div className="featured-carousel-container">
      <button className="carousel-nav-btn left" onClick={prevSlide}>
        &#10094;
      </button>

      <div className="carousel-track">
        {champions.map((champ, index) => {

          let position = "hidden";
          
          if (index === currentIndex) {
            position = "active";
          } else if (index === (currentIndex - 1 + champions.length) % champions.length) {
            position = "prev";
          } else if (index === (currentIndex + 1) % champions.length) {
            position = "next";
          }

          return (
            <div
              key={champ.id}
              className={`carousel-card ${position}`}
              onClick={() => handleCardClick(position, champ.id)}
            >
              <div className="card-image-wrapper">
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`}
                  alt={champ.name}
                />
                <div className="carousel-overlay">
                  <h2 className="carousel-champ-name">{champ.name}</h2>
                  <p className="carousel-champ-title">{champ.title}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="carousel-nav-btn right" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
}

export default FeaturedCarousel;