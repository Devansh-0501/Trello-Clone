import React from 'react' 
import "../styles/board.css"
import Addlist from './Addlist'

const Board = () => {
  return (
    <div className='board'>
      <div className="u-board">
        <h1>
          My Trello Board
        </h1>
      </div>
      <div className="main-board">
        <Addlist/>
      </div>
      
    </div>
  )
}

export default Board