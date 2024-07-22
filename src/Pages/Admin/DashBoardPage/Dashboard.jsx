import React, {useEffect} from 'react';
import {Card, Col, Row, Statistic, Table} from 'antd';
import './Dashboard.css';
import {useSelector, useDispatch} from 'react-redux';
import {getDashboardListPurchase, getReportPurchase} from '../../../redux/slices/dashboardSlice';
import {
	getReportDashboardSelector,
	getListDashboardSelector,
	getLoadingDashboardSelector,
	getLoadingListDashboardSelector,
} from '../../../redux/selectors';

const Dashboard = () => {
	const dispatch = useDispatch();

	const report = useSelector(getReportDashboardSelector);
	const listDashboard = useSelector(getListDashboardSelector);
	const loading = useSelector(getLoadingDashboardSelector);
	const loadingList = useSelector(getLoadingListDashboardSelector);

	useEffect(() => {
		dispatch(getDashboardListPurchase()).then((res) => {
			console.log('res', res);
		});
		dispatch(getReportPurchase());
	}, [dispatch]);

	function getCurrentWeek(date) {
		// Lấy ngày hiện tại hoặc ngày truyền vào
		let current = date || new Date();

		// Tìm ngày thứ Hai đầu tuần
		let first = current.getDate() - current.getDay() + 1;

		// Tạo ngày bắt đầu tuần (thứ Hai)
		let startOfWeek = new Date(current.setDate(first));

		// Tạo ngày kết thúc tuần (Chủ Nhật)
		let endOfWeek = new Date(startOfWeek);
		endOfWeek.setDate(startOfWeek.getDate() + 6);

		// Định dạng ngày tháng năm
		const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
		let startDate = startOfWeek.toLocaleDateString('en-GB', options);
		let endDate = endOfWeek.toLocaleDateString('en-GB', options);

		return `${startDate} - ${endDate}`;
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="Dashboard-page">
			<Row gutter={16}>
				<Col span={8}>
					<h1>Dashboard</h1>
				</Col>

				<Col span={8}>
					<h2>{getCurrentWeek(new Date())}</h2>
				</Col>

				<Col span={8}>
					<h2>
						{new Date().toLocaleDateString('vi-VN', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						})}
					</h2>
				</Col>
			</Row>

			<Row gutter={16}>
				<Col span={8}>
					<Card>
						<Statistic
							title="Đơn hàng đang duyệt"
							value={report.totalTicket}
							valueStyle={{color: '#3f8600'}}
							suffix={`(${report.percentTotalWithLastWeek}%)`}
						/>
					</Card>
				</Col>
				<Col span={8}>
					<Card>
						<Statistic
							title="Đơn hàng được chấp nhận"
							value={report.totalConfirmed}
							valueStyle={{color: '#3f8600'}}
							suffix={`(${report.percentConfirmedWithLastWeek}% )`}
						/>
					</Card>
				</Col>
				<Col span={8}>
					<Card>
						<Statistic
							title="Đơn hàng bị hủy"
							value={report.totalCancelled}
							valueStyle={{color: '#cf1322'}}
							suffix={`(${report.percentCancelledWithLastWeek}%)`}
						/>
					</Card>
				</Col>
			</Row>

			<Table
				dataSource={listDashboard}
				rowKey="id"
				loading={loadingList}
				// rowClassName={(record) => {
				// 	if (record.status === 0) {
				// 		return 'table-pending';
				// 	} else if (record.status === 1) {
				// 		return 'table-succes';
				// 	} else if (record.status === 2) {
				// 		return 'table-cancel';
				// 	} else if (record.status === 3) {
				// 		return 'table-reject';
				// 	}
				// }}
			>
				<Table.Column title="Product ID" dataIndex="productId" key="productId" />

				<Table.Column title="User ID" dataIndex="userId" key="userId" />

				<Table.Column title="Số tiền" dataIndex="amount" key="amount" />

				<Table.Column title="Số lượng" dataIndex="quantity" key="quantity" />

				<Table.Column
					title="Trạng thái"
					dataIndex="status"
					key="status"
					render={(status) => (status === 0 ? 'Đang chờ duyệt' : 'Thành công')}
				/>

				<Table.Column
					title="Ngày tạo"
					dataIndex="createdOn"
					key="createdOn"
					render={(item) => {
						// mm/dd/yyyy
						return new Date(item).toLocaleDateString('en-GB', {
							year: 'numeric',
							month: '2-digit',
							day: '2-digit',
						});
					}}
				/>

				<Table.Column
					title="Ngày cập nhật"
					dataIndex="modifiedOn"
					key="modifiedOn"
					render={(item) => {
						return new Date(item).toLocaleDateString('en-GB', {
							year: 'numeric',
							month: '2-digit',
							day: '2-digit',
						});
					}}
				/>
			</Table>
		</div>
	);
};

export default Dashboard;
