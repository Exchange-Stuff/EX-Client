import React, {useState, useEffect} from 'react';
import './Search.css';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer';
import axios from '../../utils/axios.js';
import {useParams} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import coin from '../Assets/coin.png';
import {Link} from 'react-router-dom';
import {useLocation, useNavigate} from 'react-router-dom';

export const Search = () => {
	const [userInfoData, setUserInfoData] = useState({});
	const [searchResults, setSearchResults] = useState([]);
	const {keyword} = useParams();
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
					console.log(userId);
					const result = await axios.get(`Account/user/${userId}`);
					setUserInfoData(result.data.value);
				}
				let result;
				if (keyword.trim() !== '') {
					result = await axios.get(`/Product/getProductName/${keyword}`);
				} else {
					result = await axios.get(`/Product/getProductName/ `);
				}
				setSearchResults(result.data.value);
				console.log(result.data.value);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, [keyword]);

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
			<div>
				<div className="loading-container">
					<div className="loading-spinner"></div>
				</div>
			</div>
		);
	}

	return (
		<div>
			<Header />
			<div className="search-results">
				<h2>Kết quả tìm kiếm cho: "{keyword}"</h2>
				{searchResults.length === 0 ? (
					<p className="title-not-found-product">
						Không tìm thấy sản phẩm nào khớp với lựa chọn của bạn.
					</p>
				) : (
					<div className="data-list">
						<ul className="list-container">
							{searchResults.map((list) => (
								<li key={list.id} className="list-item">
									<div className="img-container">
										<img src={list.thumbnail} alt={list.name} />
									</div>
									<Link
										to={`/productdetail/${list.id}`}
										style={{textDecoration: 'none'}}
									>
										<div className="detail-container">
											<div className="left-column">
												<h3>{list.name}</h3>
												<p style={{width: '200px'}}>{list.description}</p>
											</div>
											<div className="right-column">
												<p
													style={{
														display: 'flex',
														justifyContent: 'flex-end',
														alignItems: 'center',
													}}
												>
													<img
														src={coin}
														alt=""
														style={{
															width: '38px',
															height: '35px',
															transform: 'none',
															marginRight: '3px',
														}}
													/>
													<p>{list.price}</p>
												</p>
											</div>
										</div>
									</Link>
									{list.createdBy !== userInfoData.id ? (
										<div style={{textAlign: 'center'}}>
											<Link to={`/orderproduct/${list.id}`}>
												<button className="buy-button">Mua hàng</button>
											</Link>
										</div>
									) : null}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default Search;
