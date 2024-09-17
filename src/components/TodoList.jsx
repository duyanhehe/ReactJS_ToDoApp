import TodoItem from "./TodoItem";

export default function TodoList({todos, setTodos}){
    return(
        <div>
            {todos.map((item) => (
                <TodoItem key={item.id} item={item} todos={todos} setTodos={setTodos}/>
            ))}
        </div>
    )
}