import React, {useEffect, useState, useRef} from 'react';
import './Header.css';
import {Link, useNavigate} from 'react-router-dom';
import logo from '../Assets/logo.png';
import {jwtDecode} from 'jwt-decode';
import axios from '../../utils/axios.js';
import {Input, Space} from 'antd';
import {FaSearch} from 'react-icons/fa';

const Header = ({handleLoginClick}) => {
	const [userInfo, setUserInfo] = useState([]);
	const [userImg, setUserImg] = useState([]);
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const dropdownRef = useRef(null);
	const [searchKeyword, setSearchKeyword] = useState('');
	const navigate = useNavigate();

	const handleSearch = () => {
		if (searchKeyword.trim() !== '') {
			navigate(`/search/${encodeURIComponent(searchKeyword)}`);
		}
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
				const result = await axios.get(`http://localhost:5059/api/Account/user/${userId}`);
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
			<div className="category">Đồ điện tử</div>
			<div className="category">Quần áo</div>
			<div className="category">Dụng cụ học tập</div>
			<div className="category">Giày dép</div>
			<Link to="/postproduct" className="category">
				Đăng sản phẩm
			</Link>
			<Link to="/payment" className="category">
				Mua xu
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

			{!isLogin && (
				<div onClick={handleLoginClick} className="category">
					Login
				</div>
			)}
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
							<Link to="/profile" className="dropdown-item-1">
								Trang cá nhân
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
