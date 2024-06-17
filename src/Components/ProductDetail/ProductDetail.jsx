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
        const result = await axios.get("https://dummyjson.com/products/1");
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    GetData();

    return () => {
      console.log("Component unmounted");
    };
  }, []);

  useEffect(() => {
    console.log("Data updated:", data);
  }, [data]);

  return (
    <div className="product-detail">
      <Header />
      <div className="product-content">
        <div className="product-images">
          <Swiper spaceBetween={50} slidesPerView={1}>
            <SwiperSlide>
              <img src={data.thumbnail} alt={data.title} />
            </SwiperSlide>
            {data.images &&
              data.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image} alt={data.title} />
                </SwiperSlide>
              ))}
          </Swiper>
          <div className="image-thumbnails">
            {data.images &&
              data.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={data.title}
                  className="thumbnail"
                />
              ))}
          </div>
        </div>
        <div className="product-info">
          <h1>{data.title}</h1>
          <div className="price">
            <span className="original-price">₫2,999,000</span>
            <span className="discounted-price">₫2,959,000</span>
          </div>
          <div className="promotion">
            <h3>Khuyến mãi:</h3>
            <ul>
              <li>Freeship toàn quốc khi đặt hàng tại Akko.vn</li>
              <li>Chế độ bảo hành 1 đổi 1 trong suốt thời gian bảo hành</li>
              <li>Chi nhánh bảo hành 3 miền: Bắc - Trung - Nam</li>
            </ul>
          </div>
          <div className="options">
            <label htmlFor="switch">Switch:</label>
            <select id="switch">
              <option>Chọn một tuỳ chọn</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>
          </div>
          <div className="quantity">
            <button className="quantity-btn">-</button>
            <input type="text" value="1" readOnly />
            <button className="quantity-btn">+</button>
          </div>
          <button className="buy-now-button">THÊM VÀO GIỎ HÀNG</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
