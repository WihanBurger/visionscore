import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ chartData }) {
  if (!chartData || !chartData.datasets) return null;

  return (
    <Pie 
      data={chartData} 
      options={{ 
        maintainAspectRatio: false, 
        plugins: { legend: { display: false } } 
      }} 
    />
  );
}

export default PieChart;