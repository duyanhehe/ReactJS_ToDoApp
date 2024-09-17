import { useState } from "react";
import "../css/app.sass"
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import db from '../firebase';

export default function Form({ todos, setTodos }){
    const [todo, setTodo] = useState({name:"", done:false});

    async function handleSubmit(e) {
        e.preventDefault();
        if (todo.name.trim() === ""){
            return;
        }
        try {
            const docRef = await addDoc(collection(db, "todo"), todo);
            console.log("Todo added with ID: ", docRef.id);

            setTodos([...todos, {...todo, id: docRef.id }]);
            setTodo({name:"", done:false});
        }   catch (e) {
            console.error(e);
        }
    }

    function handleCompleteAll(e) {
        const isChecked = e.target.checked;

        // Update the Firestore for each todo
        todos.forEach(async (todo) => {
            try {
                const todoRef = doc(db, "todo", todo.id);
                await updateDoc(todoRef, { done: isChecked });
            } catch (error) {
                console.error("Error updating todo status in Firestore: ", error);
            }
        });
    
        // Update local state
        const updatedTodos = todos.map(t => ({ ...t, done: isChecked }));
        setTodos(updatedTodos);
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <div className="inputContainer">
                    {/* Conditionally render the checkbox if there are any todos */}
                    {todos.length > 0 && (
                        <div>
                            <input 
                                type="checkbox" 
                                onChange={handleCompleteAll} 
                                checked={todos.every(todo => todo.done)}
                                className="completeAllCheckbox" 
                            />
                        </div>
                    )}
                    <div>
                        <input
                            onChange={(e) => setTodo({name:e.target.value, done:false})}
                            value={todo.name}
                            type="text"
                            placeholder="What needs to be done?"
                             className="inputField"
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}