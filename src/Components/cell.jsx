import { useState } from "react"

const Cell = ({row, column, signalValue}) => {

  const displayDetails = () => {
    console.log("display details")
  }

  return(
    <>
      <p onClick={()=> {displayDetails()}}
        onMouseEnter={() => console.log("hover")}
        >{signalValue}
        <span>({row},{column})</span>
      </p>
    </>
  )
}

export default Cell