import React, { useEffect, useState } from 'react';
import './Profile.css';
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';

export const Profile = () => {
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        try {
          const token = localStorage.getItem('accessToken');
          if (token) {
            const decoded = jwtDecode(token);
            setUserInfo(decoded);
          } else {
            toast.error('Bạn chưa đăng nhập');
            window.location.href = 'http://localhost:3000/homepage';
          }
        } catch (err) {
            toast.error('Bạn chưa đăng nhập');
            window.location.href = 'http://localhost:3000/homepage';
        }
      }, []);

      const getInitial = (email) => {
        return email ? email.charAt(0).toUpperCase() : '';
    };

    const getFirst = (email) => {
        if (email) {
            return email.split('@')[0];
            
        }
        return '';
    };

  return (
    <div className="profile-container">
      
      <main className="profile-content">
        <div className="profile-header">
          <div className="profile-initials">{getInitial(userInfo.email)}</div>
        </div>
        <div className="profile-info">
            <h1>{getFirst(userInfo.email)}</h1>
            <p>{userInfo.email}</p>
            <div className="profile-buttons">
             
              <button>Chỉnh sửa hồ sơ</button>
            </div>
          </div>
      </main>

      <div className="header-profile">
      
      <div className="created-profile">
        Đã tạo
        </div>
    
      
    </div>
    
      <ToastContainer />
    </div>

    
  );
}

export default Profile;
