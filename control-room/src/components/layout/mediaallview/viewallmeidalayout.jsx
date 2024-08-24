import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../media/mediaStyle.css";
import "./viewallmedialayoutStyle.css";

import { mediaImages } from "../../../constants/imageConstants.js";

const ViewAllMediaLayout = ({ setMediaAllLayout }) => {
  const [selectedMediaImage, setSelectedMediaImage] = useState(null);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  const handleMediaImageClick = (image) => {
    setMediaAllLayout(image.layout);
    setSelectedMediaImage((prevImage) => (prevImage === image ? null : image));
  };

  const handleMediaImageDoubleClick = (image) => {
    setSelectedMediaImage(image);
  };

  return (
    <div className="view-media-all-layout">
      <span className="link-text" onClick={handleBackClick}>
        &lt; Back
      </span>
      <div className="layouts">
        <span className="text-style"> Media Layouts</span>
        <div className="gridContainer">
          {mediaImages.map((image, index) => (
            <div key={index} className="box">
              <img
                src={
                  selectedMediaImage?.imageUrl === image.imageUrl
                    ? image.selectedImageUrl
                    : image.imageUrl
                }
                alt={`Media Image ${index + 1}`}
                className={`image ${
                  selectedMediaImage === image.layout ? "selected" : ""
                }`}
                onClick={() => handleMediaImageClick(image)}
                onDoubleClick={() => handleMediaImageDoubleClick(image)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewAllMediaLayout;