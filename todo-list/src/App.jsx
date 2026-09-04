import { useState } from "react";

export default function App() {
  // 1. State to hold the list of tasks (an array)
  const [tasks, setTasks] = useState([]);
  // 2. State to hold whatever the user is currently typing
  const [input, setInput] = useState("");

  // Runs when the "Add" button is clicked (or Enter is pressed)
  function addTask() {
    if (input.trim() === "") return; // ignore empty input

    const newTask = {
      id: Date.now(), // unique id
      text: input,
    };

    setTasks([...tasks, newTask]); // add new task into the array
    setInput(""); // clear input box
  }

  // Runs when a task's delete button is clicked
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id)); // remove that one task
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") addTask();
  }

  return (
    <div className="todo-container">
      <h1>My To-Do List</h1>

      <div className="input-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          className="task-input"
        />
        <button onClick={addTask} className="add-button">
          Add
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="empty-text">No tasks yet. Add one above!</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <span>{task.text}</span>
              <button
                onClick={() => deleteTask(task.id)}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}