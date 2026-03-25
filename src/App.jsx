import { useState, useRef } from 'react'
import './App.css'
import Grid from './Components/grid';
import { CSSTransition } from 'react-transition-group';

function App() {
  const maxCount = 60 // Maximum number of cells for both rows and columns

  const [signalValues, setSignalValues] = useState("");
  const [processedSignals, setProcessedSignals] = useState([])
  const [generateGrid, setGenerateGrid] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const ref = useRef(null);

  const handleTextChange = (event) => {
    setSignalValues(event.target.value);
  };

 const showError = (msg) => {                                                                                                                                   
    setErrorMessage(msg);                                                                                                                                                                                                                                                         
    setTimeout(() => {                                                                                                                                           
      setErrorMessage("");                                                                                                                                       
    }, 3000);                                                                                                                                                    
  };                                                                                                                                                             

  const clearInput = () => {
    setSignalValues("")
    setProcessedSignals([])
    setGenerateGrid(false)
  }

  const isValidInput = (signals) => {
    const numbersRegex = /^[0-9]+$/
    const onlyNumbers = signals.every((signal) => numbersRegex.test(signal))
    const isSameLength = signals.every((signal) => signal.length === signals[0].length)
    const isAboveMax = signals.length > maxCount && signals[0].length > maxCount

    
    if (!onlyNumbers || !isSameLength || isAboveMax){
      !isSameLength ? showError("Please ensure all numbers are of equal length") : showError("Only digitals between 1 and 60, no letters and special characters")
      return false
    }
    else {
      return true
    }
  }

  const processSignalInputs = () => {
    if (signalValues.length === 0) {
      showError("No empty strings are allowed")
    }
    const signalValueArray = signalValues.split("\n").map(line => line.trim().replace(/\s+/g, '')).filter(line => line.length > 0); 
    if (isValidInput(signalValueArray)) {
      const newInput = signalValueArray.map(row => row.split('').map(Number));
      setProcessedSignals(newInput)
      setGenerateGrid(true)
    }
  }

  return (
    <div>
      <CSSTransition
        in={errorMessage.length > 0}
        classNames="error-container"
        nodeRef={ref}
        timeout={300}
        unmountOnExit
      >
        <div ref={ref} className="error-container">
         <p className="error-message">{errorMessage}</p> 
        </div>
      </CSSTransition>

      <h1 className="main-header">Enter Signals</h1>
      <p>Please enter a maximum of 60 digits between 1 to 9</p>
      <div className="signal-input-container">
        <textarea className="signal-input-area" rows={8} cols={60} value={signalValues} onChange={(e) => {handleTextChange(e)}} />
        <button className="button confirm" onClick={() => {processSignalInputs()}}>Confirm</button>
        <button className="button clear" onClick={clearInput}>Clear</button>
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
