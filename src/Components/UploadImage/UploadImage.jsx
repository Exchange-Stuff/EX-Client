import React, { useState } from 'react';
import './UploadImage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const UploadImage = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files);
      const imagesArray = filesArray.map((file) => URL.createObjectURL(file));
      setSelectedImages([...selectedImages, ...imagesArray.slice(0, 3 - selectedImages.length)]);
    }
  };

  return (
    <div className="upload-container">
      <label className="upload-label">
        <input type="file" accept="image/*" multiple onChange={handleImageChange} />
        <div className="upload-placeholder">
          {selectedImages.length > 0 ? (
            selectedImages.map((image, index) => (
              <img key={index} src={image} alt={`Selected ${index}`} className="selected-image" />
            ))
          ) : (
            <>
            
              <div className="icon-camera">
                <i className="fas fa-camera"></i>
              </div>
              <div className="upload-text">
                ĐĂNG TỪ 01 ĐẾN 03 HÌNH
              </div>
            </>
          )}
        </div>
      </label>
    </div>
  );
};

export default UploadImage;
