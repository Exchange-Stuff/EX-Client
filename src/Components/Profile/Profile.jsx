import React, { useEffect, useState } from 'react';
import './Profile.css';
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import axios from "../../utils/axios.js";
import coin from "../Assets/coin.png";

export const Profile = () => {
    const [userInfo, setUserInfo] = useState([]);
    const [userBl, setUserBl] = useState([]);
    const [data, setData] = useState([]);
   
    useEffect(() => {
      const GetData = async () => {
        try {
          const result = await axios.get("/Product");
          setData(result.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      GetData();
    }, []);

    useEffect(() => {
        try {
          const token = localStorage.getItem('accessToken');
          if (token) {
            const decoded = jwtDecode(token);
            console.log(decoded);
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

      useEffect(() => {
        const GetUserBl = async () => {
            try {
              const userId = userInfo.nameid;
              console.log(userId);
              const result = await axios.get(`http://localhost:5059/api/Account/user/${userId}`);
              console.log(result);
              setUserBl(result.data.value.userBalance.balance);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
          GetUserBl();
    }, [userInfo])

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
            <div className='content-profile-balance'>
            <div className="profile-blance" >
            <img className='coin-image-profile'
                    src={coin}
                      alt=""
                      style={{ width: "38px", height: "35px", transform: "none", marginRight:"3px"}}
                    />
              <div className='coin-profile'>{userBl} 
              
              </div>
              
            </div>
            </div>
            
           
          </div>
      </main>

      <div className="header-profile">
      <div className="created-profile">
        Đã tạo
        </div>
    </div>

<div className='data-profile'>

</div>
<ul className="list-container-profile">
  {data.slice(0, 8).map((list) => (
    <li key={list.id} className="list-item-profile">
      <div className="img-container-profile">
        <img src={list.thumbnail} alt={list.name} />
      </div>
      <div className="detail-container-profile">
        <div className="left-column-profile">
          <h3>{list.name}</h3>
          <p style={{ width: "300px" }}>{list.description}</p>
        </div>
        
      </div>
      
    </li>
  ))}
</ul>

    
      <ToastContainer />
    </div>

    
  );
}

export default Profile;
