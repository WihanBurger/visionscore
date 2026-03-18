import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function ChampionPage() {
  const { champId } = useParams();
  const [champData, setChampData] = useState(null);

  useEffect(() => {
    const fetchChampion = async () => {
      try {
        const response = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/14.4.1/data/en_US/champion/${champId}.json`
        );
        const data = await response.json();
        setChampData(data.data[champId]);
      } catch (error) {
        console.error("Error fetching champion:", error);
      }
    };

    fetchChampion();
  }, [champId]);

  if (!champData) return <p>Loading champion...</p>;

  return (
    <div
      style={{
        textAlign: "center",
        padding: "40px",
        background: "linear-gradient(#060905, #1A3D43)",
        minHeight: "100vh",
        color: "#B8C1CC",
      }}
    >
      <h1
        style={{
          fontFamily: "beaufort-pro, serif",
          fontSize: "4rem",
          background: "radial-gradient(#D4BB73, #BA904B)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {champData.name}
      </h1>
      <h3 style={{ fontFamily: "beaufort-pro, serif", opacity: 0.9 }}>
        {champData.title}
      </h3>
      <img
        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champId}_0.jpg`}
        alt={champData.name}
        style={{
          maxWidth: "600px",
          borderRadius: "20px",
          marginTop: "20px",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)",
        }}
      />
      <div style={{ marginTop: "30px", fontSize: "1.1rem" }}>
        <h2>Base Stats</h2>
        <p>HP: {champData.stats.hp}</p>
        <p>Attack: {champData.stats.attackdamage}</p>
        <p>Armor: {champData.stats.armor}</p>
        <p>Magic Resist: {champData.stats.spellblock}</p>
        <p>Movement Speed: {champData.stats.movespeed}</p>
      </div>
    </div>
  );
}

export default ChampionPage;