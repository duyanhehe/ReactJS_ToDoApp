import { useState } from "react";
import Form from "./Form";
import TodoList from "./TodoList";
import Footer from "./Footer";

export default function Todo() {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("all");

    return(
        <div>
            <Form todos={todos} setTodos={setTodos} />

            <TodoList todos={todos} setTodos={setTodos} filter={filter} />

            <Footer todos={todos} setTodos={setTodos} setFilter={setFilter} filter={filter} />
        </div>
    )
}