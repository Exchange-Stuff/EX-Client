import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import './HomePage.css'

import img3 from '../Assets/image3.jpg'
import img2 from '../Assets/image4.jpg'
import img1 from '../Assets/image5.webp'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export const HomePage = () => {
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

    </div>

    

  )
}
