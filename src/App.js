import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SidebarRoutes from './routes/SidebarRoutes';
import SignInPage from './component/SignInPage';
import AdminHome from './component/AdminComponents/AdminHome';
import AdminRoutes from './routes/AdminRoutes';
import InvoiceViewer from './component/InvoiceViewer';
import ProductDetails from './component/ProductDetails';
import { AllProductsProvider } from './component/Contexts/ProductsContext'; // Ensure this import is correct

function App() {
  return (
    <div>
      <BrowserRouter>
        <AllProductsProvider> {/* Wrap the Routes with the AllProductsProvider */}
          <Routes>
            <Route path="/*" element={<SidebarRoutes />} />
            <Route path="/signIn" element={<SignInPage />} />
            <Route path='admin/*' element={<AdminRoutes />} />
            <Route path="/invoiceViewer/:id" element={<InvoiceViewer />} />
            <Route path="/productDetails/:id" element={<ProductDetails />} />
          </Routes>
        </AllProductsProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
