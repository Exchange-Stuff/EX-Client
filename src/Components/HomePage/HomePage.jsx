import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./HomePage.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import LoginSignup from "../LoginSignUp/LoginSignup";
import img2 from "../Assets/image3.jpg";
import img3 from "../Assets/image4.jpg";
import img1 from "../Assets/banner.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import axios from "axios";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

export const HomePage = () => {
  const [data, setData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [clothingData, setClothingData] = useState([]);
  const [isShowLogin, setIsShowLogin] = useState(false);

  const handleLoginClick = () => {
    setIsShowLogin(true); // Khi click vào "Sign In" thì đặt isShowLogin là true để hiển thị modal
  };

  const handleCloseModal = () => {
    setIsShowLogin(false); // Đóng modal khi cần
  };

  useEffect(() => {
    const GetData = async () => {
      try {
        const result = await axios.get("http://localhost:5059/api/Product");
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    GetData();
  }, []);

  useEffect(() => {
    const GetDataProduct = async () => {
      try {
        const result = await axios.get(
          "http://localhost:5059/getProductByCategory/18286bfd-96b0-4536-9ebb-6a526281bd90"
        );
        setProductData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    GetDataProduct();
  }, []);

  useEffect(() => {
    const GetClothingData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:5059/getProductByCategory/0736139a-3e11-4847-ae7f-51348f6e6a74"
        );
        setClothingData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    GetClothingData();
  }, []);

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
          <img src={img1} alt="" style={{ width: "100%", height: "100%" }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="" style={{ width: "100%", height: "100%" }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="" style={{ width: "100%", height: "100%" }} />
        </SwiperSlide>
      </Swiper>
      <div className="data-list">
        <div className="header-container" style={{ marginBottom: "20px" }}>
          <h2>Sản phẩm mới</h2>
          <a href="/new-products" className="view-more-link">
            Xem thêm
          </a>
        </div>
        <ul className="list-container">
          {data.slice(0, 8).map((list) => (
            <li key={list.id} className="list-item">
              <div className="img-container">
                <img src={list.thumbnail} alt={list.name} />
              </div>
              <h3>{list.name}</h3>
              <p>{list.description}</p>
              <p>{list.price}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="data-list" style={{ margin: "0 1% 0 1%" }}>
        <div className="header-container">
          <h2>Đồ điện tử</h2>
          <a href="/new-products" className="view-more-link">
            Xem thêm
          </a>
        </div>
        <Swiper
          className="list-swiper-container "
          spaceBetween={35}
          slidesPerView={4}
          navigation={true}
          modules={[Navigation]}
          style={{ padding: "0 1.5% 1.5% 1.5%" }}
        >
          {productData.map((list) => (
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
                <strong></strong> {list.description}
              </p>
              <p>
                <strong></strong> {list.price}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="data-list">
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
                <strong></strong> {list.description}
              </p>
              <p>
                <strong></strong> {list.price}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
