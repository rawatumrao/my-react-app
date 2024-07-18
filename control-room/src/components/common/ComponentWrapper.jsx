import React from 'react'
import Presenter from '../layout/playout/presenter.jsx'
import PManagement from '../layout/pmlayout/pmanagement.jsx'
import Media from '../layout/mlayout/media.jsx'
import OnStageOffScreen from '../layout/pmlayout/onstageoffscreen.jsx'

 const ComponentWrapper = ({participantsArray, pLayout, mLayout, setParticipantsArray}) => {
  return (
    <>
        <Presenter pLayout={pLayout} />
        <Media mLayout={mLayout}/>
        <PManagement participantsArray={participantsArray} setParticipantsArray={setParticipantsArray} /> 
    </>
  )
}
export default ComponentWrapper
