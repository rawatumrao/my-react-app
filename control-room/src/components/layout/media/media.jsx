import { useState, useRef } from "react";
import "./mediaStyle.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faAngleDown,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import defaultLayout from "../../../images/defaultLayout.png";
import largeVideoLayout from "../../../images/largeVideoLayout.png";
import largeContentLayout from "../../../images/largeContentLayout.png";
import videoOnly from "../../../images/videoOnly.png";
import contentOnly from "../../../images/contentOnly.png";
import { EVENTS } from "../../../constants/constants";
import { getLayoutName } from "../../../utils/layoutFuncs";

const Media = ({
  mLayout,
  pexipBroadCastChannel,
  expandedStatus,
  currMediaLayoutIndex,
}) => {
  const imagesSrc = [
    defaultLayout,
    largeVideoLayout,
    largeContentLayout,
    videoOnly,
    contentOnly,
  ];
  const mediaImageDiv = useRef();
  const [expanded, setExpanded] = useState(expandedStatus);
  const [selectedImage, setSelectedImage] = useState(currMediaLayoutIndex);
  const navigate = useNavigate();

  const handleImageClick = (imageIndex) => {
    mLayout(selectedImage === imageIndex ? null : imageIndex);
    setSelectedImage((prevImage) =>
      prevImage === imageIndex ? null : imageIndex
    );

    let layout = getLayoutName(imageIndex);

    pexipBroadCastChannel.postMessage({
      event: EVENTS.controlRoomMediaLayout,
      info: {
        mediaLayout: `${layout}`,
      },
    });
  };

  const toggleExpandCollapse = () => {
    setExpanded(!expanded);
  };

  const handleNext = () => {
    mediaImageDiv.current.scrollLeft += 160;
  };

  const handlePrev = () => {
    mediaImageDiv.current.scrollLeft -= 160;
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
              <img
                className="header-image"
                src={
                  imagesSrc[selectedImage]
                    ? imagesSrc[selectedImage]
                    : imagesSrc[0]
                }
                onClick={toggleExpandCollapse}
              ></img>
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
          <div className="images mediaImagesDiv" ref={mediaImageDiv}>
            {imagesSrc.map((src, index) => {
              return (
                <img
                  key={index}
                  src={src}
                  className={
                    selectedImage === index
                      ? "mediaImages selected"
                      : "mediaImages"
                  }
                  alt={getLayoutName(index)}
                  title=""
                  onClick={() => handleImageClick(index)}
                />
              );
            })}
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
