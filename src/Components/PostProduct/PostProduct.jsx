import React, {useState} from 'react'
import Header from '../Header/Header'
import "./PostProduct.css"
import axios from 'axios'
import UploadImage from '../UploadImage/UploadImage';


export const PostProduct = () => {

  return (
    <div className='post-product-container'>
     <Header />
     <h2>Đăng sản phẩm</h2>
     <div className='post-product-content'>
     <UploadImage />
        <form className='post-product-form'>
        
            <label>Tên sản phẩm</label>
            <input type="text" placeholder='Tên sản phẩm' required/>

            <label>Mô tả chi tiết</label>
            <input type="text" placeholder='Mô tả chi tiết' required/>

            <label>Giá bán</label>
            <input type="number" placeholder='Giá bán' required/>

            <label>Loại sản phẩm</label>
            <input type="text" placeholder='Loại sản phẩm' required/>

            <label>Loại sản phẩm</label>
            <select required>
            
            <option value='' >Chọn tình trạng</option>
            <option value='new'>Mới</option>
            <option value='used'>Đã qua sử dụng</option>
          </select>
         
        <button type='submit'>Đăng sản phẩm</button>
        </form>
        
     </div>
    </div>
  )
}
