import axios from "axios";
import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
// import data from "./data.json";
import "./event.css";

const columnsFromBackend = {
  [uuid()]: {
    name: "confirmed",
    items: [],
  },
  [uuid()]: {
    name: "tentative",
    items: [],
  },
  [uuid()]: {
    name: "cancelled",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function Event() {
  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);
  const [columns, setColumns] = useState();

  const getEvents = async () => {
    const events = await axios.get("http://localhost:5006/event", {
      params: { email: userData.email },
    });
    Object.entries(columnsFromBackend).map(([columnId, column], index) => {
        events.data.map((dataContent) => {
        if (dataContent.status === column.name) {
          column.items.push(dataContent);
        }
      });
      setColumns(columnsFromBackend);
    });
  };
  useEffect(() => {
    const data = getEvents();
  }, []);

  return (
    <div className="cardContainer">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {columns &&
          Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div className="cardHeader" key={columnId}>
                <h2 className="cardHeaderTitle">{column.name}</h2>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={
                          snapshot.isDraggingOver ? "cardDragged" : "card"
                        }
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item._id}
                              draggableId={item._id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={
                                      snapshot.isDragging
                                        ? "cardBodyDragging"
                                        : "cardBody"
                                    }
                                  >
                                    <p className="cardBodyContent">
                                      {item.summary}
                                    </p>
                                    <p className="cardBodyContent">
                                      {item.email}
                                    </p>
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
      </DragDropContext>
    </div>
  );
}

export default Event;
