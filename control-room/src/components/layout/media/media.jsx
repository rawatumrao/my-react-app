import { useState } from "react";
import "./mediaStyle.css";

import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faAngleDown,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  mediaHeaderImage,
  mediaImages,
} from "../../../constants/imageConstants";

const Media = ({ mLayout }) => {
  const [expanded, setExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleImageClick = (image) => {
    mLayout(image.host_layout);
    setSelectedImage((prevImage) => (prevImage === image ? null : image));
  };

  const handleDoubleClick = (image) => {
    setSelectedImage(image);
  };

  const toggleExpandCollapse = () => {
    setExpanded(!expanded);
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % mediaImages.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + mediaImages.length) % mediaImages.length
    );
  };

  const handleSeeAllClick = () => {
    navigate("/media-all-view");
  };

  return (
    <div className="expand-collapse-container">
      <div className="header">
        {!expanded ? (
          <>
            <span className="expand-button" onClick={toggleExpandCollapse}>
              <FontAwesomeIcon icon={faAngleRight} /> Media Layout
            </span>
            <span className="">
              <img className="header-image" src={mediaHeaderImage}></img>
            </span>
          </>
        ) : (
          <>
            <span className="collapse-button" onClick={toggleExpandCollapse}>
              <FontAwesomeIcon icon={faAngleDown} /> Media Layout
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
            {mediaImages
              .slice(currentImageIndex, currentImageIndex + 7)
              .map((image, index) => (
                <img
                  key={index}
                  src={
                    selectedImage?.imageUrl === image.imageUrl
                      ? image.selectedImageUrl
                      : image.imageUrl
                  }
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

export default Media;
