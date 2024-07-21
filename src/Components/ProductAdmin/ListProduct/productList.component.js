import React, {useEffect} from 'react';
import './productList.component.css';
import {useSelector, useDispatch} from 'react-redux';
import {getAllProductByAdmin, getAllProductByModerator} from '../../../redux/slices/productSlice';
import {getAllProductSelector, getLoadingProductSelector} from '../../../redux/selectors';
import {Table, Button} from 'antd';

export const ProductList = () => {
	const dispatch = useDispatch();

	const productList = useSelector(getAllProductSelector);
	const loading = useSelector(getLoadingProductSelector);

	useEffect(() => {
		dispatch(getAllProductByAdmin()).then((res) => {
			console.log(`res`, res);
		});
	}, [dispatch]);

	return (
		<Table dataSource={productList} loading={loading}>
			<Table.Column title="ID" dataIndex="id" key="id" />
			<Table.Column title="Tên sản phẩm" dataIndex="name" key="name" />
			<Table.Column title="Giá" dataIndex="price" key="price" />
			<Table.Column title="Số lượng" dataIndex="quantity" key="quantity" />
			<Table.Column
				title="Hình ảnh"
				dataIndex="images"
				key="images"
				render={(item) => {
					if (item.length > 0) {
						return <img src={item[0].url} alt="product" style={{width: '50px'}} />;
					} else {
						return <p style={{color: 'red'}}>Chưa có hình ảnh</p>;
					}
				}}
			/>
			<Table.Column
				title="Trạng thái"
				dataIndex="productStatus"
				key="productStatus"
				render={(status) => {
					if (status === 0) {
						return <p style={{color: 'orange'}}>Đang chờ duyệt</p>;
					} else if (status === 1) {
						return <p style={{color: 'green'}}>Đang bán</p>;
					} else if (status === 2) {
						return <p style={{color: 'red'}}>Đã hủy</p>;
					} else if (status === 3) {
						return <p style={{color: 'red'}}>Đã bị từ chối</p>;
					}
				}}
			/>
			<Table.Column title="Hành động" dataIndex="action" key="action" />
		</Table>
	);
};
