import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, Navigate } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { FaBars, FaUser, FaSearch, FaTimes } from 'react-icons/fa';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';



export const Navbar = () => {
const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebarOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', closeSidebarOutsideClick);

    return () => {
      document.removeEventListener('mousedown', closeSidebarOutsideClick);
    };
  }, []);

 const  handleDrag=()=>{
  navigate('admin/home');
  // navigate('/signIn');
 }

  return (
    <>
      <div className="navbar">
        <div className="sidebar-logo" onClick={toggleSidebar}>
          {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </div>

        <div className="shop-info">
         {/* <img className='shop-img' src="https://res.cloudinary.com/dmcxyn0eu/image/upload/v1695232782/Static%20Images/logo/tqb_logo.png " alt="Shop Logo"  /> */}
          <div className="shop-name">THE QUEEN BAKER</div>
        </div>

        {/* <div className={`search-bar ${isSearch}`}>
         {isSearch && <input type="text" placeholder="Search..." />}

          <FaSearch className='search-icon' onClick={()=>setIsSearch(!isSearch)}/>

        </div> */}

        <div onClick={()=>handleDrag()} >
          <div className="admin-logo">
            {/* <FaUser size={20} /> */}
            <img className='shop-img' src="https://res.cloudinary.com/dmcxyn0eu/image/upload/v1695232782/Static%20Images/logo/tqb_logo.png " alt="Shop Logo"  />
        

          </div>
        </div>

      </div>
      <div ref={sidebarRef} className={`menu ${isSidebarOpen ? 'open' : ''}`}>
        <ul>
          {SidebarData.map((item, index) => (
            <li key={index} className="link">
              <NavLink to={item.path}>
                <div className='icons'>{item.icon}</div>
                <div className="link-text" style={{ display: isSidebarOpen ? "block" : "none" }}> {item.name} </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
