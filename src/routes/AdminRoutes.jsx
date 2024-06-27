// import React, { useEffect,  useState } from "react";
// import {  Routes } from "react-router-dom";
// import AdminHome from "../component/AdminComponents/AdminHome";
// import AddToBill from "../component/AdminComponents/AddToBill";
// import Data from "../component/AdminComponents/Data";
// import AddProducts from "../component/AdminComponents/AddProducts";
// import DisplayAds from "../component/AdminComponents/DisplayAds";
// import Expense from "../component/AdminComponents/Expense";

// import ProtectedRoute from "./ProtectedRoute";

// export default function AdminRoutes() {


//   // const [isAdmin , setIsAdmin] = useState(false);
//   // const navigate = useNavigate();


//   // useEffect(() => {
//   //   const verifyAdmin = () => {
//   //      const token = localStorage.getItem("token");
//   //     //  console.log("tknssssss" , token);
//   //       if(token==="true") {
//   //         setIsAdmin(true);
//   //       }   
//   //     else{
//   //       navigate('/signIn');
//   //       }
//   //      };
//   //   verifyAdmin();
//   // }, [navigate]);
//   return (
//     <Routes>
//       <ProtectedRoute path="/home" element={<AdminHome />} />
//       <ProtectedRoute path="/bill" element={<AddToBill />} />
//       <ProtectedRoute path="/add-expense" element={<Expense />} />
//       <ProtectedRoute path="/show-data" element={<Data />} />
//       <ProtectedRoute path="/add-products" element={<AddProducts />} />
//       <ProtectedRoute path="/display-ads" element={<DisplayAds />} />
//     </Routes>
//   );
// }

// AdminRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminHome from "../component/AdminComponents/AdminHome";
import AddToBill from "../component/AdminComponents/AddToBill";
import Data from "../component/AdminComponents/Data";
import AddProducts from "../component/AdminComponents/AddProducts";
import DisplayAds from "../component/AdminComponents/DisplayAds";
import Expense from "../component/AdminComponents/Expense";
import ProtectedRoute from "./ProtectedRoute";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<ProtectedRoute element={AdminHome} />} />
      <Route path="/bill" element={<ProtectedRoute element={AddToBill} />} />
      <Route path="/add-expense" element={<ProtectedRoute element={Expense} />} />
      <Route path="/show-data" element={<ProtectedRoute element={Data} />} />
      <Route path="/add-products" element={<ProtectedRoute element={AddProducts} />} />
      <Route path="/display-ads" element={<ProtectedRoute element={DisplayAds} />} />
    </Routes>
  );
};

export default AdminRoutes;
