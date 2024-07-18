import React, {useEffect, useState, useRef} from 'react';
import './Header.css';
import {Link, useNavigate} from 'react-router-dom';
import logo from '../Assets/logo.png';
import {jwtDecode} from 'jwt-decode';
import axios from '../../utils/axios.js';
import {Input, Space} from 'antd';
import {FaSearch} from 'react-icons/fa';
import {FaBell, FaFacebookMessenger} from 'react-icons/fa';
import {HubConnectionBuilder, HubConnectionState} from '@microsoft/signalr';

const Header = ({handleLoginClick}) => {
	const [userInfo, setUserInfo] = useState([]);
	const [userImg, setUserImg] = useState([]);
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const dropdownRef = useRef(null);
	const [searchKeyword, setSearchKeyword] = useState('');
	const navigate = useNavigate();
	const [listNotification, setListNotification] = useState(['123',"adsgufkao ieof fhaiwoe hfasdlfhw"]);
	const [notificationConnection, setNotificationConnection] = useState();

	const connectNotification = async () => {
		try {
			const conn = new HubConnectionBuilder()
				.withUrl('http://localhost:5059/esnotification')
				.build();
			conn.on('ReceiveNotification', (msg) => {
				setListNotification((listNotification) => [...listNotification, msg]);
			});
			await conn.start();

			setNotificationConnection(conn);
		} catch (error) {
			console.log('try catch', error);
		}
	};

	const handleSearch = () => {
		navigate(`/search/${encodeURIComponent(searchKeyword)}`);
	};

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			handleSearch();
		}
	};

	const isLogin = localStorage.getItem('accessToken');

	useEffect(() => {
		try {
			const token = localStorage.getItem('accessToken');
			if (token) {
				const decoded = jwtDecode(token);
				console.log(decoded);
				setUserInfo(decoded);
			}
		} catch (err) {
			console.error(err);
		}
	}, []);

	useEffect(() => {
		const getUserBl = async () => {
			try {
				const userId = userInfo.nameid;
				console.log(userId);
				const result = await axios.get(`/Account/user/${userId}`);
				console.log(result);
				if (result.data.value === null) {
					console.error('User not found');
					return;
				}
				setUserImg(result.data.value);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		if (userInfo.nameid) {
			getUserBl();
		}
	}, [userInfo]);

	const toggleDropdown = () => {
		setDropdownVisible(!dropdownVisible);
	};

	const handleClickOutside = (event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			setDropdownVisible(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('productDescription');
		localStorage.removeItem('selectedCategory');
		localStorage.removeItem('selectedImages');
		localStorage.removeItem('productPrice');
		localStorage.removeItem('productName');
		localStorage.removeItem('persist:root');
		navigate('/login');
	};

	return (
		<div className="header-homepage">
			<Link to="/homepage" className="trangchu">
				<img src={logo} alt="Trang chủ" className="logo" />
			</Link>
			<Link to="/productByCategory/18286bfd-96b0-4536-9ebb-6a526281bd90" className="category">
				Đồ điện tử
			</Link>
			<Link to="/productByCategory/0736139a-3e11-4847-ae7f-51348f6e6a74" className="category">
				Quần áo
			</Link>
			<Link to="/productByCategory/d6c3e8cf-0a73-4fb3-a843-56e8b8c56b72" className="category">
				Dụng cụ học tập
			</Link>
			<Link to="/productByCategory/9a41c85b-57f5-4d8c-92b6-8b16e55fb1dc" className="category">
				Giày dép
			</Link>
			<Link to="/productByCategory/9a41c85b-57f5-4d8c-92b6-8b16e55fb1dc" className="category">
				Khác
			</Link>
			<div className="search-input-header">
				<input
					type="text"
					placeholder="Nhập từ khóa cần tìm..."
					style={{
						width: 250,
						height: 40,
						padding: 15,
						fontSize: 14,
						border: '1px solid #ccc',
						borderRadius: 20,
					}}
					value={searchKeyword}
					onChange={(e) => setSearchKeyword(e.target.value)}
					onKeyPress={handleKeyPress}
				/>
				<button className="search-button" onClick={handleSearch}>
					<FaSearch />
				</button>
			</div>
			<Link to="/postproduct" className="post-button">
				Đăng sản phẩm
			</Link>
			{isLogin && (
				<div className="dropdown-user" ref={dropdownRef}>
					<img
						src={userImg.thumbnail}
						alt=""
						className="header-img-user"
						onClick={toggleDropdown}
					/>
					{dropdownVisible && (
						<div className="dropdown">
							<Link to={`/profile/${userInfo.nameid}`} className="dropdown-item-1">
								Trang cá nhân
							</Link>
							<Link to="/orderpage" className="dropdown-item-2">
								Lịch sử mua hàng
							</Link>
							<Link to="/transactionHistory" className="dropdown-item-2">
								Lịch sử giao dịch
							</Link>
							<Link to="/payment" className="dropdown-item-2">
								Mua xu
							</Link>
							<Link to="/financicalTicket" className="dropdown-item-2">
								Rút tiền
							</Link>
							<div onClick={handleLogout} className="dropdown-item-2">
								Logout
							</div>
						</div>
					)}
				</div>
			)}

			<div className="chat-notification">
				<div className="notification">
					<FaBell className="notification-icon" />
					<div className="notification-dropdown">
						{listNotification.length == 0 ? (
							<div className="notification-item">No notification</div>
						) : (
							listNotification.map((item, index) => {
								return (
									<div className="notification-item" key={index}>
										{item}
									</div>
								);
							})
						)}
					</div>
				</div>
				<Link to={'/chatpage'} className="chat">
					<FaFacebookMessenger />
				</Link>
			</div>
		</div>
	);
};

export default Header;
