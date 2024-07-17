import React, {useEffect, useState} from 'react';
import './UserList.component.css';
import {useDispatch, useSelector} from 'react-redux';
import {
	getAllUserSelector,
	getLoadingUserSelector,
	getTotalPageSelector,
} from '../../redux/selectors';
import {fetchUsers} from '../../redux/slices/userSlice';
import {Pagination, Input, Table, Button} from 'antd';
import {toast} from 'react-toastify';
import {DeleteOutlined} from '@ant-design/icons';

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
		try {
			dispatch(fetchUsers({name, username, pageIndex, pageSize, includeBan})).then((res) => {
				if (res.error) {
					toast.error('Lỗi khi lấy dữ liệu');
				}
				console.log('res', res);
			});
		} catch (error) {
			console.log('error', error);
		}
	}, [dispatch, name, username, pageIndex, pageSize, includeBan]);

	return (
		<div>
			<h2>Quản lí tài khoản</h2>

			<div className="user-list-filter">
				<Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
				<Input
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>

				<Button
					type="primary"
					onClick={() => {
						setIncludeBan(!includeBan);
					}}
				>
					{includeBan ? 'Không bao gồm tài khoản bị khóa' : 'Bao gồm tài khoản bị khóa'}
				</Button>
			</div>

			<Table dataSource={listUser} loading={loading}>
				<Table.Column title="Username" dataIndex="username" key="username" />
				<Table.Column title="Name" dataIndex="name" key="name" />
				<Table.Column title="Email" dataIndex="email" key="email" />
				<Table.Column
					align="center"
					title="Ảnh đại diện"
					dataIndex="thumbnail"
					key="thumbnail"
					render={(thumbnail) => (
						<img
							src={thumbnail}
							alt="thumbnail"
							style={{width: '50px', height: '50px'}}
						/>
					)}
				/>
				<Table.Column title="Student ID" dataIndex="studentId" key="studentId" />
				<Table.Column title="Địa chỉ" dataIndex="address" key="address" />
				<Table.Column title="Giới tính" dataIndex="gender" key="gender" />
				<Table.Column
					title="Hành động"
					key="action"
					render={() => (
						<div className="user-table-action">
							<Button
								type="primary"
								icon={
									<DeleteOutlined
										style={{
											color: 'red',
										}}
									/>
								}
							></Button>

							<Button
								type="primary"
								danger
								icon={
									<DeleteOutlined
										style={{
											color: 'red',
										}}
									/>
								}
							></Button>
						</div>
					)}
				/>
			</Table>

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
