import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "../styles/singleCard.css";

const SingleCard = ({ id, content }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

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
    userSelect: "none",
  };

  return (
    <div ref={setNodeRef} style={style} className="single-card" {...attributes} {...listeners}>
      {content}
    </div>
  );
};

export default SingleCard;
