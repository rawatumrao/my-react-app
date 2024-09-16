import { useState, useContext } from "react";
import { AppContext } from "../../../contexts/context";
import { useNavigate } from "react-router-dom";
import "../media/mediaStyle.css";
import "./viewalllayoutStyle.css";
import { images } from "../../../constants/imageConstants.js";
import { EVENTS } from "../../../constants/constants.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const ViewAllLayout = ({
  setPresenterAllLayout,
  pexipBroadCastChannel,
  presenterLayout,
}) => {
  const [selectedImage, setSelectedImage] = useState(presenterLayout);
  const { showRefresh, setShowRefresh, updatedShowRefreshVar } =
    useContext(AppContext);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  const handleImageClick = (image) => {
    setPresenterAllLayout(image.layout);
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

  const categorizeImages = (category) => {
    return images.filter((image) => image.scope.startsWith(category));
  };

  const adaptiveImages = categorizeImages("Adaptive");
  const speakerFocusedImages = categorizeImages("Speaker");
  const equalSizeImages = categorizeImages("Equalsize");
  const largeGroupImages = categorizeImages("Largegroup");

  return (
    <div className="view-all-layout">
      <span className="link-text" onClick={handleBackClick}>
        <FontAwesomeIcon icon={faAngleLeft} /> Back
      </span>
      <div className="layouts">
        <div>
          <span className="text-style"> Adaptive</span>
          <div className="gridContainer">
            {adaptiveImages.map((image, index) => (
              <div key={index} className="box">
                <img
                  src={
                    selectedImage?.imageUrl === image.imageUrl
                      ? image.selectedImageUrl
                      : image.imageUrl
                  }
                  alt={`Image ${index + 1}`}
                  className={`image ${
                    selectedImage === image.layout ? "selected" : ""
                  }`}
                  onClick={() => handleImageClick(image)}
                  onDoubleClick={() => handleDoubleClick(image)}
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <span className="text-style"> Speaker Focused</span>
          <div className="gridContainer">
            {speakerFocusedImages.map((image, index) => (
              <div key={index} className="box">
                <img
                  src={
                    selectedImage?.imageUrl === image.imageUrl
                      ? image.selectedImageUrl
                      : image.imageUrl
                  }
                  alt={`Image ${index + 1}`}
                  onClick={() => handleImageClick(image)}
                  onDoubleClick={() => handleDoubleClick(image)}
                  className={`image ${
                    selectedImage === image.layout ? "selected" : ""
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <span className="text-style"> Equal Size</span>
          <div className="gridContainer">
            {equalSizeImages.map((image, index) => (
              <div key={index} className="box">
                <img
                  src={
                    selectedImage?.imageUrl === image.imageUrl
                      ? image.selectedImageUrl
                      : image.imageUrl
                  }
                  alt={`Image ${index + 1}`}
                  onClick={() => handleImageClick(image)}
                  onDoubleClick={() => handleDoubleClick(image)}
                  className={`image ${
                    selectedImage === image.layout ? "selected" : ""
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <span className="text-style"> Large Group</span>
          <div className="gridContainer">
            {largeGroupImages.map((image, index) => (
              <div key={index} className="box">
                <img
                  src={
                    selectedImage?.imageUrl === image.imageUrl
                      ? image.selectedImageUrl
                      : image.imageUrl
                  }
                  alt={`Image ${index + 1}`}
                  onClick={() => handleImageClick(image)}
                  onDoubleClick={() => handleDoubleClick(image)}
                  className={`image ${
                    selectedImage === image.layout ? "selected" : ""
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllLayout;
