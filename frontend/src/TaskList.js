import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TaskForm from "./TaskForm";
import axios from "axios";
import { URL } from "./App";
import loadingImg from "./assets/loading.gif";
import Task from "./Task";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskID, setTaskID] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });
  const { name } = formData;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getTasks = async () => {
    setisLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api/tasks`);
      setTasks(data);
      setisLoading(false);
    } catch (error) {
      toast.error(error.massage);
      setisLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    getTasks()
    // console.log(formData);
    if (name === "") {
      return toast.error("Input field cannot be empty");
    }

    try {
      await axios.post(`${URL}/api/tasks`, formData);
      toast.success("task Added Successfully");
      setFormData({ ...formData, name: "" });
      getTasks()
    } catch (error) {
      toast.error(error.massage);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`);
      getTasks();
    } catch (error) {
      toast.error(error.massage);
    }
  };

  useEffect(() => {
    const cTask = tasks.filter((task) => {
        return task.completed === true
    })
    setCompletedTask(cTask)
  }, [tasks])

  const getSingleTask = async (task) => {
    setFormData({name: task.name, completed: false})
    setTaskID(task._id)
    setIsEditing(true)
  }

  const updateTask = async (e) =>{
    e.preventDefault();
    // console.log(formData);
    if (name === "") {
      return toast.error("Input field cannot be empty");
    }
    try {
        await axios.put(`${URL}/api/tasks/${taskID}`, formData)
        toast.success("task Updated Successfully");
        setFormData({ ...formData, name: "" });
        setIsEditing(false)
        getTasks()
    } catch (error) {
        toast.error(error.massage);
    }
  }

  const setToComplete =async (task) =>{
    const newFormData = {
        name: task.name,
        completed: true,
    }
    try {
        await axios.put(`${URL}/api/tasks/${task._id}`, newFormData)
        getTasks()
    } catch (error) {
        toast.error(error.massage);
    }
  }  
  return (
    <div className="box">
      <h1>Task Manager</h1>
      <TaskForm
        name={name}
        handleInputChange={handleInputChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
      />
      {tasks.length > 0 && (
        <div className="pb">
        <p>
          <b className="">Total Task:</b>{tasks.length} <b className="pl">Completed Task:</b>{completedTask.length}
        </p>
      </div>
      )}
      <hr />
      {isLoading && (
        <div className="loader">
          <img src={loadingImg} width={100} height={100} alt="loading" />
        </div>
      )}
      {!isLoading && tasks.length === 0 ? (
        <p>Task Is Empty, Please Add A Task</p>
      ) : (
        <>
          {tasks.map((task, index) => {
            return (
              <Task
                key={task._id}
                task={task}
                index={index}
                deleteTask={deleteTask}
                getSingleTask={getSingleTask}
                setToComplete={setToComplete}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default TaskList;
