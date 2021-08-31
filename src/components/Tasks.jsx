import React from "react";
import Task from "./Task";

const Tasks = ({ tasks, handleTaskClick, handerleTaskDelletion }) => {
    return (
        <>
            {tasks.map((task) => (
                <Task
                    task={task}
                    handleTaskClick={handleTaskClick}
                    handerleTaskDelletion={handerleTaskDelletion}
                />
            ))}
        </>
    );
};

export default Tasks;
