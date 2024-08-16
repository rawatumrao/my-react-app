import React from "react";
import Presenter from "../layout/presenter/presenter.jsx";
import PManagement from "../layout/prmanagement/pmanagement.jsx";
import Media from "../layout/media/media.jsx";

const ComponentWrapper = ({
  participantsArray,
  pLayout,
  mLayout,
  setParticipantsArray,
  setVoiceActivated,
  header,
  roleStatus,
  talkingPplArray,
  pexipBroadCastChannel,
}) => {
  return (
    <>
      <Presenter pLayout={pLayout} />
      <Media mLayout={mLayout} />
      <PManagement
        participantsArray={participantsArray}
        setParticipantsArray={setParticipantsArray}
        setVoiceActivated={setVoiceActivated}
        header={header}
        roleStatus={roleStatus}
        talkingPplArray={talkingPplArray}
        pexipBroadCastChannel={pexipBroadCastChannel}
      />
    </>
  );
};
export default ComponentWrapper;
