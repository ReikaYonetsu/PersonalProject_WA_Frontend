import React from 'react';
import { Container, ListGroup, Button, Alert } from 'react-bootstrap';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';

const Cart = () => {
    const { cartItems, removeFromCart, setCartItems } = useCart();

    const handlePlaceOrder = async () => {
        try {
            await axios.post('http://localhost:8080/cart/placeOrder/1'); // Assuming user ID 1
            setCartItems([]); // Clear cart in the frontend state
            alert('Order placed successfully!');
        } catch (error) {
            console.error('Failed to place order:', error);
        }
    };

    return (
        <Container>
            <h1>Your Cart</h1>
            <ListGroup>
                {cartItems.map(item => (
                    <ListGroup.Item key={item.id}>
                        {item.product.name} - ${item.product.price} x {item.quantity}
                        <Button variant="danger" onClick={() => removeFromCart(item.id)} style={{ float: 'right' }}>
                            Remove
                        </Button>
                    </ListGroup.Item>
                ))}
                {cartItems.length === 0 && <ListGroup.Item>Your cart is empty.</ListGroup.Item>}
            </ListGroup>
            <Button variant="primary" onClick={handlePlaceOrder} style={{ marginTop: '20px' }}>
                Place Order
            </Button>
        </Container>
    );
};

export default Cart;
