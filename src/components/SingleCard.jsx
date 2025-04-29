import React, { useState, useRef, useEffect } from "react";
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
  const [editedContent, setEditedContent] = useState(content);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 0.2s ease",
    opacity: isDragging ? 0.5 : 1,
    boxShadow: isDragging
      ? "0 8px 12px rgba(0, 0, 0, 0.15)"
      : "0 2px 4px rgba(0, 0, 0, 0.08)",
    borderRadius: "6px",
    padding: "0.75rem",
    marginBottom: "0.5rem",
    userSelect: "none",
    
  };

  const saveEdit = () => {
    if (editedContent.trim() === "") return;
    const updatedCards = allCards.map((c) =>
      c.id === id ? { ...c, content: editedContent.trim() } : c
    );
    setCards(updatedCards);
    localStorage.setItem("trelloCards", JSON.stringify(updatedCards));
    setIsEditing(false);
  };

  const deleteCardHandler = () => {
    const updatedCards = allCards.filter((c) => c.id !== id);
    setCards(updatedCards);
    localStorage.setItem("trelloCards", JSON.stringify(updatedCards));
  };

 

  return (
    <div ref={setNodeRef} style={style} className="single-card" {...attributes}>
      {/* Drag handle */}
      <div className="drag-handle" {...listeners}>
      ⠿
      </div>

      {isEditing ? (
        <>
          <input
            ref={inputRef}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveEdit();
              
            }}
          />
          <div className="buttons">
            <button onClick={saveEdit}>✅</button>
            
          </div>
        </>
      ) : (
        <>
          <div>{content}</div>
          <div className="buttons">
            <button onClick={() => setIsEditing(true)}>✏️</button>
            <button style={{ backgroundColor: "maroon" }} onClick={deleteCardHandler}>
              🗑️
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleCard;
