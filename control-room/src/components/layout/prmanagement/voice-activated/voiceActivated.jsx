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
import {
  EVENTS,
  BUTTON_NAMES,
  CONTROL_ROOM_ON_STAGE,
  CONTROL_ROOM_OFF_SCREEN,
  LABEL_NAMES,
  SHOW_VB_MSG,
} from "../../../../constants/constants";
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
  layoutSize,
}) => {
  const [onStageItems, setOnStageItems] = useState(CONTROL_ROOM_ON_STAGE);
  const [offScreenItems, setOffScreenItems] = useState(CONTROL_ROOM_OFF_SCREEN);
  const [data, setData] = useState(participantsArray);
  const [onStageOpen, setOnStageOpen] = useState(true);
  const [offScreenOpen, setOffScreenOpen] = useState(true);

  useEffect(() => {
    if (onStageItems.length || offScreenItems.length)
      loadItems([...onStageItems, ...offScreenItems], false);
  }, []);

  useEffect(() => {
    loadItems(data, false);
  }, [data]);

  useEffect(() => {
    loadItems(participantsArray, true);
  }, [participantsArray]);

  const loadItems = (pplArr, participantsArrayUpdatedBool) => {
    try {
      // added the layout_groups to the new participant update only
      if (participantsArrayUpdatedBool) {
        pplArr.forEach((item) => {
          data.find((elem) => {
            if (elem.uuid === item.uuid) item.layout_group = elem.layout_group;
          });
        });
      }

      const onStage = pplArr.filter(
        (item) =>
          item.layout_group !== null &&
          item.protocol !== "api" &&
          item.protocol !== "rtmp"
      );

      const offScreen = pplArr.filter(
        (item) =>
          item.layout_group === null &&
          item.protocol !== "api" &&
          item.protocol !== "rtmp"
      );

      let updatedOnStageItems = [...onStage];
      let updatedOffScreenItems = [...offScreen];

      // order List
      if (onStageItems.length) {
        updatedOnStageItems = [];

        onStageItems.forEach((item) => {
          onStage.find((elem) => {
            if (elem.uuid === item.uuid) {
              updatedOnStageItems.push(elem);
            }
          });
        });
      }

      if (offScreenItems.length) {
        updatedOffScreenItems = [];

        offScreenItems.forEach((item) => {
          offScreen.find((elem) => {
            if (elem.uuid === item.uuid) {
              updatedOffScreenItems.push(elem);
            }
          });
        });

        // add the new participants to off screen
        if (updatedOffScreenItems.length !== offScreen.length) {
          for (let x = updatedOffScreenItems.length; x < offScreen.length; x++)
            updatedOffScreenItems.push(offScreen[x]);
        }
      }

      setOnStageItems(updatedOnStageItems);
      setOffScreenItems(updatedOffScreenItems);

      pexipBroadCastChannel.postMessage({
        event: EVENTS.controlRoomStageOrders,
        info: {
          onStage: onStage,
          offScreen: offScreen,
        },
      });
    } catch (error) {
      console.error("Error processing data: ", error.message);
    }
  };

  const updateLayoutGroups = (destList) =>
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
      // Prevent adding more items to onStage if the limit is reache
      if (
        destination.droppableId === "onStage" &&
        destList.length > layoutSize
      ) {
        console.log("Cannot add more participants to onStage. Limit reached.");
        const errorMessage = `${LABEL_NAMES.blockParticipantOverMaxCount1} ${layoutSize} ${LABEL_NAMES.blockParticipantOverMaxCount2}`;
        SHOW_VB_MSG(errorMessage);
        return;
      }

      updatedOnStageItems = updateLayoutGroups(destList);
      setOnStageItems(updatedOnStageItems);
    } else {
      updatedOffScreenItems = destList.map((item) => ({
        ...item,
        layout_group: null,
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
  };

  const moveToOnStage = (item) => {
    const updatedOffScreenItems = offScreenItems.filter(
      (i) => i.uuid !== item.uuid
    );
    const updatedOnStageItems = [
      ...onStageItems,
      { ...item, layout_group: numberToWords(onStageItems.length + 1) },
    ];

    if (updatedOnStageItems.length > layoutSize) {
      console.log("Cannot add more participants to onStage. Limit reached.");
      const errorMessage = `${LABEL_NAMES.blockParticipantOverMaxCount1} ${layoutSize} ${LABEL_NAMES.blockParticipantOverMaxCount2}`;
      SHOW_VB_MSG(errorMessage);
      return;
    }

    setOnStageItems(updateLayoutGroups(updatedOnStageItems));
    setOffScreenItems(updatedOffScreenItems);
    const updatedData = [...updatedOnStageItems, ...updatedOffScreenItems];

    setData(updatedData);
    setParticipantsArray(updatedData);
  };
  const movedToOffScreen = (item) => {
    const updatedOnStageItems = onStageItems.filter((i) => i.uuid != item.uuid);
    const updatedOffScreenItems = [
      ...offScreenItems,
      { ...item, layout_group: null },
    ];
    setOnStageItems(updateLayoutGroups(updatedOnStageItems));
    setOffScreenItems(updatedOffScreenItems);
    const updatedData = [...updatedOnStageItems, ...updatedOffScreenItems];

    setData(updatedData);
    setParticipantsArray(updatedData);
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
