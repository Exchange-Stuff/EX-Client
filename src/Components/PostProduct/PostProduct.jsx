import React from 'react'
import Header from '../Header/Header'
import "./PostProduct.css"
import axios from 'axios'

export const PostProduct = () => {
  return (
    <div className='post-product-container'>
     <Header />
     <div className='post-product-content'>
      <h2>Đăng sản phẩm</h2>
        <form>
            <label>Tên sản phẩm</label>
            <input type="text" placeholder='Tên sản phẩm' required/>

            <label>Mô tả chi tiết</label>
            <input type="text" placeholder='Mô tả chi tiết' required/>

            <label>Giá bán</label>
            <input type="number" placeholder='Giá bán' required/>

            <label>Loại sản phẩm</label>
            <input type="text" placeholder='Loại sản phẩm' required/>

            <select>
            <option value=''>Chọn tình trạng</option>
            <option value='new'>Mới</option>
            <option value='used'>Đã qua sử dụng</option>
          </select>
          <label>
          Hình ảnh:
          <input type='file' required />

          <button type='submit'>Đăng sản phẩm</button>
        </label>
        </form>
     </div>
    </div>
  )
}
