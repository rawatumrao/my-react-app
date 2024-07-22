import "./App.css";
import ComponentWrapper from "./components/common/ComponentWrapper.jsx";
import ViewAllLayout from "./components/layout/viewalllayout/viewalllayout.jsx";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  EVENTS,
  INITIAL_TOKEN,
  INITIAL_PARTICIPANT,
  ENV,
  ENVIRONMENT,
  VB_URI_NAME,
  ROLES,
} from "./config/constants.js";
import { AppContext } from "././contexts/context";
import { createData } from "././utils/processJsonData";
import {
  fetchParticipants,
  transformLayout,
  participantSpotlightOn,
  participantSpotlightOff,
} from "./utils/fetchRequests.js";

const findRoleOfUser = (users) => {
  let amIaHost = false;
  users.map((user) => {
    if (VB_URI_NAME === user.uri && user.role === ROLES.chair) amIaHost = true;
  });
  return amIaHost;
};

const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const loadFromLocalStorage = (key, initialValue) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : initialValue;
};

function App() {
  const [presenterLayout, setPresenterLayout] = useState(null);
  const [mediaLayout, setMediaLayout] = useState(null);
  let [participantsArray, setParticipantsArray] = useState(
    loadFromLocalStorage("participants", createData(INITIAL_PARTICIPANT))
  );
  const [initialParticipantsArray, setInitialParticipantsArray] =
    useState(participantsArray);
  const Data = useRef({ token: INITIAL_TOKEN });

  useEffect(() => {
    saveToLocalStorage("participants", participantsArray);
  }, [participantsArray]);

  // Setting up presenter and media layout by clicking on apply button

  const handleApplyClick = useCallback(async () => {
    let hasChanges = false;
    try {
      if (presenterLayout !== null) {
        const response = await transformLayout({
          token: Data.current.token,
          body: { transforms: { layout: presenterLayout } },
        });

        if (response.ok) {
          console.log("Layout setup successfully", response);
        } else {
          console.log("There is some network issue to setup layout", response);
        }
        hasChanges = true;
      }

      const participantsChanges = participantsArray.filter((participant) => {
        const initialParticipant = initialParticipantsArray.find(
          (p) => p.uuid === participant.uuid
        );
        return (
          initialParticipant &&
          initialParticipant.spotlightOrder !== participant.spotlightOrder
        );
      });

      // Make mecessary API calls to update participant's spotlightOrder value
      if (participantsChanges.length > 0) {
        console.log("calling spotlight change", participantsChanges);
        hasChanges = true;
        for (const participant of participantsArray) {
          if (participant.spotlightOrder > 0) {
            console.log("calling spotlightOn", participant.spotlightOrder);
            await participantSpotlightOn({
              uuid: participant.uuid,
              token: Data.current.token,
            });
          } else {
            console.log("calling spotlightOff", participant.spotlightOrder);
            await participantSpotlightOff({
              uuid: participant.uuid,
              token: Data.current.token,
            });
          }
        }
        console.log("Participant updated successfully");
      }

      if (hasChanges) {
        console.log("Changes are applied successfully");
      } else {
        console.log("No changes to apply");
      }
    } catch (e) {
      console.log("Error during apply process", e);
    }
  }, [presenterLayout, participantsArray, initialParticipantsArray]);

  useEffect(() => {
    const fetchInitialParticipants = async () => {
      try {
        let data = await fetchParticipants({
          token: Data.current.token,
        });
        let updatedData = createData(data.result);
        Data.current.meRole = findRoleOfUser(updatedData);
        setParticipantsArray(updatedData);
        setInitialParticipantsArray(updatedData);
      } catch (error) {
        console.error("Error Fetching participants: ", error);
      }
    };

    if (ENV === ENVIRONMENT.dev) {
      fetchInitialParticipants();
    }
    // get server sent events on pexip broadcast channel
    const bc = new BroadcastChannel("pexip");
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
  }, []);

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
                    participantsArray={participantsArray}
                    pLayout={setPresenterLayout}
                    mLayout={setMediaLayout}
                    setParticipantsArray={setParticipantsArray}
                  />
                  <button className="btn" onClick={handleApplyClick}>
                    Apply
                  </button>
                </>
              }
            />
            <Route path="/view-all" element={<ViewAllLayout />} />
          </Routes>
        </Router>
      </AppContext.Provider>
    </>
  );
}

export default App;
