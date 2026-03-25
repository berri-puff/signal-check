import { useState } from "react"
import PathSummary from "./pathSummary";

const signalCell = ({row, column, signalValue, trailheadInfo}) => {
  const [seeToolTip, setToolTip] = useState(false)
  const [mouseLocation, setMouseLocation] = useState({x: 0, y: 0})
  const [displaySignalDetails, setDisplaySignalDetails] = useState(false)
  const isTrailhead = trailheadInfo.isTrailhead
  const isAPeak = trailheadInfo.isAPeak
  const validNeighbours = trailheadInfo.neighbours || []
  const validPaths = trailheadInfo.paths

  const displayDetails = () => {
    setDisplaySignalDetails(true)
  }

  const displayHoverDetails = (event) => {
    setMouseLocation({
      x: event.pageX -100,
      y: event.pageY -140,
    });
    setToolTip(true);
  }

  const returnPeakOrTrailheadStatement = () => {
    if (isTrailhead) {
      return "trailhead"
    }
    else if (isAPeak) {
      return "Peak"
    } else {
      return "neither a peak or trailhead"
    }
  }
 
  return(
    <div className="inner-cell-container">
      <div
        onMouseEnter={(event) => displayHoverDetails(event)}
        onMouseLeave={() => setToolTip(false)}
        onClick={()=> {displayDetails()}}
      >
        <p className="signal-value">{signalValue}</p>
        <div
          className="tooltip"
          style={{
            display: seeToolTip ? "block" : "none",
            position: "fixed",
            top: mouseLocation.y,
            left: mouseLocation.x,
          }}
        >
          <p><strong>Co-ordinates: <span>({row}, {column})</span></strong></p>
          <p>Click to see more</p>
        </div>
      </div>

      {displaySignalDetails && (
        <div className="detail-modal">
          <div className="detail-modal-info">
            <button className="close-modal-button" onClick={() => setDisplaySignalDetails(false)} >Close</button>

            <div className="details-container"> 
              <h3 className="emphasis">This is a {returnPeakOrTrailheadStatement()}</h3>
              <p>Co-ordinate: ({row}, {column})</p>
              <strong>Valid neighbours coordinates</strong>
              <hr/>
              {validNeighbours.length > 0 ?
                validNeighbours.map((neighbour) => {
                  return(
                    <div>
                    <p>
                      {"(" + neighbour.toString(",") + ")"}
                    </p>
                    </div>
                  )
                }):
                <div>
                  <p className="emphasis">No Neighbours</p>
                </div>
              
              }
              {
                isTrailhead ? <PathSummary paths={validPaths}/>
                : null
              }
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default signalCell