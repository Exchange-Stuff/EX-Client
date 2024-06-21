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

  return (
    <div className="product-detail">
      <Header />
      <div className="product-content">
        <div className="product-images">
          <div className="thumbnail">
            <img src={data.thumbnail} alt="Product Thumbnail" />
          </div>
          <Swiper>
            {/* {data.images && data.images.length > 0 ? (
              data.images.map((image) => (
                <SwiperSlide key={image.id}>
                  <img src={image.url} alt="Product Image" />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <p>No additional images available</p>
              </SwiperSlide>
            )}*/}
          </Swiper> 
        </div>
        <div className="product-info">
          <h1>{data.name}</h1>
          <div className="price">
            <span className="discounted-price">{data.price}</span>
          </div>
          <div className="description">
            <p>{data.description}</p>
          </div>
          <button className="buy-now-button">MUA NGAY</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
