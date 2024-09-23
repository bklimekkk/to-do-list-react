function FilterButtons({tasks, setFilterOption}) {
    return (
        <div className={tasks.length === 0 ? "filter-section hide" : "filter-section"}>
        <button onClick={() => setFilterOption("Show All")}>Show All</button>
        <button onClick={() => setFilterOption("Show Complete")}>Show Complete</button>
        <button onClick={() => setFilterOption("Show Incomplete")}>Show Incomplete</button>
       </div> 
    );
}

export default FilterButtons;