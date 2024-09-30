"use client";

import React from "react";
import styles from "./Sidebar.module.scss";
import Logo from "../logo/page"; 
import Link from "next/link"; 

const Sidebar: React.FC = () => {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <ul className={styles.menu}>
                <li className={styles.menuItem}>
                    <Link href="/Products">Products</Link>
                </li>
                <li className={styles.menuItem}>
                    <Link href="/Order">Orders</Link>
                </li>
                <li className={styles.menuItem}>
                    <Link href="/Discount">Discounts</Link>
                </li>
                <li className={styles.menuItem}>
                    <Link href="/Coupon">Coupons</Link>
                </li>
                <li className={styles.menuItem}>
                    <Link href="/Categories">Category</Link> 
                </li>
                <li className={styles.menuItem}>
                    <Link href="/Users">Users</Link> 
                </li>                
            </ul>
        </div>
    );
};

export default Sidebar;
