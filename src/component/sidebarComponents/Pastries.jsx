import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Card'; 

export default function Pastries() {
  const [pastryData, setPastryData] = useState([]);
   
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3001/products');
        setPastryData(res.data);
      } catch (error) {
        console.log("error");
      }
    };
    fetchProducts();
  }, []);

  const filteredPastries = pastryData.filter(pastry => pastry.category === 'Pastries');

  return (
    <div className='cakes'>
      
      <div className='cake-list'>
        <Card data={filteredPastries} />
      </div>
    </div>
  );
}
