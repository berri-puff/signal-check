import { useMemo, useEffect, useState } from "react"
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
        // check the neighbouring coordiantes are increment of itself 
        // Part 1 Calculation here, distinct 9's keeping count
        /*
            take in coordinate of the peak, if it's a repeat, keep the score as one
            else add the coordinates to the the peaksCoordinates set, and add 1 
        */
        //    check that either side of the direction of the starting value can be travelled 
        if (grid[row][column] === 9) {
          peakCoordinates.add(`${row},${column}`)
          return
        } 

        for (const [dirRow, dirCol] of directions) {
          const newRow = row + dirRow
          const newColumn = column + dirCol

          // Check that it is manuvable row and column wise and it is more than current value

          if (newRow >= 0 && newRow < rowCount && newColumn >= 0 && newColumn < columnCount) {
              if (grid[newRow][newColumn] === grid[row][column] + 1) {
                calculatePeaks(newRow, newColumn, peakCoordinates)
              }
          }
        }
      }

      const calculateSignalChains = (row, column) =>{
        // Part 2 calculation, working out the total distinct paths to 9 
        // another new set to save the coordinates to get to the 
  
      }

      for (let row = 0; row < rowCount; row++) {
        for (let column = 0; column < columnCount; column++) {
            if (grid[row][column] === 0) {
              // call find peaks 
              // call find signal chains 
              const peakCoordinates = new Set()
              calculatePeaks(row, column, peakCoordinates)
              // New set for distinct chains for coordinates for travel through
              calculateSignalChains(row, column)

            }
        }
      }
      console.log(peaksFound, "found")
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
        <h4>Distinct Chains: </h4>
    </div>
    </div>
  )
}

export default Grid