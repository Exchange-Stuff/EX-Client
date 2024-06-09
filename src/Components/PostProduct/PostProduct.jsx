import React, { useState, useEffect } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import "./PostProduct.css"
import axios from 'axios'
import UploadImage from '../UploadImage/UploadImage';


export const PostProduct = () => {
  const [categoryData, setData] = useState([]);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  

  useEffect(() => {
    const GetData = async () => {
      try {
        const result = await axios.get('http://localhost:5059/api/Category');
        setData(result.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    GetData();
  }, []);

  const handleProductNameChange = (event) => {
    const value = event.target.value;
    console.log('Product name:', value);
    setProductName(value);
  };

  const handleProductDescriptionChange = (event) => {
    const value = event.target.value;
    console.log('Product description:', value);
    setProductDescription(value);
  };

  const handleProductPriceChange = (event) => {
    const value = event.target.value;
    console.log('Product price:', value);
    setProductPrice(value);
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    console.log('Selected category:', value);
    setSelectedCategory(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post('http://localhost:5059/api/Product/createProduct', {
        name: productName,
        description: productDescription,
        price: parseFloat(productPrice),
        categoryId: [selectedCategory]
      });
      console.log('Product created:', result.data);
      // Sau khi gửi dữ liệu thành công, bạn có thể thực hiện các hành động khác ở đây, ví dụ như hiển thị thông báo thành công.
    } catch (error) {
      console.error('Error creating product:', error);
      // Xử lý lỗi nếu có
    }
  };


  return (
    <div className='post-product-container'>
      <Header />
      <h2>Đăng sản phẩm</h2>
      <div className='post-product-content'>
        <UploadImage />
        <form className='post-product-form' onSubmit={handleSubmit}>
          <label>Tên sản phẩm</label>
          <input type="text" placeholder='Tên sản phẩm' value={productName} onChange={handleProductNameChange} required />

          <label>Mô tả chi tiết</label>
          <input type="text" placeholder='Mô tả chi tiết' value={productDescription} onChange={handleProductDescriptionChange} style={{ height: "130px" }} required />

          <label>Giá bán</label>
          <input type="number" placeholder='Giá bán' value={productPrice} onChange={handleProductPriceChange} required />

          <label>Loại sản phẩm</label>
          <select value={selectedCategory} onChange={handleCategoryChange} required>
            <option value='' >Chọn loại sản phẩm</option>
            {categoryData.map(category => (
              <option value={category.id}>{category.name}</option>
            ))}
          </select>

          <button type='submit'>Đăng sản phẩm</button>
        </form>
      </div>
      <Footer />
    </div>
  )
}
