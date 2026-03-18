import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function FeaturedCarousel() {
  const [champions, setChampions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const res = await fetch(
          "https://ddragon.leagueoflegends.com/cdn/14.4.1/data/en_US/champion.json" 
        );
        const data = await res.json();

        const champArray = Object.values(data.data).map((champ) => ({
          id: champ.id,
          name: champ.name,
          splash: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`
        }));

        const shuffled = champArray.sort(() => 0.5 - Math.random()); //shuffles the champs

        const randomTen = shuffled.slice(0, 10); //TOOK WAY TO LONG TO FIGURE THIS OUT T-T

        setChampions(randomTen);

      } catch (error) {
        console.error("Error fetching champions:", error);
      }
    };

    fetchChampions();
  }, []);

  return (
    <div className="champion-row">
      {champions.map((champ) => (
        <div
          key={champ.id}
          className="champion-card-wrapper"
          onClick={() => navigate(`/champion/${champ.id}`)}
        >
          <div className="champion-card">
            <img src={champ.splash} alt={champ.name} />
            <div className="champion-name">{champ.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeaturedCarousel;