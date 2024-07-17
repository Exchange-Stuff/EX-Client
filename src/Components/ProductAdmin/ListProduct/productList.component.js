import React from 'react';
import './productList.component.css';
import {useSelector, useDispatch} from 'react-redux';
import {getAllProductByAdmin, getAllProductByModerator} from '../../../redux/slices/productSlice';
import {getAllProductSelector} from '../../../redux/selectors';
import {Table} from 'antd';

export const ProductList = () => {
	const dispatch = useDispatch();

	const productList = useSelector(getAllProductSelector);

	React.useEffect(() => {
		dispatch(getAllProductByAdmin());
	}, [dispatch]);

	return <Table></Table>;
};
