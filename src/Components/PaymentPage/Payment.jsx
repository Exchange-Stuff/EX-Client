import React, {useState, useEffect} from 'react';
import axios from '../../utils/axios.js';
import {toast, ToastContainer} from 'react-toastify';
import {useLocation, useNavigate} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Payment.css';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import Coin from '../Assets/coin.jpg';

export const Payment = () => {
	const [amount, setSelectedAmount] = useState(null);
	const [isAuthorized, setIsAuthorized] = useState(null); // null for loading state
	const location = useLocation();
	const navigate = useNavigate();

	const handleSelect = (amount) => {
		setSelectedAmount(amount);
		console.log(amount);
	};

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
			navigate('/login');
		}
	}, [isAuthorized, navigate]);

	useEffect(() => {
		const status = new URLSearchParams(location.search).get('status');
		if (status === 'success') {
			toast.success('Giao dịch thành công!');
		} else if (status === 'fail') {
			toast.error('Giao dịch thất bại');
		} else if (status === 'error') {
			toast.error('Có lỗi xảy ra khi thanh toán.');
		}
	}, [location.search]);

	const handlePayment = async () => {
		if (!amount) {
			toast.error('Vui lòng chọn một gói thanh toán');
			return;
		}

		try {
			const response = await axios.get(`http://localhost:5059/api/VNPay/createPaymentUrl`, {
				params: {amount},
			});

			window.location.href = response.data;
		} catch (error) {
			console.error('Error creating payment:', error);
			toast.error('Có lỗi xảy ra khi tạo thanh toán');
		}
	};

	if (isAuthorized === null) {
		return (
			<div>
				<div className="loading-container">
					<div className="loading-spinner"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="payment-container">
			<Header />
			<div className="payment-content">
				<form className="payment-form">
					<div className="title-payment">
						<p>Chọn gói</p>
					</div>
					<div className="select-payment">
						<img
							src={Coin}
							alt="Gói 100k"
							onClick={() => handleSelect(100)}
							className={amount === 100 ? 'selected' : ''}
						/>
						<img
							src={Coin}
							alt="Gói 200k"
							onClick={() => handleSelect(200)}
							className={amount === 200 ? 'selected' : ''}
						/>
						<img
							src={Coin}
							alt="Gói 300k"
							onClick={() => handleSelect(300)}
							className={amount === 300 ? 'selected' : ''}
						/>
						<img
							src={Coin}
							alt="Gói 400k"
							onClick={() => handleSelect(400)}
							className={amount === 400 ? 'selected' : ''}
						/>
					</div>
					<button className="button-payment" type="button" onClick={handlePayment}>
						Thanh toán
					</button>
				</form>
			</div>
			<Footer />
			<ToastContainer />
		</div>
	);
};
