import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./PostProduct.css";
import axios from "axios";
import UploadImage from "../UploadImage/UploadImage";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase/firebase.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const PostProduct = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("http://localhost:5059/api/Category");
        setCategoryData(result.data);
      } catch (error) {
        setError(error);
        console.error("Error fetching category data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleProductDescriptionChange = (event) => {
    setProductDescription(event.target.value);
  };

  const handleProductPriceChange = (event) => {
    setProductPrice(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleImageFilesChange = (files) => {
    setImageFiles(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (imageFiles.length > 0) {
        const file = imageFiles[0];
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setThumbnail(downloadURL);
      } else {
        toast.error("Vui lòng chọn ít nhất một hình ảnh");
      }

      if (thumbnail === "") {
        throw new Error("Vui lòng tải lại hình ảnh");
      } else {
        const result = await axios.post(
          "http://localhost:5059/api/Product/createProduct",
          {
            name: productName,
            description: productDescription,
            price: parseFloat(productPrice),
            thumbnail: thumbnail,
            categoryId: [selectedCategory],
          }
        );

        if (result.data) {
          toast.success("Tạo sản phẩm thành công");
        }

        console.log("Product created:", result.data);
      }
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error(error.message || "Có lỗi xảy ra khi tạo sản phẩm");
    }
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="post-product-container">
      {/* <Header /> */}
      <h2>Đăng sản phẩm</h2>
      <div className="post-product-content">
        <UploadImage onImageFilesChange={handleImageFilesChange} />
        <form className="post-product-form" onSubmit={handleSubmit}>
          <label>Tên sản phẩm</label>
          <input
            type="text"
            placeholder="Tên sản phẩm"
            value={productName}
            onChange={handleProductNameChange}
            required
          />

          <label>Mô tả chi tiết</label>
          <input
            type="text"
            placeholder="Mô tả chi tiết"
            value={productDescription}
            onChange={handleProductDescriptionChange}
            style={{ height: "130px" }}
            required
          />

          <label>Giá bán</label>
          <input
            type="number"
            placeholder="Giá bán"
            value={productPrice}
            onChange={handleProductPriceChange}
            required
          />

          <label>Loại sản phẩm</label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            required
          >
            <option value="">Chọn loại sản phẩm</option>
            {categoryData.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <button type="submit">Đăng sản phẩm</button>
        </form>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default PostProduct;
