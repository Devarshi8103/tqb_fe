import React, { useContext } from 'react';
import Card from '../Card'; 
import { ProductContext } from '../Contexts/ProductsContext';

export default function Pastries() {
  const products = useContext(ProductContext);
   
  const filteredPastries = products.filter(product => product.category === 'Pastries');

  return (
    <div className='cakes'>
      
      <div className='cake-list'>
        <Card data={filteredPastries} />
      </div>
    </div>
  );
}
