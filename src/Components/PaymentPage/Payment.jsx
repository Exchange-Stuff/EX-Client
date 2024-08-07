import React, {useState, useEffect} from 'react';
import axios from '../../utils/axios.js';
import {toast, ToastContainer} from 'react-toastify';
import {useLocation, useNavigate} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Payment.css';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import Coin from '../Assets/coin.jpg';
import Coin100 from '../Assets/coin100.png';
import Coin50 from '../Assets/coin50.png';
import Coin200 from '../Assets/coin200.png';

export const Payment = () => {
	const [amount, setSelectedAmount] = useState('');
	const [isAuthorized, setIsAuthorized] = useState('');
	const navigate = useNavigate();
	const location = useLocation();

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
			navigate('/homepage');
		}
	}, [isAuthorized, navigate]);

	useEffect(() => {
		const status = new URLSearchParams(location.search).get('status');
		if (status) {
			if (status === 'success') {
				toast.success('Giao dịch thành công!', {autoClose: 1500});
			} else if (status === 'fail') {
				toast.error('Giao dịch thất bại', {autoClose: 1500});
			} else if (status === 'none') {
				toast.error('Bạn không đủ xu', {autoClose: 1500});
			}
			else if (status === 'error') {
				toast.error('Có lỗi xảy ra khi thanh toán.');
			}
			navigate(location.pathname, {replace: true});
		}
	}, [location.search, navigate]);

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

	if (!isAuthorized) {
		return (
			<div>
				<div className="loading-container">
					<div className="loading-spinner"></div>
				</div>
			</div>
		);
	}

	if (isAuthorized === null) {
		return (
			<div className="loading-container">
				<div className="loading-spinner"></div>
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
							src={Coin50}
							alt="Gói 50k"
							onClick={() => handleSelect(50)}
							className={amount === 50 ? 'selected' : ''}
						/>
						<img
							src={Coin100}
							alt="Gói 100k"
							onClick={() => handleSelect(100)}
							className={amount === 100 ? 'selected' : ''}
						/>
						<img
							src={Coin200}
							alt="Gói 200"
							onClick={() => handleSelect(200)}
							className={amount === 200 ? 'selected' : ''}
						/>
						<img
							src={Coin}
							alt="Gói 500k"
							onClick={() => handleSelect(500)}
							className={amount === 500 ? 'selected' : ''}
						/>
					</div>

					<button className="button-payment" type="button" onClick={handlePayment}>
						Thanh toán
					</button>
				</form>
			</div>
			<Footer />
		</div>
	);
};
