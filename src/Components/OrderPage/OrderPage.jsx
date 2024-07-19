import React, {useState, useEffect} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import axios from '../../utils/axios.js';
import {jwtDecode} from 'jwt-decode';
import {toast, ToastContainer} from 'react-toastify';
import {useParams, useNavigate} from 'react-router-dom';
import {Table, Select} from 'antd';
import './OrderPage.css';

const {Option} = Select;

const columns = [
	{
		title: 'Product ID',
		dataIndex: 'productId',
		key: 'productId',
		width: 150,
	},
	{
		title: 'Amount',
		dataIndex: 'amount',
		key: 'amount',
		width: 150,
	},
	{
		title: 'Status',
		dataIndex: 'status',
		key: 'status',
		width: 150,
	},
	{
		title: 'Action',
		key: 'operation',
		fixed: 'right',
		width: 100,
		render: () => <a style={{color: '#ff8c00'}}>action</a>,
	},
];

export const OrderPage = () => {
	const {id} = useParams();
	const [data, setData] = useState([]);
	const [isAuthorized, setIsAuthorized] = useState(null);
	const navigate = useNavigate();
	const [status, setStatus] = useState('Pending');

	useEffect(() => {
		const checkUserScreenAccess = async () => {
			try {
				const response = await axios.post('Auth/screen', {
					resource: 'UserScreen',
				});
				if (response.data.isSuccess) {
					setIsAuthorized(true);
				} else {
					setIsAuthorized(false);
				}
			} catch (error) {
				console.error('Error checking user screen access:', error);
				setIsAuthorized(false);
			}
		};

		checkUserScreenAccess();
	}, []);

	useEffect(() => {
		if (isAuthorized === false) {
			navigate('/homepage');
		}
	}, [isAuthorized, navigate]);

	useEffect(() => {
		window.scrollTo(0, 0);

		const fetchData = async () => {
			try {
				const token = localStorage.getItem('accessToken');
				if (token) {
					const decoded = jwtDecode(token);
					const userId = decoded.nameid;
					console.log(userId);
					await axios.get(`Account/user/${userId}`);

					const purchaseTicket = await axios.get(
						`PurchaseTicket/getListPurchaseTicketByUserId/10/1/0`
					);
					setData(purchaseTicket.data.value);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, [id]);

	const handleStatusChange = async (value) => {
		const purchaseTicket = await axios.get(
			`PurchaseTicket/getListPurchaseTicketByUserId/10/1/${value}`
		);
		setData(purchaseTicket.data.value);
	};

	if (!isAuthorized) {
		return (
			<div>
				<div className="loading-container">
					<div className="loading-spinner"></div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="orderpage">
				<Header />
				<div className="orderpage-content">
					<h2 style={{color: '#ff8c00'}}>Lịch sử mua hàng</h2>
					<div className="status-filter">
						<span>Status</span>
						<Select
							defaultValue="Pending"
							onChange={handleStatusChange}
							style={{width: 120, marginLeft: 10}}
						>
							<Option value="0">Processing</Option>
							<Option value="1">Cancelled</Option>
							<Option value="2">Confirmed</Option>
						</Select>
					</div>
					<div className="orderpage-form">
						<Table
							columns={columns}
							dataSource={data}
							scroll={{x: 1000, y: 300}}
							className="order-table"
						/>
					</div>
				</div>
				<Footer />
				<ToastContainer />
			</div>
		);
	}
};

export default OrderPage;
