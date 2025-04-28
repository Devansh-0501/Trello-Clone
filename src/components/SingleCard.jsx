import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "../styles/singleCard.css";

const SingleCard = ({ id, content, setCards, allCards }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(content);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 0.2s ease",
    opacity: isDragging ? 0.5 : 1,
    boxShadow: isDragging
      ? "0 8px 12px rgba(0, 0, 0, 0.15)"
      : "0 2px 4px rgba(0, 0, 0, 0.08)",
    cursor: "grab",
    borderRadius: "6px",
    padding: "0.75rem",
    marginBottom: "0.5rem",
    // backgroundColor: "white",
  };

  // Delete card function
  const deleteCardHandler = () => {
    const updatedCards = allCards.filter((card) => card.id !== id);
    setCards(updatedCards);
    localStorage.setItem("trelloCards", JSON.stringify(updatedCards));
  };

  // Start editing
  const editCardHandler = () => {
    setIsEditing(true);
  };

  // Save edited card
  const saveEditHandler = () => {
    if (editText.trim() === "") return; // prevent empty save
    const updatedCards = allCards.map((card) =>
      card.id === id ? { ...card, content: editText.trim() } : card
    );
    setCards(updatedCards);
    localStorage.setItem("trelloCards", JSON.stringify(updatedCards));
    setIsEditing(false);
  };

  // Cancel editing
  const cancelEditHandler = () => {
    setIsEditing(false);
    setEditText(content); // reset to original content
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="single-card"
      {...attributes}
      {...listeners}
    >
      {!isEditing ? (
        <>
          <div>{content}</div>
          <div className="buttons">
            <button onClick={editCardHandler}>✏️ </button>
            <button
              style={{ backgroundColor: "maroon", color: "white" }}
              onClick={deleteCardHandler}
            >
              🗑️ 
            </button>
          </div>
        </>
      ) : (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEditHandler();
              if (e.key === "Escape") cancelEditHandler();
            }}
            autoFocus
          />
          <div className="buttons">
            <button
              style={{ backgroundColor: "green", color: "white" }}
              onClick={saveEditHandler}
            >
              ✅ Save
            </button>
            <button
              style={{ backgroundColor: "gray", color: "white" }}
              onClick={cancelEditHandler}
            >
              ❌ Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleCard;
