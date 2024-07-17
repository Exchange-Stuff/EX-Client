import React, { useEffect, useState } from 'react';
import './Profile.css';
import {jwtDecode} from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import axios from '../../utils/axios.js';
import { useLocation, useNavigate } from 'react-router-dom';
import coin from '../Assets/coin.png';
import Header from '../Header/Header';
import { Link, useParams } from "react-router-dom";

export const Profile = () => {
	const { id } = useParams();
	const [userBl, setUserBl] = useState(0);
	const [data, setData] = useState([]);
	const [userName, setUsername] = useState('');
	const [userCurrentData, setUserCurrentData] = useState('');
	const [isAuthorized, setIsAuthorized] = useState(null);
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
			navigate('/login');
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
					} else {
						const productResult = await axios.get(`/Product/getOtherUserProducts/${id}`);
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
		return null;
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
						<Link to={`/productdetail/${list.id}`} style={{ textDecoration: 'none' }}>
							<div className="img-overflow">
								<div className="img-container-profile">
									<img src={list.thumbnail} alt={list.name} />
								</div>
							</div>

							<div className="detail-container-profile">
								<div className="left-column-profile">
									<h3>{list.name}</h3>
									<p style={{ width: '300px' }}></p>
								</div>
							</div>
						</Link>
					</li>
				))}
			</ul>

			<ToastContainer />
		</div>
	);
};

export default Profile;
