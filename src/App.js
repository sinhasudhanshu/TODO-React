
import React, { useState, useEffect } from "react"; // Importing React hooks and useEffect from react package
import { IoIosCheckmarkCircle } from "react-icons/io"; // Importing icon from react-icons/io package
import { MdDeleteForever } from "react-icons/md"; // Importing icon from react-icons/md package
import { FiCircle } from "react-icons/fi"; // Importing icon from react-icons/fi package

const App = () => {

  // Functional component named App
  const [filter, setFilter] = useState(0); // Declaring state variable todos as an empty array using useState hook
  const [todos, setTodos] = useState([]); // Declaring state variable todos as an empty array using useState hook
  const [todoItem, setTodoItem] = useState(""); // Declaring state variable todoItem as an empty string using useState hook
  const [error, setError] = useState(false); // Declaring state variable error as false using useState hook
  const [completedTasks, setCompletedTasks] = useState(""); // Declaring state variable completedTasks as an empty string using useState hook

  const handleFilter = (e) => {
    console.log(e.target);
    setFilter(e.target.value);
  };

  // Function to add todo items
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    if (todoItem) {
      // Checks if todoItem is not empty
      setError(false); // Resets error state to false
      let uniqueId = Math.random() * Math.random() * 10000; // Generates a unique ID
      let newTodoItem = {
        // Object representing new todo item
        id: uniqueId,
        todo: todoItem,
        complete: false,
      };
      setTodos([newTodoItem, ...todos]); // Updates todos state by adding new todo item to the beginning of the array
      setTodoItem(""); // Resets todoItem state to empty string
    } else {
      setError(true); // Sets error state to true if todoItem is empty
      setTodoItem(""); // Resets todoItem state to empty string
    }
  };

  // Function to delete todo item
  const deleteTodo = (id) => {
    let newTodos = todos.filter((todo) => todo.id !== id); // Filters out the todo item with matching ID and creates a new array
    setTodos([...newTodos]); // Updates todos state with the new array
  };

  // Function to toggle todo item completion status
  const toggleComplete = (id) => {
    todos.find((todo) => {
      // Finds the todo item with matching ID
      if (todo.id === id) {
        todo.complete = !todo.complete; // Toggles the completion status of the todo item
      }
      return setTodos([...todos]); // Updates todos state with the updated array
    });
  };

  // Effect hook to update completedTasks state when todos state changes
  useEffect(() => {
    let completeArray = [];
    todos.filter((todo) => todo.complete === true && completeArray.push(todo)); // Filters out completed todo items and pushes them to completeArray
    setCompletedTasks(completeArray.length); // Updates completedTasks state with the length of completeArray
  }, [todos]);

  // Effect hook to update todos state from local storage when component mounts
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos")); // Retrieves todos array from local storage
    if (todos) {
      // Checks if todos array is not null
      setTodos(todos); // Updates todos state with the retrieved array
    }
  }, []);

  // Effect hook to reset error state after 2 seconds
  useEffect(() => {
    let adderror = setTimeout(() => {
      setError(false);
    }, 2000);
    return () => {
      clearTimeout(adderror);
    };
  }, [error]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  let Today = new Date().toLocaleDateString("en-us", { weekday: "long" });
  let day = new Date().toLocaleDateString("en-us", { day: "numeric" });
  let month = new Date().toLocaleDateString("en-us", { month: "short" });

  return (
    <div className="app-container">
      <h1>Todo App</h1>
      <div className="header-section">
        <h4 className="date">
          {`${Today},`} <span>{`${day} ${month}`}</span>
        </h4>
        <div className="app-form-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={todoItem}
              className={error ? "error" : ""}
              onChange={(e) => setTodoItem(e.target.value)}
              placeholder="Type Todo here..."
            />
            <button type="submit" className="btn">
              Add Todo
            </button>
          </form>
        </div>
        <div className="data-card-container">
          <div className="data-card">
            <label>Show  <input
              onChange={handleFilter}

              value="0"
              type="radio"
              name="filter"
            /></label>
            <h5>{todos.length < 10 ? `0${todos.length}` : todos.length}</h5>
            <p>Created tasks</p>
          </div>
          <div className="data-card">
            <label>Show
              <input
                onChange={handleFilter}
                value="1"
                type="radio"
                name="filter"
              /></label>
            <h5>
              {completedTasks < 10 ? `0${completedTasks}` : completedTasks}
            </h5>
            <p>Completed tasks</p>
          </div>

          <div className="data-card">
            <label>Show<input
              onChange={handleFilter}
              value="2"
              type="radio"
              name="filter"
            /></label>
            <h5>
              {todos.length - completedTasks < 10
                ? `0${todos.length - completedTasks}`
                : todos.length - completedTasks}
            </h5>
            <p>Remaining tasks</p>
          </div>
        </div>
      </div>
      <div className="todo-container">
        {todos.map((todoItem) => {
          if ((filter == 0) || (filter == 1 && todoItem.complete) || (filter == 2 && (!todoItem.complete))) {
            const { id, todo, complete } = todoItem;
            return (
              <div key={id} className="todo-card">
                <div className="icon" onClick={() => toggleComplete(id)}>
                  {!complete ? (
                    <FiCircle />
                  ) : (
                    <IoIosCheckmarkCircle
                      className={complete ? "icon-done" : ""}
                    />
                  )}
                </div>
                <p className={complete ? "text-done" : ""}>{todo}</p>
                <MdDeleteForever
                  onClick={() => deleteTodo(id)}
                  className="icon delete-icon"
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};


export default App;

