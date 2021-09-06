import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { SiteClient } from "datocms-client";

import Header from "./components/Header";
import Tasks from "./components/Tasks";
import "./App.css";
import AddTask from "./components/AddTask";
import TaskDetails from "./components/TaskDetails";
import DatoCMSService from "./api/DatoServices";

const App = () => {
    const [tasks, setTasks] = useState([]);

    React.useEffect(function () {
        // GET
        DatoCMSService.getTasks().then((data) => {
            const allTarefas = data.data.allTarefas;
            setTasks(allTarefas);
        });
    }, []);

    const handleTaskClick = (taskId) => {
        const newTasks = tasks.map((task) => {
            if (task.id == taskId)
                return { ...task, completed: !task.completed };
            return task;
        });

        setTasks(newTasks);
    };

    const handleTaskAddition = (taskTitle) => {
        const newTasks = [
            ...tasks,
            {
                title: taskTitle,
                id: uuidv4(),
            },
        ];

        setTasks(newTasks);

        async function exportTalk() {
            const TOKEN = process.env.REACT_APP_FULL_ACCESS_API_TOKEN;
            const client = new SiteClient(TOKEN);

            let categoryNameToRecord = "";
            categoryNameToRecord = await client.items.create({
                itemType: process.env.REACT_APP_ID_MODEL_TAREFAS,
                title: taskTitle,
            });
        }
        exportTalk();
    };

    const handerleTaskDelletion = (taskId) => {
        const TOKEN = process.env.REACT_APP_FULL_ACCESS_API_TOKEN;
        const client = new SiteClient(TOKEN);

        const newTasks = tasks.filter((task) => task.id !== taskId);

        setTasks(newTasks);

        client.items.destroy(taskId).then((item) => {
            console.log(item);
        });
    };

    return (
        <Router>
            <div className="container">
                <Header />
                <Route
                    path="/"
                    exact
                    render={() => (
                        <>
                            <AddTask handleTaskAddition={handleTaskAddition} />
                            <Tasks
                                tasks={tasks}
                                handleTaskClick={handleTaskClick}
                                handerleTaskDelletion={handerleTaskDelletion}
                            />
                        </>
                    )}
                />
                <Route path="/:taskTitle" exact component={TaskDetails} />
            </div>
        </Router>
    );
};

export default App;
