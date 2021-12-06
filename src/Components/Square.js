import React from 'react'
import "../App.css";

// val is X or O
function Square({val, chooseSquare, colors, activeColor}) {
    return (<div className="square" onClick={chooseSquare} style={{ color: colors[val], '--active-color': activeColor }}>{val}</div>)
}

export default Square