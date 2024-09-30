"use client";
import React, { useEffect, useState } from "react";
import styles from "./Categories.module.scss"; // Import the SCSS module

// Define the type for Category
interface Category {
    _id: string;
    name: string;
    image?: string;
    subcategories?: string[];
}

const Categories: React.FC = () => {
    // Define the state types
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null); // String or null for error

    // Fetch categories from the backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:5000/public/category/all");

                if (!response.ok) {
                    throw new Error("Failed to fetch categories.");
                }

                const result = await response.json();
                setCategories(result.data); // Assuming the data is in `result.data`
            } catch (err: any) {
                setError("Failed to load categories.");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Display loading, error, or categories
    if (loading) {
        return <p>Loading categories...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.headr    }>
                <h1 className={styles.heading}>All Categories</h1>
                <button className={styles.btn}>Add</button>
            </div>
            <ul className={styles.categoryList}>
                {categories.map((category) => (
                    <li key={category._id} className={styles.categoryItem}>
                        <h2>{category.name}</h2>
                        {category.image && (
                            <img src={`/${category.image}`} alt={category.name} />
                        )}
                        <p>Subcategories: {category.subcategories?.join(", ") || "None"}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
