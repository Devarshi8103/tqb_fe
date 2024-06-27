import React, {useContext } from 'react';
import Card from '../Card'; 
import{ ProductContext} from '../Contexts/ProductsContext';


export default function Biscuits() {

  const products = useContext(ProductContext);


  const filteredBiscuits = products.filter(product => product.category === 'Biscuits');

  return (
    <div className='cakes'>
      
      <div className='cake-list'>
        <Card data={filteredBiscuits} />
      </div>
    </div>
  );

  
}
