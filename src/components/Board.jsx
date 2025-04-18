import React, { useRef,useState,useEffect } from "react";
import "../styles/board.css";
import Card from "./Card";

const Board = () => {
  const inputRef = useRef(null);
  const [listValue, setListValue] = useState("");
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  

  useEffect(() => {
    const savedItems = localStorage.getItem('trelloList');
    if (savedItems) {
      setList(JSON.parse(savedItems));
    }
    
  }, []);

  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);

  const clearAll=()=>{
    localStorage.clear();
    location.reload();

  }


  

  const addList = () => {
    if(listValue.trim()==="" )return;
    const updatedList=[...list,listValue]
    setList(updatedList);
    localStorage.setItem('trelloList', JSON.stringify(updatedList));
    setListValue("");
  };

  return (
    <div className="board">
      <div className="u-board">
        <h1>My Trello Board</h1>
       
        <button onClick={clearAll}>Clear All</button>
      </div>
      <div className="main-board">
        
        <div className="show-list">
          {list.map((l, i) => {
            return (
              <div key={i} className="single-list">
                <div className="heading">

                  {l}
                </div>
                <Card index={i}/>
                
              </div>
            );
          })}
          
        </div>
        <div className="add-list">
          <input
            type="text"
            value={listValue}
            ref={inputRef}
            onClick={() => {
              setShow(!show);
            }}
            onChange={(e) => {
              setListValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") addList();
            }}
            placeholder="+ Add List "
          />

          {show && (
            <div className="list-form">
              <button    onClick={addList}>Add List</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Board;
