import { collection, onSnapshot } from "firebase/firestore";
import Header from "./components/Header"
import Todo from './components/Todo'
import "./css/app.sass"
import db from './firebase';
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todo"), (snapshot) => {
      const fetchedTodos = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setTodos(fetchedTodos);
    });

    return () => unsubscribe();
  }, []);

  return (

    <div className="App">
      <Header />

      <Todo />
    </div>
  )
}

export default App
