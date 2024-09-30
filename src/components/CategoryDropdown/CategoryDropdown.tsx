'use client';

import React, { useEffect, useState } from 'react';
import { CategoryDropdownProps } from '../type';


const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ selectedCategory, onCategoryChange }) => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("selectedCategory.......hihi");
        console.log(selectedCategory);

        const fetchCategories = async () => {
            try {

                const response = await fetch('http://localhost:5000/public/category/all');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) return <p>Loading categories...</p>;
    if (error) return <p>Error: {error}</p>;


    return (
        <select name='category' value={selectedCategory} onChange={onCategoryChange}>
            <option value="">Select Category</option>
            {categories.map((category: any) => (
                <option key={category._id} value={category._id}>
                    {category.name}
                </option>
            ))}
        </select>
    );
};

export default CategoryDropdown;

