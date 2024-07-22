import React, {useEffect} from 'react';
import './productList.component.css';
import {useSelector, useDispatch} from 'react-redux';
import {
	getAllProductByAdmin,
	getAllProductByModerator,
	updateProductStatus,
} from '../../../redux/slices/productSlice';
import {getAllProductSelector, getLoadingProductSelector} from '../../../redux/selectors';
import {Table, Button} from 'antd';
import {DeleteTwoTone, CheckOutlined} from '@ant-design/icons';
import './productList.component.css';
import {toast} from 'react-toastify';

export const ProductList = () => {
	const dispatch = useDispatch();

	const productList = useSelector(getAllProductSelector);
	const loading = useSelector(getLoadingProductSelector);

	useEffect(() => {
		dispatch(getAllProductByAdmin()).then((res) => {
			console.log(`res`, res);
		});
	}, [dispatch]);

	const handleUpdateProduct = (id, status) => {
		if (status === 1) {
			if (window.confirm('Bạn có chắc chắn muốn chấp nhận sản phẩm này không?')) {
				updateProduct(id, status);
			} else {
				return;
			}
		} else if (status === 3) {
			if (window.confirm('Bạn có chắc chắn muốn hủy sản phẩm này không?')) {
				updateProduct(id, status);
			} else {
				return;
			}
		}
		toast.error('Bạn nên chọn hành động khác');
	};

	const updateProduct = (id, status) => {
		dispatch(updateProductStatus({id: id, status: status})).then((res) => {
			if (res.error) {
				if (res.payload) {
					toast.error(res.payload.error.message);
				} else {
					toast.error('Lỗi hệ thống');
				}
			} else {
				toast.success('Cập nhật thành công');
				window.location.reload();
			}
		});
	};

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
			<Table.Column
				title="Hành động"
				dataIndex="action"
				key="action"
				render={(index, record) => {
					if (record.productStatus === 0) {
						return (
							<div>
								<Button
									type="primary"
									style={{marginRight: '10px'}}
									icon={<CheckOutlined />}
									className="btn-product-accept"
									onClick={() => handleUpdateProduct(record.id, 1)}
								>
									Chấp nhận
								</Button>

								<Button
									icon={<DeleteTwoTone twoToneColor="red" />}
									className="btn-product-delete"
									onClick={() => handleUpdateProduct(record.id, 3)}
								>
									Hủy sản phẩm
								</Button>
							</div>
						);
					} else if (record.productStatus === 1) {
						return (
							<div>
								<Button
									icon={<DeleteTwoTone twoToneColor="red" />}
									className="btn-product-delete"
									onClick={() => handleUpdateProduct(record.id, 3)}
								>
									Hủy sản phẩm
								</Button>
							</div>
						);
					}
				}}
			/>
		</Table>
	);
};
