import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../Card';
import './Cakes.css';
import { useLocation } from 'react-router-dom';

export default function Cakes() {
  const [cakesData, setCakesData] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedType = queryParams.get('type');
  const selectedFlavour = queryParams.get('flavour');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3001/products');
        setCakesData(res.data);
      } catch (error) {
        console.log("error");
      }
    };
    fetchProducts();
  }, []);

  const filteredCakes = cakesData.filter(cake => cake.category === 'Cakes');

  return (
    <div className='cakes-page'>
      <div className='cakes-list'>
        <Card data={filteredCakes } selectedType={ selectedType} selectedFlavour={selectedFlavour} />
      </div>
    </div>
  );
}
