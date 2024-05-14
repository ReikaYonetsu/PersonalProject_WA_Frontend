import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useCart,addToCart } from '../contexts/CartContext';

const handleAddToCart = (meat, quantity) => {
    addToCart(meat.id, quantity); // Ensure this function is correctly implemented in your context
};

const Meats = () => {
    const [meats, setMeats] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchMeats = async () => {
            const response = await axios.get('http://localhost:8080/products');
            setMeats(response.data);
        };
        fetchMeats();
    }, []);

    return (
        <Container>
            <h1 className="my-4">Browse Our Meats</h1>
            <Row>
                {meats.map((meat) => (
                    <Col md={4} key={meat.id}>
                        <Card className="mb-4">
                            <Card.Img variant="top" src={`/images/${meat.name}.jpg`} alt={meat.name} />
                            <Card.Body>
                                <Card.Title>{meat.name}</Card.Title>
                                <Card.Text>Price: €{meat.price}</Card.Text>
                                <QuantitySelector meat={meat} />
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

const QuantitySelector = ({ meat }) => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const increment = () => setQuantity(quantity + 1);
    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div>
            <Button onClick={decrement} variant="secondary">-</Button>
            <Form.Control
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                style={{ width: '60px', display: 'inline', textAlign: 'center' }}
            />
            <Button onClick={increment} variant="secondary">+</Button>
            <Button
                onClick={() => addToCart({ ...meat, quantity })}
                variant="primary"
                style={{ marginLeft: '10px' }}
            >
                Add to Cart
            </Button>
        </div>
    );
};

export default Meats;
