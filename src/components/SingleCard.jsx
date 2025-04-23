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
    transition,
    transition:"smooth",
    transitionDuration: "0.2s",
    
    opacity: isDragging ? 0.9 : 1,
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} className="single-card" {...attributes} {...listeners}>
      {content}
    </div>
  );
};

export default SingleCard;
