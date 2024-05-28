import React from 'react'
import './Header.css';

export const Header = () => {
  return (
    <div className='header-homepage'>
            <div className="trangchu">Trang chủ</div>
            <div className="category">Đồ điện tử</div>
            <div className="category">Quần áo</div>
            <div className="category">Dụng cụ học tập</div>
            <div className="category">Giày dép</div>
        </div>
  )
};

export default Header;