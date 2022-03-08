import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import { GET_PROPERTY } from "../../reducers/propertyReducer";
import Spinner from "../Spinner";
import { baseUrl } from "../../config/baseUrl";
import PropertiesCard from "../PropertiesCard/PropertiesCard";
const Product = () => {
	let publicUrl = process.env.PUBLIC_URL + "/";

	const dispatch = useDispatch();
	const [sale, setSale] = useState([]);
	const [allProperties, setAllProperties] = useState([]);
	const [loading, setLoading] = useState(false);
	const { property } = useSelector((state) => state.property);

	console.log("property.....", property);
	useEffect(() => {
		setLoading(true);
		getData();
	}, [dispatch]);

	const getData = async () => {
		dispatch(GET_PROPERTY());
		setLoading(false);
	};

	useEffect(() => {
		setData();
	}, [property]);

	const setData = async () => {
		setAllProperties(property);
		setLoading(false);
	};
	if (loading) {
		return <p>loading....</p>;
	}
	return (
		<div className="product-area ">
			<div className="container">
				<div className="section-title text-center pt-4">
					<h6>We are offring the best real estate</h6>
					<h2>Best House For You</h2>
				</div>
				<div className="row">
					{allProperties?.length > 0
						? allProperties?.map(
								(item, index) =>
									item.propertyStatus == "approved" && (
										<PropertiesCard property={item} key={index} />
									)
								// <PropertiesCard property={item} key={index} />
						  )
						: "No property found!"}
				</div>
			</div>
		</div>
	);
};

export default Product;
