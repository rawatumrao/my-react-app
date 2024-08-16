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

const bc = new BroadcastChannel("pexip");

function App() {
  const [presenterLayout, setPresenterLayout] = useState(null);
  const [presenterAllLayout, setPresenterAllLayout] = useState(null);
  const [mediaLayout, setMediaLayout] = useState(null);
  const [voiceActivated, setVoiceActivated] = useState(false);
  const [participantsArray, setParticipantsArray] = useState(
    createData(INITIAL_PARTICIPANT)
  );
  const [roleStatus, setRoleStatus] = useState(false);
  const [initialParticipantsArray, setInitialParticipantsArray] =
    useState(participantsArray);
  const Data = useRef({ token: INITIAL_TOKEN });

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
            setInitialParticipantsArray(updatedData);
            return;
          })
          .catch((error) => console.error(error));
      }
    }
    // get server sent events on pexip broadcast channel
    bc.onmessage = (msg) => {
      console.log(msg.data);
      console.log(
        `%c ****************************`,
        `color: red; font-weight: bold;`
      );

      if (msg.data.event === EVENTS.token_refresh) {
        Data.current = {
          token: msg.data.info,
        };
        console.log(msg.data);
      } else if (msg.data.event === EVENTS.participants) {
        let updatedData = createData(msg.data.info.participants);
        Data.current.meRole = findRoleOfUser(updatedData);
        setParticipantsArray(updatedData);
        setInitialParticipantsArray(updatedData); // Save initial state
        console.log(msg.data.info.participants);
      }
    };
  }, [participantsArray]);
  // Setting up presenter and media layout by clicking on apply button
  const handleApplyClick = useCallback(async () => {
    try {
      let selectedLayout =
        presenterAllLayout !== null ? presenterAllLayout : presenterLayout;

      if (!selectedLayout) {
        const errorMessage = "Please select valid Layout to Apply your changes";
        throw new ValidationError(errorMessage);
      }
      let onStageParticipants = participantsArray.filter((participant) => {
        const participantWithOldDetails = initialParticipantsArray.find(
          (p) => p.uuid === participant.uuid
        );
        return (
          participant &&
          participant.layout_group !== null &&
          participant.layout_group !== "" && participant.layout_group !== "" &&
          participant.layout_group !== participantWithOldDetails.layout_group
        );
      });
      let offScreenParticipants = participantsArray.filter((participant) => {
        //console.log("all participant including OffScreenParticipants are here :",participant );
       
        return (participant && participant.layout_group === "");
      });

      if (voiceActivated) {
        let onStageParticipantsForClear = participantsArray.filter(
          (participant) => participant?.layout_group
        );
        await transformLayout({
          token: Data.current.token,
          body: { transforms: { layout: selectedLayout } },
        });
        await clearPinningConfig({
          token: Data.current.token,
        });
        if (onStageParticipantsForClear.length > 0) {
          for (const participant of onStageParticipantsForClear) {
            await clearParticipantFromLayoutGroup({
              uuid: participant.uuid,
              token: Data.current.token,
            });
          }
        }
      } else {
        if (selectedLayout === "ac") {
          const errorMessage =
            "The Adaptive Layout is only applicable for Voice-Activated ON";
          throw new ValidationError(errorMessage);
        }

        let onStageParticipantsForCount = participantsArray.filter(
          (participant) => participant?.layout_group
        )
        let parNumber = onStageParticipantsForCount.length;
        if (parNumber > 0) {
          let count = getParticipantsNumber(selectedLayout);
          if (parNumber > count) {
            let removeNumber = parNumber - count;
            const layoutName = getSelectedLayoutName(selectedLayout);
            const errorMessage = `Please remove ${removeNumber} Presenters from the Stage to apply the ${layoutName} Layout`;
            throw new ValidationError(errorMessage);
          }
          await setPinningConfig({
            token: Data.current.token,
            pinning_config: numberToWords(parNumber),
          });
          await transformLayout({
            token: Data.current.token,
            body: { transforms: { layout: selectedLayout } },
          });

          await Promise.all(
            onStageParticipants.map((participant) =>
              setParticipantToLayoutGroup({
                uuid: participant.uuid,
                token: Data.current.token,
                layoutgroup: participant.layout_group,
              })
            )
          );

          if (offScreenParticipants.length > 0) {
            // console.log("offScreenParticipants.length is more than zero", offScreenParticipants);
            for (const participant of offScreenParticipants) {
              await clearParticipantFromLayoutGroup({
                uuid: participant.uuid,
                token: Data.current.token,
              });
            }
          }

        } else {
          await transformLayout({
            token: Data.current.token,
            body: { transforms: { layout: selectedLayout } },
          });

          if (offScreenParticipants.length > 0) {
            console.log("offScreenParticipants.length is more than zero", offScreenParticipants);
            for (const participant of offScreenParticipants) {
              await clearParticipantFromLayoutGroup({
                uuid: participant.uuid,
                token: Data.current.token,
              });
            }
          }
        }
      }
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
  ]);

  const handlePresenterLayoutChange = (layout) => {
    setPresenterLayout(layout);
    setPresenterAllLayout(null); // Clear the other selection
  };
  const handlePresenterAllLayoutChange = (layout) => {
    setPresenterAllLayout(layout);
    setPresenterLayout(null); // Clear the other selection
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
                    mLayout={setMediaLayout}
                    setParticipantsArray={setParticipantsArray}
                    header={HEADERS.presenters}
                    roleStatus={roleStatus}
                    talkingPplArray={[]}
                    pexipBroadCastChannel={bc}
                  />
                  <button className="btn" onClick={handleApplyClick}>
                    Apply
                  </button>
                </>
              }
            />
            <Route
              path="/view-all"
              element={
                <ViewAllLayout
                  setPresenterAllLayout={handlePresenterAllLayoutChange}
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
