import { useEffect, useState } from "react";
import Presenter from "../layout/presenter/presenter.jsx";
import PManagement from "../layout/prmanagement/pmanagement.jsx";
import Media from "../layout/media/media.jsx";
import { getTotalCapacity } from "../../constants/imageConstants.js";

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
  const [layoutSize, setLayoutSize] = useState(20);
  const [selectedLayout, setSelectedLayout] = useState(null);

  useEffect(() => {
    if (selectedLayout) {
      const newSize = getTotalCapacity(selectedLayout);
      setLayoutSize(newSize || 20);
    }
  }, [selectedLayout]);

  return (
    <>
      <Presenter pLayout={pLayout} setSelectedLayout={setSelectedLayout} />
      <Media mLayout={mLayout} />
      <PManagement
        participantsArray={participantsArray}
        setParticipantsArray={setParticipantsArray}
        setVoiceActivated={setVoiceActivated}
        header={header}
        roleStatus={roleStatus}
        talkingPplArray={talkingPplArray}
        pexipBroadCastChannel={pexipBroadCastChannel}
        layoutSize={layoutSize}
      />
    </>
  );
};
export default ComponentWrapper;
