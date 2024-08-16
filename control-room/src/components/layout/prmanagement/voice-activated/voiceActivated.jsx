import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./voiceActivatedStyle.css";
import { HEADERS, EVENTS, BUTTON_NAMES } from "../../../../constants/constants";
import { layoutGroupValue } from "../../../../constants/imageConstants";
import ParticipantsListBtn from "../../../utility/ParticipantsListBtn/ParticipantsListBtn";
import ParticipantsListDisplayName from "../../../utility/ParticipantsListDisplayName/ParticipantsListDisplayName";

const numberToWords = (num) => {
  return layoutGroupValue[num - 1] || "unknown";
};

const VoiceActivated = ({
  participantsArray,
  setParticipantsArray,
  header,
  roleStatus,
  talkingPplArray,
  pexipBroadCastChannel,
}) => {
  const [onStageItems, setOnStageItems] = useState([]);
  const [offScreenItems, setOffScreenItems] = useState([]);
  const [data, setData] = useState(participantsArray);
  const [onStageOpen, setOnStageOpen] = useState(false);
  const [offScreenOpen, setOffScreenOpen] = useState(false);

  useEffect(() => {
    const loadItems = () => {
      try {
        const onStage = data.filter((item) => {
          if (item.layout_group === undefined) {
            throw new Error("layout_group is undefined");
          }
          return (
            item.layout_group !== "" &&
            item.layout_group !== null &&
            item.protocol !== "api" &&
            item.protocol !== "rtmp"
          );
        });

        const offScreen = data.filter((item) => {
          if (item.layout_group === undefined) {
            throw new Error("layout_group is undefined");
          }
          return (
            (item.layout_group === "" || item.layout_group === null) &&
            item.protocol !== "api" &&
            item.protocol !== "rtmp"
          );
        });

        setOnStageItems(onStage);
        setOffScreenItems(offScreen);
      } catch (error) {
        console.error("Error processing data: ", error.message);
      }
    };
    loadItems();
  }, [data]);

  const updateLayoutGroups = (destList) => {
      //console.log("Called updateLayoutGroups for onStage");

    return destList.map((item, index) => {
      const newLayout_group = numberToWords(index + 1);

      if (item.layout_group !== newLayout_group) {
        return { ...item, layout_group: newLayout_group };
      }
      return item;
    });
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    let updatedOnStageItems = [...onStageItems];
    let updatedOffScreenItems = [...offScreenItems];

    const sourceList =
      source.droppableId === "onStage"
        ? updatedOnStageItems
        : updatedOffScreenItems;
    const destList =
      destination.droppableId === "onStage"
        ? updatedOnStageItems
        : updatedOffScreenItems;

    const [movedItem] = sourceList.splice(source.index, 1);
    // Set Layout_group for the moved item
    if (source.droppableId !== destination.droppableId) {
      movedItem.layout_group =
        destination.draggableId === "onStage" ? numberToWords(1) : "";
    }

    destList.splice(destination.index, 0, movedItem);

    // Recalculate layout_group for the onStageItems
    if (destination.droppableId === "onStage") {
      updatedOnStageItems = updateLayoutGroups(destList);
      //console.log("Testing out put ....", updatedOnStageItems);
      setOnStageItems(updatedOnStageItems);
      // setOffScreenItems(updatedOffScreenItems);
    } else {
      // If Moving to offScreen, reset layout_group to empty
      updatedOffScreenItems = destList.map((item) => {
        if (item.uuid === movedItem.uuid) {
    
          return { ...item, layout_group: "" };
        }
        
        // console.log(
        //   "If Moving to offScreen, reset layout_group to empty",
        //   item
        // );
        return item;
      });
      //console.log("Testing out put ....", updatedOffScreenItems);
      setOffScreenItems(updatedOffScreenItems);
      // setOnStageItems(updatedOnStageItems);
    }

    //Recalculate layout_group for the onStage items if needed
    const undatedOnStageAfterRemoval = updateLayoutGroups(updatedOnStageItems);
    setOnStageItems(undatedOnStageAfterRemoval);

    const updatedData = [
      ...undatedOnStageAfterRemoval,
      ...updatedOffScreenItems,
    ];

    setData(updatedData);
    setParticipantsArray(updatedData); //Update the parent state with new data
    //localStorage.setItem("participants", JSON.stringify(updatedData)); // Persist to localstorage

    // send ordered list to parent page to be saved
    let listName = "";
    if (header === HEADERS.waitingToJoin) listName = HEADERS.waitingToJoin;
    if (header === HEADERS.presenters) listName = HEADERS.presenters;
    if (header === HEADERS.streams) listName = HEADERS.streams;

    pexipBroadCastChannel.postMessage({
      event: EVENTS.orderedList,
      info: JSON.parse(JSON.stringify(updatedData)),
      orderedListName: listName,
    });
  };

  const draggingStyles = (isDragging, draggableStyle, talkingPerson) => ({
    userSelect: "none",
    background: isDragging ? "#181818" : "black",
    display: "flex",
    padding: "9px",
    border:
      talkingPerson && isDragging === false
        ? "2px solid aqua"
        : "2px solid transparent",
    borderRadius: "5px",
    boxShadow: isDragging ? "1px 1px 1px #ffdc81" : "",
    // styles we need to apply on draggables
    ...draggableStyle,
  });

  

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="container">
        <div className="list-container">
          <h4 onClick={() => setOnStageOpen(!onStageOpen)}>
            <FontAwesomeIcon icon={onStageOpen ? faAngleDown : faAngleRight} />
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
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="item"
                          style={draggingStyles(
                            snapshot.isDragging,
                            provided.draggableProps.style,
                            talkingPplArray.find(
                              (person) =>
                                person?.vad && person?.userId === item.uuid
                            )
                          )}
                        >
                          <span className="item-content">
                            <ParticipantsListDisplayName
                              {...item}
                              header={header}
                            />
                          </span>

                          <div>
                            {!item.is_audio_only_call && item.isCameraMuted && (
                              <>
                                <ParticipantsListBtn
                                  attr={BUTTON_NAMES.video}
                                  {...item}
                                  roleStatus={roleStatus}
                                  pexipBroadCastChannel={pexipBroadCastChannel}
                                />
                              </>
                            )}
                          </div>
                          <div>
                            {item.isMuted && (
                            <ParticipantsListBtn
                              attr={BUTTON_NAMES.audio}
                              {...item}
                              roleStatus={roleStatus}
                              pexipBroadCastChannel={pexipBroadCastChannel}
                            />
                            )}
                          </div>
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
            <FontAwesomeIcon
              icon={offScreenOpen ? faAngleDown : faAngleRight}
            />
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
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="item"
                          style={draggingStyles(
                            snapshot.isDragging,
                            provided.draggableProps.style,
                            talkingPplArray.find(
                              (person) =>
                                person?.vad && person?.userId === item.uuid
                            )
                          )}
                        >
                          <span className="item-content">
                            <ParticipantsListDisplayName
                              {...item}
                              header={header}
                            />
                          </span>
                          <div>
                            {!item.is_audio_only_call && item.isCameraMuted && (
                              <>
                                <ParticipantsListBtn
                                  attr={BUTTON_NAMES.video}
                                  {...item}
                                  roleStatus={roleStatus}
                                  pexipBroadCastChannel={pexipBroadCastChannel}
                                />
                              </>
                            )}
                          </div>
                          <div>
                            {item.isMuted && (
                            <ParticipantsListBtn
                              attr={BUTTON_NAMES.audio}
                              {...item}
                              roleStatus={roleStatus}
                              pexipBroadCastChannel={pexipBroadCastChannel}
                            />
                          )}
                          </div>
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

VoiceActivated.propTypes = {
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

export default VoiceActivated;
