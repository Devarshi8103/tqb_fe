import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';
import Loader from './Loader';

export default function ProductDetails() {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://tqb-be.onrender.com/product/${id}`);
        setProductData(res.data);
        console.log("products data:", res.data);
      } catch (error) {
        console.log("err", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!productData) {
    return <div><Loader /></div>;
  }

  return (
    <div className="one-product-details">
      <h1>
        {productData.category === 'Cakes' && 'CAKE' ||
         productData.category === 'Pastries' && 'PASTRY' ||
         productData.category === 'Biscuits' && 'BISCUIT' ||
         productData.category === 'Ice-Creams' && 'ICE-CREAM'}
      </h1>
      <div className="one-product-image">
        <img className="product-image" src={productData.image} alt={productData.productName} />
      </div>
      <div className="details-card">
        <p className='one-product-name'>{productData.productName}</p>
       <div className='table-details'>
         <table>
          
            <tr>
              <td  >Price:</td>
              <td><b style={{color: '#2fff00'}}>{productData.price} Rs</b></td>
            </tr>
            <tr>
              <td>Weight:</td>
              <td><b >{productData.weight * 1000} gm</b></td>
            </tr>
            <tr>
              <td>Flavour:</td>
              <td><b style={{color: '#ff1bd5'}}>{productData.flavour}</b></td>
            </tr>
        
        </table>
        </div>
      </div>
    </div>
  );
}
