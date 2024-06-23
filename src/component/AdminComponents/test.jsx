import React, { useState } from 'react';

export default function AddToBill() {
  const [customerData, setCustomerData] = useState({
    customerName: '',
    mobileNumber: '',
  });
  const [productData, setProductData] = useState({
    productName: '',
    price: '',
    weight: '',
  });
  const [addProducts, setAddProducts] = useState([]);

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

  const handleAdd = (e) => {
    e.preventDefault();
    setAddProducts([...addProducts, productData]);
    setProductData({
      productName: '',
      price: '',
      weight: '',
    });
  };

  return (
    <>
      <div>AddToBill</div>

      <div className='input-form'>
        <form action='' className='bill-form'>
          <div className='customer-details'>
            <table>
              <tbody>
                <tr>
                  <td>Customer Name:</td>
                  <td>
                    <input
                      type='text'
                      id='customerName'
                      name='customerName'
                      placeholder='Customer Name'
                      value={customerData.customerName}
                      onChange={handleCustomerInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Mobile Number:</td>
                  <td>
                    <input
                      type='text'
                      id='mobileNumber'
                      name='mobileNumber'
                      placeholder='Mobile Number'
                      value={customerData.mobileNumber}
                      onChange={handleCustomerInputChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className='product-details'>
            <table>
              <tbody>
                <tr>
                  <td>Product Name:</td>
                  <td>
                    <input
                      type='text'
                      id='productName'
                      name='productName'
                      placeholder='Product Name'
                      value={productData.productName}
                      onChange={handleProductInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Price:</td>
                  <td>
                    <input
                      type='text'
                      id='price'
                      name='price'
                      placeholder='Price'
                      value={productData.price}
                      onChange={handleProductInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Weight:</td>
                  <td>
                    <input
                      type='text'
                      id='weight'
                      name='weight'
                      placeholder='Weight'
                      value={productData.weight}
                      onChange={handleProductInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan='2'>
                    <button onClick={handleAdd}>Add</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
      <div className='bill-pdf'>
        <h3>Added Products:</h3>
        <ul>
          {addProducts.map((product, index) => (
            <li key={index}>
              {product.productName} - ${product.price} - {product.weight}kg
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
