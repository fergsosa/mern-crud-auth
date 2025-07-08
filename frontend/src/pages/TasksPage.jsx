import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import TaskCars from "../components/TaskCars";
import { Link } from "react-router-dom";
import iconAdd from "../assets/img/+.svg";

const TasksPage = () => {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      {tasks.length === 0 ? (
        <div className="task-page-clear">
          <h1>No tasks yet, please add a new task</h1>
          <div className="icon">
            <img src={iconAdd} alt="add" />
          </div>
        </div>
      ) : (
        <div className="task-page">
          {tasks.map((task) => (
            <TaskCars task={task} key={task._id} />
          ))}
        </div>
      )}
      <Link className="btn-add-task" to="/add-task">
        <div className="icon"></div>
        Add Tasks
      </Link>
    </>
  );
};

export default TasksPage;

/*
ayudame hacer un readme: 
tecnologias usadas: 
backend: bcryptjs, cookie-parser, express, jsonwebtoken, mongoose, zod
frontend:react, axios, js-cookie, react-hook-form, react-router-dom

descripcion: 
* El proyecto tiene un sistema de login y registro de usuarios con autenticación y gestión de sesiones.
  Adentro gestiona una lista de tareas (CRUD: Crear, Leer, Actualizar, Eliminar) por cada usuario registrado en una base de datos en mongoDB


*/
