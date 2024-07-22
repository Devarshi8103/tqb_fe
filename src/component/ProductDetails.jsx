import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';
import Loader from './Loader';
import { ProductContext } from './Contexts/ProductsContext';
import Creatable from 'react-select/creatable';
import { FaWhatsapp } from 'react-icons/fa';

export default function ProductDetails() {
  const { id } = useParams();
  const products = useContext(ProductContext);

  const [filterFlavour, setFilterFlavour] = useState([]);
  const [flavourOptions, setFlavourOptions] = useState([]);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [flavour, setFlavour] = useState('');
  const [weight, setWeight] = useState('');
  const [nameOnCake, setNameOnCake] = useState('');
  const [otherInfo, setOtherInfo] = useState('');
  const [shapeOfCake, setShapeOfCake] = useState('');
  
  
  const [isOrder , setIsOrder] = useState(false);

  const shapeOptions = [
    { value: 'Round', label: 'Round' },
    { value: 'Square', label: 'Square' },
    { value: 'Heart', label: 'Heart' },
    { value: '2 Tire', label: '2 Tire' },
    { value: '3 Tire', label: '3 Tire' }
  ];

  useEffect(() => {
    if (products && products.length > 0) {
      const uniqueFlavours = [...new Set(products.filter(item => item.flavour).map(item => item.flavour))];
      setFlavourOptions([...uniqueFlavours.map(flavour => ({ value: flavour, label: flavour }))]);
    }
  }, [products]);

  const productData = products.find(product => product._id === id);


  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `*Order Details*:

    - Name: ${name}
    - Mobile: ${mobile}

    - Flavour:  *${flavour}*
    - Weight:  *${weight} gm*
    - Name on Cake:  *${nameOnCake}*
    - Shape of Cake:  *${shapeOfCake}*

    - Other Information:  *${otherInfo}*`;
    console.log("message : " , message)

    const whatsappUrl = `https://wa.me/919601835603?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleFlavourChange = selectedOptions => {
    // Extracting values from selectedOptions array
    const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
    
    // Setting both filterFlavour and flavour to selectedValues
    setFilterFlavour(selectedValues);
    setFlavour(selectedValues);
  };

  const handleShapeChange = selectedOption => {
    setShapeOfCake(selectedOption ? selectedOption.value : '');
  };

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
            <tbody>
              <tr>
                <td>Price:</td>
                <td><b style={{ color: '#2fff00' }}>{productData.price} Rs</b></td>
              </tr>
              <tr>
                <td>Weight:</td>
                <td><b>{productData.weight * 1000} gm</b></td>
              </tr>
              <tr>
                <td>Flavour:</td>
                <td><b style={{ color: '#35d7ff' }}>{productData.flavour}</b></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    { productData.category==='Cakes' && <p className='isOrder' onClick={()=>{ setIsOrder(!isOrder) }} > {isOrder ?'Click here to Close ' : 'Click here to Order'}</p>
}
      {isOrder && <form className="product-order-form" onSubmit={handleSubmit}>
        <h2 className='order-header'>Order Information</h2>
        <div>
          <label>
            Enter Your Name:
            <input
              className="order-input"
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Mobile Number:
            <input
              className="order-input"
              type="text"
              value={mobile}
              required
              onChange={(e) => setMobile(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Flavour:
            <Creatable
              value={flavourOptions.find(option => option.value === filterFlavour)}
              onChange={handleFlavourChange}
              options={flavourOptions}
              isSearchable
              isMulti={true}
              required
              className="order-input"
            />
          </label>
        </div>
        <div>
          <label>
            Weight (in grams ):
            <input
              className="order-input"
              type="text"
              value={weight}
              required
              placeholder='in grams'
              onChange={(e) => setWeight(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Name on Cake:
            <input
              className="order-input"
              type="text"
              value={nameOnCake}
              required
              onChange={(e) => setNameOnCake(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Shape:
            <Creatable
              value={shapeOptions.find(option => option.value === shapeOfCake)}
              onChange={handleShapeChange}
              options={shapeOptions}
              isSearchable
              required
              className="order-input"
            />
          </label>
        </div>
        <div>
          <label>
            More Information about Cake:
            <textarea
            className='order-input'
              value={otherInfo}
              onChange={(e) => setOtherInfo(e.target.value)}
            />
          </label>
        </div>
        <button type="submit" className='share-icon'>Share On WhatsApp <FaWhatsapp   size={28}/></button>
      </form>}
    </div>
  );
}
