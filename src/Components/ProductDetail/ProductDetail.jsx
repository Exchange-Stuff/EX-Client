import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./ProductDetail.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";

export const ProductDetail = () => {
  const [data, setData] = useState({});
  const [userData, setUserData] = useState({});
  const [ratingData, setRatingData] = useState({});

  useEffect(() => {
    const GetData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:5059/api/Product/getDetail/91eb76ed-44b2-4b35-a9fd-bbfb4f733e8b"
        );
        if (result.data.isSuccess) {
          setData(result.data.value);
        } else {
          console.error("Error in response:", result.data.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    GetData();
  }, []);

  useEffect(() => {
    const GetUserData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:5059/api/Account/user/${data.createdBy}?includeBan=true`
        );
        if (result.data.isSuccess) {
          setUserData(result.data.value);
        } else {
          console.error("Error in response:", result.data.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    GetUserData();
  }, []);

  useEffect(() => {
    const GetRatingData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:5059/api/Account/user/${data.createdBy}?includeBan=true`
        );
        if (result.data.isSuccess) {
          setRatingData(result.data.value);
        } else {
          console.error("Error in response:", result.data.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    GetRatingData();
  }, []);

  return (
    <div className="product-detail">
      <Header />
      <div className="product-content">
        <div className="product-images">
          <Swiper className="swiper-container" style={{ width: "370px", height: "370px", margin: "0 0 10px 0"}}>
            {data.images && data.images.length > 0 ? (
              data.images.map((image) => (
                <SwiperSlide key={image.id}>
                  <img src={image.url} alt="Product Image" style={{ width: "370px", height: "auto" }} />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <p>No additional images available</p>
              </SwiperSlide>
            )}
          </Swiper>
          <div className="image-thumbnails">
            {data.images && data.images.length > 0 ? (
              data.images.map((image) => (
                <div key={image.id} className="thumbnail">
                  <img src={image.url} alt="Product Thumbnail" />
                </div>
              ))
            ) : null}
          </div>
          <span>Báo cáo nếu hàng nhận được không giống với ảnh</span>
        </div>

        <div className="product-info">
          <div className="product-info-frame-1">
            <h1>{data.name}</h1>
            <div className="price">
              <span className="discounted-price">{data.price}</span>
            </div>
            <div className="description">
              <span className="description-detail">{data.description}</span>
            </div>
          </div>
            <div className="product-info-frame-2">
            <h1>{data.name}</h1>
            <div className="price">
              <span className="discounted-price">{data.price}</span>
            </div>
            <div className="description">
              <span className="description-detail">{data.description}</span>
            </div>
          </div>
        </div>

        <div className="seller-info">
          <div className="seller-header">
            <img src={userData.thumbnail} alt="Seller Logo" className="seller-logo" />
            <div className="seller-name">{userData.name}</div>
          </div>
          <div className="seller-rating">
            <span>4.7 ★ (5.4tr+ đánh giá)</span>
          </div>
          <button className="buy-now-button">MUA NGAY</button>
          <button className="inbox-button">Nhắn tin với người bán</button>
          <button className="profile-button">Đi tới trang người bán</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
