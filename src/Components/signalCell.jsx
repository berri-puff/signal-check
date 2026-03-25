import { useEffect, useState } from "react"
import { FaCaretUp, FaCaretDown} from "react-icons/fa";

const signalCell = ({row, column, signalValue, trailheadInfo}) => {
  const [seeToolTip, setToolTip] = useState(false)
  const [mouseLocation, setMouseLocation] = useState({x: 0, y: 0})
  const [displaySignalDetails, setDisplaySignalDetails] = useState(false)
  const [seePathDetails, setSeePathDetails] = useState(false)

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

  const formatPathCoords = (path) => {
    let pathString = ""
    for (let row = 0; row < path.length; row++) {
      for (let col = 0; col < path[row].length; col++) {
        pathString += "(" + row + "," + col + ")";
      }
    }
    return pathString
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

  const displayPaths = () => {
    const pathDetailContainer = document.getElementById("pathDetails")
    if (seePathDetails) {
      pathDetailContainer.classList.add("hidden")
      setSeePathDetails(false) 
    } else {
      pathDetailContainer.classList.remove("hidden")
      setSeePathDetails(true)
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
          trailheadInfo.isTrailhead ? 
          <>
            <strong>Valid Paths to a peak</strong>
            <button onClick={() => { displayPaths(); } }>Expand {seePathDetails ? <FaCaretUp /> : <FaCaretDown />}</button>
            <div id="pathDetails" className="hidden">
              {trailheadInfo.paths.length > 0 &&
                trailheadInfo.paths.map((path) => {
                  return (
                    <div>
                      <li>
                        {formatPathCoords(path)}
                      </li>
                    </div>
                  );
                })}
            </div>
          </> : null
        }
     </div>
      )}
    </div>
  )
}

export default signalCell