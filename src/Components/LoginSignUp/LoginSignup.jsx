import React, {useState} from "react";
import "./LoginSignup.css";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import googleAuthConfig from "../../config/googleAuthConfig";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import google_icon from "../Assets/google.jpg";
import logo from "../Assets/logo.png"

export const LoginSignup = ({ handleCloseModal }) => {
  const client_id = googleAuthConfig.clientId;
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = async (response) => {
    var userInfo = jwtDecode(response.credential)
    console.log("Login Success:", userInfo);
    
    

    navigate("/homepage");
    
  };

  const handleGoogleLoginFail = (response) => {
    console.log("Login Fail:", response);
  };

  const handleGoogleButtonClick = () => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?
access_type=online
&client_id=41073021794-d4irfbi6nnopdq1dkgm6otrcidns9110.apps.googleusercontent.com
&redirect_uri=http://localhost:3000/blank
&response_type=code
&scope=openid%20profile%20email
&prompt=consent`;
    window.location.href = googleAuthUrl;
  };

  return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={handleCloseModal}>
            &times;
          </span>
          <div className="header">
            <div ><img src={logo} alt="" className="img-login"/></div>
            <div className="text">Chào mừng bạn đến với ExchangeStuff</div>
            <div className="underline"></div>
          </div>
        
          <div className="inputs">
         
            <div className="input">
              <img src={email_icon} alt="" />
             
              <input className="email-login"
                type="email"
                placeholder="Email"
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div className="inputs">
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                placeholder="Mật khẩu"
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div className="forgot-password">
            <span>Quên mật khẩu</span>
          </div>
          <div className="submit-container">
            <div className="submit">ĐĂNG NHẬP</div>
           
          </div >
          <div className="or-login">HOẶC</div>
          <div className="submit-container">
            <button onClick={handleGoogleButtonClick} className="login">
              <div className="login-google">
                 <img
                      src={google_icon}
                      alt=""
                      style={{width: "30px", marginRight: "10px"}}
                    />TIẾP TỤC VỚI GOOGLE</div>
              </button>
          </div>
            
        </div>
      </div>
  );
};

export default LoginSignup;
