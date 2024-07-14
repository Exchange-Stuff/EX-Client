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
import {storage} from '../Firebase/firebase.js';

export const FinancicalTicket = () => {
	const [imageFiles, setImageFiles] = useState([]);
	const [amount, setAmount] = useState(localStorage.getItem('amount') || 0);
	const [userBl, setUserBl] = useState(0);
	const [userId, setUserId] = useState('');

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
				} else {
					toast.error('Bạn chưa đăng nhập');
					window.location.href = 'http://localhost:3000/login';
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
					toast.success('Gửi đơn rút tiền thành công');
					localStorage.removeItem('amount');
					localStorage.removeItem('selectedImages');
					setTimeout(() => {
						window.location.href = 'http://localhost:3000/financicalTicket';
					}, 3000);
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
				// Lỗi phản hồi từ máy chủ
				if (error.response.status === 400) {
					toast.error('Không đủ tiền trong ví');
				} else {
					toast.error(`Lỗi từ máy chủ: ${error.response.data.message || error.message}`);
				}
			} else if (error.request) {
				// Lỗi yêu cầu mà không có phản hồi
				toast.error('Không nhận được phản hồi từ máy chủ');
			} else {
				// Lỗi khi thiết lập yêu cầu
				toast.error(`Có lỗi xảy ra: ${error.message}`);
			}
		}
	};

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
			<ToastContainer />
		</div>
	);
};
