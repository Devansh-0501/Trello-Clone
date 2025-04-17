import React, { useEffect, useState } from "react";
import "../styles/card.css";

const Card = (props) => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(false);
  const [text, setText] = useState("");
  let trelloCards = JSON.stringify("Card" + props.index);

  useEffect(() => {
    const savedCard = localStorage.getItem(trelloCards);
    if (savedCard) {
      setItems(JSON.parse(savedCard));
    }
  }, []);

  const saveCard = () => {
    if (text.trim() === "") return;
  
    const updatedItems = [...items, text.trim()];
    setItems(updatedItems);
  
    
    localStorage.setItem(trelloCards, JSON.stringify(updatedItems));
  
    console.log("Saved:", text, updatedItems);
  
    setText("");
  };
  

  

  return (
    <div className="card">
      <div className="card-display">
        <ul style={{ listStyleType: "none" }}>
          {items.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </div>
      <input
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="Add card"
        onClick={() => {
          setForm(!form);
        }}
      />
      {form && (
        <div className="card-form">
          <button onClick={saveCard}>Add Card</button>
        </div>
      )}
    </div>
  );
};

export default Card;
