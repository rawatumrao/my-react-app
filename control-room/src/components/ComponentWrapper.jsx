import React from 'react'
import Presenter from './playout/presenter.jsx'
import PManagement from './pmlayout/pmanagement.jsx'
import Media from './mlayout/media.jsx'

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
