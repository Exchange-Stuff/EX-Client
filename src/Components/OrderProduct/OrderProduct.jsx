import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";

export const OrderProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [userData, setUserData] = useState({});
  const [userInfoData, setUserInfoData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const decoded = jwtDecode(token);
          const userId = decoded.nameid;
          console.log(userId);
          const result = await axios.get(
            `http://localhost:5059/api/Account/user/${userId}`
          );
          setUserInfoData(result.data.value);
        } else {
          toast.error("Bạn chưa đăng nhập");
          window.location.href = "http://localhost:3000/homepage";
        }

        const productResult = await axios.get(
          `http://localhost:5059/api/Product/getDetail/91eb76ed-44b2-4b35-a9fd-bbfb4f733e8b`
        );

        if (productResult.data.isSuccess) {
          const productData = productResult.data.value;
          setData(productData);

          const userResult = await axios.get(
            `http://localhost:5059/api/Account/user/${productData.createdBy}?includeBan=true`
          );

          if (userResult.data.isSuccess) {
            setUserData(userResult.data.value);
          } else {
            console.error("Error in response:", userResult.data.error);
          }
        } else {
          console.error("Error in response:", productResult.data.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="order">
      <Header />
      <div className="order-content">
        <span>Đơn hàng của bạn</span>
      </div>
      <Footer />
    </div>
  );
};

export default OrderProduct;
