import React from 'react';
import {Card, Col, Row, Statistic, Table} from 'antd';
import './Dashboard.css';

const Dashboard = () => {
	const data = {
		value: {
			totalCancelled: 0,
			percentCancelledWithLastWeek: 0,
			totalConfirmed: 0,
			percentConfirmedWithLastWeek: 0,
			totalTicket: 1,
			percentTotalWithLastWeek: -75,
		},
		list_purchase: [
			{
				amount: 321,
				productId: '555c87b2-d06f-4034-8fdf-906b6acbf015',
				userId: '180547f5-9586-4fcb-a9d8-75cc9fcf8cf6',
				quantity: 1,
				product: null,
				status: 0,
				createdOn: '2024-07-22T20:11:30.7780531',
				modifiedOn: '2024-07-22T20:11:30.7780891',
				id: '0b0635fa-4020-4201-d5f2-08dcaa4fcd89',
			},
		],
	};
	// Destructure the relevant data
	const {
		totalCancelled,
		percentCancelledWithLastWeek,
		totalConfirmed,
		percentConfirmedWithLastWeek,
		totalTicket,
		percentTotalWithLastWeek,
	} = data.value;

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
							title="Total Tickets"
							value={totalTicket}
							valueStyle={{color: '#3f8600'}}
							suffix={`(${percentTotalWithLastWeek}% from last week)`}
						/>
					</Card>
				</Col>
				<Col span={8}>
					<Card>
						<Statistic
							title="Total Confirmed"
							value={totalConfirmed}
							valueStyle={{color: '#3f8600'}}
							suffix={`(${percentConfirmedWithLastWeek}% from last week)`}
						/>
					</Card>
				</Col>
				<Col span={8}>
					<Card>
						<Statistic
							title="Total Cancelled"
							value={totalCancelled}
							valueStyle={{color: '#cf1322'}}
							suffix={`(${percentCancelledWithLastWeek}% from last week)`}
						/>
					</Card>
				</Col>
			</Row>
			<Table
				dataSource={data.list_purchase}
				rowKey="id"
				rowClassName={(record) => {
					if (record.status === 0) {
						return 'table-pending';
					} else if (record.status === 1) {
						return 'table-succes';
					} else if (record.status === 2) {
						return 'table-cancel';
					} else if (record.status === 3) {
						return 'table-reject';
					}
				}}
			>
				<Table.Column title="Product ID" dataIndex="productId" key="productId" />

				<Table.Column title="User ID" dataIndex="userId" key="userId" />

				<Table.Column title="Amount" dataIndex="amount" key="amount" />

				<Table.Column title="Quantity" dataIndex="quantity" key="quantity" />

				<Table.Column
					title="Status"
					dataIndex="status"
					key="status"
					render={(status) => (status === 0 ? 'Đang chờ duyệt' : 'Thành công')}
				/>

				<Table.Column title="Created On" dataIndex="createdOn" key="createdOn" />
				<Table.Column title="Modified On" dataIndex="modifiedOn" key="modifiedOn" />
			</Table>
		</div>
	);
};

export default Dashboard;
