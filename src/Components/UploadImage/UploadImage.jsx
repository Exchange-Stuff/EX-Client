import React, {useState, useEffect} from 'react';
import './UploadImage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const UploadImage = ({onImageFilesChange}) => {
	const [selectedImages, setSelectedImages] = useState([]);

	useEffect(() => {
		const savedImages = JSON.parse(localStorage.getItem('selectedImages')) || [];
		setSelectedImages(savedImages);
		if (savedImages.length > 0) {
			onImageFilesChange(savedImages);
		}
	}, []);

	const handleImageChange = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			const filesArray = Array.from(event.target.files);
			const imagesArray = [];

			filesArray.slice(0, 3 - selectedImages.length).forEach((file) => {
				resizeImage(file, 470, 380, (resizedImage) => {
					imagesArray.push(resizedImage);
					if (imagesArray.length === filesArray.length) {
						const newImages = [...selectedImages, ...imagesArray];
						setSelectedImages(newImages);
						localStorage.setItem('selectedImages', JSON.stringify(newImages));
						onImageFilesChange(newImages);
					}
				});
			});
		}
	};

	const resizeImage = (file, width, height, callback) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (event) => {
			const img = new Image();
			img.src = event.target.result;
			img.onload = () => {
				const canvas = document.createElement('canvas');
				canvas.width = width;
				canvas.height = height;
				const ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0, width, height);

				const resizedUrl = canvas.toDataURL('image/jpeg');

				if (resizedUrl) {
					callback({file: file, url: resizedUrl});
				} else {
					console.error('Resized URL is undefined or empty');
				}
			};
		};
	};

	const handleClearImages = () => {
		setSelectedImages([]);
		localStorage.removeItem('selectedImages');
		onImageFilesChange([]);
	};

	return (
		<div className="upload-container">
			<label className="upload-label">
				<input type="file" accept="image/*" multiple onChange={handleImageChange} />
				<div className="upload-placeholder">
					{selectedImages.length > 0 ? (
						selectedImages.map((image, index) => (
							<img
								key={index}
								src={image.url}
								alt={`Selected ${index}`}
								className="selected-image"
							/>
						))
					) : (
						<>
							<div className="icon-camera">
								<i className="fas fa-camera"></i>
							</div>
							<div className="upload-text">ĐĂNG TỪ 01 ĐẾN 03 HÌNH</div>
						</>
					)}
				</div>
			</label>
			{selectedImages.length > 0 && (
				<button className="clear-images-button" onClick={handleClearImages}>
					Xóa hình ảnh
				</button>
			)}
		</div>
	);
};

export default UploadImage;
