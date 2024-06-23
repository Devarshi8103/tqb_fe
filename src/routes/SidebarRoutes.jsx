import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../component/sidebarComponents/Home';
import Cakes from '../component/sidebarComponents/Cakes';
import Pastries from '../component/sidebarComponents/Pastries';
import IceCream from '../component/sidebarComponents/IceCream';
import Biscuits from '../component/sidebarComponents/Biscuits';
import { Navbar } from '../component/Navbar';

export default function SidebarRoutes() {
  return (
     <>
    <Navbar/>
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/cakes" element={<Cakes />} />
        <Route path="/pastries" element={<Pastries />} />
        <Route path="/iceCream" element={<IceCream />} />
        <Route path="/biscuits" element={<Biscuits />} />
       
      </Routes>
      
    
      </>
  );
}
