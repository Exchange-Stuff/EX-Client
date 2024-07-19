import React, {useEffect} from 'react';
import './productList.component.css';
import {useSelector, useDispatch} from 'react-redux';
import {getAllProductByAdmin, getAllProductByModerator} from '../../../redux/slices/productSlice';
import {getAllProductSelector} from '../../../redux/selectors';
import {Table} from 'antd';

export const ProductList = () => {
	const dispatch = useDispatch();

	const productList = useSelector(getAllProductSelector);

	useEffect(() => {
		dispatch(getAllProductByAdmin()).then((res) => {
			console.log(`res`, res);
		});
	}, [dispatch]);

	return <div></div>;
};
