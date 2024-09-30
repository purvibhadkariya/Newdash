'use client';
import React, { useState } from 'react';
import './ViewProductDetails.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import CreateProductForm from '../CreateProductForm/CreateProducForm';
import { Product, ViewProductDetailsProps } from '../type';





const ViewProductDetails: React.FC<ViewProductDetailsProps> = ({ product, onClose }) => {
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    // console.log(product);


    const handleDelete = async (productId: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`http://localhost:5000/public/products/${productId}`);
                onClose();
            } catch (err) {
                setError('Failed to delete product');
            }
        }
    };

    const handleEditClick = () => {
        setIsEditing(true); 
    };

    const handleCloseEdit = () => {
        setIsEditing(false); 
    };

    const handleAddProduct = (product: Product) => {
        console.log('Product created:', product);
    };

    return (
        <div className="product-details-overlay">
            {isEditing ? (
                <CreateProductForm
                    productId={product._id}
                    existingProduct={product}
                    onClose={handleCloseEdit}
                    onCreate={handleAddProduct} />
            ) : (
                <div className="product-details-card">
                    <div className="head">
                        <h3>Product Details</h3>
                        <FontAwesomeIcon
                            icon={faTimes}
                            onClick={onClose}
                            aria-label="Close"
                            style={{ fontSize: '22px', color: 'grey', margin: '15px 0' }}
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <img
                        src={`http://localhost:5000/${product.image}`}
                        alt={product.name}
                        style={{ width: '355px', height: '250px', objectFit: 'cover' }}
                    />
                    <p><strong>Name:</strong> {product.name}</p>
                    <p><strong>Description:</strong> {product.description}</p>
                    <p><strong>Specification:</strong> {product.specification}</p>
                    <p><strong>Brand:</strong> {product.brand}</p>
                    <p><strong>MRP:</strong> ${product.mrp}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Discount:</strong> {product.discount}%</p>
                    <p><strong>Details:</strong> {product.details}</p>
                    <p><strong>Category:</strong> {typeof product.category === 'object' ? product.category.name : product.category}</p>
                    {/* <p><strong>Category:</strong> {product.category.name}</p> */}
                    <p><strong>In Stock:</strong> {product.inStock ? 'Yes' : 'No'}</p>
                    <p><strong>Available:</strong> {product.isAvailable ? 'Yes' : 'No'}</p>
                    <p><strong>Likes:</strong> {product.likes}</p>

                    <div className="action-buttons">
                        <button className="edit-button" onClick={handleEditClick}>Edit</button>
                        <button
                            onClick={() => handleDelete(product._id)}
                            style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewProductDetails;
