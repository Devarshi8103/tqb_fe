import React from 'react';
import '../AdminComponents/AdminHome.css'; // Import CSS file for styling
import { FaAd, FaArrowLeft, FaBookMedical, FaBookOpen, FaBookReader, FaDatabase, FaHome, FaHornbill, FaLine, FaMoneyBill, FaMoneyBillAlt, FaMoneyBillWaveAlt, FaPage4, FaPagelines, FaPager, FaProductHunt, FaRegMoneyBillAlt, FaShoppingBasket, FaSign } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Define an array of objects for the cards
const cardsData = [
  {
    path: '/admin/bill',
    name: 'Bill',
    icon: <FaMoneyBillWaveAlt /> // You can replace this with the actual icon file name

  },
  {
    path: '/admin/add-expense',
    name: 'Add Expense',
    icon: <FaDatabase />,
  },
  {
    path: '/admin/show-data',
    name: 'Show Data',
    icon: <FaPager />,
  } , 
  {
    path: '/admin/add-products',
    name: 'Add Products',
    icon: < FaShoppingBasket/>,
  },
  {
    path: '/admin/display-ads',
    name: 'Display Ads',
    icon: <FaAd/>,
  },
];

export default function AdminHome() {
  const navigate = useNavigate();

  const handleLeftArrow = ()=>{
    navigate('/signIn');
  }

  return (
    <>
     <FaArrowLeft onClick={()=>handleLeftArrow()}  style={{marginLeft:'10px' , marginTop:'14px'}} size={20} />
    <div className='admin-page'>
     
    <div className="admin-home">
      {cardsData.map((card, index) => (
        <Link to={card.path}>
        <div className="card" key={index}>
           <div className='icons'> {card.icon} </div>
          <h2>{card.name}</h2>
         
        </div>
        </Link>
      ))}
    </div>
    </div>
    </>
  );
}
