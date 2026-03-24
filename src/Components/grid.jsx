import { useMemo } from "react"
import Cell from "./cell";

const Grid = ({ processedSignals }) => {
  const grid = processedSignals;
  const rowCount = processedSignals?.length || 0;
  const columnCount = processedSignals[0]?.length || 0;
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // up, down, left, right

  const { trailheadData, totalPeaks, totalSignalChains } = useMemo(() => {
    let peaksCount = 0;
    let signalChainsCount = 0;
    const trailheadMap = {};

    const calculatePeaks = (row, column, peakCoordinates) => {
      if (grid[row][column] === 9) {
        peakCoordinates.add(`${row},${column}`);
        return;
      }

      for (const [dirRow, dirCol] of directions) {
        const newRow = row + dirRow;
        const newColumn = column + dirCol;

        if (newRow >= 0 && newRow < rowCount && newColumn >= 0 && newColumn < columnCount) {
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

        if (newRow >= 0 && newRow < rowCount && newColumn >= 0 && newColumn < columnCount) {
          if (grid[newRow][newColumn] === grid[row][column] + 1) {
            paths += calculateSignalChains(newRow, newColumn, currentPathIteration, allPathsForThisTrailhead);
          }
        }
      }
      return paths;
    };

    for (let row = 0; row < rowCount; row++) {
      for (let column = 0; column < columnCount; column++) {
        if (grid[row][column] === 0) {
          const peakCoordinates = new Set();
          calculatePeaks(row, column, peakCoordinates);

          const allPathsForThisTrailhead = [];
          const validSignalChainPaths = calculateSignalChains(row, column, [], allPathsForThisTrailhead);

          peaksCount += peakCoordinates.size;
          signalChainsCount += validSignalChainPaths;

          trailheadMap[`${row},${column}`] = {
            isTrailhead: peakCoordinates.size > 0 ? true : false,
            paths: allPathsForThisTrailhead 
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
    <div>
      {processedSignals.map((row, rIndex) => (
        <div className="row" key={rIndex}>
          {row.map((value, cIndex) => (
            <div className="box" key={cIndex}>
              <Cell
                signalValue={value}
                row={rIndex}
                column={cIndex}
                trailheadInfo={trailheadData[`${rIndex},${cIndex}`]}
              />
            </div>
          ))}
        </div>
      ))}
      <div>
        <h3>Results</h3>
        <h4>Total Peaks: {totalPeaks}</h4>
        <h4>Total Distinct Chains: {totalSignalChains}</h4>
      </div>
    </div>
  );
};

export default Grid;
