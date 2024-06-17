import React from 'react';
import "./Payment.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Coin from "../Assets/coin.jpg";

export const Payment = () => {
  return (
    <div className="payment-container">
      <Header />
      <div className="payment-content">
      <form className='payment-form' >
        <div className='title-payment'>
          <span className='span-payment'>Chọn gói</span>
        </div>
        <div className='select-payment'>
        <img src={Coin} alt="" />
          <img src={Coin} alt="" />
          <img src={Coin} alt="" />
          <img src={Coin} alt="" />
        </div>
          
          
          
        </form>
      </div>
      <Footer />
    </div>
  )
}
