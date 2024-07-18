import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import "../mlayout/media.css"
import {adaptive, sf1, sf2, sf3, es1, es2, es3, es4, es5, es6, lg1, lg2, lg3, lg4, lg5, lg6} from "../../../config/imageConstants.js";

const ViewAllLayout = () => {
  
  const [selectedImage, setSelectedImage] = useState(null);
  const imageSF = [sf1, sf2, sf3];
  const imageES = [es1, es2, es3, es4, es5, es6];
  const imageLG = [lg1, lg2, lg3, lg4, lg5, lg6];

    const navigate = useNavigate()
    const handleBackClick =()=>{
        navigate('/')
    }

    const handleImageClick =(index) => {
      setSelectedImage(index);
      console.log("You are selecting layout view from allView :", index)
    }

  return (
    <div className='view-all-layout'>
        <span className='link-text' onClick={handleBackClick}>&lt; Back</span>
        <div className='layouts'>
            <div className=''>
              <span className='text-style'> Adaptive</span>
              <div className='gridContainer'>
                {Array.from({length:1}).map((_, index) => (
                  <div key={index} className='box'>
                    <img src={adaptive} alt={`Image ${index + 1}`} 
                    className={`image ${selectedImage === `Adaptive${index + 1}` ? 'selected': ''}`}
                    onClick={() => handleImageClick(`Adaptive${index + 1}`)} 
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className=''>
              <span className='text-style'> Speaker Focused</span>
              <div className='gridContainer'>
                {imageSF.map((image, index) => (
                  <div key={index} className='box'>
                    <img src={image} alt={`Image ${index + 1}`} 
                    className={`image ${selectedImage === `sf${index + 1}` ? 'selected': ''}`}
                    onClick={() => handleImageClick(`sf${index + 1}`)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className=''>
              <span className='text-style'> Equal Size</span>
              <div className='gridContainer'>
                {imageES.map((image, index) => (
                  <div key={index} className='box'>
                    <img src={image} alt={`Image ${index + 1}`} 
                    className={`image ${selectedImage === `es${index + 1}` ? 'selected': ''}`}
                    onClick={() => handleImageClick(`es${index + 1}`)} 
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className=''>
              <span className='text-style'> Large Group</span>
              <div className='gridContainer'>
                {imageLG.map((image, index) => (
                  <div key={index} className='box'>
                    <img src={image} alt={`Image ${index + 1}`} 
                    className={`image ${selectedImage === `lg${index + 1}` ? 'selected': ''}`}
                    onClick={() => handleImageClick(`lg${index + 1}`)} 
                    />
                  </div>
                ))}
              </div>
            </div>
        </div>
    </div>
  )
}

export default ViewAllLayout