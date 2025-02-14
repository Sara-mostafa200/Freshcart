import React, { createContext, useState } from "react";

let CounterContext = createContext();

export default function CounterContextProvider(props) {
  let [Counter, setCounter] = useState(0);
  
  function random() {
    setCounter(Math.random());
  }
  return (
    <CounterContext.Provider value={{ Counter, random }}>
      {props.children}
    </CounterContext.Provider>
  );
}

export { CounterContext };
