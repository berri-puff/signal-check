import { useState } from "react";
import { FaCaretUp, FaCaretDown} from "react-icons/fa";

const PathSummary = ({ paths })=> {
    const [seePathDetails, setSeePathDetails] = useState(false)

    const formatPathCoords = (path) => {
      return path.map(coord => `(${coord[0]}, ${coord[1]})`).join(" -> ")
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
      <div>
        <strong>{paths.length} Paths to a peak</strong>
        <button className="expand-button" onClick={() => { displayPaths(); } }>Expand {seePathDetails ? <FaCaretUp className="expand-icon"/> : <FaCaretDown className="expand-icon"/>}</button>
      </div>
      <hr/>
      <div id="pathDetails" className="hidden">
        {paths.length > 0 &&
          paths.map((path) => {
            return (
              <div>
                <p>
                  {formatPathCoords(path)}
                  <hr className="short-line"/>
                </p>
              </div>
            );
          })}
      </div>
    </>
  )
}

export default PathSummary