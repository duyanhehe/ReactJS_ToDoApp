import "../css/app.sass"
import { useState } from "react";

export default function TodoItem({item, todos, setTodos}){
    const [isEditing, setIsEditing] = useState(false);
    const [newTodo, setNewTodo] = useState(item.name);

    // Handle deleting a todo
    function handleDelete(item){
        setTodos(todos.filter((todo) => todo !== item));
    }

    // Handle toggling the "done" status of a todo
    function handleClick(name){
        setTodos(todos.map((todo) => todo.name === name? {...todo, done:!todo.done} : todo));
    }

    // Handle double-click to edit
    function handleDoubleClick(){
        setIsEditing(true);
    }

    // Handle blur (finish editing) or pressing "Enter"
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
                <input
                type="checkbox"
                checked={item.done}
                onChange={() => handleClick(item.name)}
                className="completeCheckbox"
                />
                <div className="todoText">
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
                    <div className={item.done ? 'completed' : ''}>
                        {item.name}
                    </div>
                )}
                </div>
                <div>
                    <button className="deleteTodo" onClick={() => handleDelete(item)}>x</button>
                </div>
            </div>
        </div>
    )
}