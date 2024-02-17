"use client";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import TaskField from "./TaskField";

const Board = () => {
  const columns = ["Do First", "Schedule", "Delegate", "Don't do"];
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const generateId = () => {
    return Math.floor(Math.random() * 1001);
  };

  const onDragStart = (e) => {
    if (e.active.data.current?.type === "Task") {
      setActiveTask(e.active.data.current.task);
      return;
    }
  };
  const onDragOver = (e) => {
    const { active, over } = e;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";

    if (!isActiveTask) return;

    // dropping task over another task
    if (isActiveTask && isOverTask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        //tasks in another column
        if (tasks[activeIndex].columnTitle !== tasks[overIndex].columnTitle) {
          tasks[activeIndex].columnTitle = tasks[overIndex].columnTitle;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    // dropping a task over a column
    const isOverAColumn = over.data.current?.type === "Column";
    if (isActiveTask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnTitle = overId;

        //to cause rerender
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const createTask = (title) => {
    const newTask = {
      id: generateId(),
      columnTitle: title,
      content: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };
  const updateTask = (id, content) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });
    setTasks(newTasks);
  };
  return (
    <div className="m-auto flex min-h-screen w-full items-center md:overflow-x-auto overflow-y-hidden md:px-10 p-7 overflow-hidden b">
      <DndContext
        onDragStart={onDragStart}
        sensors={sensors}
        onDragOver={onDragOver}
      >
        <div className="flex gap-4 flex-col md:flex-row">
          <SortableContext items={columns}>
            {columns.map((title) => (
              <ColumnContainer
                title={title}
                key={title}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter((task) => task.columnTitle === title)}
              />
            ))}
          </SortableContext>
        </div>

        <DragOverlay>
          {activeTask && (
            <TaskField
              task={activeTask}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Board;
