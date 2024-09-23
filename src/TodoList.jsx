import {useState, useEffect} from "react";
import ClearAllButton from "./ClearAllButton.jsx";
import FilterButtons from "./FilterButtons.jsx"

function TodoList() { 
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
    const [task, setTask] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [filterOption, setFilterOption] = useState("Show All");
    const [searchPhrase, setSearchPhrase] = useState("");
    const [date, setDate] = useState("");
    
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);
    
    function handleInputChange(event) {
        setTask(event.target.value); 
    }
    
    function addTask() {
        if(tasks.some(t => t.name === task)) {
            setErrorMessage("This element already exists"); 
        } else if(task === "") {
            setErrorMessage("You must enter task name");
        } else if(date === "") {
            setErrorMessage("You must enter task date");
        } else {
            setTasks(t => [...t, {
                name: task,
                date: date,
                completed: false,
                edited: false}]);
            setTask("");   
            setErrorMessage(""); 
        }
    }
    
    function removeTask(index) {
        setErrorMessage(""); 
        let filteredTasks = tasks.filter((_, i) => i !== index);
        setTasks(filteredTasks);
    }
    
    function editTask(index) {
        const changedTasks = tasks.map((task, i) => {
            if(i === index) {
                return {... task, edited: true };
            }
            return task;
        });

        setTasks(changedTasks);
    }

    function completeTaskEdit(taskName, index) {
        if(tasks.some((t, i) => t.name === taskName && i !== index)) {
            setErrorMessage("This element already exists");
            return;
        }

        const changedTasks = tasks.map((task, i) => {
            if(i === index) {
                return {... task, edited: false };
            }
            return task;
        })

        setTasks(changedTasks);
        setErrorMessage("");
    }
    
    function handleTaskNameChange(index, event) {
        let changedTasks = tasks.map((task, i) => {
            if(i === index) {
                return {... task, name: event.target.value};
            }
            return task
        })
        setTasks(changedTasks);
    }
    
    function handleTaskCompletion(index, event) {
        let changedTasks = tasks.map((task, i) => {
            if(i === index) {
                return {... task, completed: event.target.checked}
            }
            return task
        })
        setTasks(changedTasks);
    }
    
    function showTask(task) {
        if(filterOption === "Show All") {
            return task.name.includes(searchPhrase);
        } else if(filterOption === "Show Complete") {
            return task.completed && task.name.includes(searchPhrase);
        } else if(filterOption === "Show Incomplete") {
            return !task.completed && task.name.includes(searchPhrase);
        }
    }
    
    function handlePhraseChange(event) {
        setSearchPhrase(event.target.value);
    }
    
    function removeCompleteTasks() {
        let filteredTasks = tasks.filter(t => !t.completed);
        setTasks(filteredTasks);
    }
    
    function handleCalendarInputChange(event) {
        setDate(event.target.value);
    }
    
    return(
       <>
       <input type="text" value={task} onChange={handleInputChange}/>

        <input type="datetime-local" value={date} onChange={(event) => handleCalendarInputChange(event)}/>

       <button onClick={addTask}>Add Task</button><br />

       <div className="error-section">{errorMessage}</div>

       <ClearAllButton setTasks={setTasks} tasks={tasks} setErrorMessage={setErrorMessage}/>
       
       {
         tasks.filter(t => t.completed).length > 0 &&
         <div>
        <button 
         onClick={removeCompleteTasks}>Clear Completed</button><br />
         </div>
       }

        <FilterButtons tasks={tasks} setFilterOption={setFilterOption}/><br />

        {
            tasks.length !== 0 &&
            <input 
            type="text" 
            placeholder="Search tasks"
            value={searchPhrase}
            onChange={(event) => handlePhraseChange(event)}/>
        }
     
       <ul className="task-list">
        {tasks.length > 0 ? tasks.map((task, index) =>

            {
               if(showTask(task)) {
                return (
                    <li key={index}>
                    <input 
                    type="checkbox" 
                    checked={task.completed} 
                    onChange={(event) => handleTaskCompletion(index, event)}/>
    
                    {!task.edited && `${task.name} ${task.date}`}
    
                    {
                        task.edited &&
                        <input 
                        type="text"
                         value={task.name} 
                         onChange={(event) => handleTaskNameChange(index, event)}/>
                    }
    
                    <button onClick={task.edited ?
                         () => completeTaskEdit(task.name, index) 
                         : () => editTask(index)}>{task.edited ? "Done" : "Edit"}</button>
    
                    <button onClick={() => removeTask(index)}>Delete</button>
                </li> 
                );
               }
            }

        ) : <p>No items found</p>}
       </ul>
       </>
    );
}

export default TodoList