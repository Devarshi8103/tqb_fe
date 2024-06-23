import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Card'; 



export default function Biscuits() {

  const [biscuitData, setBiscuitData] = useState([]);
   
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3001/products');
        setBiscuitData(res.data);
      } catch (error) {
        console.log("error");
      }
    };
    fetchProducts();
  }, []);

  const filteredBiscuits = biscuitData.filter(biscuit => biscuit.category === 'Biscuits');

  return (
    <div className='cakes'>
      
      <div className='cake-list'>
        <Card data={filteredBiscuits} />
      </div>
    </div>
  );

  
}
