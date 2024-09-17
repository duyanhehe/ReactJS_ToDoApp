import { doc, deleteDoc } from "firebase/firestore";
import db from "../firebase";
import { useState } from "react";

export default function Footer({todos, setTodos, setFilter, filter}){
    const completedTodos = todos.filter((todo) => todo.done).length
    const totalTodos = todos.length
    const todosLeft = totalTodos - completedTodos

    // Delete completed todos
    const deleteCompletedTodos = async () => {
        try {
            // Loop through completed todos and delete from Firestore
            const completed = todos.filter(todo => todo.done);
            for (const todo of completed) {
                await deleteDoc(doc(db, "todo", todo.id));
            }

            // Update local state by filtering out completed todos
            setTodos(todos.filter(todo => !todo.done));
        } catch (error) {
            console.error("Error deleting completed todos: ", error);
        }
    };


    return(
        <div className="footer">
            <span>
                {todosLeft} items left!
            </span>
            <nav>
                <ul>
                    <li>
                        <a
                        href="#"
                        onClick={() => setFilter("all")}
                        className={filter === "all" ? "active-filter" : ""}
                        >
                            All
                        </a>
                    </li>
                    <li>
                        <a
                        href="#"
                        onClick={() => setFilter("active")}
                        className={filter === "active" ? "active-filter" : ""}
                        >
                            Active
                        </a>
                    </li>
                    <li>
                        <a
                        href="#"
                        onClick={() => setFilter("completed")}
                        className={filter === "completed" ? "active-filter" : ""}
                        >
                            Completed
                        </a>
                    </li>
                </ul>
            </nav>

            <button className="clearCompleted" onClick={deleteCompletedTodos}>
                Clear completed
            </button>

        </div>
    )
}