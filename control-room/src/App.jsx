
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
import { fetchParticipants, transformLayout } from "./utils/fetchRequests.js";

const findRoleOfUser = (users) => {
  let amIaHost = false;
  users.map((user) => {
    if (VB_URI_NAME === user.uri && user.role === ROLES.chair) amIaHost = true;
  });
  return amIaHost;
};

function App() {
  const [preseterLayout, setPresenterLayout] = useState(null);
  const [mediaLayout, setMediaLayout] = useState(null);
  let [participantsArray, setParticipantsArray] = useState(createData(INITIAL_PARTICIPANT));
  const Data = useRef({ token: INITIAL_TOKEN });

  // Setting up presenter and media layout by clicking on apply button

  const handleApplyClick = async () => {
    try {
      const response = await transformLayout(preseterLayout);
      if(response.ok){
        console.log("Layout setup successfully", response)
      } else {
        console.log("There is some network issue to setup layout", response)
      }
    } catch(e){
      console.log("Error during setup layout", e)
    }
    
    /*
// SpotlightOn
    try {
      const response = await transformLayout(preseterLayout, token);
      if(response.ok){
        console.log("Layout setup successfully", response)
      } else {
        console.log("There is some network issue to setup layout", response)
      }
    } catch(e){
      console.log("Error during setup layout", e)
    }
//SpotlightOff
    try {
      const response = await transformLayout(preseterLayout, token);
      if(response.ok){
        console.log("Layout setup successfully", response)
      } else {
        console.log("There is some network issue to setup layout", response)
      }
    } catch(e){
      console.log("Error during setup layout", e)
    }
*/



  };

  

  useEffect(() => {
    if (ENV === ENVIRONMENT.prod) {
      fetchParticipants().then((data) => {
        let updatedData = createData(data.result);
        Data.current.meRole = findRoleOfUser(updatedData);
        setParticipantsArray(updatedData);
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
