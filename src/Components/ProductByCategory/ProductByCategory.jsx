import React, {useState, useEffect} from 'react';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer';
import axios from '../../utils/axios.js';
import {useParams} from 'react-router-dom';
import coin from '../Assets/coin.png';
import {Link} from 'react-router-dom';
import './ProductByCategory.css';

export const ProductByCategory = () => {
	const [searchResults, setSearchResults] = useState([]);
	const {id} = useParams();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get(`/Product/getProductByCategory/${id}`);
				setSearchResults(result.data);
				console.log(result.data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, [id]);

	return (
		<div>
			<Header />
			<div className="search-results">
				{searchResults.length === 0 ? (
					<p className="title-notfound-category">
						Không tìm thấy sản phẩm nào khớp với lựa chọn của bạn.
					</p>
				) : (
					<div className="data-list">
						<ul className="list-container" style={{marginTop: '65px'}}>
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
			<Footer />
		</div>
	);
};

export default ProductByCategory;
