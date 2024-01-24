import React from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import ProductsRegister from './pages/ProductsRegister';
import { BrowserRouter, Routes , Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyProducts from './pages/MyProducts';
import Cart from './pages/Cart';


function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer/>
        <Routes>
        <Route path = "/" element={< Register />} />
        <Route path = "/login" element={< Login />} />
        <Route path= "/home" element={ < Home />} />
        <Route path="/registroprodutos" element={ < ProductsRegister />} />
        <Route path="/meusProdutos" element={ < MyProducts />} />
        <Route path="/carrinho" element={ < Cart />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
