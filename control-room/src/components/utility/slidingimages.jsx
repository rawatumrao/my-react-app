import React, { useState } from 'react'
import './slidstyles.css'

const SlidingImages = ({images}) => {

const [currentIndex, setCurrentIndex] = useState(0)
const displayCount = 5

const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => prevIndex === 0 ? images.length - displayCount : prevIndex -1)
}

const handleNextClick = () => {
    setCurrentIndex((prevIndex) => prevIndex >= images.length - displayCount ? 0 : prevIndex +1)
}

// Calculate displayed images
const displayImages = images.slice(currentIndex, currentIndex + displayCount)

// If there are fewer thatn displayCount iamges left, and more from the start
if(displayImages.length < displayCount) {
    displayImages.push(...images.slice(0, displayCount - displayImages.length))
}



  return (
    <div className='carousel'>
        <button className='arrow' onClick={handlePrevClick}>
            &#8592;
        </button>
        <div className='imagesContainer'>
            {displayImages.map((image, index) => (
                <img key={index} src={image} alt={`Slide ${index}`} className='image' />
            ))}
        </div>
        <button className='arrow' onClick={handleNextClick}>
            &#8594;
        </button>
    </div>
  )
}

export default SlidingImages