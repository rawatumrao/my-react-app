import "./viewallmedialayoutStyle.css";
import Media from "../media/media";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const ViewAllMediaLayout = ({
  mLayout,
  pexipBroadCastChannel,
  currMediaLayoutIndex,
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="viewAllMediaLayout">
      <span className="link-text" onClick={handleBackClick}>
        <FontAwesomeIcon icon={faAngleLeft} /> Back
      </span>
      <Media
        mLayout={mLayout}
        pexipBroadCastChannel={pexipBroadCastChannel}
        expandedStatus={true}
        currMediaLayoutIndex={currMediaLayoutIndex}
      />
    </div>
  );
};

export default ViewAllMediaLayout;
