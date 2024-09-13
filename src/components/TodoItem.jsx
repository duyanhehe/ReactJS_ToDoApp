import "../css/app.sass"
import { useState } from "react";

export default function TodoItem({item, todos, setTodos}){
    const [isEditing, setIsEditing] = useState(false);
    const [newTodo, setNewTodo] = useState(item.name);

    function handleDelete(item){
        console.log(item);
        setTodos(todos.filter((todo) => todo !== item));
    }

    function handleClick(name){
        setTodos(todos.map((todo) => todo.name === name? {...todo, done:!todo.done} : todo));
    }

    function handleDoubleClick(){
        setIsEditing(true);
    }

    function handleBlur() {
        if (newTodo.trim() === '') return;
        setTodos(todos.map((todo) => todo.name === item.name ? { ...todo, name: newTodo} : todo));
        setIsEditing(false);
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            handleBlur();
        }
    }

    return(
        <div onDoubleClick={handleDoubleClick} className="todosContainer">
            <div className="todoItem">
                <label>
                    <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => handleClick(item.name)}
                    />
                </label>
                {isEditing ? (
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                ) : (
                    <span className={item.done ? 'completed' : ''}>
                        {item.name}
                    </span>
                )}
                <span>
                    <button className="deleteTodo" onClick={() => handleDelete(item)}>x</button>
                </span>
            </div>
        </div>
    )
}