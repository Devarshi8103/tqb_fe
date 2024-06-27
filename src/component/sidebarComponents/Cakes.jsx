import React, {  useContext } from 'react';

import Card from '../Card';
import './Cakes.css';

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
    <div className='cakes-page'>
      <div className='cakes-list'>
        <Card data={filteredCakes } selectedType={ selectedType} selectedFlavour={selectedFlavour} />
      </div>
    </div>
  );
}
