import React, { useRef, useState } from 'react';
import '../AdminComponents/AddToBill.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import Creatable from 'react-select/creatable';
import { useNavigate } from 'react-router-dom';
import ViewAllBill from './ViewAllBill.jsx';
import { FaArrowLeft , FaSync } from 'react-icons/fa';

export default function AddToBill() {
  const navigate = useNavigate();
  const [viewBills, setViewBills] = useState(false);
const [reload , setReload] = useState(false);
  const categoryOptions = [
    { value: 'Cakes', label: 'Cakes' },
    { value: 'Pastries', label: 'Pastries' },
    { value: 'Ice-Creams', label: 'Ice-Creams' },
    { value: 'Biscuits', label: 'Biscuits' },
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

  const [total, setTotal] = useState(0);
  const [invoiceName, setInvoiceName] = useState('');
  const [addProducts, setAddProducts] = useState([]);
  const [invoiceId, setInvoiceId] = useState('');
  const [msg, setMsg] = useState('');

  const handleCustomerInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'customerName') {
      const cn = value + '_invoice.pdf';
      setInvoiceName(cn);
    }
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
    setAddProducts([...addProducts, newProduct]);

    const priceVal = parseInt(newProduct.price);
    const quantity = parseInt(newProduct.quantity);
    setTotal(total + priceVal * quantity);
    setProductData({
      productName: '',
      price: '',
      quantity: 1,
    });
    setCategory(categoryOptions[0]);
    setWeight(weightOptions[0]);
    setFlavour(flavourOptions[0]);

    // Post customer and products data
    await postCustomerAndProductsData(newProduct);
  };

  const handleReset = () => {
    setAddProducts([]);
    setTotal(0);
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

  const uploadPdf = async (pdfBlob) => {
    try {
      const formData = new FormData();
      formData.append('pdf', pdfBlob, invoiceName);
      formData.append('customerName', customerData.customerName);
      formData.append('mobileNumber', customerData.mobileNumber);

      const response = await axios.post('http://localhost:3001/invoice/upload-invoice', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('set id Upload success:', response.data);
      setInvoiceId(response.data.invoice._id);
    } catch (error) {
      console.error('Error uploading PDF:', error);
    }
  };

  const pdfRef = useRef();

  const downloadPdf = () => {
    const capture = pdfRef.current;

    html2canvas(capture, { scrollY: -window.scrollY }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      const cw = doc.internal.pageSize.getWidth();
      const ch = doc.internal.pageSize.getHeight();
      const ratio = Math.min(cw / canvas.width, ch / canvas.height);
      const scaledWidth = canvas.width * ratio;
      const scaledHeight = canvas.height * ratio;

      doc.addImage(imgData, 'PNG', 0, 0, scaledWidth, scaledHeight);
      const pdfBlob = doc.output('blob');

      doc.save(invoiceName);

      uploadPdf(pdfBlob);
    });
  };

  const shareBtn = () => {
    if (!invoiceId) {
      console.error('Invoice ID not set. Cannot share PDF.');
      return;
    }

    const url = `http://localhost:3000/invoiceViewer/${invoiceId}`;
    const message = `Hi ${customerData.customerName}, \n\nView your Bill here: ${url} \n\nThanks For Shopping From \n *The Queen Baker* \n#WeBakeHappiness`;

    const whatsappUrl = `https://wa.me/91${customerData.mobileNumber}?text=${encodeURIComponent(message)}`;

    setMsg(whatsappUrl);
    window.open(whatsappUrl, '_blank');
  };

  const handleLeftArrow = ()=>{
    navigate('/admin/home');
  }

  const handleReload=()=>{
    setReload(!reload);

  }
  return (
    <>
      <div className='view-bill-div'>
      <FaArrowLeft  className='left-arrow' onClick={()=>handleLeftArrow()}  size={20}/>
   
        
        <button className='view-bill-btn' onClick={() => setViewBills(!viewBills)}>
          {viewBills ? 'Make Bill' : 'View Bills'}
        </button>
        {viewBills &&
        <FaSync className='fa-sync' onClick={()=>handleReload()} size={20} />
}
      </div>
      {viewBills ? (
        <div>
          <ViewAllBill reload = {reload} />
        </div>
      ) : (
        <>
          <div className='input-form'>
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
          <div className='reset-btn'>
            <button onClick={handleReset}>Reset</button>
          </div>
          <div className='bill-pdf' ref={pdfRef}>
            <h2 className='h2-tag'>The Queen Baker</h2>
            <p className='address'>Shop No.3 Shiv Shakti Complex Bhatha Lali Faliya</p>
            <h2 className='h2-tag'>Invoice</h2>
            <hr />
            <div className='customer-name'>
              <b>Customer Name: </b> {customerData.customerName}
            </div>
            <div className='details'>
              <div className='mobile-no'>
                <p>
                  <b>Mobile Number: </b> {customerData.mobileNumber}
                </p>
              </div>
              <div className='dt'>
                <p>
                  <b>Date:</b> {new Date().toLocaleString()}
                </p>
              </div>
            </div>
            <div className='bill-product-details'>
              <table>
                <tbody>
                  <tr className='table-header'>
                    <th> Product Name </th>
                    <th>Flavour</th>
                    <th>Price </th>
                    <th>Weight </th>
                    <th>Quantity</th>
                    
                   
                    <th> Total </th>
                  </tr>
                  {addProducts.map((product, index) => (
                    <tr key={index}>
                      <td> {product.productName} </td>
                      <td> {product.flavour} </td>
                      <td> {product.price} Rs.</td>
                      <td> {product.weight} Gm </td>
                      <td> {product.quantity} </td>
                    
                     
                      <td>{product.price * product.quantity} Rs.</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='total-amount'>
              <b>Total Amount: {total} Rs. </b>
            </div>
          </div>
          <div className='d-s-btn'>
            <button className='download-btn' onClick={downloadPdf}>
              Download
            </button>
            <button className='share-btn' onClick={shareBtn}>
              Share
            </button>
          </div>
        </>
      )}
    </>
  );
}
