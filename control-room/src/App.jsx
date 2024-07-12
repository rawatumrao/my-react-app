
import "./App.css";
import ComponentWrapper from "./components/ComponentWrapper.jsx";
import ViewAllLayout from "./components/viewalllayout/viewalllayout.jsx";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import { useState, useRef, useEffect } from "react";
import {
  EVENTS,
  INITIAL_TOKEN,
  EVENT_ID,
  NODE_ADDRESS,
  INITIAL_PARTICIPANT,
  ENV,
  ENVIRONMENT,
  VB_URI_NAME,
  ROLES,
} from "././contexts/constants";
import { AppContext } from "././contexts/context";
import { createData } from "././utils/processJsonData";

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

  // Setting up presenter and media layout by clicking on apply button
  const handleApplyClick = () => {
    const postData = {"transforms": {"layout": preseterLayout}};
      
    console.log("Testing Data which is going to set", postData);
    fetch(`https://${NODE_ADDRESS}/api/client/v2/conferences/${EVENT_ID}/transform_layout`,
      {
        method: 'POST',
        headers: {
          token: `${INITIAL_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      }).then(response => {
        console.log("response", response)
        if(response.ok){
          console.log("Layout setup successfully", response)
        } else {
          console.log("There is some network issue to setup layout", response)
        }
      }).catch(e =>{
        console.log("Error during setup layout", e)
      })
  };

  let [participantsArray, setParticipantsArray] = useState(
    createData(INITIAL_PARTICIPANT)
  );
  const Data = useRef({ token: INITIAL_TOKEN });

  useEffect(() => {
    if (ENV === ENVIRONMENT.prod) {
      // get initial participants on open
      fetch(
        `https://${NODE_ADDRESS}/api/client/v2/conferences/${EVENT_ID}/participants`,
        {
          headers: {
            token: `${INITIAL_TOKEN}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          let updatedData = createData(data.result);
          Data.current.meRole = findRoleOfUser(updatedData);
          return setParticipantsArray(updatedData);
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

  //==================================================

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
