import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './financialList.component.css';
import {useDispatch, useSelector} from 'react-redux';
import {getAllFinancialSelector, getLoadingFinancialSelector} from '../../redux/selectors';
import {fetchFinancial} from '../../redux/slices/financialSlice';

export const FinancialList = () => {
	const dispatch = useDispatch();

	const [pageSize, setPageSize] = useState(10);
	const [pageIndex, setPageIndex] = useState(1);
	const [status, setStatus] = useState(0);

	useEffect(() => {
		dispatch(fetchFinancial({pageIndex, pageSize, status}));
	}, [pageIndex, pageSize, status, dispatch]);

	const listFinancial = useSelector(getAllFinancialSelector);
	const loading = useSelector(getLoadingFinancialSelector);

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
			<table className="financial-table">
				<thead>
					<tr>
						<th>User Name</th>
						<th>Email</th>
						<th>Amount</th>
						<th>Image QR Code</th>
						<th>Status</th>
						<th>Created On</th>
						<th>Modified On</th>
						{status == 0 && <th>Action</th>}
					</tr>
				</thead>
				<tbody>
					{loading === true
						? listFinancial.map((item, index) => (
								<tr key={index}>
									<td>{item.user.name}</td>
									<td>{item.user.email}</td>
									<td>{item.amount}</td>
									<td>{item.imageQRCode}</td>
									<td>
										{item.status === 0
											? 'Pending'
											: item.status === 1
											? 'Success'
											: 'Failed'}
									</td>
									<td>
										{new Date(item.createdOn).toLocaleDateString() +
											' ' +
											new Date(item.createdOn).toLocaleTimeString()}
									</td>
									<td>
										{new Date(item.modifiedOn).toLocaleDateString() +
											' ' +
											new Date(item.modifiedOn).toLocaleTimeString()}
									</td>

									{item.status === 0 && (
										<td>
											<button
												className="financial-button button-approve"
												onClick={() => handleUpdate(item.id, 1)}
											>
												Approved
											</button>
											<button
												className="financial-button button-reject"
												onClick={() => handleUpdate(item.id, 2)}
											>
												Reject
											</button>
										</td>
									)}
								</tr>
						  ))
						: 'Loading...'}
				</tbody>
			</table>
			<div className="financial-paging">
				<button onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>
				<button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
			</div>
		</div>
	);
};
