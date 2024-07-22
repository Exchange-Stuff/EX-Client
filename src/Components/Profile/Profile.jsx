import React, {useEffect, useState} from 'react';
import './Profile.css';
import {jwtDecode} from 'jwt-decode';
import {toast, ToastContainer} from 'react-toastify';
import axios from '../../utils/axios.js';
import {useLocation, useNavigate} from 'react-router-dom';
import coin from '../Assets/coin.png';
import Header from '../Header/Header';
import {Link, useParams} from 'react-router-dom';
import Modal from 'react-modal';
import {Table, Select, Pagination, Rate} from 'antd';

Modal.setAppElement('#root');

export const Profile = () => {
	const {id} = useParams();
	const [userBl, setUserBl] = useState(0);
	const [data, setData] = useState([]);
	const [userName, setUsername] = useState('');
	const [userCurrentData, setUserCurrentData] = useState('');
	const [isAuthorized, setIsAuthorized] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [rating, setRating] = useState(0);
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
					setUserCurrentData(userResult.data.value);

					const result = await axios.get(`Account/user/${id}`);
					setUsername(result.data.value);
					setUserBl(result.data.value.userBalance.balance);

					if (userResult.data.value.id === result.data.value.id) {
						const productResult = await axios.get('/Product/getProductByUserId');
						setData(productResult.data.value);
						console.log(productResult.data.value);
					} else {
						const productResult = await axios.get(
							`/Product/getOtherUserProducts/${id}`
						);
						setData(productResult.data.value);
					}
				}
			} catch (error) {
				console.error('Error fetching data:', error);
				toast.error('Có lỗi xảy ra khi lấy dữ liệu');
			}
		};

		if (isAuthorized) {
			fetchData();
		}
	}, [isAuthorized, id]);

	const closeModal = () => setIsModalOpen(false);

	const handleRatingChange = (value) => {
		setRating(value);
		console.log(`Rating: ${value}`);
	};

	const submitRating = async () => {
		try {
			// await axios.post('/Rating/create-rating', {
			// 	purchaseTicketId: selectedPurchaseTicketId,
			// 	content: content,
			// 	evaluateType: rating,
			// });
			toast.success('Đánh giá thành công', {autoClose: 1500});
			closeModal();
		} catch (error) {
			console.error('Error submitting rating:', error);
			toast.error('Đánh giá thất bại', {autoClose: 1500});
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

	if (!isAuthorized) {
		return (
			<div>
				<div className="loading-container">
					<div className="loading-spinner"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="profile-container">
			<Header />
			<main className="profile-content">
				<div className="profile-header">
					<div className="profile-initials">
						<img src={userName.thumbnail} alt="Product Thumbnail" />
					</div>
				</div>
				<div className="profile-info">
					<h1>{userName.name}</h1>
					<p>{userName.email}</p>
					{userName.id === userCurrentData.id && (
						<div className="content-profile-balance">
							<div className="profile-blance">
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
					)}
				</div>
			</main>

			<div className="header-profile">
				<div className="created-profile">Đã tạo</div>
			</div>

			<div className="data-profile"></div>
			<ul className="list-container-profile">
				{data.map((list) => (
					<li key={list.id} className="list-item-profile">
						<Link to={`/productdetail/${list.id}`} style={{textDecoration: 'none'}}>
							<div className="img-overflow">
								<div className="img-container-profile">
									<img src={list.thumbnail} alt={list.name} />
								</div>
							</div>

							<div className="detail-container-profile">
								<div className="left-column-profile">
									<h3>{list.name}</h3>
									<p style={{width: '300px'}}></p>
								</div>
							</div>
						</Link>
					</li>
				))}
			</ul>

			<Modal
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				contentLabel="Rate Product"
				className="modal-orderpage"
				overlayClassName="overlay"
			>
				<h2>Đánh giá sản phẩm</h2>
				<Rate onChange={handleRatingChange} value={rating} />
				<input
					type="text"
					value={""}
					placeholder="Nhập nội dung đánh giá"
					style={{margin: '10px 0', width: '100%'}}
				/>
				<div>
					<button className="sent-rating-order" onClick={submitRating}>
						Gửi đánh giá
					</button>
					<button className="sent-rating-order" onClick={closeModal}>
						Đóng
					</button>
				</div>
			</Modal>

		</div>
	);
};

export default Profile;
