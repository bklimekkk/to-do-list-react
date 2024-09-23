function ClearAllButton({setTasks, tasks, setErrorMessage}) {

    function handleClearAll() {
        setTasks([]);
        setErrorMessage("");
    }
    
    return (
        <button 
       onClick={handleClearAll}
        className={tasks.length === 0 ? "hide" : "" }>Clear All</button>
    );
}

export default ClearAllButton;