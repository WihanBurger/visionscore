import { useState, useEffect, useMemo } from "react";
import { Line } from "react-chartjs-2";
import ChampionSearch from "./components/ChampionSearch";
import { calculateStatAtLevel, championReleaseDates } from "./Utils/championData";
import "./TimelinePage.css";

function TimelinePage() {
  const [champId, setChampId] = useState(localStorage.getItem("lastViewedChamp") || "Aatrox");
  const [champData, setChampData] = useState(null);
  const [version, setVersion] = useState("14.4.1");
  const [selectedProperty, setSelectedProperty] = useState("hp");
  const [allChampsList, setAllChampsList] = useState([]);

  useEffect(() => {
    const fetchInitial = async () => {
      const versionRes = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
      const versions = await versionRes.json();
      setVersion(versions[0]);

      const listRes = await fetch(`https://ddragon.leagueoflegends.com/cdn/${versions[0]}/data/en_US/champion.json`);
      const listData = await listRes.json();
      setAllChampsList(Object.values(listData.data).sort((a, b) => a.name.localeCompare(b.name)));
    };
    fetchInitial();
  }, []);

  useEffect(() => {
    if (!version) return;
    const fetchChampionData = async () => {
      const champRes = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${champId}.json`);
      const data = await champRes.json();
      setChampData(data.data[champId]);
    };
    fetchChampionData();
  }, [champId, version]);

  const handleChampSelection = (newChampId) => {
    setChampId(newChampId);
    localStorage.setItem("lastViewedChamp", newChampId);
    window.dispatchEvent(new Event("recentUpdate"));
  };

  const lineData = useMemo(() => {
    if (!champData) return {};
    const levels = Array.from({ length: 18 }, (_, i) => i + 1);
    const dataPoints = levels.map(lvl => 
      calculateStatAtLevel(champData.stats[selectedProperty], champData.stats[`${selectedProperty}perlevel`], lvl)
    );

    const propertyLabels = { hp: "Health", mp: "Mana", attackdamage: "Attack Damage", armor: "Armor", spellblock: "Magic Resist", hpregen: "Health Regen" };

    return {
      labels: levels,
      datasets: [{
        label: `${champData.name}'s ${propertyLabels[selectedProperty]} Scaling`,
        data: dataPoints,
        borderColor: "#D4BB73",
        backgroundColor: "rgba(212, 187, 115, 0.2)",
        tension: 0.3,
        fill: true,
      }]
    };
  }, [champData, selectedProperty]);

  if (!champData) return <div className="loading">Loading Timeline...</div>;

  return (
    <div className="timeline-page-container">
      <div className="timeline-header">
        <h1 className="timeline-title">Power Timeline</h1>
        <p className="timeline-subtext">Track champion scaling from Level 1 to 18</p>
      </div>

      <div className="timeline-content">
        <div className="timeline-sidebar">
          <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champData.id}_0.jpg`} alt={champData.name} className="timeline-portrait" />
          <h2 className="timeline-champ-name">{champData.name}</h2>
          
          <div className="release-badge">
            Released: {championReleaseDates[champData.id] || "Unknown"}
          </div>

          <ChampionSearch 
            allChampsList={allChampsList} 
            version={version} 
            onSelect={handleChampSelection} 
          />
        </div>

        <div className="timeline-chart-wrapper glass-panel">
          <div className="chart-header-controls">
            <label htmlFor="property-select" className="control-label">Track Property:</label>
            <select id="property-select" className="property-dropdown inline-dropdown" value={selectedProperty} onChange={(e) => setSelectedProperty(e.target.value)}>
              <option value="hp">Health</option>
              <option value="mp">Mana / Resource</option>
              <option value="attackdamage">Attack Damage</option>
              <option value="armor">Armor</option>
              <option value="spellblock">Magic Resist</option>
              <option value="hpregen">Health Regen</option>
            </select>
          </div>

          <div className="chart-canvas-container">
            <Line data={lineData} options={{ maintainAspectRatio: false }} /> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelinePage;
