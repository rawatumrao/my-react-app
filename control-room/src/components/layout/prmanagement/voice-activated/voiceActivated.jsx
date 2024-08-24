import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPlus,
  faTimes,
  faAngleDown,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import "./voiceActivatedStyle.css";
import { HEADERS, EVENTS, BUTTON_NAMES, ENV, ENVIRONMENT, WAIT_TO_JOIN_ORDER, PRESENTER_ORDER, STREAMS_ORDER, SHOW_VB_MSG, LABEL_NAMES, MAX_PARTICIPANTS } from "../../../../constants/constants";
import { layoutGroupValue } from "../../../../constants/imageConstants";
import ParticipantsListBtn from "../../../utility/ParticipantsListBtn/ParticipantsListBtn";
import ParticipantsListDisplayName from "../../../utility/ParticipantsListDisplayName/ParticipantsListDisplayName";


const setInitialOrder = (header, participantsArray) => {
  if (ENV === ENVIRONMENT.prod) {
    let orderedlist = [];
    if (header === HEADERS.waitingToJoin) orderedlist = WAIT_TO_JOIN_ORDER;
    if (header === HEADERS.presenters) orderedlist = PRESENTER_ORDER;
    if (header === HEADERS.streams) orderedlist = STREAMS_ORDER;

    return orderedlist?.length ? orderedlist : participantsArray;
  } else {
    return participantsArray;
  }
};

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
  layoutSize,
}) => {
  const [onStageItems, setOnStageItems] = useState([]);
  const [offScreenItems, setOffScreenItems] = useState([]);
  const [data, setData] = useState(participantsArray);
  const [onStageOpen, setOnStageOpen] = useState(true);
  const [offScreenOpen, setOffScreenOpen] = useState(true);
  const [listOrderArray, setListOrderArray] = useState(
    setInitialOrder(header, participantsArray)
  );

  useEffect(()=>{
    console.log("Participants Array updated:  ", participantsArray);
    setData(participantsArray);

  },[participantsArray]);

  useEffect(() => {

        let filteredList = [];
    let copyOfparticipantsArray = [...participantsArray];

    // keep order of list
    listOrderArray.forEach((item) => {
      if (participantsArray.find((elem) => elem.uuid === item.uuid)) {
        copyOfparticipantsArray = copyOfparticipantsArray.filter((person) => {
          if (person.uuid === item.uuid) filteredList.push(person);
          return person.uuid !== item.uuid;
        });
      }
    });

    // add new ppl to the ordered list at the bottom
    copyOfparticipantsArray.forEach((item) => {
      filteredList.push(item);
    });

    setListOrderArray(filteredList);

    // if you add more than the max participants give this message
    if (
      participantsArray.length !== listOrderArray.length &&
      participantsArray.length > MAX_PARTICIPANTS &&
      header === HEADERS.presenters
    )
      SHOW_VB_MSG(LABEL_NAMES.tooManyPresenters);

    
    const loadItems = () => {
      try {
        const onStage = data.filter(
          (item) =>
            item.layout_group !== "" &&
            item.layout_group !== null &&
            item.protocol !== "api" &&
            item.protocol !== "rtmp"
        );

        const offScreen = data.filter(
          (item) =>
            (item.layout_group === "" || item.layout_group === null) &&
            item.protocol !== "api" &&
            item.protocol !== "rtmp"
        );

        setOnStageItems(onStage);
        setOffScreenItems(offScreen);
      } catch (error) {
        console.error("Error processing data: ", error.message);
      }
    };
    loadItems();
  }, [data, participantsArray, header, listOrderArray]);

  const updateLayoutGroups = (destList) =>
    //console.log("Called updateLayoutGroups for onStage");
    destList.map((item, index) => {
      const newLayout_group = numberToWords(index + 1);

      if (item.layout_group !== newLayout_group) {
        return { ...item, layout_group: newLayout_group };
      }
      return item;
    });

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

   

    destList.splice(destination.index, 0, movedItem);

   
    if (destination.droppableId === "onStage") {
      updatedOnStageItems = updateLayoutGroups(destList);
     
      setOnStageItems(updatedOnStageItems);
    
    } else {
     
      updatedOffScreenItems = destList.map((item) => ({
        ...item,
        layout_group: "",
      }));

      setOffScreenItems(updatedOffScreenItems);
    
    }

    
    const undatedOnStageAfterRemoval = updateLayoutGroups(updatedOnStageItems);
    setOnStageItems(undatedOnStageAfterRemoval);

    const updatedData = [
      ...undatedOnStageAfterRemoval,
      ...updatedOffScreenItems,
    ];

    setData(updatedData);
    setParticipantsArray(updatedData); 
    let listName = "";
    if (header === HEADERS.waitingToJoin) listName = HEADERS.waitingToJoin;
    if (header === HEADERS.presenters) listName = HEADERS.presenters;
    if (header === HEADERS.streams) listName = HEADERS.streams;
if(pexipBroadCastChannel){
    pexipBroadCastChannel.postMessage({
      event: EVENTS.orderedList,
      info: JSON.parse(JSON.stringify(updatedData)),
      orderedListName: HEADERS.presenters,
    });
    console.log("Broadcasted updated data: ", updatedData);
  }
  };

  const moveToOnStage = (item) => {
    const updatedOffScreenItems = offScreenItems.filter(
      (i) => i.uuid !== item.uuid
    );
    const updatedOnStageItems = [
      ...onStageItems,
      { ...item, layout_group: numberToWords(onStageItems.length + 1) },
    ];
    setOnStageItems(updateLayoutGroups(updatedOnStageItems));
    setOffScreenItems(updatedOffScreenItems);
    const updatedData = [
      ...updatedOnStageItems,
      ...updatedOffScreenItems,
    ];

    setData(updatedData);
    setParticipantsArray(updatedData); 
    let listName = "";
    if (header === HEADERS.waitingToJoin) listName = HEADERS.waitingToJoin;
    if (header === HEADERS.presenters) listName = HEADERS.presenters;
    if (header === HEADERS.streams) listName = HEADERS.streams;

    if(pexipBroadCastChannel){
      pexipBroadCastChannel.postMessage({
        event: EVENTS.orderedList,
        info: JSON.parse(JSON.stringify(updatedData)),
        orderedListName: HEADERS.presenters,
      });
      console.log("Broadcasted updated data: ", updatedData);
    }
  };
  const movedToOffScreen = (item) => {
    const updatedOnStageItems = onStageItems.filter((i) => i.uuid != item.uuid);
    const updatedOffScreenItems = [
      ...offScreenItems,
      { ...item, layout_group: "" },
    ];
    setOnStageItems(updateLayoutGroups(updatedOnStageItems));
    setOffScreenItems(updatedOffScreenItems);
    const updatedData = [
      ...updatedOnStageItems,
      ...updatedOffScreenItems,
    ];

    setData(updatedData);
    setParticipantsArray(updatedData); 
    let listName = "";
    if (header === HEADERS.waitingToJoin) listName = HEADERS.waitingToJoin;
    if (header === HEADERS.presenters) listName = HEADERS.presenters;
    if (header === HEADERS.streams) listName = HEADERS.streams;

    if(pexipBroadCastChannel){
      pexipBroadCastChannel.postMessage({
        event: EVENTS.orderedList,
        info: JSON.parse(JSON.stringify(updatedData)),
        orderedListName: HEADERS.presenters,
      });
      console.log("Broadcasted updated data: ", updatedData);
    }
  };

  const draggingStyles = (
    isDragging,
    draggableStyle,
    talkingPerson,
    listType
  ) => ({
    userSelect: "none",
    background:
      listType === "onStage"
        ? isDragging
          ? "#484A64"
          : "#5e609c"
        : isDragging
        ? "#484A64"
        : "#24253c",
    display: "flex",
    padding: "9px",
    border:
      talkingPerson && isDragging === false
        ? "2px solid aqua"
        : "2px solid transparent",
    borderRadius: "2px",
    boxShadow: isDragging ? "1px 1px 1px #ffdc81" : "",
    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const renderParticipant = (item, index, listType) => (
    <Draggable key={item.uuid} draggableId={item.uuid} index={index}>
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
              (person) => person?.vad && person?.userId === item.uuid
            ),
            listType
          )}
        >
          <span className="item-content">
            <span className="icon-container">
              {listType === "offScreen" ? (
                <FontAwesomeIcon
                  icon={faPlus}
                  onClick={() => moveToOnStage(item)}
                  className="icon-plus"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={() => movedToOffScreen(item)}
                  className="icon-cancel"
                />
              )}
            </span>
            <ParticipantsListDisplayName {...item} header={header} />
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
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="container">
        <div className="list-container">
          <h4 onClick={() => setOnStageOpen(!onStageOpen)}>
            <FontAwesomeIcon icon={onStageOpen ? faAngleDown : faAngleRight} />
            {` On Stage`} ({onStageItems.length}/{layoutSize})
          </h4>
          {onStageOpen && (
            <Droppable droppableId="onStage">
              {(provided) => (
                <div
                  className="list"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {onStageItems.map((item, index) =>
                    renderParticipant(item, index, "onStage")
                  )}
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
            {` Off Screen`}
          </h4>
          {offScreenOpen && (
            <Droppable droppableId="offScreen">
              {(provided) => (
                <div
                  className="list"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {offScreenItems.map((item, index) =>
                    renderParticipant(item, index, "offScreen")
                  )}
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
  layoutSize: PropTypes.number.isRequired,
};

export default VoiceActivated;
