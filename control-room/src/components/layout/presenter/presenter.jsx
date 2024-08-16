import React, { useState } from "react";
import "../media/mediaStyle.css";
import { images, headerImage } from "../../../constants/imageConstants.js";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faAngleDown,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Presenter = ({ pLayout }) => {
  const [expanded, setExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  const handleImageClick = (image) => {

    pLayout(image.layout);
    setSelectedImage(prevImage=>(prevImage===image ? null : image));
  };

  const handleDoubleClick = (image) =>{
    setSelectedImage(image);
  }

  const toggleExpandCollapse = () => {
    setExpanded(!expanded);
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleSeeAllClick = () => {
    navigate("/view-all");
  };

  return (
    <div className="expand-collapse-container">
      <div className="header">
        {!expanded ? (
          <>
            <span className="expand-button" onClick={toggleExpandCollapse}>
            <FontAwesomeIcon icon={faAngleRight} /> Presenter Layout
            </span>
            <span className="">
              <img className="header-image" src={headerImage}></img>
            </span>
          </>
        ) : (
          <>
            <span className="collapse-button" onClick={toggleExpandCollapse}>
            <FontAwesomeIcon icon={faAngleDown} /> Presenter Layout
            </span>
            <span className="see-all" onClick={handleSeeAllClick}>
              See All
            </span>
          </>
        )}
      </div>
      {expanded && (
        <div className="image-gallery">
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="nav-arrow left-arrow"
            onClick={handlePrev}
          />
          <div className="images">
            {images
              .slice(currentImageIndex, currentImageIndex + 7)
              .map((image, index) => (
                <img
                  key={index}
                  src={selectedImage?.imageUrl === image.imageUrl ? image.selectedImageUrl : image.imageUrl}
                  alt={`Image ${index + 1}`}
                  onClick={() => handleImageClick(image)}
                  onDoubleClick={() => handleDoubleClick(image)}
                  className="zoom-image"
                />
              ))}
          </div>
          <FontAwesomeIcon
            icon={faChevronRight}
            className="nav-arrow right-arrow"
            onClick={handleNext}
          />
        </div>
      )}
    </div>
  );
};

export default Presenter;
