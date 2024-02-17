import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TaskField from "./TaskField";
import { useMemo } from "react";

const ColumnContainer = ({
  title,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}) => {
  const taskids = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const { setNodeRef } = useSortable({
    id: title,
    data: {
      type: "Column",
      title,
    },
  });
  return (
    <div
      ref={setNodeRef}
      className="bg-columnBackgroundColor md:w-[350px] min-w-[270px] h-[500px] max-h-[500px] rounded-md flex flex-col"
    >
      {/* column title */}
      <div className="bg-mainBackgroundColor text-lg h-[60px] rounded-md rounded-b-none font-bold border-[#161C22] border-4">
        <div className="flex gap-2">
          <div className="flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm rounded-full">
            0
          </div>
          {title}
        </div>
      </div>
      {/* column task section */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={taskids}>
          {tasks.map((task) => (
            // <div key={task.id}>{task.content}</div>
            <TaskField
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            ></TaskField>
          ))}
        </SortableContext>
      </div>
      {/* column footer */}
      <button
        className="flex gap-2 items-center border-[#161C22] border-2 rounded-md p-4 border-x-[#161C22] hover:text-primary hover:bg-mainBackgroundColor active:bg-black"
        onClick={() => {
          createTask(title);
        }}
      >
        + Add Task
      </button>
    </div>
  );
};

export default ColumnContainer;
