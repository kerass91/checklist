import React, {useEffect} from 'react'
import TodoList from './Todo/TodoList';
import Context from './Todo/context';
import Modal from './Modal/Modal';
/* import AddTodo from './Todo/AddTodo'; */

const AddTodo = React.lazy(() => import('./Todo/AddTodo'))


function App() {
  const [todos, setTodos] = React.useState([])
  /* const [loading, setLoading]= React.useState(true) */

  useEffect(()=> {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then(response => response.json())
    .then(todos => {
      setTimeout(() => {
        setTodos(todos)
      }, 2000);
      
    })
  }, [])

  function toggleTodo (id) {
    setTodos(
      todos.map(todo => {
      if (todo.id === id) {
        todo.completed =!todo.completed
      }
      return todo
    })
  )
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo=>todo.id !== id))
  }

  function addTodo(title) {
    setTodos(todos.concat([{
      title,
      id: Date.now(),
      completed:false,
    }]))
  }

  return (
   <Context.Provider value={{removeTodo}}>
    <div className='wrapper'>
      <h1>Yours 'Todo list'</h1>   
      {todos.length ? <TodoList todos={todos} onToggle={toggleTodo}/> : 
      <p>You don`t have any todos</p>}
     <Modal/>
      <React.Suspense fallback={<p>Loading...</p>}>
        <AddTodo onCreate={addTodo}/>
      </React.Suspense>
{/*       {loading && <Loader/>} */}
    </div>
  
  </Context.Provider>
    )
}

export default App;
