import "./App.css";
import ComponentWrapper from "./components/common/ComponentWrapper.jsx";
import ViewAllLayout from "./components/layout/presenterallview/viewalllayout.jsx";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  EVENTS,
  INITIAL_TOKEN,
  INITIAL_PARTICIPANT,
  ENV,
  ENVIRONMENT,
  SHOW_VB_MSG,
  LABEL_NAMES,
  HEADERS,
  PARTICIPANTS_LIST_PROTOCOLS,
  ROLE_STATUS,
  CONTROL_ROOM_PRESENTER_LAYOUT,
  CONTROL_ROOM_MEDIA_LAYOUT,
  CONTROL_ROOM_VOICE_ACTIVATED,
  LAYOUT_PANEL_VIEWER,
} from "./constants/constants.js";
import { AppContext } from "././contexts/context";
import { createData } from "././utils/processJsonData";
import { NetworkError, ValidationError } from "./utils/customErrors.js";
import {
  fetchInitialParticipants,
  transformLayout,
  setParticipantToLayoutGroup,
  clearParticipantFromLayoutGroup,
  clearPinningConfig,
  setPinningConfig,
} from "./services/fetchRequests.js";
import {
  getParticipantsNumber,
  getSelectedLayoutName,
  numberToWords,
} from "./constants/imageConstants.js";
import { findRoleOfUser, sortParticipants } from "./utils/categorizeFuncs.js";
import ViewAllMediaLayout from "./components/layout/mediaallview/viewallmeidalayout.jsx";
import { getLayoutName } from "./utils/layoutFuncs.js";

const bc = new BroadcastChannel("pexip");

function App() {
  const [presenterLayout, setPresenterLayout] = useState(
    CONTROL_ROOM_PRESENTER_LAYOUT
  );
  const [presenterAllLayout, setPresenterAllLayout] = useState(
    CONTROL_ROOM_PRESENTER_LAYOUT
  );
  const [mediaLayout, setMediaLayout] = useState(CONTROL_ROOM_MEDIA_LAYOUT);
  const [voiceActivated, setVoiceActivated] = useState(
    CONTROL_ROOM_VOICE_ACTIVATED
  );
  const [participantsArray, setParticipantsArray] = useState(
    createData(INITIAL_PARTICIPANT)
  );
  const [roleStatus, setRoleStatus] = useState(ROLE_STATUS);
  const [initialParticipantsArray, setInitialParticipantsArray] =
    useState(null);
  const [currentLayout, setCurentlayout] = useState(null);
  const [currentPinValue, setCurrentPinValue] = useState(null);
  const Data = useRef({ token: INITIAL_TOKEN });
  const prevMediaLayout = useRef();

  const applyTransformLayout = async (selectedLayout) => {
    if (selectedLayout !== currentLayout) {
      try {
        await transformLayout({
          token: Data.current.token,
          body: { transforms: { layout: selectedLayout } },
        });
        setCurentlayout(selectedLayout);
      } catch (error) {
        console.error("Error applying new layout: ", error);
      }
    } else {
      console.log("New layout is the same as the current layout.");
    }
  };

  useEffect(() => {
    if (ENV === ENVIRONMENT.prod) {
      if (participantsArray.length) {
        setRoleStatus(findRoleOfUser(participantsArray));
      } else {
        fetchInitialParticipants()
          .then((data) => {
            let updatedData = createData(data.result);
            setParticipantsArray(updatedData);
            setRoleStatus(findRoleOfUser(updatedData));
            return;
          })
          .catch((error) => console.error(error));
      }
    }
    // get server sent events on pexip broadcast channel
    bc.onmessage = (msg) => {
      if (msg.data.event === EVENTS.token_refresh) {
        Data.current = {
          token: msg.data.info,
        };
        //console.log(msg.data);
      } else if (msg.data.event === EVENTS.participants) {
        let updatedData = createData(msg.data.info.participants);
        Data.current.meRole = findRoleOfUser(updatedData);
        setParticipantsArray(updatedData);
        // console.log(msg.data.info.participants);
      }
    };
  }, []);

  // Setting up presenter and media layout by clicking on apply button
  const handleApplyClick = useCallback(async () => {
    try {
      let selectedLayout =
        presenterAllLayout !== null ? presenterAllLayout : presenterLayout;

      if (!selectedLayout) {
        const errorMessage = "Please select valid Layout to Apply your changes";
        throw new ValidationError(errorMessage);
      }

      let onStageParticipantsWithLGupdated = [];
      let offScreenParticipantsWithLGupdated = [];

      if (initialParticipantsArray) {
        onStageParticipantsWithLGupdated = participantsArray.filter(
          (participant) => {
            const participantWithOldDetails = initialParticipantsArray.find(
              (p) => p.uuid === participant.uuid
            );
            return (
              participant &&
              participant.layout_group !== null &&
              participant.layout_group !==
                participantWithOldDetails?.layout_group
            );
          }
        );

        offScreenParticipantsWithLGupdated = participantsArray.filter(
          (participant) => {
            const participantWithOldDetails = initialParticipantsArray.find(
              (p) => p.uuid === participant.uuid
            );

            return (
              participant &&
              participant.layout_group === null &&
              participant.layout_group !==
                participantWithOldDetails?.layout_group
            );
          }
        );
      } else {
        onStageParticipantsWithLGupdated = participantsArray.filter(
          (participant) => participant?.layout_group
        );
      }

      if (voiceActivated) {
        //Total available participants on onStage for clear thier layout group
        const totalParticipants_onStage = participantsArray.filter(
          (participant) => participant?.layout_group
        );

        await applyTransformLayout(selectedLayout);

        if (currentPinValue) {
          await clearPinningConfig({
            token: Data.current.token,
          });
          setCurrentPinValue(null);
        }

        if (totalParticipants_onStage.length > 0) {
          for (const participant of totalParticipants_onStage) {
            await clearParticipantFromLayoutGroup({
              uuid: participant.uuid,
              token: Data.current.token,
            });
          }
          setInitialParticipantsArray(null);
        }
      } else {
        if (selectedLayout === "ac") {
          const errorMessage =
            "The Adaptive Layout is only applicable for Voice-Activated ON";
          throw new ValidationError(errorMessage);
        }

        let onStageParticipantsForCount = participantsArray.filter(
          (participant) => participant?.layout_group
        );

        let parNumber = onStageParticipantsForCount.length;

        if (parNumber > 0) {
          let count = getParticipantsNumber(selectedLayout);
          if (parNumber > count) {
            let removeNumber = parNumber - count;
            const layoutName = getSelectedLayoutName(selectedLayout);
            const errorMessage = `Please remove ${removeNumber} Presenters from the Stage to apply the ${layoutName} Layout`;
            throw new ValidationError(errorMessage);
          }

          if (parNumber !== currentPinValue) {
            await setPinningConfig({
              token: Data.current.token,
              pinning_config: numberToWords(parNumber),
            });
            setCurrentPinValue(parNumber);
          } else {
            console.log("New Pin value is the same as the current Pin Value.");
          }

          await applyTransformLayout(selectedLayout);

          await Promise.all(
            onStageParticipantsWithLGupdated.map((participant) =>
              setParticipantToLayoutGroup({
                uuid: participant.uuid,
                token: Data.current.token,
                layoutgroup: participant.layout_group,
              })
            )
          );

          if (offScreenParticipantsWithLGupdated.length > 0) {
            for (const participant of offScreenParticipantsWithLGupdated) {
              await clearParticipantFromLayoutGroup({
                uuid: participant.uuid,
                token: Data.current.token,
              });
            }
          }
        } else {
          await applyTransformLayout(selectedLayout);

          if (offScreenParticipantsWithLGupdated.length > 0) {
            for (const participant of offScreenParticipantsWithLGupdated) {
              await clearParticipantFromLayoutGroup({
                uuid: participant.uuid,
                token: Data.current.token,
              });
            }
          }
        }
        setInitialParticipantsArray([...participantsArray]);
      }

      // changing Viewer Layout
      if (mediaLayout !== null && prevMediaLayout.current !== mediaLayout)
        LAYOUT_PANEL_VIEWER(getLayoutName(mediaLayout));
    } catch (error) {
      if (error instanceof ValidationError) {
        SHOW_VB_MSG(error.message);
      } else if (error instanceof NetworkError) {
        SHOW_VB_MSG(error.message);
      } else {
        const errorMessage = `${LABEL_NAMES.applyChangesFailed}`;
        SHOW_VB_MSG(errorMessage);
      }
    }
  }, [
    voiceActivated,
    presenterLayout,
    presenterAllLayout,
    participantsArray,
    initialParticipantsArray,
    mediaLayout,
  ]);

  const handlePresenterLayoutChange = (layout) => {
    setPresenterLayout(layout);
    setPresenterAllLayout(layout);
  };
  const handlePresenterAllLayoutChange = (layout) => {
    setPresenterAllLayout(layout);
    setPresenterLayout(layout);
  };

  const handleMediaLayoutChange = (layout) => {
    try {
      if (mediaLayout !== null) prevMediaLayout.current = mediaLayout;
      setMediaLayout(layout);
    } catch (e) {
      console.log("Please select valid MediaLayout");
    }
  };

  return (
    <>
      <AppContext.Provider
        value={{
          presenterLayout,
          setPresenterLayout,
          mediaLayout,
          setMediaLayout,
          participantsArray,
          setParticipantsArray,
          voiceActivated,
          setVoiceActivated,
          Data,
        }}
      >
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ComponentWrapper
                    participantsArray={sortParticipants(
                      participantsArray,
                      PARTICIPANTS_LIST_PROTOCOLS,
                      roleStatus,
                      false
                    )}
                    pLayout={handlePresenterLayoutChange}
                    mLayout={handleMediaLayoutChange}
                    setParticipantsArray={setParticipantsArray}
                    header={HEADERS.presenters}
                    roleStatus={roleStatus}
                    talkingPplArray={[]}
                    pexipBroadCastChannel={bc}
                    currMediaLayoutIndex={mediaLayout}
                    presenterLayout={presenterLayout}
                    setPresenterAllLayout={setPresenterAllLayout}
                  />
                  <div id="applyBtnDiv" className="applyBtnDiv">
                    <button className="btn" onClick={handleApplyClick}>
                      Apply
                    </button>
                  </div>
                </>
              }
            />
            <Route
              path="/view-all"
              element={
                <ViewAllLayout
                  setPresenterAllLayout={handlePresenterAllLayoutChange}
                  pexipBroadCastChannel={bc}
                  presenterLayout={presenterLayout}
                  setPresenterLayout={setPresenterLayout}
                />
              }
            />
            <Route
              path="/media-all-view"
              element={
                <ViewAllMediaLayout
                  pexipBroadCastChannel={bc}
                  mLayout={handleMediaLayoutChange}
                  currMediaLayoutIndex={mediaLayout}
                />
              }
            />
          </Routes>
        </Router>
      </AppContext.Provider>
    </>
  );
}

export default App;
