import React, {useState, useEffect} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import axios from '../../utils/axios.js';
import {jwtDecode} from 'jwt-decode';
import {toast, ToastContainer} from 'react-toastify';
import {useParams, useNavigate} from 'react-router-dom';
import './OrderProduct.css';
import coin from '../Assets/coin.png';

export const OrderProduct = () => {
	const {id} = useParams();
	const [data, setData] = useState({});
	const [userData, setUserData] = useState({});
	const [userInfoData, setUserInfoData] = useState({});
	const [userBl, setUserBl] = useState(0);
	const [isAuthorized, setIsAuthorized] = useState(null);
	const navigate = useNavigate();
	const [totalPrice, setTotalPrice] = useState(-1);

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
		const fetchData = async () => {
			try {
				const token = localStorage.getItem('accessToken');
				if (token) {
					const decoded = jwtDecode(token);
					const userId = decoded.nameid;
					const result = await axios.get(`Account/user/${userId}`);
					setUserInfoData(result.data.value);
					setUserBl(result.data.value.userBalance.balance || 0); // Đảm bảo số dư là số
				}
				const productResult = await axios.get(`Product/getDetail/${id}`);

				if (productResult.data.isSuccess) {
					const productData = productResult.data.value;
					setData(productData);

					const userResult = await axios.get(
						`Account/user/${productData.createdBy}?includeBan=true`
					);

					if (userResult.data.isSuccess) {
						setUserData(userResult.data.value);
					} else {
						console.error('Error in response:', userResult.data.error);
					}
				} else {
					console.error('Error in response:', productResult.data.error);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, [id]);

	useEffect(() => {
		if (data.price && userBl) {
			const calculatedTotalPrice = userBl - data.price;
			setTotalPrice(calculatedTotalPrice);

			if (calculatedTotalPrice < 0) {
				window.location.href = 'http://localhost:3000/payment?status=none';
			}
		}
	}, [userBl, data, navigate]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const result = await axios.post('PurchaseTicket/createPurchaseTicket', {
				amount: data.price,
				productId: data.id,
				quantity: 1,
			});

			if (result.data) {
				toast.success('Đặt hàng thành công');
				window.location.href = 'http://localhost:3000/orderpage';
			}
		} catch (error) {
			console.error('Error creating product:', error);
			toast.error(error.message || 'Có lỗi xảy ra khi đặt hàng');
		}
	};

	const handleChat = () => {
		const userId = userData.id;
		localStorage.setItem('receiverId', userId);
		navigate('/chatpage');
		console.log(userId);
	};

	if (isAuthorized === null || totalPrice < 0) {
		return (
			<div className="loading-container">
				<div className="loading-spinner"></div>
			</div>
		);
	} else {
		return (
			<div className="order">
				<Header />
				<div className="order-content">
					<div className="order-form">
						<span className="order-title">Xác thực đơn hàng</span>
						<div className="order-detail">
							<div className="product-image">
								<img src={data.thumbnail} alt={data.name} />
							</div>
							<div className="order-info">
								<p>Tên sản phẩm</p>
								<p>Sản phẩm của</p>
								<p>Số dư trong ví</p>
								<p>Số đồng phải thanh toán</p>
								<p>Số dư còn lại</p>
							</div>
							<div className="order-total">
								<p>{data.name}</p>
								<p>{userData.name}</p>
								<p className="user-balance">
									{userBl}
									<img
										className="coin-order"
										src={coin}
										alt=""
										style={{
											width: '30px',
											height: 'auto',
											transform: 'none',
											marginLeft: '5px',
										}}
									/>
								</p>
								<p className="user-balance-2">
									{data.price}
									<img
										className="coin-order"
										src={coin}
										alt=""
										style={{
											width: '30px',
											height: 'auto',
											transform: 'none',
											marginLeft: '5px',
										}}
									/>
								</p>
								<p
									className="user-balance"
									style={{marginTop: '8px', color: '#32cd32'}}
								>
									{totalPrice}
									<img
										className="coin-order"
										src={coin}
										alt=""
										style={{
											width: '30px',
											height: 'auto',
											transform: 'none',
											marginLeft: '5px',
										}}
									/>
								</p>
								<button className="order-button" onClick={handleSubmit}>
									Tiến hành đặt hàng
								</button>
								<button className="inbox-order" onClick={handleChat}>Nhắn tin với người bán</button>
								<div className="notify-order">
									<span>
										Sau khi tiến hành đặt hàng số đồng trong ví sẽ bị trừ
									</span>
									<span>Bạn hãy nhắn tin với người bán để liên hệ nhận hàng</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
};

export default OrderProduct;
