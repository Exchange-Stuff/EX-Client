import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import './HomePage.css'

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

  useEffect(() => {
    const GetData = async () => {
      try {
        const result = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    GetData();
  }, []);

  return (
    <div className='homepage'>
        <div className='header-homepage'>
            <div className="trangchu">Trang chủ</div>
            <div className="category">Đồ điện tử</div>
            <div className="category">Quần áo</div>
            <div className="category">Dụng cụ học tập</div>
            <div className="category">Giày dép</div>
        </div>
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
        <SwiperSlide><img src={img1} alt="" /></SwiperSlide>
        <SwiperSlide><img src={img2} alt="" /></SwiperSlide>
        <SwiperSlide><img src={img3} alt="" /></SwiperSlide>
      </Swiper>
      <div className='data-list'>
        <h2>List of Posts</h2>
        <ul className='list-container'>
          {data.slice(0, 8).map(list => (
            <li key={list.id} className='list-item'>
              <h3>{list.title}</h3>
              <p><strong>User ID:</strong> {list.userId}</p>
              <p><strong>ID:</strong> {list.id}</p>
              <p><strong>Body:</strong> {list.body}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className='data-list'>
        <h2>Đồ điện tử</h2>
        <Swiper
          className='list-swiper-container'
          spaceBetween={10}
          slidesPerView={4}
          navigation={true}
          modules={[Navigation]}
        >
          {data.map(list => (
            <SwiperSlide key={list.id} className='list-item-swiper'>
              <h3>{list.title}</h3>
              <p><strong>User ID:</strong> {list.userId}</p>
              <p><strong>ID:</strong> {list.id}</p>
              <p><strong>Body:</strong> {list.body}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className='data-list'>
        <h2>Quần áo</h2>
        <Swiper
          className='list-swiper-container'
          spaceBetween={10}
          slidesPerView={4}
          navigation={true}
          modules={[Navigation]}
        >
          {data.map(list => (
            <SwiperSlide key={list.id} className='list-item-swiper'>
              <h3>{list.title}</h3>
              <p><strong>User ID:</strong> {list.userId}</p>
              <p><strong>ID:</strong> {list.id}</p>
              <p><strong>Body:</strong> {list.body}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
   

    </div>
  )
}

export default HomePage;
