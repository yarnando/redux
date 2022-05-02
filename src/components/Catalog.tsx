import React from 'react'
import { useSelector } from "react-redux";

export default function Catalog() {

	const catalog = useSelector(state => state)
	console.log(catalog);

	return (
		<h1>Catalog</h1>
	)
}
