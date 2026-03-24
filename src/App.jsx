import { useState } from 'react'
import './App.css'
import Grid from './Components/grid';

function App() {
  const maxCount = 60 // Maximum number of cells for both rows and columns

  const [signalValues, setSignalValues] = useState("");
  const [processedSignals, setProcessedSignals] = useState([])
  const [generateGrid, setGenerateGrid] = useState(false)

  const handleTextChange = (event) => {
    setSignalValues(event.target.value);
  };

  const isValidInput = (signals) => {
    const numbersRegex = /^[0-9]+$/
    const onlyNumbers = signals.map((signal) => numbersRegex.test(signal))
    const isSameLength = signals.every(({length}) => length != signals[0])
    const isAboveMax = signals.length <= maxCount && signals[0].length >= maxCount
    
    if (onlyNumbers.includes(false) || isSameLength === false || isAboveMax){
      console.log("display error feedback here, only numbers are allowed")
      return false
    }
    else {
      return true
    }
  }

  const processSignalInputs = () => {
    const signalValueArray = signalValues.trim().split("\n")
    
    if (isValidInput(signalValueArray)) {
      const newInput = signalValueArray.map(row => row.split('').map(Number));
      setProcessedSignals(newInput)
      setGenerateGrid(true)
    }
  }

  return (
    <div className="App">
      <div>
        <h1>Enter Signal Values</h1>
          <textarea rows={10} cols={30} values={signalValues}  onChange={(e) => {handleTextChange(e)}} />
          <button onClick={() => {processSignalInputs()}}>Confirm</button>
      </div>

      {
        generateGrid && processedSignals.length !== 0 ? (
        <Grid 
        processedSignals={processedSignals}/>) :
        (
          <div>
            <h1>Start by adding some signal values</h1>
          </div>
        )
      }
    </div>
  )
}

export default App
