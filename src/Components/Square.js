import React from 'react'
import "../App.css";

// val is X or O
function Square({val, chooseSquare}) {
    return (<div className="square" onClick={chooseSquare}>{val}</div>)
}

export default Square