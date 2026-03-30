import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";

import ChampionSearch from "./components/ChampionSearch";
import RadarChart from "./components/RadarChart";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";

import "./ComparePage.css";

function ComparePage() {
  const { baseChampId } = useParams();
  const navigate = useNavigate();

  // Store current patch so images/data links don't break when the game updates
  const [version, setVersion] = useState("14.4.1");

  const [baseChamp, setBaseChamp] = useState(null);
  const [targetChamp, setTargetChamp] = useState(null);
  const [allChampsList, setAllChampsList] = useState([]);

  useEffect(() => {
    // Save to local storage for the recent history feature
    localStorage.setItem("lastViewedCompare", baseChampId);
    window.dispatchEvent(new Event("recentUpdate"));

    const fetchInitialData = async () => {
      try {
        // Get the latest patch
        const versionRes = await fetch(
          "https://ddragon.leagueoflegends.com/api/versions.json",
        );
        const versions = await versionRes.json();
        setVersion(versions[0]);

        // Fetch the main champion data
        const baseRes = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${versions[0]}/data/en_US/champion/${baseChampId}.json`,
        );
        const baseData = await baseRes.json();
        setBaseChamp(baseData.data[baseChampId]);

        // Get everyone for the search bar
        const listRes = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${versions[0]}/data/en_US/champion.json`,
        );
        const listData = await listRes.json();
        setAllChampsList(
          Object.values(listData.data).sort((a, b) =>
            a.name.localeCompare(b.name),
          ),
        );
      } catch (error) {
        console.error("Error fetching comparison data:", error);
      }
    };
    fetchInitialData();
  }, [baseChampId]);

  // Fetches second champ
  const handleTargetSelection = async (targetId) => {
    try {
      const targetRes = await fetch(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${targetId}.json`,
      );
      const targetData = await targetRes.json();
      setTargetChamp(targetData.data[targetId]);
    } catch (error) {
      console.error("Error fetching target champion:", error);
    }
  };

  // Reload the page URL if they change the main champion
  const handleBaseSelection = (newBaseId) => {
    navigate(`/compare/${newBaseId}`, { replace: true });
  };

  const radarData = useMemo(() => {
    if (!baseChamp) return {};
    const datasets = [
      {
        label: baseChamp.name,
        data: [
          Math.min((baseChamp.stats.attackdamage / 150) * 100, 100),
          Math.min(
            ((baseChamp.stats.hp +
              baseChamp.stats.armor * 10 +
              baseChamp.stats.spellblock * 10) /
              4500) *
              100,
            100,
          ),
          Math.min((baseChamp.stats.movespeed / 400) * 100, 100),
          Math.min((baseChamp.stats.hpregen / 15) * 100, 100),
          Math.min(((baseChamp.stats.mp || 0) / 500) * 100, 100),
        ],
        backgroundColor: "rgba(212, 187, 115, 0.4)",
        borderColor: "#D4BB73",
        pointBackgroundColor: "#D4BB73",
      },
    ];

    // Push the second dataset if an opponent is selected
    if (targetChamp) {
      datasets.push({
        label: targetChamp.name,
        data: [
          Math.min((targetChamp.stats.attackdamage / 150) * 100, 100),
          Math.min(
            ((targetChamp.stats.hp +
              targetChamp.stats.armor * 10 +
              targetChamp.stats.spellblock * 10) /
              4500) *
              100,
            100,
          ),
          Math.min((targetChamp.stats.movespeed / 400) * 100, 100),
          Math.min((targetChamp.stats.hpregen / 15) * 100, 100),
          Math.min(((targetChamp.stats.mp || 0) / 500) * 100, 100),
        ],
        backgroundColor: "rgba(220, 53, 69, 0.4)",
        borderColor: "#dc3545",
        pointBackgroundColor: "#dc3545",
      });
    }
    return {
      labels: ["Damage", "Tankiness", "Mobility", "Sustain", "Resource"],
      datasets,
    };
  }, [baseChamp, targetChamp]);

  const barData = useMemo(() => {
    if (!baseChamp) return {};
    const datasets = [
      {
        label: baseChamp.name,
        data: [
          baseChamp.stats.attackdamage,
          baseChamp.stats.armor,
          baseChamp.stats.spellblock,
          baseChamp.stats.movespeed,
        ],
        backgroundColor: "#D4BB73",
        borderRadius: 4,
      },
    ];
    if (targetChamp) {
      datasets.push({
        label: targetChamp.name,
        data: [
          targetChamp.stats.attackdamage,
          targetChamp.stats.armor,
          targetChamp.stats.spellblock,
          targetChamp.stats.movespeed,
        ],
        backgroundColor: "#dc3545",
        borderRadius: 4,
      });
    }
    return {
      labels: ["Attack Damage", "Armor", "Magic Resist", "Move Speed"],
      datasets,
    };
  }, [baseChamp, targetChamp]);

  const basePieData = useMemo(() => {
    if (!baseChamp) return {};
    const stats = baseChamp.stats;
    return {
      labels: ["Offense", "Defense", "Utility"],
      datasets: [
        {
          data: [
            stats.attackdamage,
            stats.hp + stats.armor + stats.spellblock,
            stats.movespeed + (stats.mp || 0),
          ],
          backgroundColor: ["#D4BB73", "#BA904B", "#047B97"],
          borderColor: "rgba(1, 40, 49, 0.9)",
          borderWidth: 2,
        },
      ],
    };
  }, [baseChamp]);

  const targetPieData = useMemo(() => {
    if (!targetChamp) return {};
    const stats = targetChamp.stats;
    return {
      labels: ["Offense", "Defense", "Utility"],
      datasets: [
        {
          data: [
            stats.attackdamage,
            stats.hp + stats.armor + stats.spellblock,
            stats.movespeed + (stats.mp || 0),
          ],
          backgroundColor: ["#dc3545", "#b02a37", "#6c1a22"],
          borderColor: "rgba(1, 40, 49, 0.9)",
          borderWidth: 2,
        },
      ],
    };
  }, [targetChamp]);

  if (!baseChamp) return <div className="loading">Preparing Arena...</div>;

  //so I don't have to copy paste the HTML 20 times for the base stats
  const renderStatRow = (label, statKey, isDecimal = false) => {
    let valA = baseChamp.stats[statKey] || 0;
    let valB = targetChamp ? targetChamp.stats[statKey] || 0 : "-";

    if (isDecimal) {
      valA = Number(valA).toFixed(3);
      if (targetChamp) valB = Number(valB).toFixed(3);
    } else {
      valA = Math.round(valA);
      if (targetChamp) valB = Math.round(valB);
    }

    // Auto highlight the higher stat in green
    let colorA = "#e2e8f0",
      colorB = "#e2e8f0";
    if (targetChamp) {
      if (Number(valA) > Number(valB)) colorA = "#4ade80";
      else if (Number(valB) > Number(valA)) colorB = "#4ade80";
    }

    return (
      <div className="stat-row" key={statKey}>
        <span
          style={{
            color: colorA,
            fontWeight: Number(valA) > Number(valB) ? "bold" : "normal",
          }}
        >
          {valA}
        </span>
        <span className="stat-label">{label}</span>
        <span
          style={{
            color: colorB,
            fontWeight: Number(valB) > Number(valA) ? "bold" : "normal",
          }}
        >
          {valB}
        </span>
      </div>
    );
  };

  const renderStringRow = (label, valA, valB) => (
    <div className="stat-row" key={label}>
      <span style={{ color: "#e2e8f0" }}>{valA}</span>
      <span className="stat-label">{label}</span>
      <span style={{ color: "#e2e8f0" }}>{valB || "-"}</span>
    </div>
  );

  return (
    <div className="compare-page-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        &#10094; Back
      </button>

      <div className="compare-grid">
        <div className="champ-column sticky-column">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${baseChamp.id}_0.jpg`}
            alt={baseChamp.name}
            className="compare-portrait base-portrait"
          />
          <h2 className="compare-name gold-text">{baseChamp.name}</h2>
          <div className="champ-badges">
            <span className="badge difficulty-badge">
              Diff: {baseChamp.info.difficulty}/10
            </span>
            {baseChamp.tags.map((tag) => (
              <span key={tag} className="badge role-badge">
                {tag}
              </span>
            ))}
          </div>
          <ChampionSearch
            allChampsList={allChampsList}
            version={version}
            onSelect={handleBaseSelection}
            placeholder="Change Champion..."
            inputClass="base-search-input"
            listClass="base-list"
          />
        </div>

        <div className="compare-center">
          <div className="compare-radar-wrapper glass-panel">
            <h3 className="chart-title">Gameplay Profile</h3>
            <RadarChart chartData={radarData} />
          </div>

          <div className="stat-comparison glass-panel">
            <h3 className="chart-title">Base Stats</h3>
            {renderStringRow(
              "Resource",
              baseChamp.partype,
              targetChamp?.partype,
            )}
            {renderStatRow("Attack Range", "attackrange")}
            {renderStatRow("Health", "hp")}
            {renderStatRow("Attack Damage", "attackdamage")}
            {renderStatRow("Attack Speed", "attackspeed", true)}
            {renderStatRow("Armor", "armor")}
            {renderStatRow("Magic Resist", "spellblock")}
            {renderStatRow("Move Speed", "movespeed")}
          </div>

          <div className="compare-pie-wrapper glass-panel">
            <h3 className="chart-title">Stat Distribution</h3>
            <div className="pie-charts-container">
              <div className="pie-chart-half">
                <h4 className="gold-text">{baseChamp.name}</h4>
                <div className="pie-canvas-wrapper">
                  <PieChart chartData={basePieData} />
                </div>
              </div>
              {targetChamp && (
                <div className="pie-chart-half">
                  <h4 className="crimson-text">{targetChamp.name}</h4>
                  <div className="pie-canvas-wrapper">
                    <PieChart chartData={targetPieData} />
                  </div>
                </div>
              )}
            </div>
            <div className="pie-shared-legend">
              <span>
                <span
                  className="legend-dot"
                  style={{ background: "#D4BB73" }}
                ></span>{" "}
                Offense
              </span>
              <span>
                <span
                  className="legend-dot"
                  style={{ background: "#BA904B" }}
                ></span>{" "}
                Defense
              </span>
              <span>
                <span
                  className="legend-dot"
                  style={{ background: "#047B97" }}
                ></span>{" "}
                Utility
              </span>
            </div>
          </div>

          <div className="compare-bar-wrapper glass-panel">
            <h3 className="chart-title">Combat Stats Breakdown</h3>
            <BarChart chartData={barData} />
          </div>
        </div>

        <div className="champ-column sticky-column">
          {targetChamp ? (
            <>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${targetChamp.id}_0.jpg`}
                alt={targetChamp.name}
                className="compare-portrait target-portrait"
              />
              <h2 className="compare-name crimson-text">{targetChamp.name}</h2>
              <div className="champ-badges">
                <span className="badge difficulty-badge target-diff">
                  Diff: {targetChamp.info.difficulty}/10
                </span>
                {targetChamp.tags.map((tag) => (
                  <span key={tag} className="badge role-badge target-role">
                    {tag}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <div className="compare-portrait empty-portrait">
              <span>?</span>
            </div>
          )}

          <ChampionSearch
            allChampsList={allChampsList}
            version={version}
            onSelect={handleTargetSelection}
            placeholder={
              targetChamp ? "Change Opponent..." : "Search Opponent..."
            }
            inputClass="target-search-input"
            listClass="target-list"
          />
        </div>
      </div>
    </div>
  );
}

export default ComparePage;
