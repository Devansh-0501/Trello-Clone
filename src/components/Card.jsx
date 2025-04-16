import React, { useState } from "react";
import "../styles/card.css";

const Card = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(false);
  const [text, setText] = useState("");

  const onchangeHandler = (e) => {
    setText(e.target.value);
  };

  const saveCard = () => {
    if (text.trim() === "") return;
    setItems([...items, text]);
    setText("");
    
  };

 

 
  return (
    <div className="card">
      <input type="text" value={text} onChange={onchangeHandler} placeholder="Add card" onClick={()=>{setForm(!form)}}/>
      {form && (
        <div className="card-form">
          <button onClick={saveCard}>Add Card</button>
        </div>
      )}

      <div className="card-display">
        <ul style={{listStyleType:"none"}}>
          {items.map((item, index) => {
            return (<li key={index}>
              {item}
            </li>);
          })}
        </ul>
      </div>
    </div>
  );
};

export default Card;
