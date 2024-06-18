import React from "react";
import "./LoginSignup.css";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import googleAuthConfig from '../../config/googleAuthConfig'; // Đảm bảo đường dẫn là đúng

export const LoginSignup = ({ handleCloseModal, history }) => {

  const handleGoogleLoginSuccess = async (response) => {
    console.log('Login Success:', response);
    const { code } = response;

    try {
      const res = await axios.post('http://localhost:5059/api/Auth/signin', { code });
      const { accessToken, refreshToken } = res.data.value;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      history.push('/');
    } catch (error) {
      console.error('Error logging in', error);
    }
  };


  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleCloseModal}>
          &times;
        </span>
        <div className="header">
          <div className="text">Đăng nhập tài khoản</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" />
            <input type="text" placeholder="Họ và Tên" style={{width:"100%"}}/>
          </div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={email_icon} alt="" />
            <input type="email" placeholder="Email"  style={{width:"100%"}}/>
          </div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={password_icon} alt="" />
            <input type="password" placeholder="Password" style={{width:"100%"}}/>
          </div>
        </div>
        <div className="forgot-password">
          Đã có tài khoản? <span>Đăng nhập ngay</span>
        </div>
        <div className="submit-container">
          <div className="submit">Sign Up</div>
          <div className="submit" onClick={() => {}}>
            Login
          </div>
        </div>
       
        <div className="google-login">
          <button className="google-login-btn" onClick={() => {
            window.open(`https://accounts.google.com/o/oauth2/v2/auth?access_type=online&client_id=${googleAuthConfig.clientId}&redirect_uri=${encodeURIComponent(googleAuthConfig.redirectUri)}&response_type=code&scope=openid%20profile%20email&prompt=consent`, '_self');
          }}>
            Đăng nhập bằng Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
