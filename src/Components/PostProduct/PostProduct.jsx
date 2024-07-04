import React, {useState, useEffect} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './PostProduct.css';
import axios from '../../utils/axios.js';
import UploadImage from '../UploadImage/UploadImage';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {storage} from '../Firebase/firebase.js';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Flex, Input} from 'antd';

export const PostProduct = () => {
	const [categoryData, setCategoryData] = useState([]);
	const [productName, setProductName] = useState(localStorage.getItem('productName') || '');
	const [productDescription, setProductDescription] = useState(
		localStorage.getItem('productDescription') || ''
	);
	const [productPrice, setProductPrice] = useState(localStorage.getItem('productPrice') || '');
	const [selectedCategory, setSelectedCategory] = useState(
		localStorage.getItem('selectedCategory') || ''
	);
	const [thumbnail, setThumbnail] = useState('');
	const [imageFiles, setImageFiles] = useState([]);
	const [imageUrls, setImageUrls] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await axios.get('http://localhost:5059/api/Category');
				setCategoryData(result.data);
			} catch (error) {
				setError(error);
				console.error('Error fetching category data:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		localStorage.setItem('productName', productName);
	}, [productName]);

	useEffect(() => {
		localStorage.setItem('productDescription', productDescription);
	}, [productDescription]);

	useEffect(() => {
		localStorage.setItem('productPrice', productPrice);
	}, [productPrice]);

	useEffect(() => {
		localStorage.setItem('selectedCategory', selectedCategory);
	}, [selectedCategory]);

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

	const handleImageFilesChange = (images) => {
		setImageFiles(images.map((image) => image.file));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			if (imageFiles.length > 0) {
				const imageUrlsPromises = imageFiles.map(async (file) => {
					const storageRef = ref(storage, `images/${file.name}`);
					await uploadBytes(storageRef, file);
					const downloadURL = await getDownloadURL(storageRef);
					return downloadURL;
				});

				const urls = await Promise.all(imageUrlsPromises);
				setImageUrls(urls);

				const thumbnailUrl = urls[0];
				setThumbnail(thumbnailUrl);

				const result = await axios.post('Product/createProduct', {
					name: productName,
					description: productDescription,
					price: parseFloat(productPrice),
					thumbnail: thumbnailUrl,
					imageUrls: urls,
					categoryId: [selectedCategory],
				});

				if (result.data) {
					toast.success('Tạo sản phẩm thành công');
					localStorage.removeItem('productName');
					localStorage.removeItem('productDescription');
					localStorage.removeItem('productPrice');
					localStorage.removeItem('selectedCategory');
					localStorage.removeItem('selectedImages');
					window.location.href = 'http://localhost:3000/postproduct';
				}

				console.log('Product created:', result.data);
			} else {
				toast.error('Vui lòng chọn ít nhất một hình ảnh');
			}
		} catch (error) {
			console.error('Error creating product:', error);
			toast.error(error.message || 'Có lỗi xảy ra khi tạo sản phẩm');
		}
	};

	if (loading) return <p>Loading categories...</p>;
	if (error) return <p>Error: {error.message}</p>;

	return (
		<div className="post-product-container">
			<Header />
			<h2>Đăng sản phẩm</h2>
			<div className="post-product-content">
				<UploadImage onImageFilesChange={handleImageFilesChange} />
				<form className="post-product-form" onSubmit={handleSubmit}>
					<label>Tên sản phẩm</label>
					<Input
						type="text"
						value={productName}
						onChange={handleProductNameChange}
						placeholder="Tên sản phẩm"
						style={{
							marginTop: '5px',
							
						}}
						required
						maxLength={30}
						showCount
					/>

					<label>Mô tả chi tiết</label>
					<Input
						type="text"
						placeholder="Mô tả chi tiết"
						value={productDescription}
						onChange={handleProductDescriptionChange}
						style={{height: '130px', marginTop: '5px',}}
						maxLength={100}
						showCount
						required
					/>

					<label>Giá bán</label>
					<Input
						type="number"
						placeholder="Giá bán"
						style={{height: '50px', marginTop: '5px',}}
						value={productPrice}
						onChange={handleProductPriceChange}
						required
					/>

					<label>Loại sản phẩm</label>
					<select value={selectedCategory} onChange={handleCategoryChange} required>
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
