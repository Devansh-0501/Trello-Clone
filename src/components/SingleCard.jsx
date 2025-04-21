import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "../styles/singleCard.css"

const SingleCard = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    transition:"smooth",
    transitionDuration: "0.9s",
    cursor: "grab",
  };

  return (
    <div className="single-card" ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {id}
    </div>
  );
};

export default SingleCard;
