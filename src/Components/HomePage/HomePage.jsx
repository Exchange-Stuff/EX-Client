import React, {useState, useEffect} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import './HomePage.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import LoginSignup from '../LoginSignUp/LoginSignup';
import img2 from '../Assets/image3.jpg';
import img3 from '../Assets/image4.jpg';
import img1 from '../Assets/banner.png';
import coin from '../Assets/coin.png';
import {jwtDecode} from 'jwt-decode';
import {useLocation, useNavigate} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import axios from '../../utils/axios.js';
import {Link} from 'react-router-dom';

import {Autoplay, Pagination, Navigation} from 'swiper/modules';

export const HomePage = () => {
	const [userInfoData, setUserInfoData] = useState({});
	const [data, setData] = useState([]);
	const [productData, setProductData] = useState([]);
	const [clothingData, setClothingData] = useState([]);
	const [isShowLogin, setIsShowLogin] = useState(false);
	const location = useLocation();
	const [isAuthorized, setIsAuthorized] = useState(null);
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('role');
	};

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
			logout();
			navigate('/login');
		}
	}, [isAuthorized, navigate]);

	useEffect(() => {
		const status = new URLSearchParams(location.search).get('status');
		if (status === 'false') {
			toast.error('Đăng nhập không thành công');
		}
	}, []);

	const handleLoginClick = () => {
		setIsShowLogin(true);
	};

	const handleCloseModal = () => {
		setIsShowLogin(false);
	};

	useEffect(() => {
		const GetData = async () => {
			try {
				const token = localStorage.getItem('accessToken');
				if (token) {
					const decoded = jwtDecode(token);
					const userId = decoded.nameid;
					console.log(userId);
					const result = await axios.get(`Account/user/${userId}`);
					setUserInfoData(result.data.value);
				}
				const result = await axios.get('/Product');
				console.log(result.data);
				setData(result.data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		GetData();
	}, []);

	useEffect(() => {
		const GetDataProduct = async () => {
			try {
				const result = await axios.get(
					'Product/getProductByCategory/18286bfd-96b0-4536-9ebb-6a526281bd90'
				);
				setProductData(result.data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		GetDataProduct();
	}, []);

	useEffect(() => {
		const GetClothingData = async () => {
			try {
				const result = await axios.get(
					'Product/getProductByCategory/0736139a-3e11-4847-ae7f-51348f6e6a74'
				);
				setClothingData(result.data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		GetClothingData();
	}, []);

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
		<div className="homepage">
			<Header handleLoginClick={handleLoginClick} />
			{isShowLogin && <LoginSignup handleCloseModal={handleCloseModal} />}
			<Swiper
				className="swiper-container"
				spaceBetween={30}
				centeredSlides={true}
				autoplay={{
					delay: 4000,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
				}}
				navigation={true}
				modules={[Autoplay, Pagination, Navigation]}
			>
				<SwiperSlide>
					<img src={img1} alt="" style={{width: '100%', height: '100%'}} />
				</SwiperSlide>
				<SwiperSlide>
					<img src={img2} alt="" style={{width: '100%', height: '100%'}} />
				</SwiperSlide>
				<SwiperSlide>
					<img src={img3} alt="" style={{width: '100%', height: '100%'}} />
				</SwiperSlide>
			</Swiper>
			<div className="data-list">
				<div className="header-container" style={{marginBottom: '20px'}}>
					<h2>Sản phẩm mới</h2>
				</div>

				<ul className="list-container">
					{data.slice(0, 8).map((list) => (
						<li key={list.id} className="list-item">
							<div className="img-container">
								<img src={list.thumbnail} alt={list.name} />
							</div>
							<Link to={`/productdetail/${list.id}`} style={{textDecoration: 'none'}}>
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
												marginTop: '0px',
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

			<div className="data-list" style={{margin: '0 1% 0 1%'}}>
				<div className="header-container">
					<h2>Đồ điện tử</h2>
					<a
						href="/productByCategory/18286bfd-96b0-4536-9ebb-6a526281bd90"
						className="view-more-link"
					>
						Xem thêm
					</a>
				</div>
				<Swiper
					className="list-swiper-container "
					spaceBetween={20}
					slidesPerView={4}
					navigation={true}
					loop={true}
					pagination={{
						clickable: true,
					}}
					modules={[Navigation]}
					style={{padding: '2px 1.5% 1.5% 1.5%'}}
				>
					{productData.map((list) => (
						<SwiperSlide
							key={list.id}
							className="list-item-swiper box-shadow"
							style={{
								maxHeight: '460px',
								minHeight: '460px',
								cursor: 'pointer',
								width: '300px',
								padding: '10px',
							}}
						>
							<p
								className="img-container-swiper"
								style={{width: '100%', overflow: 'hidden', height: '300px'}}
							>
								<img
									src={list.thumbnail}
									alt={list.name}
									style={{width: '100%', height: '100%', objectFit: 'cover'}}
								/>
							</p>
							<Link to={`/productdetail/${list.id}`} style={{textDecoration: 'none'}}>
								<div className="detail-container">
									<div className="left-column">
										<h3 style={{color: 'black', margin: '0px', width: '200px', fontSize: '20px', color: '#333',margin: '8px 0 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{list.name}</h3>
										<p
											style={{
												width: '200px',
												whiteSpace: 'nowrap',
												textOverflow: 'ellipsis',
												overflow: 'hidden',
												color: 'black',
											}}
										>
											{list.description}
										</p>
									</div>
									<div className="right-column">
										<p
											style={{
												display: 'flex',
												justifyContent: 'flex-end',
												alignItems: 'center',
												marginTop: '0px',
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
											<p style={{color: 'black'}}>{list.price}</p>
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
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			<div className="data-list" style={{margin: '0 1% 0 1%'}}>
				<div className="header-container">
					<h2>Quần áo</h2>
					<a
						href="/productByCategory/0736139a-3e11-4847-ae7f-51348f6e6a74"
						className="view-more-link"
					>
						Xem thêm
					</a>
				</div>
				<Swiper
					className="list-swiper-container "
					spaceBetween={20}
					slidesPerView={4}
					navigation={true}
					loop={true}
					pagination={{
						clickable: true,
					}}
					modules={[Navigation]}
					style={{padding: '2px 1.5% 1.5% 1.5%'}}
				>
					{clothingData.map((list) => (
						<SwiperSlide
							key={list.id}
							className="list-item-swiper box-shadow"
							style={{
								maxHeight: '460px',
								minHeight: '460px',
								cursor: 'pointer',
								width: '300px',
								padding: '10px',
							}}
						>
							<p
								className="img-container-swiper"
								style={{width: '100%', overflow: 'hidden', height: '300px'}}
							>
								<img
									src={list.thumbnail}
									alt={list.name}
									style={{width: '100%', height: '100%', objectFit: 'cover'}}
								/>
							</p>
							<Link to={`/productdetail/${list.id}`} style={{textDecoration: 'none'}}>
								<div className="detail-container">
									<div className="left-column">
										<h3 style={{color: 'black', margin: '0px', width: '200px', fontSize: '20px', color: '#333',margin: '8px 0 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{list.name}</h3>
										<p
											style={{
												width: '200px',
												whiteSpace: 'nowrap',
												textOverflow: 'ellipsis',
												overflow: 'hidden',
												color: 'black',
											}}
										>
											{list.description}
										</p>
									</div>
									<div className="right-column">
										<p
											style={{
												display: 'flex',
												justifyContent: 'flex-end',
												alignItems: 'center',
												marginTop: '0px',
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
											<p style={{color: 'black'}}>{list.price}</p>
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
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			{/* <div className="data-list">
        <div className="header-container">
          <h2>Quần áo</h2>
          <a href="/new-products" className="view-more-link">
            Xem thêm
          </a>
        </div>
        <Swiper
          className="list-swiper-container"
          spaceBetween={35}
          slidesPerView={4}
          navigation={true}
          modules={[Navigation]}
          style={{ padding: "0 1.5% 1.5% 1.5%" }}
        >
          {clothingData.map((list) => (
            <SwiperSlide
              key={list.id}
              className="list-item-swiper box-shadow"
              style={{ minHeight: "450px", maxHeight: "450px" }}
            >
              <p className="img-container">
                <img
                  src={list.thumbnail}
                  alt={list.name}
                  style={{ width: "290px", height: "290px" }}
                />
              </p>
              <h3>{list.name}</h3>
              <p>
                {list.description}
              </p>
              
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}

			<Footer />
		</div>
	);
};

export default HomePage;
