import React, { useReducer } from 'react';
import './Calculator.css';


const initState = {
  inputs: "",
  res: ""
};


let operators = ["+", "/", "-", "*"];


function reducer(state = initState, { type, payload }) {
  switch (type) {
    case "ADDINP": {
      let addOps = true;
      if (
        operators.includes(payload) &&
        operators.includes(
          state.inputs.slice(state.inputs.length - 1, state.inputs.length)
        )
      ) {
        addOps = false;
      } else {
        addOps = true;
      }
      if (addOps) {
        return { ...state, inputs: state.inputs + payload };
      }
      return state;
    }

    case "CALCULATE": {
      const inpLen = state.inputs.length;
      if (!operators.includes(state.inputs.slice(inpLen - 1, inpLen))) {
        try {
          const result = eval(state.inputs);
          return { ...state, res: result.toString() };
        } catch (error) {
          
          return { ...state, res: "Error" };
        }
      }
      return state;
    }

    case "DELETE": {
      return {
        ...state,
        inputs: state.inputs.slice(0, state.inputs.length - 1),
        res: ""
      };
    }

    case "CLEAR": {
      return { ...state, inputs: "", res: "" };
    }

    default: {
      return state;
    }
  }
}


const Calculator = () => {
  
  const [state, dispatch] = useReducer(reducer, initState);

  let handleClick = (val) => {
    dispatch({ type: "ADDINP", payload: val });
  };

  const handleCalc = () => {
    dispatch({ type: "CALCULATE" });
  };

  let handleDelete = () => {
    dispatch({ type: "DELETE" });
  };

  let handleClear = () => {
    dispatch({ type: "CLEAR" });
  };
  return (
    <div className="calculator">
      <div className="result-box">
        <div className="input" readOnly>{state.inputs}</div>
        <div className="result">{state.res}</div>
      </div>
      <div className="row">
        <button className="button ac" onClick={handleClear}>AC</button>
        <button className="button" onClick={handleDelete}>DEL</button>
        <button className="button" onClick={()=>{handleClick("*")}}>*</button>
      </div>
      <div className="row">
        <button className="button" onClick={()=>handleClick("7")}>7</button>
        <button className="button" onClick={()=>handleClick("8")}>8</button>
        <button className="button" onClick={()=>handleClick("9")}>9</button>
        <button className="button" onClick={()=>handleClick("/")}>/</button>
      </div>
      <div className="row">
        <button className="button" onClick={()=>handleClick("4")}>4</button>
        <button className="button" onClick={()=>handleClick("5")}>5</button>
        <button className="button" onClick={()=>handleClick("6")}>6</button>
        <button className="button" onClick={()=>handleClick("-")}>-</button>
      </div>
      <div className="row">
        <button className="button" onClick={()=>handleClick("1")}>1</button>
        <button className="button" onClick={()=>handleClick("2")}>2</button>
        <button className="button" onClick={()=>handleClick("3")}>3</button>
        <button className="button" onClick={()=>handleClick("+")}>+</button>
      </div>
      <div className="row">
        <button className="button" onClick={()=>handleClick(".")}>.</button>
        <button className="button" onClick={()=>handleClick("0")}>0</button>
        <button className="button equal" onClick={handleCalc}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
