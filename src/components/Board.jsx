import React, { useState,useEffect } from "react";
import "../styles/board.css";
import Card from "./Card";

const Board = () => {
  const [listValue, setListValue] = useState("");
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const savedItems = localStorage.getItem('trelloList');
    if (savedItems) {
      setList(JSON.parse(savedItems));
    }
    console.log(list);
  }, []);

  const saveHandler = ()=>{
    localStorage.setItem('trelloList', JSON.stringify(list));

  }
  

  const addList = () => {
    if(listValue.trim()==="" )return;
    setList([...list, listValue]);
    setListValue("");
  };

  return (
    <div className="board">
      <div className="u-board">
        <h1>My Trello Board</h1>
        <button className="save-browser" onClick={saveHandler}>save</button>
        <button onClick={()=>{localStorage.clear();}}>Clear All</button>
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
                <div className="heading">
                  {l}
                </div>
                <Card />
                
              </div>
            );
          })}
          
        </div>
      </div>
    </div>
  );
};

export default Board;
