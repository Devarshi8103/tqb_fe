import React, {  useContext } from 'react';

import Card from '../Card';


import { useLocation } from 'react-router-dom';

import{ ProductContext} from '../Contexts/ProductsContext';


export default function Cakes() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedType = queryParams.get('type');
  const selectedFlavour = queryParams.get('flavour');

  const products = useContext(ProductContext);

  const filteredCakes = products?.filter(product => product.category === 'Cakes') || [];

  return (
    <div className=''>
      <div className=''>
        <Card data={filteredCakes } selectedType={ selectedType} selectedFlavour={selectedFlavour} />
      </div>
    </div>
  );
}
