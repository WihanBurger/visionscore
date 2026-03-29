import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS, RadialLinearScale, PointElement, LineElement,
  Filler, Tooltip, Legend
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function RadarChart({ chartData }) {
  if (!chartData || !chartData.datasets) return null;

  return (
    <Radar 
      data={chartData} 
      options={{ 
        maintainAspectRatio: false, 
        scales: { 
          r: { 
            angleLines: { color: 'rgba(255,255,255,0.1)' }, 
            grid: { color: 'rgba(255,255,255,0.1)' }, 
            ticks: { display: false } 
          } 
        }, 
        plugins: { 
          legend: { labels: { color: '#e2e8f0' } } 
        } 
      }} 
    />
  );
}

export default RadarChart;