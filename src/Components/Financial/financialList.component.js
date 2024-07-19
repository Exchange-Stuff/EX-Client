import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './financialList.component.css';
import {useDispatch, useSelector} from 'react-redux';
import {
	getAllFinancialSelector,
	getLoadingFinancialSelector,
	getTotalPageFinancialSelector,
} from '../../redux/selectors';
import {fetchFinancial} from '../../redux/slices/financialSlice';
import {Pagination, Table} from 'antd';

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

	// const handleUpdate = async (id, status) => {
	// 	// confirm
	// 	const confirm = window.confirm('Are you sure?');
	// 	if (!confirm) return;
	// 	try {
	// 		try {
	// 			const data = await axios.put(
	// 				`http://localhost:5059/api/FinancialTicket/UpdateFinancialTicket`,
	// 				{
	// 					id,
	// 					status,
	// 				}
	// 			);
	// 			if (data) {
	// 				alert('Update success');
	// 				window.location.reload();
	// 			}
	// 		} catch (error) {
	// 			console.error('Error updating data:', error);
	// 		}
	// 	} catch (error) {
	// 		console.error('Error updating data:', error);
	// 		alert('Update failed');
	// 	}
	// };

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
			{/* <Table dataSource={listFinancial} loading={loading}>
				<Table.Column title="Số tiền" dataIndex="amount" key="amount"></Table.Column>
				<Table.Column
					title="Name"
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

				<Table.Column
					align="center"
					title="QR Code"
					dataIndex="thumbnail"
					key="imageQRCode"
					render={(imageQRCode) => (
						<img
							src={imageQRCode}
							alt="imageQRCode"
							style={{width: '50px', height: '50px'}}
						/>
					)}
				/>

				<Table.Column
					title="Thời gian tạo"
					dataIndex="createdOn"
					key="createdOn"
					render={(data) => (data ? new Date(data).toLocaleString() : 'Chưa cập nhật')}
				/>

				<Table.Column
					title="Status"
					dataIndex="status"
					key="status"
					render={(status) => {
						if (status === 0) {
							return <span className="status-pending">Pending</span>;
						} else if (status === 1) {
							return <span className="status-success">Success</span>;
						} else {
							return <span className="status-reject">Reject</span>;
						}
					}}
				/>
			</Table> */}
			<Pagination defaultCurrent={1} total={totalPage} />
		</div>
	);
};
