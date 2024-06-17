import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./ProductDetail.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "axios";

export const ProductDetail = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    console.log("Component mounted");
    const GetData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:5059/api/Product/getDetail/91eb76ed-44b2-4b35-a9fd-bbfb4f733e8b"
        );
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    GetData();
  }, []);

  return (
    <div className="product-detail">
      <Header />
      <div className="product-content">
        <div className="product-images">
          {/* <Swiper spaceBetween={10} slidesPerView={1}>
            <SwiperSlide>
              <img src={data.thumbnail} alt={data.title} />
            </SwiperSlide>
            {data.images &&
              Array.isArray(data.images) &&
              data.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image} alt={data.title} />
                </SwiperSlide>
              ))}
          </Swiper> */}
          <div className="image-thumbnails">
            {data.images &&
              Array.isArray(data.images) &&
              data.images.map((list) => (
                <img src={list.thumbnail} alt={list.name} />
              ))}
          </div>
        </div>
        <div className="product-info">
          <h1>{data.name}</h1>
          <div className="price">
            <span className="discounted-price">₫979,000</span>
          </div>
          <div className="rating-and-sales">
            <span className="rating">5.0 ★★★★★</span>
            <span className="sales">13 Đã Bán</span>
          </div>
          <div className="options">
            <label htmlFor="quantity">Số Lượng:</label>
            <div className="quantity">
              <button className="quantity-btn">-</button>
              <input type="text" value="1" readOnly />
              <button className="quantity-btn">+</button>
            </div>
          </div>
          <button className="buy-now-button">THÊM VÀO GIỎ HÀNG</button>
          <button className="buy-now-button">MUA NGAY</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
