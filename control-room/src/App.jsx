
import "./App.css";
import ComponentWrapper from "./components/common/ComponentWrapper.jsx";
import ViewAllLayout from "./components/layout/viewalllayout/viewalllayout.jsx";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import { useState, useRef, useEffect } from "react";
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
import { fetchParticipants, transformLayout, participantSpotlightOn, participantSpotlightOff } from "./utils/fetchRequests.js";

const findRoleOfUser = (users) => {
  let amIaHost = false;
  users.map((user) => {
    if (VB_URI_NAME === user.uri && user.role === ROLES.chair) amIaHost = true;
  });
  return amIaHost;
};

function App() {
  const [preseterLayout, setPresenterLayout] = useState(null);
  // Can use for Media Layout settings
  const [mediaLayout, setMediaLayout] = useState(null);
  let [participantsArray, setParticipantsArray] = useState(createData(INITIAL_PARTICIPANT));
  const [initialParticipantsArray, setInitialParticipantsArray] = useState(participantsArray);
  const Data = useRef({ token: INITIAL_TOKEN });

  // Setting up presenter and media layout by clicking on apply button

  const handleApplyClick = async () => { 
    let hasChanges = false;
    if(preseterLayout !== null){
      try {
        const response = await transformLayout(

          {
            body: {transforms:{layout:preseterLayout}}
          });
        if(response.ok){
          console.log("Layout setup successfully", response)
        } else {
          console.log("There is some network issue to setup layout", response)
        }
      } catch(e){
        console.log("Error during setup layout", e)
      }
      hasChanges = true;
    }

    try {    
        // Chekc if participants spotlightOrder has changed
        const participantsChanges = participantsArray.filter(participant => {
        const initialParticipant = initialParticipantsArray.find(p => p.uuid === participant.uuid);
        return initialParticipant && initialParticipant.spotlightOrder !== participant.spotlightOrder;
      });
      if(participantsChanges.length > 0){
        hasChanges = true;
      }
      // Make mecessary API calls to update participant's spotlightOrder value
      if(participantsChanges.length > 0){
        for ( const participant of participantsArray){
          if(participant.spotlightOrder > 0){
            await participantSpotlightOn({
              uuid: participant.uuid,
              body: {spotlightOrder: participant.spotlightOrder}
            });
          } else {
            await participantSpotlightOff({
              uuid: participant.uuid,
              token: Data.current.token,
              body: {spotlightOrder: participant.spotlightOrder}
            });
          }
        }
        console.log("Participant updated successfully");
      }     
    }catch(e){
      console.log("Error during updating participants", e);
    }

    if(hasChanges){
      console.log("Changes are applied successfully");
    } else {
      console.log("No changes to apply");
    }

  };

  useEffect(() => {
    if (ENV === ENVIRONMENT.prod) {
      fetchParticipants().then((data) => {
        let updatedData = createData(data.result);
        Data.current.meRole = findRoleOfUser(updatedData);
        setParticipantsArray(updatedData);
        setInitialParticipantsArray(updatedData); // Save initial state
      })
      .catch((error) => console.error(error));
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
        setInitialParticipantsArray(updatedData) // Save initial state
        console.log(msg.data.info.participants);
      }
    };
  }, []);

  return (
    <>
      <AppContext.Provider value={Data}>
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
                <button className="btn" onClick={handleApplyClick}>Apply</button>
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
