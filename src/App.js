import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './component/Navbar';
import SidebarRoutes from './routes/SidebarRoutes';
import SignInPage from './component/SignInPage';
import AdminHome from './component/AdminComponents/AdminHome';
import AdminRoutes from './routes/AdminRoutes';
import InvoiceViewer from './component/InvoiceViewer';
import ProductDetails from './component/ProductDetails';

function App() {
  return (
    <div>
      <BrowserRouter>
       
          
        <Routes>
        
          <Route exact path="/*" element={<SidebarRoutes />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path='/admin/*' element={<AdminRoutes />}/>
          <Route path="/invoiceViewer/:id" element={< InvoiceViewer />} />
          <Route path="/productDetails/:id" element={< ProductDetails />} />

        </Routes>
     
     
   
        
       
      </BrowserRouter>
    </div>
  );
}

export default App;
