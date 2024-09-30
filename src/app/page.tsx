'use client';
import Image from "next/image";
import styles from "./page.module.css";

export default async function Home({ searchParams }: { searchParams:any }) {
	const page = parseInt(searchParams.page) || 1;
	return (
		<div className={styles.container}>	
		
		</div>
	);
}
