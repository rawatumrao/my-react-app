import React from 'react'
import Presenter from '../layout/playout/presenter.jsx'
import PManagement from '../layout/pmlayout/pmanagement.jsx'
import Media from '../layout/mlayout/media.jsx'

 const ComponentWrapper = ({participantsArray, pLayout, mLayout}) => {
  return (
    <>
        <Presenter pLayout={pLayout} />
        <Media mLayout={mLayout}/>
        <PManagement participantsArray={participantsArray} />
    </>
  )
}
export default ComponentWrapper
