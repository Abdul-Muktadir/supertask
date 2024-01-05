import React from 'react'
import { FaCheckDouble, FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const Task = ({task, index, deleteTask, getSingleTask, setToComplete}) => {
  return (
    <div className='task-list'>
    <div className={task.completed ? "active" : "line"}></div>
        <div className='item'>
            <p className='task-count'>
                <b>{index + 1}.</b>{task.name}
            </p>
        </div>
        <div className='item'>
            <div className='icons'>
                <FaCheckDouble color='green' onClick={()=> setToComplete(task)} />
                <FaEdit color='purple' onClick={()=> getSingleTask(task)} />
                <RiDeleteBin6Line color='red' onClick={()=> deleteTask(task._id)} />
            </div>
        </div>
    </div>
  )
}

export default Task
