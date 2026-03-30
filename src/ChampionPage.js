import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import SearchBar from "./components/SearchBar";

import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import RadarChart from "./components/RadarChart";

import "./App.css";

function ChampionPage() {
  const { champId } = useParams();
  const navigate = useNavigate();
  const [champData, setChampData] = useState(null);
  const [version, setVersion] = useState("14.4.1"); // fallback just in case the api dies
  const [activeTab, setActiveTab] = useState("stats");
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    localStorage.setItem("lastViewedChamp", champId);
    window.dispatchEvent(new Event("recentUpdate"));

    const fetchData = async () => {
      try {
        const versionRes = await fetch(
          "https://ddragon.leagueoflegends.com/api/versions.json",
        );
        const versions = await versionRes.json();
        const latestVersion = versions[0];
        setVersion(latestVersion);

        const champRes = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion/${champId}.json`,
        );
        const data = await champRes.json();
        setChampData(data.data[champId]);
      } catch (error) {
        console.error("Error fetching champion data:", error); // hopefully never gets seen
      }
    };
    fetchData();
  }, [champId]);

  const { barData, pieData, radarData } = useMemo(() => {
    if (!champData) return {};
    const stats = champData.stats;

    return {
      barData: {
        labels: ["HP", "Armor", "Attack Damage", "Magic Resist", "Move Speed"],
        datasets: [
          {
            label: champData.name,
            data: [
              stats.hp,
              stats.armor,
              stats.attackdamage,
              stats.spellblock,
              stats.movespeed,
            ],
            backgroundColor: [
              "#D4BB73",
              "#BA904B",
              "#047B97",
              "#9d773a",
              "#012831",
            ],
          },
        ],
      },
      pieData: {
        labels: [
          "Offense (Base AD)",
          "Defense (HP+Resists)",
          "Utility (Speed+Mana)",
        ],
        datasets: [
          {
            data: [
              stats.attackdamage,
              stats.hp + stats.armor + stats.spellblock,
              stats.movespeed + (stats.mp || 0),
            ],
            backgroundColor: ["#D4BB73", "#BA904B", "#047B97"],
          },
        ],
      },
      radarData: {
        labels: ["Damage", "Tankiness", "Mobility", "Sustain", "Resource"],
        datasets: [
          {
            label: champData.name,
            data: [
              Math.min((stats.attackdamage / 150) * 100, 100),
              Math.min(
                ((stats.hp + stats.armor * 10 + stats.spellblock * 10) / 4500) *
                  100,
                100,
              ),
              Math.min((stats.movespeed / 400) * 100, 100),
              Math.min((stats.hpregen / 15) * 100, 100),
              Math.min(((stats.mp || 0) / 500) * 100, 100),
            ],
            backgroundColor: "rgba(212,187,115,0.2)",
            borderColor: "#D4BB73",
            pointBackgroundColor: "#D4BB73",
          },
        ],
      },
    };
  }, [champData]);

  if (!champData) return <div className="loading">Summoning Champion...</div>;

  return (
    <div className="champion-page-container">
      <div className="search-wrapper">
        <SearchBar />
      </div>

      <div className="champion-page-flex">
        <div className="champion-left">
          <div
            className={`champion-splash ${imgLoaded ? "loaded" : "skeleton"}`}
          >
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champId}_0.jpg`}
              alt={champData.name}
              onLoad={() => setImgLoaded(true)}
            />
          </div>
        </div>

        <div className="champion-right">
          <div className="champion-header">
            <h1 className="champion-title">{champData.name}</h1>
            <h3 className="champion-subtitle">{champData.title}</h3>
          </div>

          <div className="tab-navigation">
            {["stats", "abilities", "lore"].map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="tab-content glass-panel">
            {activeTab === "stats" && (
              <div className="charts-grid">
                <div className="chart-card">
                  <h3>Power Metrics</h3>
                  <div className="chart-wrapper">
                    <BarChart chartData={barData} />
                  </div>
                </div>
                <div className="chart-card">
                  <h3>Gameplay Profile</h3>
                  <div className="chart-wrapper">
                    <RadarChart chartData={radarData} />
                  </div>
                </div>
                <div className="chart-card full-width">
                  <h3>Role Contribution</h3>
                  <div className="chart-wrapper">
                    <PieChart chartData={pieData} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "abilities" && (
              <div className="abilities-list">
                <div className="ability-item">
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${champData.passive.image.full}`}
                    alt="Passive"
                    className="ability-icon"
                  />
                  <div className="ability-text">
                    <h4>
                      {champData.passive.name} <span>(Passive)</span>
                    </h4>

                    <p
                      dangerouslySetInnerHTML={{
                        __html: champData.passive.description,
                      }}
                    />
                  </div>
                </div>

                {champData.spells.map((spell, idx) => {
                  const hotkeys = ["Q", "W", "E", "R"];
                  return (
                    <div key={idx} className="ability-item">
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.image.full}`}
                        alt={spell.name}
                        className="ability-icon"
                      />
                      <div className="ability-text">
                        <h4>
                          {spell.name} <span>({hotkeys[idx]})</span>
                        </h4>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: spell.description,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === "lore" && (
              <div className="lore-text">
                <p>{champData.lore}</p>
              </div>
            )}
          </div>

          <button
            className="compare-btn"
            onClick={() => navigate(`/compare/${champId}`)}
          >
            Compare Champion
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChampionPage;
