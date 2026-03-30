import { useState, useEffect, useMemo } from "react";
import "./CustomClassChart.css";

function CustomClassChart() {
  const [championData, setChampionData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllChampions = async () => {
      try {
        const versionRes = await fetch(
          "https://ddragon.leagueoflegends.com/api/versions.json",
        );
        const versions = await versionRes.json();
        const latestVersion = versions[0];

        const res = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/champion.json`,
        );
        const data = await res.json();

        setChampionData(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data for custom chart:", error);
        setLoading(false);
      }
    };
    fetchAllChampions();
  }, []);

  const classCounts = useMemo(() => {
    if (!championData) return [];

    const counts = {};
    Object.values(championData).forEach((champ) => {
      champ.tags.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });

    return Object.entries(counts)
      .map(([className, count]) => ({ className, count }))
      .sort((a, b) => b.count - a.count);
  }, [championData]);

  if (loading)
    return <div className="custom-chart-loading">Loading Roster Data...</div>;

  const maxCount = Math.max(...classCounts.map((c) => c.count));

  return (
    <div className="custom-chart-container glass-panel">
      <div className="custom-chart-header">
        <h3 className="gold-text">Global Roster Distribution</h3>
        <p className="chart-description">
          A custom-built, real-time overview of the League of Legends dataset.
          This visualization calculates the total volume of champions assigned
          to each primary and secondary combat role directly from the Data
          Dragon API.
        </p>
      </div>

      <div className="custom-bars-wrapper">
        {classCounts.map((item, index) => {
          const barWidth = `${(item.count / maxCount) * 100}%`;

          return (
            <div className="custom-bar-row" key={item.className}>
              <div className="custom-bar-label">{item.className}</div>

              <div className="custom-bar-track">
                <div
                  className="custom-bar-fill"
                  style={{
                    width: barWidth,
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <span className="custom-bar-value">{item.count}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CustomClassChart;
