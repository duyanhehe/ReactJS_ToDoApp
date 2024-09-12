import { useState } from 'react'
import Header from "./components/Header"
import "./css/app.sass"
import Todo from './components/Todo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Header />

      <Todo />
    </div>
  )
}

export default App
