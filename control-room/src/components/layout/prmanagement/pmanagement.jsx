import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import "../media/mediaStyle.css";
import "./pmanagementStyle.css";
import VoiceActivated from "./voice-activated/voiceActivated.jsx";
//import Switch from "react-switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faToggleOff,
  faToggleOn,
  faAngleDown,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
//import { clearPinningConfig } from "../../../utils/fetchRequests.js";
import { AppContext } from "../../../contexts/context.js";
import { ALT_TAGS } from "../../../constants/constants.js";

const PManagement = ({
  participantsArray,
  setParticipantsArray,
  header,
  roleStatus,
  talkingPplArray,
  pexipBroadCastChannel,
}) => {
  const { setVoiceActivated } = useContext(AppContext);
  const [checked, setChecked] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const handleChange = () => {
    setChecked(!checked);
    setVoiceActivated(!checked);
  };

  const toggleExpandCollapse = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="expand-collapse-container">
      <div className="header">
        <span className="expand-button" onClick={toggleExpandCollapse}>
          <FontAwesomeIcon icon={expanded ? faAngleDown : faAngleRight} />
          Presenter Management
        </span>
      </div>
      {expanded && (
        <div>
          <div className="switch-container">
            <span className="switch-label">
              Voice-Activated
              <div className="toggle-container">
                <span className="toggle-label">OFF</span>
                <div
                  className="switch"
                  onClick={handleChange}
                  alt={checked ? ALT_TAGS.switchOn : ALT_TAGS.switchOff }
                  title={checked ? ALT_TAGS.switchOn : ALT_TAGS.switchOff }
                >
                  <FontAwesomeIcon
                    icon={checked ? faToggleOn : faToggleOff}
                    className="fa-lg"
                    color={checked ? "Aqua" : "white"}
                  />
                </div>
                <span className="toggle-label">ON</span>
              </div>
            </span>
          </div>

          <div>
            {!checked && (
              <VoiceActivated
                participantsArray={participantsArray}
                setParticipantsArray={setParticipantsArray}
                header={header}
                roleStatus={roleStatus}
                talkingPplArray={talkingPplArray}
                pexipBroadCastChannel={pexipBroadCastChannel}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

PManagement.propTypes = {
  participantsArray: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      spotlightOrder: PropTypes.number.isRequired,
      protocol: PropTypes.string,
      isMuted: PropTypes.bool,
      isCameraMuted: PropTypes.bool,
      role: PropTypes.string,
    })
  ).isRequired,
  setParticipantsArray: PropTypes.func.isRequired,
  header: PropTypes.string,
  roleStatus: PropTypes.bool,
  talkingPplArray: PropTypes.array,
  pexipBroadCastChannel: PropTypes.object,
};

export default PManagement;
