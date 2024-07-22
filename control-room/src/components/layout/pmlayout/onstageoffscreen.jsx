import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { IoMdMicOff, IoMdMic } from "react-icons/io";
import { FaUserTie } from "react-icons/fa";
import { BsCameraVideoOffFill, BsCameraVideoFill } from "react-icons/bs";
import "./onstageoffscreen.css";

const OnStageOffScreen = ({ participantsArray, setParticipantsArray }) => {
  const [onStageItems, setOnStageItems] = useState([]);
  const [offScreenItems, setOffScreenItems] = useState([]);
  const [data, setData] = useState(participantsArray);

  useEffect(() => {
    const loadItems = () => {
      const onStage = data
        .filter(
          (item) =>
            item.spotlightOrder !== 0 &&
            item.protocol !== "api" &&
            item.protocol !== "rtmp"
        )
        .sort((a, b) => a.spotlightOrder - b.spotlightOrder);
      const offScreen = data.filter(
        (item) =>
          item.spotlightOrder === 0 &&
          item.protocol !== "api" &&
          item.protocol !== "rtmp"
      );
      setOnStageItems(onStage);
      setOffScreenItems(offScreen);
    };
    loadItems();
  }, [data]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceList =
      source.droppableId === "onStage" ? onStageItems : offScreenItems;
    const destList =
      destination.droppableId === "onStage" ? onStageItems : offScreenItems;
    const [movedItem] = sourceList.splice(source.index, 1);

    if (source.droppableId !== destination.droppableId) {
      movedItem.spotlightOrder = destination.droppableId === "onStage" ? 1 : 0;
    }

    destList.splice(destination.index, 0, movedItem);

    if (destination.droppableId === "onStage") {
      setOnStageItems(
        destList
          .filter((item) => item.protocol !== "api" && item.protocol !== "rtmp")
          .sort((a, b) => a.spotlightOrder - b.spotlightOrder)
      );
      setOffScreenItems([...offScreenItems]);
    } else {
      setOffScreenItems(
        destList.filter(
          (item) => item.protocol !== "api" && item.protocol !== "rtmp"
        )
      );
      setOnStageItems([...onStageItems]);
    }

    const updatedData = [...onStageItems, ...offScreenItems].map((item) =>
      item.uuid === movedItem.uuid
        ? { ...item, spotlightOrder: movedItem.spotlightOrder }
        : item
    );

    setData(updatedData);
    setParticipantsArray(updatedData); //Update the parent state with new data
    localStorage.setItem("participants", JSON.stringify(updatedData)); // Persist to localstorage
  };

  const [onStageOpen, setOnStageOpen] = useState(false);
  const [offScreenOpen, setOffScreenOpen] = useState(false);

  // const [isMicMuted, setIsMicMuted] = useState(true);
  // const [isCameraOff, setIsCameraOff] = useState(true);

  // const toggleMic = () => {
  //   setIsMicMuted(!isMicMuted);
  // };

  // const toggleCamera = () => {
  //   setIsCameraOff(!isCameraOff);
  // };

  const toggleMic = (uuid) => {
    const updatedParticipants = participantsArray.map((participant) => {
      if (participant.uuid === uuid) {
        return { ...participant, isMuted: !participant.isMuted };
      }
      return participant;
    });
    setParticipantsArray(updatedParticipants);
    localStorage.setItem("participants", JSON.stringify(updatedParticipants)); //persist to local storage
  };

  const toggleCamera = (uuid) => {
    const updatedParticipants = participantsArray.map((participant) => {
      if (participant.uuid === uuid) {
        return { ...participant, isCameraMuted: !participant.isCameraMuted };
      }
      return participant;
    });
    setParticipantsArray(updatedParticipants);
    localStorage.setItem("participants", JSON.stringify(updatedParticipants)); //persist to local storage
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="container">
        <div className="list-container">
          <h4 onClick={() => setOnStageOpen(!onStageOpen)}>
            {onStageOpen ? (
              <MdOutlineKeyboardArrowDown />
            ) : (
              <MdOutlineKeyboardArrowRight />
            )}
            On Stage
          </h4>
          {onStageOpen && (
            <Droppable droppableId="onStage">
              {(provided) => (
                <div
                  className="list"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {onStageItems.map((item, index) => (
                    <Draggable
                      key={item.uuid}
                      draggableId={item.uuid}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="item"
                        >
                          <span className="item-content">
                            {item.displayName}
                          </span>
                          <span className="">
                            <span
                              className="icon"
                              onClick={() => toggleMic(item.uuid)}
                            >
                              {item.isMuted ? (
                                <IoMdMicOff color="red" />
                              ) : (
                                <IoMdMic color="green" />
                              )}
                            </span>
                            <span
                              className="icon"
                              onClick={() => toggleCamera(item.uuid)}
                            >
                              {item.isCameraMuted ? (
                                <BsCameraVideoOffFill color="red" />
                              ) : (
                                <BsCameraVideoFill color="green" />
                              )}
                            </span>
                            {item.role === "chair" && (
                              <FaUserTie color="blue" /> // Host Icon //<span className="host">/Host</span>
                            )}
                          </span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        </div>
        <div className="list-container">
          <h4 onClick={() => setOffScreenOpen(!offScreenOpen)}>
            {offScreenOpen ? (
              <MdOutlineKeyboardArrowDown />
            ) : (
              <MdOutlineKeyboardArrowRight />
            )}
            Off Screen
          </h4>
          {offScreenOpen && (
            <Droppable droppableId="offScreen">
              {(provided) => (
                <div
                  className="list"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {offScreenItems.map((item, index) => (
                    <Draggable
                      key={item.uuid}
                      draggableId={item.uuid}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="item"
                        >
                          <span className="item-content">
                            {item.displayName}
                          </span>
                          <span
                            className="icon"
                            onClick={() => toggleMic(item.uuid)}
                          >
                            {item.isMuted ? (
                              <IoMdMicOff color="red" />
                            ) : (
                              <IoMdMic color="green" />
                            )}
                          </span>
                          <span
                            className="icon"
                            onClick={() => toggleCamera(item.uuid)}
                          >
                            {item.isCameraMuted ? (
                              <BsCameraVideoOffFill color="red" />
                            ) : (
                              <BsCameraVideoFill color="green" />
                            )}
                          </span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        </div>
      </div>
    </DragDropContext>
  );
};

OnStageOffScreen.PropTypes = {
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
};

export default OnStageOffScreen;
