import TodoItem from "./TodoItem";

export default function TodoList({todos, setTodos}){
    return(
        <div>
            {todos.map((item) => (
                <TodoItem key={item.name} item={item} todos={todos} setTodos={setTodos}/>
            ))}
        </div>
    )
}