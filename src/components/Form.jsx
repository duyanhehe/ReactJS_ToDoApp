import { useState } from "react";
import "../css/app.sass"

export default function Form({ todos, setTodos }){
    const [todo, setTodo] = useState({name:"", done:false});

    function handleSubmit(e) {
        e.preventDefault();
        if (todo.name.trim() === ""){
            return;
        }
        setTodos([...todos, todo]);
        setTodo({name:"", done:false});
    }

    function handleCompleteAll(e) {
        const updatedTodos = todos.map(t => ({ ...t, done: e.target.checked}));
        setTodos(updatedTodos);
    }

    return(
        <div>
            {/* Conditionally render the checkbox if there are any todos */}
            {todos.length > 0 && (
                <div>
                    <input 
                        type="checkbox" 
                        onChange={handleCompleteAll} 
                        checked={todos.every(todo => todo.done)} 
                    />
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <input className="inputField" onChange={(e) => setTodo({name:e.target.value, done:false})} value={todo.name} type="text" placeholder="What needs to be done?" />
                </div>
            </form>
        </div>
    )
}