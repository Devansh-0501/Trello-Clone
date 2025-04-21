import React, { useEffect, useRef, useState } from "react";

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SingleCard from "./SingleCard";
import "../styles/cardList.css"
import { DndContext,closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";


const CardList = ({ index }) => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  const [form, setForm] = useState(false);
  const inputRef = useRef(null);

  let trelloCards = JSON.stringify("Card" + index);

  useEffect(() => {
  
    
    const saved = localStorage.getItem(trelloCards);
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (form && inputRef.current) inputRef.current.focus();
  }, [form]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
  
    const oldIndex = items.indexOf(active.id);
    const newIndex = items.indexOf(over.id);
  
    const newItems = arrayMove(items, oldIndex, newIndex);
    setItems(newItems);
    localStorage.setItem(trelloCards, JSON.stringify(newItems));
  };



  const saveCard = () => {
    if (text.trim() === "") return;

    const updatedItems = [...items, text.trim()];
    setItems(updatedItems);

    localStorage.setItem(trelloCards, JSON.stringify(updatedItems));

    
    setText("");
  };

  return (
    
    <div className="card">
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <SingleCard key={item} id={item} />
        ))}
      </SortableContext>
       

      <input
        type="text"
        ref={inputRef}
        value={text}
        placeholder="+ Add card"
        onClick={() => setForm(!form)}
        onChange={(e) => setText(e.target.value)}
      />
      {form && (
        <div className="card-form">
          <button onClick={saveCard}>Add Card</button>
        </div>
      )} </DndContext>
    </div>
  );
};

export default CardList;
