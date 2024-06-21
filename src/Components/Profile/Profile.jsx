import React from 'react';
import './Profile.css'; // Ensure you create and style this CSS file accordingly

export const Profile = () => {
  return (
    <div className="profile-container">
      
      <main className="profile-content">
        <div className="profile-header">
          <div className="profile-initials">M</div>
        </div>
        <div className="profile-info">
            <h1>Duy Nguyen</h1>
            <p>@manhduy6102</p>
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
    </div>

    
  );
}

export default Profile;
