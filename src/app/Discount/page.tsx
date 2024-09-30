import React from 'react'

const Discount = () => {
  return (
    <div>Discount </div>
  )
}

export default Discount

// 'use client';
// import React from 'react';
// import './Discount.module.scss';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';

// export interface Category {
//   _id: string;
//   name: string;
// }

// export interface Product {
//   _id: string;
//   name: string;
//   description: string;
//   specification: string;
//   brand: string;
//   mrp: number;
//   price: number;
//   discount: number;
//   details: string;
//   category: Category;
//   inStock: boolean;
//   isAvailable: boolean;
//   likes: number;
//   image: string;
// }

// interface DiscountProps {
//   product: Product;
//   onClose: () => void;
//   onEdit: () => void;
//   onDelete: () => void;
// }

// const Discount: React.FC<DiscountProps> = () => {
//   return (
//     <div className="product-details-overlay">
//       <div className="product-details-card">
//         <div className="head">
//           <h3>Product Details</h3>
//           <FontAwesomeIcon icon={faTimes} style={{ fontSize: '30px', color: 'light grey', margin: '15px' }} />
//         </div>
        
//         <p><strong>Name:</strong> a</p>
//         <p><strong>Description:</strong>a </p>
//         <p><strong>Specification:</strong>a </p>
//         <p><strong>Brand:</strong> a</p>
//         <p><strong>MRP:</strong> a</p>
//         <p><strong>Price:</strong> a</p>
//         <p><strong>Discount:</strong> a</p>
//         <p><strong>Details:</strong> a</p>
//         <p><strong>Category:</strong> a</p>
//         <p><strong>In Stock:</strong> a</p>
//         <p><strong>Available:</strong> a</p>
//         <p><strong>Likes:</strong> a</p>
//         <div className="action-buttons">
//           <button className="edit-button" >Edit</button>
//           <button className="delete-button" >Delete</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Discount;
