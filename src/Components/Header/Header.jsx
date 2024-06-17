import React from 'react'
import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png';

export const Header = () => {
  return (
    <div className='header-homepage'>
            <Link to="/homepage" className="trangchu">
              <img src={logo} alt="Trang chủ" className="logo" />
            </Link>
            <div className="category">Đồ điện tử</div>
            <div className="category">Quần áo</div>
            <div className="category">Dụng cụ học tập</div>
            <div className="category">Giày dép</div>
            <Link to="/postproduct" className="category">Đăng sản phẩm</Link>
            <div className="user">Nguoi dung</div>
        </div>
  )
};

export default Header;