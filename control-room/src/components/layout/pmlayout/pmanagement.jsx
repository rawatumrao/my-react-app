import React, { useState } from "react";
import "../mlayout/media.css";
import OnStageOffScreen from "./onstageoffscreen.jsx";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Switch from "react-switch";

const PManagement = ({participantsArray, setParticipantsArray}) => {
  const [checked, setChecked] = useState(false);

  const [expanded, setExpanded] = useState(true);

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  const toggleExpandCollapse = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="expand-collapse-container">
      <div className="header">
          <span className="expand-button" onClick={toggleExpandCollapse}>
            {!expanded ? (
              <MdOutlineKeyboardArrowRight />
            ) : (
              <MdOutlineKeyboardArrowDown />
            )}
            Presenter Management
          </span>
      </div>
      {expanded && (
        <div>
          <div>
            <span className="switch-label">
              Voice-Activated
              <div className="toggle-container">
                <span className="toggle-label">OFF</span>
                <Switch
                  onChange={handleChange}
                  checked={checked}
                  offColor="#888"
                  onColor="#00BFFF"
                  onHandleColor="#00BFFF"
                  handleDiameter={20}
                  checkedIcon={false}
                  height={20}
                  width={48}
                />
                <span className="toggle-label">ON</span>
              </div>
            </span>
          </div>

          <div>
            {!checked && <OnStageOffScreen participantsArray={participantsArray} setParticipantsArray={setParticipantsArray} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default PManagement;
