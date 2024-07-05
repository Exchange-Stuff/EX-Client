import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./ProductDetail.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import axios from "../../utils/axios.js";
import coin from "../Assets/coin.png";
import send from "../Assets/send.png";
import { jwtDecode } from "jwt-decode";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { Autoplay } from "swiper/modules";
import { toast, ToastContainer } from "react-toastify";

export const ProductDetail = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [data, setData] = useState({});
  const [userData, setUserData] = useState({});
  const [ratingData, setRatingData] = useState({});
  const [comments, setComments] = useState([]);
  const [countComments, setCountComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userInfoData, setUserInfoData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  
  useEffect(() => {
    if (data.images && data.images.length > 0) {
      setSelectedImage(data.images[0].url);
    }
  }, [data.images]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const decoded = jwtDecode(token);
          const userId = decoded.nameid;
          console.log(userId);
          const result = await axios.get(
            `Account/user/${userId}`
          );
          setUserInfoData(result.data.value);
        } else {
          toast.error("Bạn chưa đăng nhập");
          window.location.href = "http://localhost:3000/homepage";
        }

        const productResult = await axios.get(
          `Product/getDetail/${id}`
        );

        if (productResult.data.isSuccess) {
          const productData = productResult.data.value;
          setData(productData);

          const userResult = await axios.get(
            `Account/user/${productData.createdBy}?includeBan=true`
          );

          if (userResult.data.isSuccess) {
            setUserData(userResult.data.value);
          } else {
            console.error("Error in response:", userResult.data.error);
          }

          const ratingResult = await axios.get(
            `Rating/rating-avg-user/${productData.createdBy}`
          );

          if (ratingResult.data.isSuccess) {
            setRatingData(ratingResult.data.value);
          } else {
            console.error("Error in response:", ratingResult.data.error);
          }

          const commentsResult = await axios.get(
            `Comment/product/${productData.id}?pageSize=5&pageIndex=1`
          );
          if (commentsResult.data.isSuccess) {
            setComments(commentsResult.data.value);
          } else {
            console.error("Error in response:", commentsResult.data.error);
          }

          const countCommentsResult = await axios.get(
            `Comment/get-total-count/${productData.id}`
          );

          if (countCommentsResult.data.isSuccess) {
            setCountComments(countCommentsResult.data.value);
          } else {
            console.error("Error in response:", countCommentsResult.data.error);
          }
        } else {
          console.error("Error in response:", productResult.data.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleAddComment = async () => {
    try {
      const result = await axios.post(`Comment/create`, {
        content: newComment,
        accountId: userInfoData.id,
        productId: data.id
      });

      if (result.data.isSuccess) {
        setComments([...comments, result.data.value]);
        setNewComment("");
      } else {
        console.error("Error in response:", result.data.error);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { locale: vi }) + " trước";
  };

  const handleDeletePost = async () => {
    try {
      const result = await axios.delete(`Product/delete/${id}`);
      if (result.data.isSuccess) {
        toast.success("Xóa bài đăng thành công");
        window.location.href = "http://localhost:3000/homepage";
      } else {
        console.error("Error in response:", result.data.error);
        toast.error("Xóa bài đăng thất bại");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Xóa bài đăng thất bại");
    }
  };
  

  return (
    <div className="product-detail">
      <Header />
      <div className="product-content">
        <div className="product-images">
          <div className="img-postproduct-content">
            <img
              className="img-postproduct"
              src={selectedImage}
              alt="Product Image"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          
          <Swiper
            className="swiper-container"
            style={{ width: "420px", height: "420px", margin: "0 0 10px 0" }}
            modules={[Autoplay]}
          ></Swiper>
          <div className="image-thumbnails">
            {data.images && data.images.length > 0
              ? data.images.map((image) => (
                  <div key={image.id} className="thumbnail">
                    <img onClick={() => setSelectedImage(image.url)} src={image.url} alt="Product Thumbnail" />
                  </div>
                ))
              : null}
          </div>
          <span>Báo cáo nếu hàng nhận được không giống với ảnh</span>
        </div>

        <div className="product-info">
          <div className="product-info-frame-1">
            <h1>{data.name}</h1>
            <div className="price">
              <img
                src={coin}
                alt=""
                style={{
                  width: "38px",
                  height: "35px",
                  transform: "none",
                  marginRight: "3px",
                }}
              />
              <span className="discounted-price">{data.price}</span>
            </div>
            <div className="description">
              <span className="description-title">Mô tả: </span>
              <span className="description-detail">{data.description}</span>
            </div>
          </div>
          <div className="product-info-frame-2">
            <h1 className="comment-header">
              Bình luận về sản phẩm ({countComments})
            </h1>
            <div className="comments-section">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="comment">
                    <div className="info-commenter">
                      <img
                        src={comment.user.thumbnail}
                        className="logo-commenter"
                        style={{
                          marginRight: "10px",
                        }}
                      />
                      <span>{comment.user.name}</span>
                    </div>
                    <div className="comment-content">
                      <p>{comment.content}</p>
                    </div>
                    <div className="comment-detail">
                      <p>{formatDate(comment.createdOn)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>Chưa có nhận xét nào.</p>
              )}
            </div>
            <div className="add-comment">
              <img src={userInfoData.thumbnail} className="logo-comment" />
              <input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Thêm nhận xét của bạn..."
              />
              <button onClick={handleAddComment}>
                <img src={send} style={{ width: "100%" }} />
              </button>
            </div>
          </div>
        </div>

        <div className="seller-info">
          <div className="seller-header">
            <img
              src={userData.thumbnail}
              alt="Seller Logo"
              className="seller-logo"
            />
            <div className="seller-name">{userData.name}</div>
          </div>
          <div className="seller-rating">
            <span className="avg-rating">{ratingData.ratingAvg}</span>
            <span className="star"> ★ </span>
            <span className="count-rating">
              ({ratingData.ratingCount} đánh giá)
            </span>
          </div>
          {userData.id !== userInfoData.id ? (
            <>
              <Link to={`/orderproduct/${data.id}`} style={{ textDecoration: "none", maxWidth : "305px", minWidth: "305px" }}>
                <button className="buy-now-button">MUA NGAY</button>
              </Link>
              <button className="inbox-button">Nhắn tin với người bán</button>
              <button className="profile-button">Đi tới trang người bán</button>
            </>
          ) : (
            <button className="buy-now-button" onClick={handleDeletePost}>
              Xóa bài đăng
            </button>
          )}
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;
