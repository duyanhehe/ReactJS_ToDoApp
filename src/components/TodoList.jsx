import TodoItem from "./TodoItem";

export default function TodoList({todos, setTodos, filter}){
    // Function to filter todos based on the filter state
    const getFilteredTodos = () => {
        if (filter === "active") {
            return todos.filter(todo => !todo.done);
        } else if (filter === "completed") {
            return todos.filter(todo => todo.done);
        } else {
            return todos; // Show all if the filter is 'all'
        }
    };

    return(
        <div>
            {getFilteredTodos().map((item) => (
                <TodoItem key={item.id} item={item} todos={todos} setTodos={setTodos}/>
            ))}
        </div>
    )
}