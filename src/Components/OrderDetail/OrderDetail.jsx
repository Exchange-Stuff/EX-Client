import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import axios from '../../utils/axios.js';
import { jwtDecode } from 'jwt-decode';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import './OrderDetail.css';
import coin from '../Assets/coin.png';

export const OrderDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [dataInfo, setDataInfo] = useState({});
  const [userData, setUserData] = useState({});
  const [userInfoData, setUserInfoData] = useState({});
  const [rating, setRating] = useState(null);
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
          const result = await axios.get(`Account/user/${userId}`);
          setUserInfoData(result.data.value);
        }

        const orderResult = await axios.get(`PurchaseTicket/getPurchaseTicketDetail/${id}`);
        if (orderResult.data.isSuccess) {
          const orderData = orderResult.data.value.product;
          const orderInfo = orderResult.data.value;
          setData(orderData);
          setDataInfo(orderInfo);

          const userResult = await axios.get(`Account/user/${orderData.createdBy}`);
          if (userResult.data.isSuccess) {
            setUserData(userResult.data.value);
          } else {
            console.error('Error in response:', userResult.data.error);
          }
        } else {
          console.error('Error in response:', orderResult.data.error);
        }

        const ratingResult = await axios.get(`Rating/rating-by-purchase-id/${id}`);
        if (ratingResult.data.isSuccess) {
          const rating = ratingResult.data.value;
          setRating(rating);
        } else {
          setRating(null);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 0:
        return { color: 'red', fontWeight: 'bold' };
      case 1:
        return { color: 'black', fontWeight: 'bold' };
      case 2:
        return { color: 'green', fontWeight: 'bold' };
      default:
        return {};
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return 'Pending';
      case 1:
        return 'Cancel';
      case 2:
        return 'Confirm';
      default:
        return '';
    }
  };

  const formatDateTime = (dateTime) => {
    try {
      return format(new Date(dateTime), 'yyyy-MM-dd HH:mm:ss');
    } catch (error) {
      return 'Invalid date';
    }
  };

  if (isAuthorized === null) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  } else {
    return (
      <div className="orderdetail">
        <Header />
        <div className="orderdetail-content">
          <div className="orderdetail-form">
            <span className="orderdetail-title">Chi tiết đơn hàng</span>
            <div className="orderdetail-detail">
              <div className="product-image">
                {data.thumbnail && (
                  <img src={data.thumbnail} alt={data.name} />
                )}
              </div>
              <div className="orderdetail-info">
                <p>Tên sản phẩm</p>
                <p>Người bán</p>
                <p>Người mua</p>
                <p>Tổng tiền</p>
                <p>Trạng thái đơn hàng</p>
                <p>Ngày giờ đặt hàng</p>
                {dataInfo.status === 2 && <p>Ngày giờ xác nhận</p>}
                {dataInfo.status === 1 && <p>Ngày giờ hủy đơn</p>}
                {dataInfo.status === 2 && (
                  <>
                    <p>Đánh giá của người mua</p>
                    <p>Số sao được đánh giá</p>
                  </>
                )}
              </div>
              <div className="orderdetail-total">
                <p>{data.name}</p>
                <p>{userData.name}</p>
                <p>{userInfoData.name}</p>
                <p className="user-balance-2-order">
                  {data.price}
                  <img
                    className="coin-orderdetail"
                    src={coin}
                    alt=""
                    style={{
                      width: '30px',
                      height: 'auto',
                      transform: 'none',
                      marginLeft: '5px',
                      borderBottom: 'none',
                    }}
                  />
                </p>
                <p style={getStatusStyle(dataInfo.status)}>{getStatusText(dataInfo.status)}</p>
                <p>{formatDateTime(dataInfo.createdOn)}</p>
                {dataInfo.status === 2 && (
                  <>
                    <p>{formatDateTime(dataInfo.modifiedOn)}</p>
                  </>
                )}
                {dataInfo.status === 1 && (
                  <>
                    <p>{formatDateTime(dataInfo.modifiedOn)}</p>
                  </>
                )}
                {dataInfo.status === 2 && (
                  <>
                    <p>{rating ? rating.content : 'Không có đánh giá'}</p>
                    <p>{rating ? rating.evaluateType : 'N/A'}<span className="star-order"> ★ </span></p>
                  </>
                )}
                <button className="inbox-orderdetail">Nhắn tin với người bán</button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
};

export default OrderDetail;
