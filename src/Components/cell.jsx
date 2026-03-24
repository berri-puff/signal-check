import { useState } from "react"

const Cell = ({row, column, signalValue, trailheadInfo}) => {

  // find valid neighbours here ?? 
  if (trailheadInfo) {
    console.log(`Trailhead at ${row},${column}: trialhead ${trailheadInfo.isTrialhead}, paths ${trailheadInfo.paths.length}`)
  }

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