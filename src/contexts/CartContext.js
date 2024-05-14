import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            // Assuming you have an endpoint to get all cart items for a specific user
            const response = await axios.get('http://localhost:8080/cart/getAllForUser/1'); // Use actual user ID
            setCartItems(response.data);
        } catch (error) {
            console.error('Failed to fetch cart items:', error);
        }
    };

    const addToCart = async (productId, quantity) => {
        try {
            await axios.post('http://localhost:8080/cart/add', {
                userId: 1,  // Assuming you're using a fixed user ID for testing
                productId: productId,
                quantity: quantity
            });
            fetchCartItems();  // Refresh the cart items from the backend
        } catch (error) {
            console.error('Failed to add item to cart:', error);
        }
    };

    const removeFromCart = async (cartItemId) => {
        try {
            await axios.delete(`http://localhost:8080/cart/remove/${cartItemId}`);
            fetchCartItems();  // Refresh the cart items from the backend
        } catch (error) {
            console.error('Failed to remove item from cart:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );

};

export class addToCart {
}