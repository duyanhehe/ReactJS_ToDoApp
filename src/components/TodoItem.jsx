import "../css/app.sass"
import { useState } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import db from "../firebase";

export default function TodoItem({item, todos, setTodos}){
    const [isEditing, setIsEditing] = useState(false);
    const [newTodo, setNewTodo] = useState(item.name);

    // Handle deleting a todo
    async function handleDelete(item){
        try {
            // Delete from Firestore
            await deleteDoc(doc(db, "todo", item.id));
        } catch (error) {
            console.error("Error deleting todo: ", error);
        }
    }

    // Handle toggling the "done" status of a todo
    async function handleClick(id) {
        const todoRef = doc(db, "todo", id);
        const updatedDone = !item.done;
        try {
            // Update Firestore
            await updateDoc(todoRef, { done: updatedDone });
            // Update local state
            setTodos(todos.map((todo) => (todo.id === id ? { ...todo, done: updatedDone } : todo)));
        } catch (error) {
            console.error("Error updating todo: ", error);
        }
    }

    // Handle double-click to edit
    function handleDoubleClick(){
        setIsEditing(true);
    }

    // Handle blur (finish editing) or pressing "Enter"
    async function handleBlur() {
        if (newTodo.trim() === '') return;
        const todoRef = doc(db, "todo", item.id);
        try {
            // Update the todo name in Firestore
            await updateDoc(todoRef, { name: newTodo });
            // Update local state
            setTodos(todos.map((todo) => (todo.id === item.id ? { ...todo, name: newTodo } : todo)));
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating todo name: ", error);
        }
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
                onChange={() => handleClick(item.id)}
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