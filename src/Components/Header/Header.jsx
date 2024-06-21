import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";

const Header = ({ handleLoginClick }) => {
  return (
    <div className="header-homepage">
      <div className="category">Đồ điện tử</div>

      <div className="category">Quần áo</div>

      <div className="category">Dụng cụ học tập</div>

      <div className="category">Giày dép</div>

      <Link to="/homepage" className="trangchu">
        <img src={logo} alt="Trang chủ" className="logo" />
      </Link>

      <Link to="/postproduct" className="category">
        Đăng sản phẩm
      </Link>

      <span onClick={handleLoginClick} className="category">
        Sign In
      </span>

      <div className="user">Người dùng</div>

      <Link to="/financial">Quản lý rút tiền</Link>
    </div>
  );
};

export default Header;
