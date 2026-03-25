import { useState } from "react";
import { FaCaretUp, FaCaretDown} from "react-icons/fa";

const PathSummary = ({ paths })=> {
    const [seePathDetails, setSeePathDetails] = useState(false)

    const formatPathCoords = (path) => {
      let pathString = ""
      for (let row = 0; row < path.length; row++) {
        for (let col = 0; col < path[row].length; col++) {
          pathString += "(" + row + "," + col + ")";
        }
      }
      return pathString
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
    <>
      <strong>Valid Paths to a peak</strong>
      <hr/>
      <button onClick={() => { displayPaths(); } }>Expand {seePathDetails ? <FaCaretUp /> : <FaCaretDown />}</button>
      <div id="pathDetails" className="hidden">
        {paths.length > 0 &&
          paths.map((path) => {
            return (
              <div>
                <li>
                  {formatPathCoords(path)}
                </li>
              </div>
            );
          })}
      </div>
    </>
  )
}

export default PathSummary