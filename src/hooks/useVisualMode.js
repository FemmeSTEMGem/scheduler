import { useState } from "react";

export default  function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode)

    if(replace) {
      setHistory(prev => [...prev.slice(0, -1), newMode])
    } else {
    setHistory([...history, newMode])
    }
  }


  const back = () => {
    const historyCopy = [...history]
    
    if (historyCopy.length >= 2) {
      historyCopy.pop()
    }

    setHistory(historyCopy)
    setMode(historyCopy[historyCopy.length -1])
  }
  return {mode, transition, back}
}