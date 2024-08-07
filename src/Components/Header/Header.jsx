import React, {useEffect, useState, useRef} from 'react';
import './Header.css';
import {Link, useNavigate} from 'react-router-dom';
import logo from '../Assets/logo.png';
import {jwtDecode} from 'jwt-decode';
import axios from '../../utils/axios.js';
import {FaSearch, FaBell, FaFacebookMessenger} from 'react-icons/fa';
import {HubConnectionBuilder} from '@microsoft/signalr';

const Header = ({handleLoginClick}) => {
	const [userInfo, setUserInfo] = useState([]);
	const [userImg, setUserImg] = useState([]);
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const dropdownRef = useRef(null);
	const [searchKeyword, setSearchKeyword] = useState('');
	const navigate = useNavigate();
	const [listNotification, setListNotification] = useState([]);
	const [notificationConnection, setNotificationConnection] = useState();
	const [unreadCount, setUnreadCount] = useState(0);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const connectNotification = async () => {
		try {
			const accessToken = localStorage.getItem('accessToken');
			const conn = new HubConnectionBuilder()
				.withUrl('http://localhost:5059/esnotification', {
					accessTokenFactory: () => accessToken,
				})
				.build();

			conn.on('ReceiveNotification', (message) => {
				console.log('New notification received: ', message);
				setListNotification((prevNotifications) => [...prevNotifications, message]);
			});

			await conn.start();
			console.log('Notification connection established');
			setNotificationConnection(conn);
		} catch (error) {
			console.log('Error establishing notification connection:', error);
		}
	};

	const fetchNotifications = async () => {
		try {
			const response = await axios.get(`http://localhost:5059/api/Notification/userId`);
			if (response.data.isSuccess) {
				console.log('Notifications fetched: ', response.data.value.listItem);
				setListNotification(response.data.value.listItem);
			}
		} catch (error) {
			console.error('Error fetching notifications:', error);
		}
	};

	useEffect(() => {
		const countUnread = listNotification.filter((notification) => !notification.isRead).length;
		setUnreadCount(countUnread);
	}, [listNotification]);

	useEffect(() => {
		connectNotification();
		fetchNotifications();
	}, []);

	const handleIconClick = () => {
		setIsDropdownOpen(!isDropdownOpen);

		// Nếu dropdown được mở, đánh dấu tất cả thông báo là đã đọc
		if (!isDropdownOpen) {
			setListNotification((prevNotifications) =>
				prevNotifications.map((notification) => ({
					...notification,
					isRead: true,
				}))
			);
			setUnreadCount(0);
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
				const result = await axios.get(`/Account/user/${userId}`);
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
		axios.post('/Admin/logout', {});
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('productDescription');
		localStorage.removeItem('selectedCategory');
		localStorage.removeItem('selectedImages');
		localStorage.removeItem('productPrice');
		localStorage.removeItem('productName');
		localStorage.removeItem('persist:root');
		localStorage.removeItem('userId');
		localStorage.removeItem('amount');

		window.location.href = 'http://localhost:3000/login';
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
						marginLeft: 16,
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
			<Link to={'/chatpage'} className="chat">
				<FaFacebookMessenger className="message-item" />
			</Link>
			<div className="chat-notification">
				<div className="notification">
					<FaBell className="notification-icon" onClick={handleIconClick} />
					{unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
					{isDropdownOpen && (
						<div className="notification-dropdown">
							{listNotification.length === 0 ? (
								<div className="notification-item">No notification</div>
							) : (
								listNotification.slice(0, 8).map((item) => (
									<div className="notification-item" key={item.id}>
										{item.message}
									</div>
								))
							)}
						</div>
					)}
				</div>
			</div>

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
							<Link to="/orderForSeller" className="dropdown-item-2">
								Thông tin các đơn hàng
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
		</div>
	);
};

export default Header;
