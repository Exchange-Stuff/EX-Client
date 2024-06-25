import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";

const Header = ({ handleLoginClick }) => {
  const isLogin = localStorage.getItem("accessToken");

  return (
    <div className="header-homepage">
      <Link to="/homepage" className="trangchu">
        <img src={logo} alt="Trang chủ" className="logo" />
      </Link>
      <div className="category">Đồ điện tử</div>
      <div className="category">Quần áo</div>
      <div className="category">Dụng cụ học tập</div>
      <div className="category">Giày dép</div>
      <Link to="/postproduct" className="category">
        Đăng sản phẩm
      </Link>
      <Link to="/payment" className="category">
        Mua xu
      </Link>

      <Link to="/profile" className="category">
        Trang cá nhân
      </Link>
      <span onClick={handleLoginClick} className="category">
        Sign In
      </span>
    </div>
  );
};

export default Header;
