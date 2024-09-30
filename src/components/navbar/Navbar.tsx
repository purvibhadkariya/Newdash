'use client';
import React, { useState, useEffect, useRef } from 'react';
import './Navbar2.scss';
import { FaSearch, FaCaretDown } from 'react-icons/fa';
import CreateProducForm from '../../components/CreateProductForm/CreateProducForm';
import {Product} from '../type';


const Navbar: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleAddProduct = (product: Product) => {
        console.log('Product created:', product);
    };

    // Close dropdown when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    

    return (
        <>
            <nav className="navbar">
                <div className="search-bar">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        onChange={handleSearchChange}
                    />
                    <div className="dropdown-icon" onClick={toggleDropdown}>
                        <FaCaretDown />
                    </div>
                    {showDropdown && (
                        <div className="dropdown" ref={dropdownRef}>
                            <ul>
                                <li>Option 1</li>
                                <li>Option 2</li>
                                <li>Option 3</li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className="AddBtn">
                    <button onClick={() => setIsModalOpen(true)}>Add</button>
                </div>
            </nav>
            {isModalOpen && (
                <CreateProducForm
                    onClose={() => setIsModalOpen(false)}
                    onCreate={handleAddProduct}
                />
            )}
        </>
    );
};

export default Navbar;
