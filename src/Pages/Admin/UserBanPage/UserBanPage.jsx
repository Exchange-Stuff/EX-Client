import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getListusersBan} from '../../../redux/slices/userSlice';
import {getListUserBanSelector, getTotalPageUserBanSelector} from '../../../redux/selectors';

export default function UserBanPage() {
	const dispatch = useDispatch();

	const listUserBan = useSelector(getListUserBanSelector);
	const totalPageUserBan = useSelector(getTotalPageUserBanSelector);

	const [userId, setUserId] = React.useState('');
	const [reasonId, setReasonId] = React.useState('');
	const [reason, setReason] = React.useState('');
	const [pageIndex, setPageIndex] = React.useState(1);
	const [pageSize, setPageSize] = React.useState(10);

	React.useEffect(() => {
		dispatch(getListusersBan({userId, reasonId, reason, pageIndex, pageSize}));
	}, [dispatch, userId, reasonId, reason, pageIndex, pageSize]);

	return <div>UserBanPage</div>;
}
