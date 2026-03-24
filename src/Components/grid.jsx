import { useMemo, useEffect, useState, startTransition } from "react"
import Cell from "./cell";

const Grid = ( {processedSignals} ) => {
  const grid = processedSignals
  const rowCount = processedSignals?.length || 0;
  const columnCount = processedSignals[0]?.length || 0;
  let peaksFound = 0
  let signalChains = 0 
  const directions = [[-1, 0], [1,0], [0, -1], [0,1]] // Allow movement for up, down, left and right

  /*
    0123
    1234
    8765
    9876
  */

    useMemo(() => {
      const coords = [];
        for (let r = 0; r < rowCount; r++) {
          for (let c = 0; c < columnCount; c++) {
            coords.push([r, c]);
          }
        }
        return coords;
    }, [processedSignals, rowCount, columnCount]);

    
    useMemo(()=> {
      const calculatePeaks = (row, column, peakCoordinates) => {
        // calculate reachable peaks and store it 
        if (grid[row][column] === 9) {
          peakCoordinates.add(`${row},${column}`)
          return
        } 

        for (const [dirRow, dirCol] of directions) {
          const newRow = row + dirRow
          const newColumn = column + dirCol

          if (newRow >= 0 && newRow < rowCount && newColumn >= 0 && newColumn < columnCount) {
              if (grid[newRow][newColumn] === grid[row][column] + 1) {
                calculatePeaks(newRow, newColumn, peakCoordinates)
              }
          }
        }
      }

      const calculateSignalChains = (row, column) =>{
        // store the signal chains for a specific 0 
        if (grid[row][column] === 9) return 1;
        
        let paths = 0

        for (const [dirRow, dirCol] of directions) {
          const newRow = row + dirRow
          const newColumn = column + dirCol

          if (newRow >= 0 && newRow < rowCount && newColumn >= 0 && newColumn < columnCount) {
              if (grid[newRow][newColumn] === grid[row][column] + 1) {
                paths += calculateSignalChains(newRow,newColumn)
              }
          }
        }
        return paths
      }

      for (let row = 0; row < rowCount; row++) {
        for (let column = 0; column < columnCount; column++) {
            if (grid[row][column] === 0) {
              const peakCoordinates = new Set()
              calculatePeaks(row, column, peakCoordinates)
              peaksFound += peakCoordinates.size
              // store theses values against the current [row][column]
              signalChains += calculateSignalChains(row, column)

            }
        }
      }
    }, [grid, rowCount, columnCount])

  return(
    <div>
      {
        processedSignals.map((row, rIndex) => {
            return (
                <div className="row" key={rIndex}>
                    {row.map((value, cIndex) => {
                        return (
                            <div 
                                className="box"
                                key={cIndex}
                            >
                                <Cell
                                    signalValue={value}
                                    row={rIndex}
                                    column={cIndex}
                                />
                            </div>
                            );
                        })}
                </div>
            );
        })
    }
    <div>
        <h3>Results</h3>
        <h4>Peaks: {peaksFound}</h4>
        <h4>Distinct Chains: {signalChains}</h4>
    </div>
    </div>
  )
}

export default Grid