import React, { useRef, useEffect, useState } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SingleCard from "./SingleCard";
import "../styles/cardList.css";

const CardList = ({ listId, setCards, allCards }) => {
  const [text, setText] = useState("");
  const [form, setForm] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (form && inputRef.current) inputRef.current.focus();
  }, [form]);

  const saveCard = () => {
    if (text.trim() === "") return;

    const newCard = {
      id: crypto.randomUUID(),
      content: text.trim(),
      listId: listId,
    };

    const updatedCards = [...allCards, newCard];
    setCards(updatedCards);
    localStorage.setItem("trelloCards", JSON.stringify(updatedCards));

    setText("");
    setForm(false);
  };

  const filteredCards = allCards.filter((card) => card.listId === listId);

  return (
    <div className="card">
      <SortableContext
        items={filteredCards.map((c) => c.id)}
        strategy={verticalListSortingStrategy}
      >
        {filteredCards.map((item) => (
          <SingleCard key={item.id} id={item.id} content={item.content} />
        ))}
      </SortableContext>

      <input
        type="text"
        ref={inputRef}
        value={text}
        placeholder="+ Add card"
        onClick={() => setForm(true)}
        onChange={(e) => setText(e.target.value)}
      />
      {form && (
        <div className="card-form">
          <button onClick={saveCard}>Add Card</button>
        </div>
      )}
    </div>
  );
};

export default CardList;
