import { useMemo, useState } from "react"
import SignalCell from "./SignalCell";

const Grid = ({ processedSignals }) => {
  const grid = processedSignals;
  const rowCount = processedSignals?.length || 0;
  const columnCount = processedSignals[0]?.length || 0;
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // up, down, left, right

  const [toggleMode, setToggleMode] = useState("none")
  const [highlightResetBtn, setHighlightResetBtn] = useState(false)
  const [highlightPeakBtn, setHighlightPeakBtn] = useState(false)
  const [highlightTrailBtn, setHighlightTrailBtn] = useState(false)

  const highlightToggleButtons = (mode) => {
    setToggleMode(mode)
    switch (mode) {
      case "none": 
        setHighlightResetBtn(true)
        setHighlightPeakBtn(false)
        setHighlightTrailBtn(false)
        break;
      case "peak":
        setHighlightPeakBtn(true)
        setHighlightResetBtn(false)
        setHighlightTrailBtn(false)
        break;
      case "trail" :
        setHighlightResetBtn(false)
        setHighlightPeakBtn(false)
        setHighlightTrailBtn(true)
        break;
      default:
        setHighlightResetBtn(false)
        setHighlightPeakBtn(false)
        setHighlightTrailBtn(false)
    }
  }

  const shouldHighlight = (rIndex, cIndex) => {
    if ((toggleMode === "trail" && trailheadData[`${rIndex},${cIndex}`].isTrailhead) ||
      (toggleMode === "peak" && trailheadData[`${rIndex},${cIndex}`].isAPeak) ) {
        return true
      }
      else {
        return false
      }
  }

  const { trailheadData, totalPeaks, totalSignalChains } = useMemo(() => {
    let peaksCount = 0;
    let signalChainsCount = 0;
    const trailheadMap = {};
    const peakCoordinatesGlobal = new Set();
    
    const validNewCoordinates = (newRow, newColumn) => { 
      const inRowRange = newRow >= 0 && newRow < rowCount
      const inColumnRange = newColumn >= 0 && newColumn < columnCount 
      
      return inRowRange && inColumnRange ? true : false
    }
    
    const getValidNeighbours = (row, column) => {
      const validNeighbours = []
      for (const [dirRow, dirCol] of directions) {
        const newRow = row + dirRow;
        const newColumn = column + dirCol;

        if (validNewCoordinates(newRow, newColumn)) {
          if (grid[newRow][newColumn] === grid[row][column] + 1 || grid[newRow][newColumn] === grid[row][column] - 1) {
            validNeighbours.push([newRow, newColumn]);
          }
        }
      }
      return validNeighbours
    }

    const calculatePeaks = (row, column, peakCoordinates) => {
      if (grid[row][column] === 9) {
        const coord = `${row},${column}`;
        peakCoordinates.add(coord);
        peakCoordinatesGlobal.add(coord)
        return;
      }

      for (const [dirRow, dirCol] of directions) {
        const newRow = row + dirRow;
        const newColumn = column + dirCol;

        if (validNewCoordinates(newRow, newColumn)) {
          if (grid[newRow][newColumn] === grid[row][column] + 1) {
            calculatePeaks(newRow, newColumn, peakCoordinates);
          }
        }
      }
    };

    const calculateSignalChains = (row, column, currentPath, allPathsForThisTrailhead) => {
      const currentPathIteration = [...currentPath, [row, column]];
      if (grid[row][column] === 9) {
        allPathsForThisTrailhead.push(currentPathIteration);
        return 1;
      }

      let paths = 0;
      for (const [dirRow, dirCol] of directions) {
        const newRow = row + dirRow;
        const newColumn = column + dirCol;

        if (validNewCoordinates(newRow, newColumn)) {
          if (grid[newRow][newColumn] === grid[row][column] + 1) {
            paths += calculateSignalChains(newRow, newColumn, currentPathIteration, allPathsForThisTrailhead);
          }
        }
      }
      return paths;
    };

    for (let row = 0; row < rowCount; row++) {
      for (let column = 0; column < columnCount; column++) {
        const peakCoordinates = new Set();
        const allPathsForThisTrailhead = [];

        if (grid[row][column] === 0) {
          calculatePeaks(row, column, peakCoordinates);

          const validSignalChainPaths = calculateSignalChains(row, column, [], allPathsForThisTrailhead);

          peaksCount += peakCoordinates.size;
          signalChainsCount += validSignalChainPaths;

          trailheadMap[`${row},${column}`] = {
            isTrailhead: peakCoordinates.size > 0,
            paths: allPathsForThisTrailhead ,
            isAPeak: false,
            neighbours: getValidNeighbours(row, column)
          };
        } else {
            trailheadMap[`${row},${column}`] = {
            isTrailhead: false,
            paths: [],
            isAPeak: grid[row][column] === 9 && peakCoordinatesGlobal.size,
            neighbours: getValidNeighbours(row, column)
          };
        }
      }
    }

    return {
      trailheadData: trailheadMap,
      totalPeaks: peaksCount,
      totalSignalChains: signalChainsCount
    };
  }, [grid, rowCount, columnCount]);
 
  return (
    <div className="main-grid-container">
      <div className="signal-information-container">
        <div className="signal-information">
          <h3>Total Peaks: <span className="emphasis">{totalPeaks}</span></h3>
          <small>This is the total number of 9's that can be accessed from a valid signal chain through +1 increments from 0</small>
          <h3>Total Distinct Chains: <span className="emphasis">{totalSignalChains}</span></h3>
          <small>Number of total distinct valid signal paths a 0 can take to reach a peak</small>
        </div>
        <div className="signal-information-buttons">
          <button className={`button ${highlightTrailBtn? "toggleButtonHighlight" : null}`} onClick={() => {highlightToggleButtons("trail")}}>See all Trailheads</button>
          <button className={`button ${highlightPeakBtn? "toggleButtonHighlight" : null}`} onClick={() => {highlightToggleButtons("peak")}}>See all Peaks</button>
          <button className={`button ${highlightResetBtn? "toggleButtonHighlight" : null}`} onClick={()=> {highlightToggleButtons("none")}}>Reset</button>
        </div>
      </div>

      <div className="grid-container">
        <div className="grid"> 
          {processedSignals.map((row, rIndex) => (
              <div className="row" key={rIndex}>
                {row.map((value, cIndex) => (
                  <div className={`box ${shouldHighlight(rIndex, cIndex) ? "toggleButtonHighlight" : ""}`} key={cIndex}>
                    <SignalCell
                      signalValue={value}
                      row={rIndex}
                      column={cIndex}
                      trailheadInfo={trailheadData[`${rIndex},${cIndex}`]}
                    />
                  </div>
                ))}
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Grid;
