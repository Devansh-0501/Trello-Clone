import React, { useRef, useState, useEffect } from "react";
import "../styles/board.css";
import CardList from "./CardList";
import {
  DndContext,
  useSensor,
  useSensors,
  TouchSensor,
  MouseSensor,
  DragOverlay,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import SingleCard from "./SingleCard";

const Board = () => {
  const [editingListId, setEditingListId] = useState(null);
  const [editedListName, setEditedListName] = useState("");
  const inputRef = useRef(null);
  const [listValue, setListValue] = useState("");
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [show, setShow] = useState(false);
  const [activeCardId, setActiveCardId] = useState(null);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

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
  const startEditingList = (list) => {
    setEditingListId(list.id);
    setEditedListName(list.name);
  };

  // const cancelEditList = () => {
  //   setEditingListId(null);
  //   setEditedListName("");
  // };

  const saveListName = (id) => {
    if (editedListName.trim() === "") return;
    const updatedLists = lists.map((list) =>
      list.id === id ? { ...list, name: editedListName.trim() } : list
    );
    setLists(updatedLists);
    localStorage.setItem("trelloLists", JSON.stringify(updatedLists));
    setEditingListId(null);
    setEditedListName("");
  };

  const deleteList = (id) => {
    const updatedLists = lists.filter((list) => list.id !== id);
    const updatedCards = cards.filter((card) => card.listId !== id);
    setLists(updatedLists);
    setCards(updatedCards);
    localStorage.setItem("trelloLists", JSON.stringify(updatedLists));
    localStorage.setItem("trelloCards", JSON.stringify(updatedCards));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveCardId(null);

    if (!over || active.id === over.id) return;

    const activeCard = cards.find((c) => c.id === active.id);
    const overCard = cards.find((c) => c.id === over.id);


    if (!activeCard) return;

   

    if (overCard) {
      // Dropped over another card
      const activeListId = activeCard.listId;
      const overListId = overCard.listId;

      if (activeListId === overListId) {
        // Same list - reorder
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
        // Different lists - move
        const overIndex = cards
          .filter((c) => c.listId === overListId)
          .findIndex((c) => c.id === over.id);

        const updatedCards = cards.filter((c) => c.id !== active.id);
        const newCard = { ...activeCard, listId: overListId };

        const before = updatedCards.slice(0, overIndex);
        const after = updatedCards.slice(overIndex);

        const newCards = [...before, newCard, ...after];
        setCards(newCards);
        localStorage.setItem("trelloCards", JSON.stringify(newCards));
      }
    } else {
      // Dropped over empty list (over.id is a LIST id)
      const list = lists.find((l) => l.id === over.id);
      if (list) {
        const updatedCards = cards.map((card) =>
          card.id === active.id ? { ...card, listId: list.id } : card
        );
        setCards(updatedCards);
        localStorage.setItem("trelloCards", JSON.stringify(updatedCards));
      }
    }
  };

  return (
    <div className="board">
      <div className="u-board">
        <h1>My Trello Board</h1>
        <button onClick={clearAll}>Clear All</button>
      </div>

      <div className="main-board">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={(event) => setActiveCardId(event.active.id)}
          onDragEnd={handleDragEnd}
        >
          <div className="show-list">
            {lists.map((list) => (
              <div key={list.id} className="single-list">
                <div className="heading">
                  {editingListId === list.id ? (
                    <>
                      <input
                        
                        type="text"
                        value={editedListName}
                        onChange={(e) => setEditedListName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveListName(list.id);
                          
                        }}
                        autoFocus
                      />
                      <div className="edit-buttons" >
                        <button style={{fontSize:"18px"}} onClick={() => saveListName(list.id)}>
                          ✅ 
                        </button>
                       
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        {list.name}</div>
                        <div className="editDelete-list">
                          <button onClick={() => startEditingList(list)}>
                            ✏️ 
                          </button>
                          <button
                            
                            onClick={() => deleteList(list.id)}
                          >
                            🗑️
                          </button>
                        </div>
                      
                    </>
                  )}
                </div>

                <CardList
                  listId={list.id}
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
          </div>

          <DragOverlay>
            {activeCardId ? (
              <SingleCard
                id={activeCardId}
                content={
                  cards.find((card) => card.id === activeCardId)?.content
                }
                setCards={setCards}
                allCards={cards}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default Board;
