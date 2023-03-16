import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { SortableItem } from "./components/sortable/SortableItem";

const initialItems = [
  { id: 1, order: "Order (1)", content: "JavaScript" },
  { id: 2, order: "Order (2)", content: "Python" },
  { id: 3, order: "Order (3)", content: "TypeScript" },
];

function App() {
  const storedItems =
    JSON.parse(localStorage.getItem("languages")) || initialItems;
  const [languages, setLanguages] = useState(storedItems);

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <Container className="p-3" style={{ width: "50%" }} align="center">
        <h3>Drag And Drob List Order!</h3>
        <SortableContext
          items={languages}
          strategy={verticalListSortingStrategy}
        >
          {languages.map((language) => (
            <SortableItem
              key={language.id}
              id={language.id}
              language={language}
            />
          ))}
        </SortableContext>
      </Container>
    </DndContext>
  );

  function handleDragEnd(event) {
    console.log("Drag end called");
    const { active, over } = event;
    console.log("ACTIVE: " + (active ? active.id : ""));
    console.log("OVER :" + (over ? over.id : ""));

    if (active && over && active.id !== over.id) {
      setLanguages((items) => {
        const activeIndex = items.findIndex((item) => item.id === active.id);
        const overIndex = items.findIndex((item) => item.id === over.id);
        console.log(arrayMove(items, activeIndex, overIndex));
        const newItems = arrayMove(items, activeIndex, overIndex);
        // Update local storage with new item order
        localStorage.setItem("languages", JSON.stringify(newItems));

        return newItems;
      });
    }
  }
}

export default App;
