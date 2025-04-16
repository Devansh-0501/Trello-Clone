import React, { useState } from "react";
import "../styles/board.css";

const Board = () => {
  const [listValue, setListValue] = useState("");
  const [list, SetList] = useState([]);
  const [show, setShow] = useState(false);

  const addList = () => {
    SetList([...list, listValue]);
    setListValue("");
  };

  return (
    <div className="board">
      <div className="u-board">
        <h1>My Trello Board</h1>
      </div>
      <div className="main-board">
        <div className="add-list">
          <input
            type="text"
            onClick={() => {
              setShow(!show);
            }}
            onChange={(e) => {
              setListValue(e.target.value);
            }}
            placeholder="Add List"
          />

          {show && (
            <div className="list-form">
              <button onClick={addList}>Add List</button>
            </div>
          )}
        </div>
        <div className="show-list">
          {list.map((l, i) => {
            return (
              <div key={i} className="single-list">
                {l}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Board;
