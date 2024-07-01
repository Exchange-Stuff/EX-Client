import React, {useEffect, useState} from 'react';
import './UserList.component.css';
import {useDispatch, useSelector} from 'react-redux';
import {
	getAllUserSelector,
	getLoadingUserSelector,
	getTotalPageSelector,
} from '../../redux/selectors';
import {fetchUsers} from '../../redux/slices/userSlice';
import {Pagination, Input, Row, Col, Table} from 'antd';

export const UserList = () => {
	const dispatch = useDispatch();

	const [pageSize, setPageSize] = useState(10);
	const [pageIndex, setPageIndex] = useState(1);
	const [includeBan, setIncludeBan] = useState(false);
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');

	const loading = useSelector(getLoadingUserSelector);
	const totalPage = useSelector(getTotalPageSelector);
	const listUser = useSelector(getAllUserSelector);

	useEffect(() => {
		dispatch(fetchUsers({name, username, pageIndex, pageSize, includeBan}));
	}, [dispatch, name, username, pageIndex, pageSize, includeBan]);

	return (
		<div>
			<h2>Manage User</h2>

			<Row className="user-list-filter">
				<Col span={6}>
					<Input
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Col>

				<Col span={6}>
					<Input
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</Col>

				<Col span={6}>
					<Input
						type="checkbox"
						checked={includeBan}
						onChange={(e) => setIncludeBan(e.target.checked)}
					/>
					<span>Include Ban</span>
				</Col>
			</Row>

			<table>
				<thead>
					<tr>
						<th>Username</th>
						<th>Name</th>
						<th>Email</th>
						<th>Phone</th>
						<th>Thumbnail</th>
						<th>Address</th>
						<th>Gender</th>
						<th>Campus</th>
						<th>Balance</th>
					</tr>
				</thead>
				<tbody>
					{listUser.map((user, index) => (
						<tr key={index}>
							<td>{user.username}</td>
							<td>{user.name}</td>
							<td>{user.email}</td>
							<td>{user.phone}</td>
							<td>
								<img src={user.thumbnail} alt="thumbnail" />
							</td>
							<td>{user.address}</td>
							<td>{user.gender}</td>
							<td>{user.campus}</td>
							<td>{user.userBalance.balance}</td>
						</tr>
					))}
				</tbody>
			</table>

			<Pagination
				className="user-list-pagination"
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
};
export default UserList;
