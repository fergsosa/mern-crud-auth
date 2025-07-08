import { useContext, createContext, useState } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTaskRequest,
  getTasksRequest,
  updateTaskRequest,
} from "../api/tasks.js";

const TasksContext = createContext();

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) throw new Error("useAuth must be user within an AuthProvider");
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const createTasks = async (task) => {
    try {
      const res = await createTaskRequest(task);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id, task) => {
    try {
      const res = await updateTaskRequest(id, task);
      return res;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTasks = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        getTasks,
        getTask,
        createTasks,
        updateTask,
        deleteTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
