import React, { useContext} from 'react';
import Card from '../Card'; 
import { ProductContext } from '../Contexts/ProductsContext';



export default function IceCream() {
  const products = useContext(ProductContext);


  const filteredIceCreams = products.filter(product => product.category === 'Ice-Creams');

  return (
    <div className='cakes'>
      
      <div className='cake-list'>
        <Card data={filteredIceCreams} />
      </div>
    </div>
  );
}
