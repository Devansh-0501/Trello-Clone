import React, { useRef, useEffect, useState } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SingleCard from "./SingleCard";
import { useDroppable } from "@dnd-kit/core";  // Add this
import "../styles/cardList.css";

const CardList = ({ listId, setCards, allCards }) => {
  const [text, setText] = useState("");
  const [form, setForm] = useState(false);
  const inputRef = useRef(null);

  const filteredCards = allCards.filter((card) => card.listId === listId);

  // Make the entire card list droppable
  const { setNodeRef } = useDroppable({
    id: listId,  // Use the listId itself as the droppable id
  });

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

  return (
    <div className="card" ref={setNodeRef}>
      <SortableContext
        items={filteredCards.map((c) => c.id)}
        strategy={verticalListSortingStrategy}
      >
        {filteredCards.length === 0 ? (
          <div className="empty-placeholder">Drop Here</div> // simple placeholder if no cards
        ) : (
          filteredCards.map((item) => (
            <SingleCard
              key={item.id}
              id={item.id}
              content={item.content}
              setCards={setCards}
              allCards={allCards}
            />
          ))
        )}
      </SortableContext>

      <input
        type="text"
        ref={inputRef}
        value={text}
        placeholder="+ Add card"
        onClick={() => setForm(true)}
        onKeyDown={(e) => e.key === "Enter" && saveCard()}
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
