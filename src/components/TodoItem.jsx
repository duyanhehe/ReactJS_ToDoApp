import "../css/app.sass"

export default function TodoItem({item, todos, setTodos}){
    function handleDelete(item){
        console.log(item);
        setTodos(todos.filter((todo) => todo !== item));
    }

    function handleClick(name){
        setTodos(todos.map((todo) => todo.name === name? {...todo, done:!todo.done} : todo));
    }

    // const finished = item.done ? styles.completed : "";

    return(
        <div>
            <div>
                <label>
                    <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => handleClick(item.name)}
                    />
                </label>
                <span className={item.done ? 'completed' : ''}>
                    {item.name}
                </span>
                <span>
                    <button className="deleteTodo" onClick={() => handleDelete(item)}>x</button>
                </span>
            </div>
            <hr />
        </div>
    )
}