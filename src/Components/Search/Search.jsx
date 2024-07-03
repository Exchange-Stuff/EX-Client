import React, {useState, useEffect} from 'react';
import './Search.css';
import Header from '../Header/Header.jsx';
import axios from '../../utils/axios.js';
import {useParams} from 'react-router-dom';
import coin from '../Assets/coin.png';
import {Link} from 'react-router-dom';

export const Search = () => {
	const [searchResults, setSearchResults] = useState([]);
	const {keyword} = useParams();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get(`/Product/getProductName/${keyword}`);
				setSearchResults(result.data.value);
				console.log(result.data.value);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, [keyword]);

	return (
		<div>
			<Header />
			<div className="search-results">
				<h2>Kết quả tìm kiếm cho: "{keyword}"</h2>
				{searchResults.length === 0 ? (
					<p>Không tìm thấy sản phẩm nào khớp với lựa chọn của bạn.</p>
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
									<div style={{textAlign: 'center'}}>
										<Link to={`/orderproduct/${list.id}`}>
											<button className="buy-button">Mua hàng</button>
										</Link>
									</div>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default Search;
