import React from 'react'

export default function Sidebar({name, handleBtnClick, active}) {
  return (
    <div className={`btn-div ${active ? 'active' : ''}`}>
      <button 
        onClick={handleBtnClick} 
        name={name} 
        className={`btn-div ${active ? 'active' : ''}`}
    >
      {name}
    </button>
    </div>
  )
}
