import React, { useState } from "react";
import "./media.css";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import { mlayout1, mlayout2, mlayout3, mlayout4, mlayout5, mlayout6, mlayout7, mlayout8 } from "../../../config/imageConstants";

const images = [
  {host_layout: "1", imageUrl: mlayout1, Descrption: "One"},
  {host_layout: "2", imageUrl: mlayout2, Descrption: "two"},
  {host_layout: "3", imageUrl: mlayout3, Descrption: "three"},
  {host_layout: "4", imageUrl: mlayout4, Descrption: "four"},
  {host_layout: "5", imageUrl: mlayout5, Descrption: "five"},
  {host_layout: "6", imageUrl: mlayout6, Descrption: "six"},
  {host_layout: "7", imageUrl: mlayout7, Descrption: "seven"},
  {host_layout: "8", imageUrl: mlayout8, Descrption: "eight"},
];

const headerImage= "data:image/svg+xml;utf8,<svg width='140' height='88' viewBox='0 0 140 88' fill='none' xmlns='http://www.w3.org/2000/svg'>%0A%09<rect x='0.5' y='0.5' width='139' height='87' rx='3.5' fill='%2387919a' stroke='%23BBBFC3'/>%0A%09<rect x='8.0' y='27.0' width='59.5' height='34.0' rx='2' fill='%23BBBFC3'/>%0A%09<rect x='72.5' y='27.0' width='59.5' height='34.0' rx='2' fill='%23BBBFC3'/>%0A</svg>";
const Media = ({mLayout}) => {
  const [expanded, setExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleImageClick = (image) => {
    mLayout(image.host_layout);
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
              <MdOutlineKeyboardArrowRight /> Media Layout
            </span>
            <span className="">
              <img className="header-image" src={headerImage}></img>
            </span>
          </>
        ) : (
          <>
            <span className="collapse-button" onClick={toggleExpandCollapse}>
              <MdOutlineKeyboardArrowDown /> Media Layout
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

export default Media;
