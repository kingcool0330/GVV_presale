import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DoughnutChart = () => {
  const data = {
    datasets: [
      {
        data: [45, 55], // 55% staked, 45% not staked
        backgroundColor: ["#FCD34D", "#1E40AF"], // Colors for the chart
        borderColor: ["#FCD34D", "#1E40AF"],
      },
    ],
    labels: ["staked", "unstaked"],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          title: (tooltipItem) => `${tooltipItem[0].raw}%`,
          label: function (tooltipItem) {
            return `${tooltipItem.label}`;
          },
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
