import React, {useState, useEffect} from 'react';
import './FinancicalTicket.css';
import Header from '../Header/Header';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Input} from 'antd';
import axios from '../../utils/axios.js';
import UploadImage from '../UploadImage/UploadImage';
import Footer from '../Footer/Footer';
import {jwtDecode} from 'jwt-decode';
import coin from '../Assets/coin.png';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {useLocation, useNavigate} from 'react-router-dom';
import {storage} from '../Firebase/firebase.js';

export const FinancicalTicket = () => {
	const [imageFiles, setImageFiles] = useState([]);
	const [amount, setAmount] = useState(localStorage.getItem('amount') || 0);
	const [userBl, setUserBl] = useState(0);
	const [userId, setUserId] = useState('');
	const [loading, setLoading] = useState(false);
	const [isAuthorized, setIsAuthorized] = useState(null); // null for loading state
	const navigate = useNavigate();

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
					const userResult = await axios.get(`Account/user/${userId}`);
					console.log(userResult.data.value);
					setUserId(userId);
					setUserBl(userResult.data.value.userBalance.balance);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
				toast.error('Có lỗi xảy ra khi lấy dữ liệu');
				window.location.href = 'http://localhost:3000/login';
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		localStorage.setItem('amount', amount);
	}, [amount]);

	const handleAmountChange = (event) => {
		setAmount(event.target.value);
	};

	const handleImageFilesChange = (images) => {
		setImageFiles(images.map((image) => image.file));
	};

	const handleSubmits = async (event) => {
		event.preventDefault();

		setLoading(true);

		try {
			if (imageFiles.length > 0) {
				const imageUrlsPromises = imageFiles.map(async (file) => {
					const storageRef = ref(storage, `images/${file.name}`);
					await uploadBytes(storageRef, file);
					const downloadURL = await getDownloadURL(storageRef);
					return downloadURL;
				});

				const urls = await Promise.all(imageUrlsPromises);

				const imageQRCode = urls[0]; // Lấy URL đầu tiên

				const result = await axios.post('FinancialTicket/createFinancialTicket', {
					amount: amount,
					userId: userId,
					imageQRCode: imageQRCode,
				});

				if (result.data.value === 'True') {
					toast.success('Gửi đơn rút tiền thành công', {autoClose: 1500});
					setTimeout(() => {
						window.location.href = 'http://localhost:3000/financicalTicket';
					}, 1500);
					localStorage.removeItem('amount');
					localStorage.removeItem('selectedImages');
					setAmount(0);
				} else if (result.data.error && result.data.error.code === 400) {
					toast.error('Không đủ tiền trong ví');
				} else {
					toast.error('Có lỗi xảy ra khi xử lý yêu cầu của bạn');
				}
			} else {
				toast.error('Vui lòng chọn ít nhất một hình ảnh');
			}
		} catch (error) {
			console.error('Error creating product:', error);

			if (error.response) {
				if (error.response.status === 400) {
					toast.error('Không đủ tiền trong ví');
				} else {
					toast.error(`Lỗi từ máy chủ: ${error.response.data.message || error.message}`);
				}
			} else if (error.request) {
				toast.error('Không nhận được phản hồi từ máy chủ');
			} else {
				toast.error(`Có lỗi xảy ra: ${error.message}`);
			}
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div>
				<div className="loading-container">
					<div className="loading-spinner"></div>
				</div>
			</div>
		);
	}

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
			<div className="financial-ticket-container">
				<Header />
				<h2>Rút tiền</h2>
				<div className="financial-ticket-balance">
					<div className="financial-ticket-blance">
						<img
							className="coin-image-profile"
							src={coin}
							alt=""
							style={{
								width: '38px',
								height: '35px',
								transform: 'none',
								marginRight: '3px',
							}}
						/>
						<div className="coin-profile">{userBl}</div>
					</div>
				</div>
				<div className="financial-ticket-content">
					<UploadImage onImageFilesChange={handleImageFilesChange} />
					<form className="financial-ticket-form" onSubmit={handleSubmits}>
						<label>Số tiền muốn rút</label>

						<Input
							type="number"
							placeholder="Giá bán"
							style={{height: '50px', marginTop: '5px'}}
							value={amount}
							onChange={handleAmountChange}
							required
						/>
						<button type="submit">Gửi đơn</button>
					</form>
				</div>
				<Footer />
			</div>
		);
	}
};
