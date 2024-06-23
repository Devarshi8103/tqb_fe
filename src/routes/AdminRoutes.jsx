import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import AdminHome from "../component/AdminComponents/AdminHome";
import AddToBill from "../component/AdminComponents/AddToBill";
import Data from "../component/AdminComponents/Data";
import AddProducts from "../component/AdminComponents/AddProducts";
import DisplayAds from "../component/AdminComponents/DisplayAds";
import Expense from "../component/AdminComponents/Expense";

export default function AdminRoutes() {
  const navigate = useNavigate();
  let isAdmin = false;
  useEffect(() => {
    const verifyAdmin = () => {
      if (isAdmin) {
 
      } else {
        navigate("/signIn");
      }
    };
    verifyAdmin();
  }, []);
  return (
    <Routes>
      <Route path="/home" element={<AdminHome />} />
      <Route path="/bill" element={<AddToBill />} />
      <Route path="/add-expense" element={<Expense />} />
      <Route path="/show-data" element={<Data />} />
      <Route path="/add-products" element={<AddProducts />} />
      <Route path="/display-ads" element={<DisplayAds />} />
    </Routes>
  );
}
