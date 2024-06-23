import React, { useState } from 'react';
import Creatable from 'react-select/creatable';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import './Expense.css';

export default function Expense() {
  const navigate = useNavigate();

  const categoryOptions = [
    { value: 'Cakes', label: 'Cake' },
    { value: 'Pastries', label: 'Pastry' },
    { value: 'Ice-Creams', label: 'Ice-Cream' },
    { value: 'Biscuits', label: 'Biscuit' },
  ];

  const weightOptions = [
    { value: 0.5, label: '500gm' },
    { value: 1, label: '1kg' },
    { value: 1.5, label: '1.5kg' },
    { value: 2, label: '2kg' },
    { value: 3, label: '3kg' },
    { value: 0.25, label: '250gm' },
    { value: 0, label: 'none' }
  ];

  const flavourOptions = [
    { value: 'Chocolate', label: 'Chocolate' },
    { value: 'Vanilla', label: 'Vanilla' },
    { value: 'Strawberry', label: 'Strawberry' },
    { value: 'Mango', label: 'Mango' },
  ];

  const [category, setCategory] = useState(categoryOptions[0]);
  const [weight, setWeight] = useState(weightOptions[0]);
  const [flavour, setFlavour] = useState(flavourOptions[0]);

  const [customerData, setCustomerData] = useState({
    customerName: '',
    mobileNumber: '',
  });

  const [productData, setProductData] = useState({
    productName: '',
    price: '',
    quantity: 1,
  });

  const handleCustomerInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const newProduct = {
      ...productData,
      category: category.value,
      weight: weight.value,
      flavour: flavour.value,
    };

    setProductData({
      productName: '',
      price: '',
      quantity: 1,
    });
    setCategory(categoryOptions[0]);
    setWeight(weightOptions[0]);
    setFlavour(flavourOptions[0]);

    await postCustomerAndProductsData(newProduct);
  };

  const postCustomerAndProductsData = async (newProduct) => {
    try {
      const data = {
        customerName: customerData.customerName,
        mobileNumber: customerData.mobileNumber,
        category: newProduct.category,
        productName: newProduct.productName,
        price: newProduct.price,
        weight: newProduct.weight,
        quantity: newProduct.quantity,
        flavour: newProduct.flavour,
      };

      const response = await axios.post('http://localhost:3001/expense/add-expense', data);
      console.log('Product data saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving product data:', error);
    }
  };
  const handleLeftArrow = () =>{
    navigate('/admin/home');
  }

  return (
    <div className='input-form'>
       <FaArrowLeft  className='left-arrow' onClick={()=>handleLeftArrow()}  size={20}/>
     
      <h2 className='add-expense'>Add Expense</h2>
      <form action='' className='bill-form'>
        <div className='customer-input'>
          <p>
            <b> Customer Info</b>
          </p>
          <table>
            <tbody>
              <tr>
                <td>Customer Name : </td>
                <td>
                  <input
                    type='text'
                    className='form-input-control'
                    id='customerName'
                    name='customerName'
                    placeholder='Customer Name'
                    value={customerData.customerName}
                    onChange={handleCustomerInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Mobile Number : </td>
                <td>
                  <input
                    type='text'
                    className='form-input-control'
                    id='MobileNumber'
                    name='mobileNumber'
                    placeholder='Mobile Number'
                    value={customerData.mobileNumber}
                    onChange={handleCustomerInputChange}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='product-input'>
          <p>
            <b> Product Info</b>
          </p>
          <table>
            <tbody>
              <tr>
                <td>Category : </td>
                <td>
                  <Creatable
                    className='ct'
                    value={category}
                    onChange={(value) => setCategory(value)}
                    options={categoryOptions}
                    isSearchable={true}
                  />
                </td>
              </tr>
              <tr>
                <td>Product Name : </td>
                <td>
                  <input
                    type='text'
                    className='form-input-control'
                    id='productName'
                    name='productName'
                    placeholder='Product Name'
                    value={productData.productName}
                    onChange={handleProductInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td> Price : </td>
                <td>
                  <input
                    type='number'
                    className='form-input-control'
                    id='price'
                    name='price'
                    placeholder='Price'
                    value={productData.price}
                    onChange={handleProductInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Weight : </td>
                <td>
                  <Creatable
                    className='ct'
                    value={weight}
                    onChange={(value) => setWeight(value)}
                    options={weightOptions}
                    isSearchable={true}
                  />
                </td>
              </tr>
              <tr>
                <td>Flavour : </td>
                <td>
                  <Creatable
                    className='ct'
                    value={flavour}
                    onChange={(value) => setFlavour(value)}
                    options={flavourOptions}
                    isSearchable={true}
                  />
                </td>
              </tr>
              <tr>
                <td>Quantity : </td>
                <td>
                  <input
                    type='number'
                    className='form-input-control'
                    id='quantity'
                    name='quantity'
                    placeholder='Quantity'
                    value={productData.quantity}
                    onChange={handleProductInputChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className='add-btn'>
            <button onClick={handleAdd}>Add</button>
          </div>
        </div>
      </form>
    </div>
  );
}
