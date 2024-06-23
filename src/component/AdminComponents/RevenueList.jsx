import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './RevenueList.css';
import ChartComponent from './ChartComponent';

const RevenueList = ({ title, revenueData }) => {
  const [sortOption, setSortOption] = useState('a-z');
  const [chartData, setChartData] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);

  const sortRevenueData = (data) => {
    const entries = Object.entries(data);
    if (sortOption === 'a-z') {
      entries.sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
    } else if (sortOption === 'price') {
      entries.sort(([, valueA], [, valueB]) => valueB - valueA);
    }
    return entries;
  };

  useEffect(() => {
    const sortedData = sortRevenueData(revenueData);
    const labels = sortedData.map(([key]) => key);
    const data = sortedData.map(([, value]) => value);
    setChartLabels(labels);
    setChartData(data);
  }, [revenueData, sortOption]);

  return (
    <div className='revenue-list'>
      <h3>{title} Wise Revenue</h3>
      {chartData.length > 0 && chartLabels.length > 0 && (
        <ChartComponent title={title} data={chartData} labels={chartLabels} />
      )}
      <div className='sort-options'>
        <label>
          Sort by:
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value='a-z'>A-Z</option>
            <option value='price'>Revenue</option>
          </select>
        </label>
      </div>
      <ul>
        {Object.entries(revenueData).length > 0 ? (
          sortRevenueData(revenueData).map(([key, value]) => (
            <li key={key} className='revenue-item'>
              <span className='revenue-key'>{key}:</span>
              <span className='revenue-value'>{value} Rs</span>
            </li>
          ))
        ) : (
          <li className='revenue-item'>
            <span className='revenue-key'>No Data</span>
          </li>
        )}
      </ul>
    
    </div>
  );
};

RevenueList.propTypes = {
  title: PropTypes.string.isRequired,
  revenueData: PropTypes.object.isRequired,
};

export default RevenueList;
