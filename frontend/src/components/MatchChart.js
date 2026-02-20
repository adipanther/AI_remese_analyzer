import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MatchChart = ({ results }) => {
  // Doughnut chart data for match percentage
  const doughnutData = {
    labels: ['Matched', 'Missing'],
    datasets: [
      {
        label: 'Skills Match',
        data: [results.matchPercentage, 100 - results.matchPercentage],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 99, 132, 0.8)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // Bar chart data for skills breakdown
  const barData = {
    labels: ['Required Matched', 'Required Missing', 'Optional Matched'],
    datasets: [
      {
        label: 'Skills Count',
        data: [
          results.matchedRequired,
          results.missingSkills.length,
          results.matchedOptional,
        ],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: false,
      },
    },
  };

  const barOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', padding: '20px 0' }}>
      {/* Doughnut Chart */}
      <div style={{ position: 'relative', height: '300px' }}>
        <h4 style={{ textAlign: 'center', color: '#666', marginBottom: '15px' }}>
          Overall Match
        </h4>
        <Doughnut data={doughnutData} options={chartOptions} />
      </div>

      {/* Bar Chart */}
      <div style={{ position: 'relative', height: '300px' }}>
        <h4 style={{ textAlign: 'center', color: '#666', marginBottom: '15px' }}>
          Skills Breakdown
        </h4>
        <Bar data={barData} options={barOptions} />
      </div>
    </div>
  );
};

export default MatchChart;
