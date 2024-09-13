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

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input className="inputField" onChange={(e) => setTodo({name:e.target.value, done:false})} value={todo.name} type="text" placeholder="What needs to be done?" />
                </div>
            </form>
        </div>
    )
}