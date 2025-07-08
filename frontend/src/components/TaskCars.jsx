import { Link } from "react-router-dom";
import { useTasks } from "../context/TasksContext";
import btnDeleteImg from "../assets/img/btn-delete.svg";

const TaskCars = ({ task }) => {
  const { deleteTasks } = useTasks();

  return (
    <div className="task-card">
      <header>
        <Link to={`/tasks/${task._id}`}>
          <h1>{task.title}</h1>
        </Link>
        <button onClick={() => deleteTasks(task._id)}>
          <img src={btnDeleteImg} alt="delete" />
        </button>
      </header>
      <p className="description">{task.description}</p>
      <p className="date">
        Edit:{" "}
        {task.date &&
          // new Date(task.date).toLocaleDateString("en-US", {
          new Date(task.date).toLocaleDateString("es", {
            // weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
      </p>
    </div>
  );
};

export default TaskCars;
