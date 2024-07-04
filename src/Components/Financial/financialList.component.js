import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './financialList.component.css';
import {useDispatch, useSelector} from 'react-redux';
import {getAllFinancialSelector, getLoadingFinancialSelector} from '../../redux/selectors';
import {fetchFinancial} from '../../redux/slices/financialSlice';
import {Table} from 'antd';

export const FinancialList = () => {
	const dispatch = useDispatch();

	const [pageSize, setPageSize] = useState(10);
	const [pageIndex, setPageIndex] = useState(1);
	const [status, setStatus] = useState(0);

	const listFinancial = useSelector(getAllFinancialSelector);
	const loading = useSelector(getLoadingFinancialSelector);

	useEffect(() => {
		dispatch(fetchFinancial({pageIndex, pageSize, status})).then((res) => {
			console.log('res', res);
		});
	}, [pageIndex, pageSize, status, dispatch]);

	const handleUpdate = async (id, status) => {
		// confirm
		const confirm = window.confirm('Are you sure?');
		if (!confirm) return;
		try {
			try {
				const data = await axios.put(
					`http://localhost:5059/api/FinancialTicket/UpdateFinancialTicket`,
					{
						id,
						status,
					}
				);
				if (data) {
					alert('Update success');
					window.location.reload();
				}
			} catch (error) {
				console.error('Error updating data:', error);
			}
		} catch (error) {
			console.error('Error updating data:', error);
			alert('Update failed');
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
			<Table></Table>
			<div className="financial-paging">
				<button onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>
				<button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
			</div>
		</div>
	);
};
