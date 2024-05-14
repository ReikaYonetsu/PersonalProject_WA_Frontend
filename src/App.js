import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Home from "./pages/Home";
import Meats from "./pages/Meats";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import 'bootstrap/dist/css/bootstrap.min.css';
import {CartProvider} from './contexts/CartContext';
import ManageProducts from "./pages/ManageProduct";


function App() {
    return (
        <CartProvider>
            <Router>
                <NavigationBar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/meats" element={<Meats/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/manage-products" element={<ManageProducts />} />

                </Routes>
            </Router>
        </CartProvider>
    );
}

export default App;
