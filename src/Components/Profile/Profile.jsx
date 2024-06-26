import React, { useEffect, useState } from 'react';
import './Profile.css';
import {jwtDecode} from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import axios from "../../utils/axios.js";
import coin from "../Assets/coin.png";
import Header from "../Header/Header";

export const Profile = () => {
  const [userBl, setUserBl] = useState(0);
  const [data, setData] = useState([]);
  const [userName, setUsername] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy dữ liệu sản phẩm của người dùng
        const productResult = await axios.get("/Product/getProductByUserId");
        setData(productResult.data.value);

        // Lấy token từ localStorage
        const token = localStorage.getItem('accessToken');
        if (token) {
          const decoded = jwtDecode(token);
          
          const userId = decoded.nameid;
          const userResult = await axios.get(`Account/user/${userId}`);
          console.log(userResult.data.value);
          setUsername(userResult.data.value);

          setUserBl(userResult.data.value.userBalance.balance);
          
        } else {
          toast.error('Bạn chưa đăng nhập');
          window.location.href = 'http://localhost:3000/homepage';
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error('Có lỗi xảy ra khi lấy dữ liệu');
        window.location.href = 'http://localhost:3000/homepage';
      }
    };

    fetchData();
  }, []);


  return (
    <div className="profile-container">
      <Header />
      <main className="profile-content">
        <div className="profile-header">
          <div className="profile-initials"><img src={userName.thumbnail} alt="Product Thumbnail" /></div>
        </div>
        <div className="profile-info">
          <h1>{userName.name}</h1>
          <p>{userName.email}</p>
          <div className='content-profile-balance'>
            <div className="profile-blance">
              <img className='coin-image-profile'
                src={coin}
                alt=""
                style={{ width: "38px", height: "35px", transform: "none", marginRight: "3px" }}
              />
              <div className='coin-profile'>{userBl}</div>
            </div>
          </div>
        </div>
      </main>

      <div className="header-profile">
        <div className="created-profile">
          Đã tạo
        </div>
      </div>

      <div className='data-profile'></div>
      <ul className="list-container-profile">
        {data.map((list) => (
          <li key={list.id} className="list-item-profile">
            <div className='img-overflow'>
              <div className="img-container-profile">
                <img src={list.thumbnail} alt={list.name} />
              </div>
            </div>

            <div className="detail-container-profile">
              <div className="left-column-profile">
                <h3>{list.name}</h3>
                <p style={{ width: "300px" }}></p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <ToastContainer />
    </div>
  );
}

export default Profile;
