import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-column">
          <h3>FPT CLUB</h3>
          <ul>
            <li>Đăng kí thành viên</li>
            <li>Ưu đãi & Đặc quyền</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>CHÍNH SÁCH</h3>
          <ul>
            <li>Chính sách khuyến mãi</li>
            <li>Chính sách bảo mật</li>
            <li>Chính sách giao hàng</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>CHĂM SÓC KHÁCH HÀNG</h3>
          <ul>
            <li>Trải nghiệm mua sắm 100% hài lòng</li>
            <li>Hỏi đáp - FAQs</li>
            <li>Review</li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>FPT EXCHANGE STUFF</h3>
          <p>Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000</p>
          <form>
            <label htmlFor="email">Subscribe to get our Newsletter</label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2021 Class Technologies Inc.</p>
      </div>
    </footer>
  );
}

export default Footer;
