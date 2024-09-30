'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import './CreateProductForm.scss';
import { Product, Category, CreateProductFormProps } from '../type';
import CategoryDropdown from '../CategoryDropdown/CategoryDropdown';



const CreateProductForm: React.FC<CreateProductFormProps> = ({ productId, existingProduct, onClose, onCreate }) => {

    const [product, setProduct] = useState<Product>({
        _id: '',
        name: '',
        description: '',
        specification: '',
        brand: '',
        mrp: 0,
        price: 0,
        discount: 0,
        details: '',
        category: '',
        inStock: false,
        isAvailable: false,
        likes: 0,
        image: null,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    
    useEffect(() => {
        if (existingProduct) {
            setProduct(existingProduct);
        }
    }, [existingProduct]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        console.log(e.target, e.target.value);

        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: ['mrp', 'price', 'discount'].includes(name)
                ? parseFloat(value) || 0
                : value,
        }));
    };


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setProduct((prev) => ({ ...prev, image: files[0] }));
            setImagePreview(URL.createObjectURL(files[0]));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {


            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('description', product.description ? product.description.toString() : '');
            formData.append('specification', product.specification ? product.specification.toString() : '');
            formData.append('brand', product.brand);
            formData.append('mrp', product.mrp.toString());
            formData.append('price', product.price.toString());
            formData.append('discount', product.discount.toString());
            formData.append('details', product.details);
            if ((product.category as string)?.length) {
                formData.append('category', product.category as string);
            } else {
                formData.append('category', (existingProduct?.category as Category)?._id);
            }

            formData.append('inStock', product.inStock.toString());
            formData.append('isAvailable', product.isAvailable.toString());

            if (product.image) {
                formData.append('image', product.image);
            }


            formData.forEach((value, key) => {
                console.log(`${key}: ${value}`);
            });


            const response = await fetch(productId
                ? `http://localhost:5000/public/products/${productId}`
                : 'http://localhost:5000/public/products/product',
                {
                    method: productId ? 'PUT' : 'POST',
                    body: formData,
                }
            );

            if (response.ok) {
                const createdProduct = await response.json();
                console.log(createdProduct);
                onCreate(createdProduct);
                onClose();
            } else {
                console.error('Failed to create or update product:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };




    // function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>): void {
    //     throw new Error('Function not implemented.');
    // }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{productId ? 'Edit Product' : 'Create Product'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="brand">Brand</label>
                        <input
                            type="text"
                            id="brand"
                            name="brand"
                            value={product.brand}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mrp">MRP</label>
                        <input
                            type="number"
                            id="mrp"
                            name="mrp"
                            value={product.mrp}
                            onChange={handleChange}
                            required
                            min="0"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            required
                            min="0"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="discount">Discount</label>
                        <input
                            type="number"
                            id="discount"
                            name="discount"
                            value={product.discount}
                            onChange={handleChange}
                            required
                            min="0"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="specification">Specification</label>
                        <input
                            type="text"
                            id="specification"
                            name="specification"
                            value={product.specification}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="details">Details</label>
                        <textarea
                            id="details"
                            name="details"
                            value={product.details}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <CategoryDropdown
                            selectedCategory={product.category as string}
                            onCategoryChange={handleChange}
                        />

                        {/* {productId ? 
                            <input
                                type="text"
                                id="category"
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                            />
                         :
                            <CategoryDropdown
                                selectedCategory={product.category as string}
                                onCategoryChange={handleChange}
                            />
                        } */}


                    </div>
                    <div className="form-group">
                        <label htmlFor="inStock">In Stock</label>
                        <input
                            type="checkbox"
                            id="inStock"
                            name="inStock"
                            checked={product.inStock}
                            onChange={(e) => setProduct((prev) => ({ ...prev, inStock: e.target.checked }))}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="isAvailable">Is Available</label>
                        <input
                            type="checkbox"
                            id="isAvailable"
                            name="isAvailable"
                            checked={product.isAvailable}
                            onChange={(e) => setProduct((prev) => ({ ...prev, isAvailable: e.target.checked }))}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Upload Image</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {/* {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />} */}
                        {/* {!imagePreview && (existingProduct?.image as string).length ? <img src={"http://localhost:5000/"+ existingProduct?.image as string} alt="Preview" className="image-preview" /> : ''} */}
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="image-preview" />
                        ) : (
                            existingProduct?.image && typeof existingProduct.image === 'string' && existingProduct.image.length > 0 ? (
                                <img src={`http://localhost:5000/${existingProduct.image}`} alt="Preview" className="image-preview" />
                            ) : null
                        )}

                    </div>


                    <div className="modal-buttons">
                        <button type="submit" disabled={loading}>
                            {loading ? (productId ? 'Updating...' : 'Creating...') : (productId ? 'Update Product' : 'Create Product')}
                        </button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>


                </form>
            </div>
        </div>
    );
};

export default CreateProductForm;
