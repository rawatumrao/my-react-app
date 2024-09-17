import { useRef, useState, useContext } from "react";
import { AppContext } from "../../../contexts/context";
import "../media/mediaStyle.css";
import { images } from "../../../constants/imageConstants.js";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faAngleDown,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { EVENTS } from "../../../constants/constants.js";

const Presenter = ({ pLayout, setSelectedLayout, pexipBroadCastChannel }) => {
  const {
    setShowRefresh,
    showRefresh,
    updatedShowRefreshVar,
    presenterLayout,
  } = useContext(AppContext);
  const [expanded, setExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(presenterLayout);
  const imageContainerRef = useRef(null);
  const navigate = useNavigate();

  const handleImageClick = (image) => {
    pLayout(image.layout);
    setSelectedLayout(image.layout);
    setSelectedImage((prevImage) => (prevImage === image ? null : image));

    pexipBroadCastChannel.postMessage({
      event: EVENTS.controlRoomPresenterLayout,
      info: JSON.parse(JSON.stringify(image.layout)),
    });

    if (showRefresh === false) {
      setShowRefresh(true);
      updatedShowRefreshVar(true);
    }
  };

  const handleDoubleClick = (image) => {
    setSelectedImage(image);
  };

  const toggleExpandCollapse = () => {
    setExpanded(!expanded);
  };

  //Scrolling fuctions
  const handleNext = () => {
    if (imageContainerRef.current) {
      imageContainerRef.current.scrollBy({
        left: 160,
        behaviot: "smooth",
      });
    }
  };

  const handlePrev = () => {
    if (imageContainerRef.current) {
      imageContainerRef.current.scrollBy({
        left: -160,
        behaviot: "smooth",
      });
    }
  };

  const handleSeeAllClick = () => {
    navigate("/view-all");
  };
  const sortedImages = [...images].sort((a, b) => {
    return a.participantsNumber - b.participantsNumber;
  });

  return (
    <div className="expand-collapse-container">
      <div className="header">
        {!expanded ? (
          <>
            <span className="expand-button" onClick={toggleExpandCollapse}>
              <FontAwesomeIcon icon={faAngleRight} /> Presenter Layout
            </span>
            <span className="" onClick={toggleExpandCollapse}>
              <img
                className="header-image"
                src={
                  sortedImages.find((item) => {
                    if (item.layout === presenterLayout) return item;
                  }).imageUrl
                }
              ></img>
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
          <div className="images" ref={imageContainerRef}>
            {sortedImages.map((image, index) => (
              <img
                key={index}
                src={
                  selectedImage === image.layout ||
                  selectedImage?.layout === image.layout
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

export default Presenter;
