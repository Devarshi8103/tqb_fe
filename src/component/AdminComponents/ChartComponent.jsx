import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './ChartComponent.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartComponent = ({ title, data, labels }) => {
  const total = data.reduce((acc, value) => acc + value, 0);
  const percentageData = data.map(value => ((value / total) * 100).toFixed(2));

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: `${title} (Percentage)`,
        data: data,
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(201, 203, 207, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: 'Arial, sans-serif',
          },
          color: '#333',
        },
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 18,
          family: 'Arial, sans-serif',
        },
        color: '#333',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${value} Rs (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;
