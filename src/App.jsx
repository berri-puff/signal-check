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
    const onlyNumbers = signals.every((signal) => numbersRegex.test(signal))
    const isSameLength = signals.every((signal) => signal.length === signals[0].length)
    const isAboveMax = signals.length > maxCount && signals[0].length > maxCount
    
    if (!onlyNumbers || !isSameLength || isAboveMax){
      console.log("display error feedback here, only numbers are allowed")
      return false
    }
    else {
      return true
    }
  }

  const processSignalInputs = () => {
    // const signalValueArray = signalValues.trim().split("\n").replaceAll(/\s/g,'')
    const signalValueArray = signalValues.split("\n").map(line => line.trim().replace(/\s+/g, '')).filter(line => line.length > 0); 
    if (isValidInput(signalValueArray)) {
      const newInput = signalValueArray.map(row => row.split('').map(Number));
      setProcessedSignals(newInput)
      setGenerateGrid(true)
    }
  }

  return (
    <div>
      <h1 className="main-header">Enter Signal Values</h1>
      <p>Please enter only digits between 1 and 60</p>
      <div className="signal-input-container">
        <textarea className="signal-input-area" rows={8} cols={60} values={signalValues} onChange={(e) => {handleTextChange(e)}} />
        <button className="button" onClick={() => {processSignalInputs()}}>Confirm</button>
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
