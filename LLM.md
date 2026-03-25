`I have a function that takes in a row, column and a set that contains coordinates value in at the coordinate is 9. So far, I have a set of directions to travel in 4 directions, once that is valid coordinate points, I want to check that the neighbouring cell values is 1 greater than the previous. However, when I console log the grid with new row and column, it returns typeError where the newColumn is 0 and can not be read.`

Response: 
```
I'll fix the boundary check logic, which currently uses || instead of &&, and correct the directions array to include all four cardinal movements.
 const columnCount = processedSignals[0]?.length || 0;                                                                                                           │
│  8   const peaksFound = 0                                                                                                                                            │
│  9   const signalChains = 0                                                                                                                                          │
│ 10 - const directions = [[-1, 0], [1,0], [0, -1], [-1,0]] // Allow movement for up, down, left and right                                                             │
│ 10 + const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]] // Up, Down, Left, Right                                                                                  │
│ 11                                                                                                                                                                   │
│ 12   /*                                                                                                                                                              │
│ 13     0123                                                                                                                                                          │
│ ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ │
│ 29                                                                                                                                                                   │
│ 30     useMemo(()=> {                                                                                                                                                │
│ 31         const calculatePeaks = (row, column, peakCoordinates) => {                                                                                                │
│ 32 -           // check the neighbouring coordiantes are increment of itself                                                                                         │
│ 33 -           // Part 1 Calculation here, distinct 9's keeping count of the different 9's                                                                           │
│ 34 -           /*                                                                                                                                                    │
│ 35 -               take in coordinate of the peak, if it's a repeat, keep the score as one                                                                           │
│ 36 -               else add the coordinates to the the peaksCoordinates set, and add 1                                                                               │
│ 37 -           */                                                                                                                                                    │
│ 38 -       //    check that either side of the direction of the starting value can be travelled                                                                      │
│ 32             if (grid[row][column] === 9) {                                                                                                                        │
│ 33                 peakCoordinates.add(`${row},${column}`);                                                                                                          │
│ 34                 return;                                                                                                                                           │
│ ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ │
│ 42 -           } else {                                                                                                                                              │
│ 35 +           }                                                                                                                                                     │
│ 36                                                                                                                                                                   │
│ ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ │
│ 44 -               for (const [dirRow, dirCol] of directions) {                                                                                                      │
│ 45 -                   const newRow = row + dirRow                                                                                                                   │
│ 46 -                   const newColumn = column + dirCol                                                                                                             │
│ 47 -                                                                                                                                                                 │
│ 48 -                                                                                                                                                                 │
│ 49 -                   // Check that it is manuvable row and column wise and it is more than current value                                                           │
│ 50 -                                                                                                                                                                 │
│ 51 -                   if (newRow >= 0 || newRow <= rowCount || newColumn >= 0 || newColumn <= columnCount) {                                                        │
│ 52 -                       console.log(grid[newRow][newColumn], "grid in valid")                                                                                     │
│ 53 -                       // if (grid[newRow][newColumn] === grid[row][column] + 1) {                                                                               │
│ 54 -                       //     console.log                                                                                                                        │
│ 55 -                       // }                                                                                                                                      │
│ 37 +           for (const [dirRow, dirCol] of directions) {                                                                                                          │
│ 38 +               const newRow = row + dirRow;                                                                                                                      │
│ 39 +               const newColumn = column + dirCol;                                                                                                                │
│ 40                                                                                                                                                                   │
│ ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ │
│ 57 -                       // calculatePeaks(newRow, newColumn, peakCoordinates)                                                                                     │
│ 58 -                   }                                                                                                                                             │
│ 59 -                                                                                                                                                                 │
│ 60 -                                                                                                                                                                 │
│ 61 -                                                                                                                                                                 │
│ 62 -                   // console.log(newColumn, "new col")                                                                                                          │
│ 63 -                   // console.log(newRow, "new col")                                                                                                             │
│ 64 -                                                                                                                                                                 │
│ 41 +               if (                                                                                                                                              │
│ 42 +                   newRow >= 0 &&                                                                                                                                │
│ 43 +                   newRow < rowCount &&                                                                                                                          │
│ 44 +                   newColumn >= 0 &&                                                                                                                             │
│ 45 +                   newColumn < columnCount &&                                                                                                                    │
│ 46 +                   grid[newRow][newColumn] === grid[row][column] + 1                                                                                             │
│ 47 +               ) {                                                                                                                                               │
│ 48 +                   calculatePeaks(newRow, newColumn, peakCoordinates);                                                                                           │
│ 49                 }                                                                                                                                                 │
│ 50             }                                                                                                                                                     │
│ ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ │
│ 67 -                                                                                                                                                                 │
│ 68 -                                                                                                                                                                 │
│ 51         }                                                                                                                                                         │
│ 52                                                                                                                                                                   │
│ 53 +       let totalPeaks = 0;                                                                                                                                       │
│ 54         for (let row = 0; row < rowCount; row++) {                                                                                                                │
│ 55             for (let column = 0; column < columnCount; column++) {                                                                                                │
│ 56                 if (grid[row][column] === 0) {                                                                                                                    │
│ ════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ │
│ 74 -                   // call find peaks                                                                                                                            │
│ 75 -                   // call find signal chains                                                                                                                    │
│ 76 -                   const peakCoordinates = new Set()                                                                                                             │
│ 77 -                   calculatePeaks(row, column, peakCoordinates)                                                                                                  │
│ 57 +                   const peakCoordinates = new Set();                                                                                                            │
│ 58 +                   calculatePeaks(row, column, peakCoordinates);                                                                                                 │
│ 59 +                   totalPeaks += peakCoordinates.size;                                                                                                           │
│ 60                 }                                                                                                                                                 │
│ 61             }                                                                                                                                                     │
│ 62         }                                                                                                                                                         │
│ 63 +       console.log("Total Peaks (Trailheads):", totalPeaks);                                                                                                     │
│ 64 +   }, [grid, rowCount, columnCount])                                                                                                                             │
│ 65                                                                                                                                                                   │
│ 66         const validNeighbour = () => {      
  ```

  - I did not let the AI completely change my files directly, instead, I had taken it suggestion to change the checks and manually edited before moving forward


  Input: 

  `Now that I have the full path, what are the ways to pass down the map paths and whether it's a trailhead to the cell `
  ```
     1 - import { useMemo, useEffect, useState, startTransition } from "react"                                                                                                                                     │
│   1 + import { useMemo } from "react"                                                                                                                                                                           │
│   2   import Cell from "./cell";                                                                                                                                                                                │
│   3                                                                                                                                                                                                             │
│   4 - const Grid = ( {processedSignals} ) => {                                                                                                                                                                  │
│   5 -   const grid = processedSignals                                                                                                                                                                           │
│   4 + const Grid = ({ processedSignals }) => {                                                                                                                                                                  │
│   5 +   const grid = processedSignals;                                                                                                                                                                          │
│   6     const rowCount = processedSignals?.length || 0;                                                                                                                                                         │
│   7     const columnCount = processedSignals[0]?.length || 0;                                                                                                                                                   │
│   8 -   const directions = [[-1, 0], [1,0], [0, -1], [0,1]] // Allow movement for up, down, left and right                                                                                                      │
│   8 +   const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // up, down, left, right                                                                                                                         │
│   9                                                                                                                                                                                                             │
│  10 -   /*                                                                                                                                                                                                      │
│  11 -     0123                                                                                                                                                                                                  │
│  12 -     1234                                                                                                                                                                                                  │
│  13 -     8765                                                                                                                                                                                                  │
│  14 -     9876                                                                                                                                                                                                  │
│  15 -   */                                                                                                                                                                                                      │
│  10 +   const coords = useMemo(() => {                                                                                                                                                                          │
│  11 +     const arr = [];                                                                                                                                                                                       │
│  12 +     for (let r = 0; r < rowCount; r++) {                                                                                                                                                                  │
│  13 +       for (let c = 0; c < columnCount; c++) {                                                                                                                                                             │
│  14 +         arr.push([r, c]);                                                                                                                                                                                 │
│  15 +       }                                                                                                                                                                                                   │
│  16 +     }                                                                                                                                                                                                     │
│  17 +     return arr;                                                                                                                                                                                           │
│  18 +   }, [rowCount, columnCount]);                                                                                                                                                                            │
│  19                                                                                                                                                                                                             │
│  17 -     useMemo(() => {                                                                                                                                                                                       │
│  18 -       const coords = [];                                                                                                                                                                                  │
│  19 -         for (let r = 0; r < rowCount; r++) {                                                                                                                                                              │
│  20 -           for (let c = 0; c < columnCount; c++) {                                                                                                                                                         │
│  21 -             coords.push([r, c]);                                                                                                                                                                          │
│  22 -           }                                                                                                                                                                                               │
│  23 -         }                                                                                                                                                                                                 │
│  24 -         return coords;                                                                                                                                                                                    │
│  25 -     }, [processedSignals, rowCount, columnCount]);                                                                                                                                                        │
│  20 +   const { trailheadData, totalPeaks, totalSignalChains } = useMemo(() => {                                                                                                                                │
│  21 +     let peaksCount = 0;                                                                                                                                                                                   │
│  22 +     let signalChainsCount = 0;                                                                                                                                                                            │
│  23 +     const trailheadMap = {};                                                                                                                                                                              │
│  24                                                                                                                                                                                                             │
│  27 -     const {peaksFound, calculateSignalChains }= useMemo(()=> {                                                                                                                                            │
│  28 -       let peaks = 0                                                                                                                                                                                       │
│  29 -       let signalChains = 0                                                                                                                                                                                │
│  30 -       const allPaths = []                                                                                                                                                                                 │
│  31 -       const signalInfo = {}                                                                                                                                                                               │
│  32 -                                                                                                                                                                                                           │
│  33 -       const calculatePeaks = (row, column, peakCoordinates) => {                                                                                                                                          │
│  34 -         // calculate reachable peaks and store it                                                                                                                                                         │
│  35 -         if (grid[row][column] === 9) {                                                                                                                                                                    │
│  36 -           peakCoordinates.add(`${row},${column}`)                                                                                                                                                         │
│  37 -           return                                                                                                                                                                                          │
│  38 -         }                                                                                                                                                                                                 │
│  25 +     const calculatePeaks = (row, column, peakCoordinates) => {                                                                                                                                            │
│  26 +       if (grid[row][column] === 9) {                                                                                                                                                                      │
│  27 +         peakCoordinates.add(`${row},${column}`);                                                                                                                                                          │
│  28 +         return;                                                                                                                                                                                           │
│  29 +       }                                                                                                                                                                                                   │
│  30                                                                                                                                                                                                             │
│ ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ │
│  40 -         for (const [dirRow, dirCol] of directions) {                                                                                                                                                      │
│  41 -           const newRow = row + dirRow                                                                                                                                                                     │
│  42 -           const newColumn = column + dirCol                                                                                                                                                               │
│  31 +       for (const [dirRow, dirCol] of directions) {                                                                                                                                                        │
│  32 +         const newRow = row + dirRow;                                                                                                                                                                      │
│  33 +         const newColumn = column + dirCol;                                                                                                                                                                │
│  34                                                                                                                                                                                                             │
│ ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ │
│  44 -           if (newRow >= 0 && newRow < rowCount && newColumn >= 0 && newColumn < columnCount) {                                                                                                            │
│  45 -               if (grid[newRow][newColumn] === grid[row][column] + 1) {                                                                                                                                    │
│  46 -                 calculatePeaks(newRow, newColumn, peakCoordinates)                                                                                                                                        │
│  47 -               }                                                                                                                                                                                           │
│  35 +         if (newRow >= 0 && newRow < rowCount && newColumn >= 0 && newColumn < columnCount) {                                                                                                              │
│  36 +           if (grid[newRow][newColumn] === grid[row][column] + 1) {                                                                                                                                        │
│  37 +             calculatePeaks(newRow, newColumn, peakCoordinates);                                                                                                                                           │
│  38             }                                                                                                                                                                                               │
│  39           }                                                                                                                                                                                                 │
│  40         }                                                                                                                                                                                                   │
│  41 +     };                                                                                                                                                                                                    │
│  42                                                                                                                                                                                                             │
│ ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ │
│  52 -       const calculateSignalChains = (row, column, existingPaths, allPaths) =>{                                                                                                                            │
│  53 -         const currentPathIteration = [...existingPaths, [row, column]]                                                                                                                                    │
│  54 -         if (grid[row][column] === 9) {                                                                                                                                                                    │
│  55 -           allPaths.push(currentPathIteration)                                                                                                                                                             │
│  56 -           return 1                                                                                                                                                                                        │
│  57 -         };                                                                                                                                                                                                │
│  58 -                                                                                                                                                                                                           │
│  59 -         let paths = 0                                                                                                                                                                                     │
│  43 +     const calculateSignalChains = (row, column, currentPath, allPathsForThisTrailhead) => {                                                                                                               │
│  44 +       const currentPathIteration = [...currentPath, [row, column]];                                                                                                                                       │
│  45 +       if (grid[row][column] === 9) {                                                                                                                                                                      │
│  46 +         allPathsForThisTrailhead.push(currentPathIteration);                                                                                                                                              │
│  47 +         return 1;                                                                                                                                                                                         │
│  48 +       }                                                                                                                                                                                                   │
│  49                                                                                                                                                                                                             │
│ ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ │
│  61 -         for (const [dirRow, dirCol] of directions) {                                                                                                                                                      │
│  62 -           const newRow = row + dirRow                                                                                                                                                                     │
│  63 -           const newColumn = column + dirCol                                                                                                                                                               │
│  50 +       let paths = 0;                                                                                                                                                                                      │
│  51 +       for (const [dirRow, dirCol] of directions) {                                                                                                                                                        │
│  52 +         const newRow = row + dirRow;                                                                                                                                                                      │
│  53 +         const newColumn = column + dirCol;                                                                                                                                                                │
│  54                                                                                                                                                                                                             │
│ ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ │
│  65 -           if (newRow >= 0 && newRow < rowCount && newColumn >= 0 && newColumn < columnCount) {                                                                                                            │
│  66 -               if (grid[newRow][newColumn] === grid[row][column] + 1) {                                                                                                                                    │
│  67 -                 paths += calculateSignalChains(newRow,newColumn, currentPathIteration, allPaths)                                                                                                          │
│  68 -               }                                                                                                                                                                                           │
│  55 +         if (newRow >= 0 && newRow < rowCount && newColumn >= 0 && newColumn < columnCount) {                                                                                                              │
│  56 +           if (grid[newRow][newColumn] === grid[row][column] + 1) {                                                                                                                                        │
│  57 +             paths += calculateSignalChains(newRow, newColumn, currentPathIteration, allPathsForThisTrailhead);                                                                                            │
│  58             }                                                                                                                                                                                               │
│  59           }                                                                                                                                                                                                 │
│ ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ │
│  71 -         return paths                                                                                                                                                                                      │
│  60         }                                                                                                                                                                                                   │
│  61 +       return paths;                                                                                                                                                                                       │
│  62 +     };                                                                                                                                                                                                    │
│  63                                                                                                                                                                                                             │
│ ═══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════ │
│  74 -       for (let row = 0; row < rowCount; row++) {                                                                                                                                                          │
│  75 -         for (let column = 0; column < columnCount; column++) {                                                                                                                                            │
│  76 -             if (grid[row][column] === 0) {                                                                                                                                                                │
│  77 -               const peakCoordinates = new Set()                                                                                                                                                           │
│  78 -               calculatePeaks(row, column, peakCoordinates)                                                                                                                                                │
│  79 -               peaks += peakCoordinates.size                                                                                                                                                               │
│  80 -               signalChains += calculateSignalChains(row, column, [], allPaths)                                                                                                                            │
│  81 -               signalInfo = map[`${row},${column}`] = {                                                                                                                                                    │
│  82 -                   score: peakCoordinates.size,                                                                                                                                                            │
│  83 -                   validChains: signalChains                                                                                                                                                               │
│  84 -                };                                                                                                                                                                                         │
│  85 -             }                                                                                                                                                                                             │
│  64 +     for (let row = 0; row < rowCount; row++) {                                                                                                                                                            │
│  65 +       for (let column = 0; column < columnCount; column++) {                                                                                                                                              │
│  66 +         if (grid[row][column] === 0) {                                                                                                                                                                    │
│  67 +           const peakCoordinates = new Set();                                                                                                                                                              │
│  68 +           calculatePeaks(row, column, peakCoordinates);                                                                                                                                                   │
│  69 +                                                                                                                                                                                                           │
│  70 +           const allPathsForThisTrailhead = [];  
```

- I had let the AI to tidy up the code base and linted a little, overall I did accept the suggestion it made to pass down the relevant information to the cell compartment. But make changes such as variable naming for the mapping of the results from 'Size' and 'Rating' to "isTrailhead", whilst adding a conditonal here to return true or false and "paths"


At some point I had came across an issue where the peaks were not being updated correctly during the toggle section of the task. I had asked AI to help me pin the issue down to start with:

`in my signalCell there is a useeffect function that should theorotically highlight all the parent cells that is either a trailhead or peak depending on what user has selected and whether or not the cell is a peak or trailhead, however it is not highlighting the correct box background`

  ```
  I'll start by reading the current content of src/Components/signalCell.jsx to see the useEffect and how you're attempting to highlight the cells.
╭──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ ✓  ReadFile src/Components/signalCell.jsx                                                                                                                            │
│                                                                                                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✦ To clarify the requirement: Part 1 usually focuses on reachability (endpoints), while Part 2 focuses on distinct paths. In your UI, this means:
   - Part 1 Mode: Clicking a trailhead (0) should highlight its reachable Peaks (9s).
   - Part 2 Mode: Clicking a trailhead (0) should highlight the entire paths from that trailhead to the peaks.

  Why your useEffect and getElementsByClassName are failing:
   1. DOM Selection: getElementsByClassName(".innerContainer") fails because the dot . is only for CSS selectors (like querySelector). getElementsByClassName expects just
      the name "innerContainer".
   2. React Logic: Your useEffect is running inside every cell and trying to loop through all cells. In React, you should avoid document.get... and instead use state and
      props to determine the class of each cell individually.
   3. Data Issue: In grid.jsx, isAPeak is currently set to false for actual 9s because it checks peakCoordinates.size > 0, but peakCoordinates is only populated when the
      cell is a trailhead (0).

  I will now fix the logic in grid.jsx to correctly identify peaks and update signalCell.jsx to use React-idiomatic highlighting.

  I'll start by checking App.css to see the available highlight classes.
╭──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ ✓  ReadFile src/App.css                                                                                                                                              │
│                                                                                                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✦ I'll start by fixing the logic in grid.jsx so that peaks (9s) are correctly identified and the toggleMode state is properly managed and passed to the Cell components.
✦ I'll fix the trailheadData calculation and ensure the toggleMode state is correctly updated and passed to the Cell components.
✦ I'll start by replacing the seePeakOrTrail function in src/Components/grid.jsx with one that correctly updates the toggleMode state.
✦ I'll use grep_search to locate the seePeakOrTrail function in src/Components/grid.jsx.
╭──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ ✓  SearchText 'seePeakOrTrail' within ./                                                                                                                             │
│                                                                                                                                                                      │
│ No matches found                                                                                                                                                     │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✦ I'll try searching for seePeak in src/Components/grid.jsx using grep_search to find the correct line and troubleshoot any potential case-sensitivity or naming issues.
╭──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ ✓  SearchText 'seePeak' within ./                                                                                                                                    │
│                                                                                                                                                                      │
│ No matches found                                                                                                                                                     │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✦ I'll list the src/Components directory to confirm the exact filename and case for grid.jsx.
╭──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ ✓  ReadFolder src/Components                                                                                                                                         │
│                                                                                                                                                                      │
│ Listed 2 item(s).                                                                                                                                                    │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✦ I'll search for processedSignals in src/Components/grid.jsx using grep_search to confirm I can find any symbols in that file.
╭──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ ✓  SearchText 'processedSignals' within ./                                                                                                                           │
│                                                                                                                                                                      │
│ Found 9 matches                                                                                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✦ I'll read src/Components/grid.jsx again to confirm the exact content and identify any hidden characters or formatting issues.
╭──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ ✓  ReadFile src/Components/grid.jsx                                                                                                                                  │
│                                                                                                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✦ I'll start by correcting the trailheadMap in src/Components/grid.jsx to ensure that isAPeak is accurately identified. Then, I'll address the signalCell.jsx issues.
╭──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ -  Edit src/Components/grid.jsx:     for (let row = 0; row < ro... =>     for (let row = 0; row < ro...                                                              │
│                                                                                                                                                                      │
│  82   for (let column = 0; column < columnCount; column++) {                                                                                                         │
│  83     const peakCoordinates = new Set();                                                                                                                           │
│  84     const allPathsForThisTrailhead = [];                                                                                                                         │
│  85 +   const isAPeak = grid[row][column] === 9;                                                                                                                     │
│  86 +                                                                                                                                                                │
│  87     if (grid[row][column] === 0) {                                                                                                                               │
│  88       calculatePeaks(row, column, peakCoordinates);                                                                                                              │
│  87 -                                                                                                                                                                │
│  89       const validSignalChainPaths = calculateSignalChains(row, column, [], allPathsForThisTrailhead);                                                            │
│  90                                                                                                                                                                  │
│  91       peaksCount += peakCoordinates.size;                                                                                                                        │
│  92       signalChainsCount += validSignalChainPaths;                                                                                                                │
│  93                                                                                                                                                                  │
│  94       trailheadMap[`${row},${column}`] = {                                                                                                                       │
│  94 -       isTrailhead: peakCoordinates.size > 0 ? true : false,                                                                                                    │
│  95 -       paths: allPathsForThisTrailhead ,                                                                                                                        │
│  96 -       isAPeak: grid[row][column] === 9 && peakCoordinates.size > 0 ? true: false,                                                                              │
│  95 +       isTrailhead: peakCoordinates.size > 0,                                                                                                                   │
│  96 +       paths: allPathsForThisTrailhead,                                                                                                                         │
│  97 +       isAPeak: isAPeak,                                                                                                                                        │
│  98         neighbours: getValidNeighbours(row, column)                                                                                                              │
│  99       };                                                                                                                                                         │
│ 100     } else {                                                                                                                                                     │
│ 101         trailheadMap[`${row},${column}`] = {                                                                                                                     │
│ 102         isTrailhead: false,                                                                                                                                      │
│ 103         paths: allPathsForThisTrailhead,                                                                                                                         │
│ 103 -       isAPeak: grid[row][column] === 9 && peakCoordinates.size > 0 ? true: false,                                                                              │
│ 104 +       isAPeak: isAPeak,                                                                                                                                        │
│ 105         neighbours: getValidNeighbours(row, column)                                                                                                              │
│ 106       };                                                                                                                                                         │
│ 107     }              
```
After reading through, I had to stop the changes as the AI hasn't taken into account that the scneario of a 9 would not always be possible. However, I did take into consideration of the fix to create a new global coordinates for peaks variable and that seem to fix the issue. 


Moving into error handling and edge cases:
how would i handle multiple enpty spaces in my input?   
```
Update processSignalInputs to:
   1. Remove all spaces within each line (e.g., "0 1 2" becomes "012").
   2. Filter out empty lines (so extra Enters don't break it).

    1 const processSignalInputs = () => {
    2   // 1. Split by newline
    3   // 2. Trim each line and remove ANY internal spaces
    4   // 3. Filter out lines that are empty
    5   const lines = signalValues.split("\n")
    6     .map(line => line.trim().replace(/\s+/g, '')) 
    7     .filter(line => line.length > 0);
    8     
    9   if (isValidInput(lines)) {
   10     const newInput = lines.map(row => row.split('').map(Number));
   11     setProcessedSignals(newInput);
   12     setGenerateGrid(true);
   13   }
   14 }

  2. Positioning the button (App.css)
  To move the button to the bottom, make the container a Flexbox with a column direction.

    1 .signal-input-container {
    2   display: flex;
    3   flex-direction: column;
    4   align-items: center; /* Centers items horizontally */
    5   gap: 20px;           /* Adds space between header, textarea, and button */
    6 }
    7
    8 /* Ensure the textarea doesn't have huge default margins */
    9 .signal-input-area {
   10   margin-bottom: 0; 
   11 }

  Let's apply these changes:

  I'll start by updating the logic in src/App.jsx.

✦ I'll update the processSignalInputs function and the textarea component in src/App.jsx. I'll also fix the typo where values was used instead of value. I'll perform the
  replacements in smaller chunks to ensure they're applied correctly.
  ```

  - Once again, i have elected to ignore the the changes that are not necessary such as the CSS. I did accept the change to handle for multiple whitespaces 