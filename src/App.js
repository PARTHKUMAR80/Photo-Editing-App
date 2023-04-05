import React, {useState} from 'react'
import Sidebar from './Sidebar'
import Slider from './Slider'
import './App.css'
import Validator from 'validator'

const DEFAULT_OPTIONS = [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Contrast',
    property: 'Contrast',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Hue Rotate',
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: 'deg'
  },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: 'px'
  }
]

export default function App() {

  const [mainImgURL, setMainImgURL] = useState('https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')
  const [imageURL, setImageURL] = useState('');
  const [editOptions, setEditOptions] = useState(DEFAULT_OPTIONS);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const selectedItem = editOptions[selectedOptionIndex];

  function handleSliderChange({target}) {
    setEditOptions(prevOptions => {
      return prevOptions.map((prevOption, index) => {
        if (index !== selectedOptionIndex) return prevOption
          return {...prevOption, value: target.value}
      })
    })
  }

  function getImageStyle() {
    const filters = editOptions.map(option => {
      return `${option.property}(${option.value}${option.unit})`
    })

    return { filter: filters.join(' ') }
  }

  function handleImgSubmit() {
    if (Validator.isURL(imageURL)) {
      setMainImgURL(imageURL);
    } else {
      alert("Entered image URL is wrong");
    }
  }

  return (
    <>
    <div className="input-container">
      <input 
        type="text"
        placeholder='Enter your image url here'
        value={imageURL}
        onChange={(e) => {
          setImageURL(e.target.value);
        }}  
      />
      <button onClick={handleImgSubmit}>Submit</button>
    </div>
    <div className="container">
      <div className="img-div-with-slider">
        <div className="img-div">
          <img style={getImageStyle()} src={mainImgURL} alt="" />
        </div>
        <div className="slider-div">
          <Slider 
            min = {selectedItem.range.mim}
            max = {selectedItem.range.max}
            value = {selectedItem.value}
            handleChange = {handleSliderChange}
          />
        </div>
      </div>
      <div className="sidebar">
        {editOptions.map((option,index) => {
          return <Sidebar
            key = {index} 
            name = {option.name}
            handleBtnClick = {() => setSelectedOptionIndex(index)}
            active = {index === selectedOptionIndex}
          />
        })}
      </div>
    </div>
    </>
  )
}
