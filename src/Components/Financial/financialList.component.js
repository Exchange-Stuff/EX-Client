import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './financialList.component.css';
import {useDispatch, useSelector} from 'react-redux';
import {
	getAllFinancialSelector,
	getLoadingFinancialSelector,
	getTotalPageFinancialSelector,
} from '../../redux/selectors';
import {fetchFinancial, updateFinancial} from '../../redux/slices/financialSlice';
import {Button, Pagination, Table} from 'antd';
import {CheckOutlined} from '@ant-design/icons';
import {toast, ToastContainer} from 'react-toastify';

export const FinancialList = () => {
	const dispatch = useDispatch();

	const [pageSize, setPageSize] = useState(10);
	const [pageIndex, setPageIndex] = useState(1);
	const [status, setStatus] = useState(0);

	const listFinancial = useSelector(getAllFinancialSelector);
	const loading = useSelector(getLoadingFinancialSelector);
	const totalPage = useSelector(getTotalPageFinancialSelector);

	useEffect(() => {
		dispatch(
			fetchFinancial({
				pageIndex: pageIndex,
				pageSize: pageSize,
				status: status,
			})
		).then((res) => {
			console.log('res', res);
		});
	}, [pageIndex, pageSize, status, dispatch]);

	const handleUpdate = async (id) => {
		// confirm
		if (window.confirm('Bạn muốn chấp nhận?')) {
			dispatch(updateFinancial({id: id})).then((res) => {
				if (res.error) {
					if (res.payload) {
						toast.error(res.payload.error.message);
					}
				} else {
					toast.success('Cập nhật thành công');
					dispatch(
						fetchFinancial({
							pageIndex: pageIndex,
							pageSize: pageSize,
							status: status,
						})
					);
				}
			});
		} else {
			return;
		}
	};

	return (
		<div className="financial-list">
			<div className="financial-filter">
				<label class="labelsattus">Status</label>
				<select
					className="selectStatus"
					value={status}
					onChange={(e) => setStatus(e.target.value)}
				>
					<option value={0}>Pending</option>
					<option value={1}>Success</option>
					<option value={2}>Reject</option>
				</select>
			</div>
			<Table dataSource={listFinancial} loading={loading}>
				<Table.Column
					title="Tên"
					dataIndex="user"
					key="name"
					render={(user) => user.name}
				/>
				<Table.Column
					title="Username"
					dataIndex="user"
					key="username"
					render={(user) => user.username}
				/>
				<Table.Column
					title="Email"
					dataIndex="user"
					key="email"
					render={(user) => user.email}
				/>
				<Table.Column title="Số tiền" dataIndex="amount" key="amount"></Table.Column>

				<Table.Column
					align="center"
					title="QR Code"
					dataIndex="thumbnail"
					key="imageQRCode"
					render={(imageQRCode) => {
						if (imageQRCode) {
							return (
								<img
									src={imageQRCode}
									alt="imageQRCode"
									style={{width: '50px', height: '50px'}}
								/>
							);
						} else {
							return <span>Chưa cập nhật</span>;
						}
					}}
				/>

				<Table.Column
					title="Thời gian tạo"
					dataIndex="createdOn"
					key="createdOn"
					render={(data) => (data ? new Date(data).toLocaleString() : 'Chưa cập nhật')}
				/>

				<Table.Column
					title="Trạng thái"
					dataIndex="status"
					key="status"
					render={(status) => {
						if (status === 0) {
							return <span className="status-pending">Đang chờ duyệt</span>;
						} else if (status === 1) {
							return <span className="status-success">Success</span>;
						} else {
							return <span className="status-reject">Reject</span>;
						}
					}}
				/>

				<Table.Column
					title="Hành động"
					key="action"
					dataIndex="status"
					render={(status, record) => {
						if (status === 0) {
							return (
								<Button
									type="primary"
									icon={<CheckOutlined />}
									onClick={() => handleUpdate(record.id)}
								>
									Chấp nhận
								</Button>
							);
						} else {
							return <span>Đã xử lý</span>;
						}
					}}
				/>
			</Table>

			<Pagination
				className="pagination-page"
				defaultCurrent={1}
				total={totalPage}
				onChange={(page, pageSize) => {
					setPageIndex(page);
					setPageSize(pageSize);
				}}
			/>

			<ToastContainer />
		</div>
	);
};
