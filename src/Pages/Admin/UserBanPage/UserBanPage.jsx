import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getListusersBan, updateUserBan} from '../../../redux/slices/userSlice';
import {
	getListUserBanSelector,
	getTotalPageUserBanSelector,
	getLoadingUserBanSelector,
} from '../../../redux/selectors';
import {toast} from 'react-toastify';
import {Table, Button, Pagination} from 'antd';
import './UserBanPage.css';
import {CheckOutlined} from '@ant-design/icons';

export default function UserBanPage() {
	const dispatch = useDispatch();

	const listUserBan = useSelector(getListUserBanSelector);
	const totalPageUserBan = useSelector(getTotalPageUserBanSelector);
	const loading = useSelector(getLoadingUserBanSelector);

	const [userId, setUserId] = React.useState('');
	const [reasonId, setReasonId] = React.useState('');
	const [reason, setReason] = React.useState('');
	const [pageIndex, setPageIndex] = React.useState(1);
	const [pageSize, setPageSize] = React.useState(10);

	React.useEffect(() => {
		dispatch(getListusersBan({userId, reasonId, reason, pageIndex, pageSize})).then((res) => {
			console.log(`res`, res);
			if (res.error) {
				if (res.payload) {
					toast.error(res.payload.message);
				}
			}
		});
	}, [dispatch, userId, reasonId, reason, pageIndex, pageSize]);

	const handleUpdateUserBan = (id) => {
		if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
			dispatch(updateUserBan({id})).then((res) => {
				if (res.error) {
					if (res.payload) {
						toast.error(res.payload.message);
					}
				} else {
					toast.success('Cập nhật thành công');
					dispatch(getListusersBan({userId, reasonId, reason, pageIndex, pageSize}));
				}
			});
		} else {
			return;
		}
	};

	if (listUserBan.length === 0) {
		return <h1>Loading</h1>;
	}

	return (
		<div className="UserBan-Page">
			<h1 style={{color: 'orange'}}>Đơn tố cáo người dùng</h1>

			<Table dataSource={listUserBan} loading={loading} pagination={false}>
				<Table.Column title="ID" dataIndex="id" key="id" />
				<Table.Column title="Người tố cáo" dataIndex="createdBy" key="createdBy" />
				<Table.Column
					title="Tên bị tố"
					dataIndex="user"
					key="user"
					render={(user) => {
						return user.name;
					}}
				/>

				<Table.Column
					title="Email bị tố"
					dataIndex="user"
					key="user"
					render={(user) => {
						return user.email;
					}}
				/>

				<Table.Column
					title="Lí do tố cáo"
					dataIndex="banReason"
					key="banReason"
					render={(reson) => {
						return reson.content;
					}}
				/>

				<Table.Column
					title="Ngày tạo"
					dataIndex="createdOn"
					key="createdOn"
					render={(reson) => {
						return new Date(reson).toLocaleString();
					}}
				/>

				<Table.Column
					align="center"
					title="Hành đông"
					dataIndex="action"
					key="action"
					render={(index, record) => {
						return (
							<Button
								type="primary"
								onClick={() => {
									handleUpdateUserBan(record.id);
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
						);
					}}
				/>
			</Table>

			<Pagination
				className="pagination-page"
				current={pageIndex}
				total={totalPageUserBan}
				onChange={(page) => {
					setPageIndex(page);
				}}
			/>
		</div>
	);
}
