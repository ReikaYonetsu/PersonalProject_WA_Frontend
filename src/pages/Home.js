// pages/Home.js
import React from 'react';
import { Button, Container } from 'react-bootstrap';
import "./Home.css"

const Home = () => {
    return (
        <Container className="p-3">
            <div className="p-5 mb-4 bg-light rounded-3">
                <Container fluid>
                    <h1 className="display-5 fw-bold">Welcome to our Meat Shop</h1>
                    <p className="col-md-8 fs-4">East or West , Our Meat is Best</p>
                    <Button variant="primary" href="/meats">Browse Meats</Button>
                </Container>
            </div>
        </Container>
    );
};

export default Home;
