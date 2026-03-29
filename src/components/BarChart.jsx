import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function BarChart({ chartData }) {
  if (!chartData || !chartData.datasets) return null;

  return (
    <Bar 
      data={chartData} 
      options={{
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#e2e8f0' } } },
        scales: {
          y: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#8b99a6' } },
          x: { grid: { display: false }, ticks: { color: '#8b99a6' } }
        }
      }} 
    />
  );
}

export default BarChart;