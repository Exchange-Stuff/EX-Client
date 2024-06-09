import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import './HomePage.css'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import img3 from '../Assets/image3.jpg'
import img2 from '../Assets/image4.jpg'
import img1 from '../Assets/image5.webp'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/swiper-bundle.css';
import axios from 'axios';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export const HomePage = () => {
  const [data, setData] = useState([]);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const GetData = async () => {
      try {
        const result = await axios.get('http://localhost:5059/api/Product');
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
        const result = await axios.get('http://localhost:5059/getProductByCategory/18286bfd-96b0-4536-9ebb-6a526281bd90');
        setProductData(result.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    GetDataProduct();
  }, []);

  return (
    <div className='homepage'>
        <Header />
        <Swiper className='swiper-container'
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
        <SwiperSlide><img src={img1} alt="" style={{width: "100%", height: "100%"}}/></SwiperSlide>
        <SwiperSlide><img src={img2} alt="" style={{width: "100%", height: "100%"}}/></SwiperSlide>
        <SwiperSlide><img src={img3} alt="" style={{width: "100%", height: "100%"}}/></SwiperSlide>
      </Swiper>
      <div className='data-list'>
        <h2>List of Posts</h2>
        <ul className='list-container'>
          {data.slice(0, 8).map(list => (
            <li key={list.id} className='list-item'>
             <img src={list.thumbnail} alt={list.name} />
              <h3>{list.name}</h3>
              <p>{list.description}</p>
              <p>{list.price}</p>
              
            </li>
          ))}
        </ul>
      </div>

      <div className='data-list' style={{margin: "0 1% 0 1%"}}>
        <h2>Đồ điện tử</h2>
        <Swiper
          className='list-swiper-container '
          spaceBetween={35}
          slidesPerView={4}
          navigation={true}
          modules={[Navigation]}
          style={{padding: "1.5%"}}
        >
          {productData.map(list => (
            <SwiperSlide key={list.id} className='list-item-swiper box-shadow'style={{minHeight: "450px", maxHeight:"450px"}}>
              
              <p className='img-container' ><img src={list.thumbnail} alt={list.name} /></p>
              <h3>{list.name}</h3>
              <p><strong>Mô tả:</strong> {list.description}</p>
              <p><strong>Price:</strong> {list.price}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className='data-list'>
        <h2>Quần áo</h2>
        <Swiper
          className='list-swiper-container'
          spaceBetween={35}
          slidesPerView={4}
          navigation={true}
          modules={[Navigation]}
          style={{padding: "1.5%"}}
        >
          {data.map(list => (
            <SwiperSlide key={list.id} className='list-item-swiper box-shadow'style={{minHeight: "450px", maxHeight:"450px"}}>
              <p className='img-container'><img src={list.thumbnail} alt={list.name} /></p>
              <h3>{list.name}</h3>
              <p><strong>Mô tả:</strong> {list.description}</p>
              <p><strong>Price:</strong> {list.price}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
   
          <Footer/>
    </div>
  )
}

export default HomePage;

