export default function Footer({todos, setTodos}){
    const completedTodos = todos.filter((todo) => todo.done).length
    const totalTodos = todos.length
    const todosLeft = totalTodos - completedTodos

    // Delete completed todos
    const deleteCompletedTodos = () => {
        const newTodos = todos.filter((todo) => !todo.done);
        setTodos(newTodos);
    };


    return(
        <div>
            <span>
                {todosLeft} items left!
            </span>
            {/* <nav>
                <a href="#" onClick={() => setFilter("all")}>All</a>
                <a href="#" onClick={() => setFilter("active")}>Active</a>
                <a href="#" onClick={() => setFilter("completed")}>Completed</a>
            </nav> */}
            <button onClick={deleteCompletedTodos}>Clear completed</button>
        </div>
    )
}