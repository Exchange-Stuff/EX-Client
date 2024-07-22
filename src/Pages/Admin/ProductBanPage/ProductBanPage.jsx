import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getProductBanList, updateProductBan} from '../../../redux/slices/productSlice';
import {
	getProductBanListSelector,
	getLoadingProductBanSelector,
	getTotalPageProductBanSelector,
} from '../../../redux/selectors';
import {Table, Button, Pagination, Input} from 'antd';
import {toast} from 'react-toastify';
import './ProductBanPage.css';
import {CheckOutlined} from '@ant-design/icons';

export default function ProductBanPage() {
	const dispatch = useDispatch();

	const [productId, setProductId] = React.useState('');
	const [reasonId, setReasonId] = React.useState('');
	const [reason, setReason] = React.useState('');
	const [pageIndex, setPageIndex] = React.useState(1);
	const [pageSize, setPageSize] = React.useState(10);

	const productBanList = useSelector(getProductBanListSelector);
	const loading = useSelector(getLoadingProductBanSelector);
	const totalPage = useSelector(getTotalPageProductBanSelector);

	React.useEffect(() => {
		dispatch(getProductBanList({productId, reasonId, reason, pageIndex, pageSize})).then(
			(res) => {
				console.log('res', res);
				if (res.error) {
					if (res.payload) {
						toast.error(res.payload.message);
					}
				}
			}
		);
	}, [dispatch, productId, reasonId, reason, pageIndex, pageSize]);

	const handleUpdateProductBan = (id) => {
		if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
			dispatch(updateProductBan({id})).then((res) => {
				if (res.error) {
					if (res.payload) {
						toast.error(res.payload.message);
					}
				} else {
					toast.success('Cập nhật thành công');
					dispatch(getProductBanList({productId, reasonId, reason, pageIndex, pageSize}));
				}
			});
		} else {
			return;
		}
	};

	return (
		<div className="productBan-page">
			<h1>Đơn tố cáo sản phẩm</h1>

			<div className="productBan-filter"></div>

			<Table dataSource={productBanList} loading={loading} pagination={false}>
				<Table.Column title="ID" dataIndex="id" key="id" />

				<Table.Column
					title="Tên sản phẩm"
					dataIndex="product"
					key="product"
					render={(product) => {
						return product?.name;
					}}
				/>

				<Table.Column
					title="Ảnh sản phẩm"
					dataIndex="product"
					key="product"
					render={(product) => {
						return <img src={product?.image} alt="product" style={{width: '100px'}} />;
					}}
				/>

				<Table.Column title="Người tố cáo" dataIndex="createdBy" key="createdBy" />

				<Table.Column
					title="Lý do"
					dataIndex="banReason"
					key="banReason"
					render={(reason) => {
						return reason?.content;
					}}
				/>

				<Table.Column
					title="Ngày tạo"
					dataIndex="createdOn"
					key="createdOn"
					render={(data) => (data ? new Date(data).toLocaleString() : 'Chưa cập nhật')}
				/>

				<Table.Column
					align="center"
					title="Hành động"
					key="action"
					render={(text, record) => (
						<Button
							type="primary"
							onClick={() => {
								handleUpdateProductBan(record.id);
							}}
							icon={
								<CheckOutlined
									style={{
										color: 'white',
									}}
								/>
							}
							className="btn-accept"
						></Button>
					)}
				/>
			</Table>

			<Pagination
				className="pagination-page"
				current={pageIndex}
				pageSize={pageSize}
				total={totalPage}
				onChange={(page, pageSize) => {
					setPageIndex(page);
					setPageSize(pageSize);
				}}
			/>
		</div>
	);
}
