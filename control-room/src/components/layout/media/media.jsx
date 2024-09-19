import { useState, useRef, useContext } from "react";
import { AppContext } from "../../../contexts/context";
import "./mediaStyle.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faAngleDown,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import defaultLayout from "../../../images/defaultLayout.svg";
import largeVideoLayout from "../../../images/largeVideoLayout.svg";
import largeContentLayout from "../../../images/largeContentLayout.svg";
import videoOnly from "../../../images/videoOnly.svg";
import contentOnly from "../../../images/contentOnly.svg";
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
  const { setShowRefresh, showRefresh, updatedShowRefreshVar } =
    useContext(AppContext);
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

    if (showRefresh === false) {
      setShowRefresh(true);
      updatedShowRefreshVar(true);
    }
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
                      ? "mediaImages selected zoom-image"
                      : "mediaImages  zoom-image"
                  }
                  alt={getLayoutName(index).replaceAll("_", " ").toLowerCase()}
                  title={getLayoutName(index)
                    .replaceAll("_", " ")
                    .toLowerCase()}
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
