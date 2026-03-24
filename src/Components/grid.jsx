import { useMemo, useEffect, useState } from "react"
import Cell from "./cell";

const Grid = ( {processedSignals} ) => {
  const grid = processedSignals
  const rowCount = processedSignals?.length || 0;
  const columnCount = processedSignals[0]?.length || 0;
  let peaksFound = 0
  const signalChains = 0 
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
        <h4>Trailheads:</h4>
        <h4>Distinct Chains: </h4>
    </div>
    </div>
  )
}

export default Grid