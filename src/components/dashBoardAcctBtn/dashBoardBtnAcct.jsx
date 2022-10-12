import React from 'react'

export default function Dashboardbtn({value, displayModal}) {
  return (
    <button onClick={displayModal} className="mgboardbtn">{value}</button>
  )
}
