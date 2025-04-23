import React, { useRef, useState, useEffect } from "react";
import "../styles/board.css";
import CardList from "./CardList";
import { DndContext, useSensor,
  useSensors,
  TouchSensor,
  MouseSensor,
  closestCenter, } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

const Board = () => {
  const inputRef = useRef(null);
  const [listValue, setListValue] = useState("");
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [show, setShow] = useState(false);


  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  // Load from localStorage
  useEffect(() => {
    const savedLists = localStorage.getItem("trelloLists");
    const savedCards = localStorage.getItem("trelloCards");

    if (savedLists) setLists(JSON.parse(savedLists));
    if (savedCards) setCards(JSON.parse(savedCards));
  }, []);

  useEffect(() => {
    if (show && inputRef.current) inputRef.current.focus();
  }, [show]);

  const clearAll = () => {
    localStorage.clear();
    location.reload();
  };

  const addList = () => {
    if (listValue.trim() === "") return;

    const newList = {
      id: crypto.randomUUID(),
      name: listValue.trim(),
    };

    const updatedLists = [...lists, newList];
    setLists(updatedLists);
    localStorage.setItem("trelloLists", JSON.stringify(updatedLists));
    setListValue("");
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeCard = cards.find((c) => c.id === active.id);
    const overCard = cards.find((c) => c.id === over.id);

    if (!activeCard || !overCard) return;

    const activeListId = activeCard.listId;
    const overListId = overCard.listId;

    if (activeListId === overListId) {
      // Same list: reorder
      const filtered = cards.filter((c) => c.listId === activeListId);
      const oldIndex = filtered.findIndex((c) => c.id === active.id);
      const newIndex = filtered.findIndex((c) => c.id === over.id);

      const reordered = arrayMove(filtered, oldIndex, newIndex);

      const newCards = [
        ...cards.filter((c) => c.listId !== activeListId),
        ...reordered,
      ];
      setCards(newCards);
      localStorage.setItem("trelloCards", JSON.stringify(newCards));
    } else {
      // Move to different list
      const newCards = cards.map((c) =>
        c.id === active.id ? { ...c, listId: overListId } : c
      );
      setCards(newCards);
      localStorage.setItem("trelloCards", JSON.stringify(newCards));
    }
  };

  return (
    <div className="board">
      <div className="u-board">
        <h1>My Trello Board</h1>
        <button onClick={clearAll}>Clear All</button>
      </div>

      <div className="main-board">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div className="show-list">
            {lists.map((list) => (
              <div key={list.id} className="single-list">
                <div className="heading">{list.name}</div>
                <CardList
                  listId={list.id}
                  cards={cards.filter((card) => card.listId === list.id)}
                  setCards={setCards}
                  allCards={cards}
                />
              </div>
            ))}
          </div>
        

        <div className="add-list">
          <input
            type="text"
            value={listValue}
            ref={inputRef}
            onClick={() => setShow(!show)}
            onChange={(e) => setListValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addList()}
            placeholder="+ Add List "
          />
          {show && (
            <div className="list-form">
              <button onClick={addList}>Add List</button>
            </div>
          )}
        </div></DndContext>
      </div>
    </div>
  );
};

export default Board;
