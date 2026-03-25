import { useState } from "react"
import PathSummary from "./pathSummary";

const signalCell = ({row, column, signalValue, trailheadInfo}) => {
  const [seeToolTip, setToolTip] = useState(false)
  const [mouseLocation, setMouseLocation] = useState({x: 0, y: 0})
  const [displaySignalDetails, setDisplaySignalDetails] = useState(false)

  const displayDetails = () => {
    setDisplaySignalDetails(true)
  }

  const displayHoverDetails = (event) => {
    setMouseLocation({
    x: event.pageX,
    y: event.pageY,
    });
    setToolTip(true);
  }

  const returnPeakOrTrailheadStatement = () => {
    if (trailheadInfo.isTrailhead) {
      return "trailhead"
    }
    else if (trailheadInfo.isAPeak) {
      return "Peak"
    } else {
      return "simple plain number"
    }
  }
 
  return(
    <div className="innerContainer">
      <div
        onMouseEnter={(event) => displayHoverDetails(event)}
        onMouseLeave={() => setToolTip(false)}
        onClick={()=> {displayDetails()}}
      >
        <p >{signalValue}</p>
        <div
          className="tooltip"
          style={{
            display: seeToolTip ? "block" : "none",
            position: "fixed",
            top: mouseLocation.y,
            left: mouseLocation.x,
          }}
        >
          <strong>Co-ordinates: <span>({row}, {column})</span></strong>
          <p>Click to see more</p>
        </div>
      </div>

      {displaySignalDetails && (
      <div className="detailModal">
        <button onClick={() => setDisplaySignalDetails(false)} >Close</button>
        <h3>Further Details:</h3>
        <p>Coordinates: ({row}, {column})</p>
        <p>This is a {returnPeakOrTrailheadStatement()}</p>
        <strong>Valid neighbours coordinates:</strong>
        {trailheadInfo.neighbours.length > 0 &&
          trailheadInfo.neighbours.map((neighbour) => {
            return(
              <div>
              <li>
                {"(" + neighbour.toString(",") + ")"}
              </li>
              </div>
            )
          })
        }
        {
          trailheadInfo.isTrailhead ? <PathSummary paths={trailheadInfo.paths}/>
          : null
        }
     </div>
      )}
    </div>
  )
}

export default signalCell