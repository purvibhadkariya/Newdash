'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.scss';
import ViewProductDetails from '../../components/ViewProductDetails/ViewProductDetails';
import Navbar from '../../components/Navbar/Navbar';
import { Product } from '../../components/type';


const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/public/products/all');
                setProducts(response.data.data);
                setLoading(false);

                // console.log("hiiii");
                // console.log(response.data.data);                

            } catch (err) {
                setError('Failed to fetch products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleViewDetails = (product: Product) => {
        setSelectedProduct(product);
    };

    // const handleDelete = async (productId: string) => {
    //     if (window.confirm('Are you sure you want to delete this product?')) {
    //         try {
    //             await axios.delete(`http://localhost:5000/public/products/${productId}`);
    //             setProducts(products.filter(product => product._id !== productId));
    //             setSelectedProduct(null); // Close the details card after deletion
    //         } catch (err) {
    //             setError('Failed to delete product');
    //         }
    //     }
    // };

    if (loading) {
        return <div>Loading products...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div className="mainContainer">
                <div className="PageName">Products</div>
                <div className="nav">
                    <Navbar />
                </div>

                <div className="subContainer">
                    <div className="table-container">
                        <table className="scrollable-table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Brand</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>MRP</th>
                                    <th>Discount</th>
                                    <th>In Stock</th>
                                    <th>Likes</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td>
                                            {product.image && (
                                                <img
                                                    src={`http://localhost:5000/${product.image}`}
                                                    alt={product.name}
                                                    style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                                                />
                                            )}
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product.brand}</td>
                                        <td>{(product.category as any)?.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.mrp}</td>
                                        <td>{product.discount}</td>
                                        <td>{product.inStock ? 'Yes' : 'No'}</td>
                                        <td>{product.likes}</td>
                                        <td>

                                            <button onClick={() => handleViewDetails(product)}>View Details</button>
                                            {/* <button
                                                onClick={() => handleDelete(product._id)}
                                                style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }}
                                            >
                                                Delete
                                            </button> */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {selectedProduct && (
                            <ViewProductDetails
                                product={selectedProduct}
                                onClose={() => setSelectedProduct(null)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Products;
