import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Card'; 



export default function IceCream() {
  const [iceCreamData, setIceCreamData] = useState([]);
   
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3001/products');
        setIceCreamData(res.data);
      } catch (error) {
        console.log("error");
      }
    };
    fetchProducts();
  }, []);

  const filteredIceCreams = iceCreamData.filter(iceCream => iceCream.category === 'Ice-Creams');

  return (
    <div className='cakes'>
      
      <div className='cake-list'>
        <Card data={filteredIceCreams} />
      </div>
    </div>
  );
}
