import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getProductBanList} from '../../../redux/slices/productSlice';
import {
	getProductBanListSelector,
	getLoadingProductBanSelector,
	getTotalPageProductBanSelector,
} from '../../../redux/selectors';

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
		dispatch(getProductBanList({productId, reasonId, reason, pageIndex, pageSize}));
	}, [dispatch, productId, reasonId, reason, pageIndex, pageSize]);

	return <div>ProductBanPage</div>;
}
