import React, { useState } from "react";
import "../mlayout/media.css";
import {images, headerImage } from "../../../config/imageConstants.js";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';


const Presenter = ({ pLayout }) => {
  const [expanded, setExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  const handleImageClick = (image) => {
    pLayout(image.layout);

    setSelectedImage(image);
   
  };

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
              <MdOutlineKeyboardArrowRight /> Presenter Layout
            </span>
            <span className="">
              <img className="header-image" src={headerImage}></img>
            </span>
          </>
        ) : (
          <>
            <span className="collapse-button" onClick={toggleExpandCollapse}>
              <MdOutlineKeyboardArrowDown /> Presenter Layout
            </span>
            <span className="see-all" onClick={handleSeeAllClick}>
              See All
            </span>
          </>
        )}
      </div>
      {expanded && (
        <div className="image-gallery">
          <FontAwesomeIcon icon={faChevronLeft} className="nav-arrow left-arrow" onClick={handlePrev} />
           <div className="images">
            {images
              .slice(currentImageIndex, currentImageIndex + 7)
              .map((image, index) => (
                <img
                  key={index}
                  src={image.imageUrl}
                  alt={`Image ${index + 1}`}
                  onClick={()=>handleImageClick(image)}
                  className = "zoom-image"
                  style={{ border: selectedImage?.imageUrl === image.imageUrl ? '2px solid blue' : 'none'}}
                />
              ))}
           </div>
           <FontAwesomeIcon icon={faChevronRight} className="nav-arrow right-arrow" onClick={handleNext} />
          </div>
      )}
    </div>
  );
};

export default Presenter;
