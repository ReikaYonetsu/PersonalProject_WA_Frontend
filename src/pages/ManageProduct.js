import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Table, Alert } from 'react-bootstrap';
import axios from 'axios';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch products
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/products');
            setProducts(response.data);
        } catch (error) {
            setError(`Error fetching products: ${error.message}`);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const productData = { name, price, stock };
            if (selectedProduct) {
                await axios.put(`http://localhost:8080/products/${selectedProduct.id}`, productData);
                setSuccess('Product updated successfully!');
            } else {
                await axios.post('http://localhost:8080/products', productData);
                setSuccess('Product added successfully!');
            }
            fetchProducts(); // Refresh the list
            setName('');
            setPrice('');
            setStock('');
            setSelectedProduct(null);
        } catch (error) {
            setError('Failed to submit product: ' + error.message);
        }
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setName(product.name);
        setPrice(product.price);
        setStock(product.stock);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/products/${id}`);
            setSuccess('Product deleted successfully!');
            fetchProducts(); // Refresh the list
        } catch (error) {
            setError('Failed to delete product: ' + error.message);
        }
    };

    return (
        <Container>
            <h1>Manage Products</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        placeholder="Enter product name"
                        onChange={e => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        value={price}
                        placeholder="Enter price"
                        onChange={e => setPrice(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                        type="number"
                        value={stock}
                        placeholder="Enter stock quantity"
                        onChange={e => setStock(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {selectedProduct ? 'Update Product' : 'Add Product'}
                </Button>
                {selectedProduct && <Button variant="secondary" onClick={() => setSelectedProduct(null)}>Cancel Update</Button>}
            </Form>

            <h2 className="mt-5">Product List</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map(product => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.price}€</td>
                        <td>{product.stock}</td>
                        <td>
                            <Button variant="info" onClick={() => handleEdit(product)}>Edit</Button>
                            <Button variant="danger" onClick={() => handleDelete(product.id)} style={{ marginLeft: '10px' }}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default ManageProducts;
