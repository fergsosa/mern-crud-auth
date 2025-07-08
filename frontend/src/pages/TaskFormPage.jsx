import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import btnUndoImg from "../assets/img/btn-undo.svg";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc); // Formato de la fecha

const TaskFormPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors: errorsUseForm },
  } = useForm();
  const { createTasks, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = async (data) => {
    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };

    if (params.id) updateTask(params.id, dataValid);
    else createTasks(dataValid);

    navigate("/tasks");
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        );
      }
    };
    loadTask();
  }, []);

  return (
    <div className="form-task-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <header>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            {...register("title")}
            autoFocus
          />
          <Link to="/tasks">
            <img src={btnUndoImg} alt="Volver" />
          </Link>
        </header>
        {errorsUseForm.title && (
          <p className="text-error">Please enter a title.</p>
        )}

        <textarea
          id="description"
          name="description"
          placeholder="Description"
          rows="3"
          {...register("description")}
        ></textarea>

        <input type="date" {...register("date")} />

        <button>Save</button>
      </form>
    </div>
  );
};

export default TaskFormPage;
