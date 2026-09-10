import { useState, useEffect } from "react";
import { loadTasks, saveTasks } from "../utils/LocalStorage";

export default function Todo() {
  const [tasks, setTasks] = useState(loadTasks);

  const [input, setInput] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState("");

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 200);

    return () => {
      clearTimeout(timer); 
    };
  }, [search]);


  function handleTask() {
    const trimmedInput = input.trim();
    if (trimmedInput === "") return;

    const alreadyExists = tasks.find(
      (task) => task.text.toLowerCase() === trimmedInput.toLowerCase()
    );

    if (alreadyExists) {
      alert("This task already exists!");
      return;
    }

    const newTask = { id: Date.now(), text: trimmedInput };
    const updatedTasks = [newTask, ...tasks];

    setTasks(updatedTasks);
    saveTasks(updatedTasks);

    setInput(""); 
  }

 
  function deleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleTask();
  }

  function startEdit(task){
    setEditingId(task.id);
    setEditInput(task.text);
  }

  function cancelEdit(){
    setEditingId(null);
    setEditInput("");
  }

  function saveEdit(id){
    const trimmedInput = editInput.trim();
    if (trimmedInput === "") return;

    const taskToUpdate = tasks.find((task) => task.id === id);
    const updatedTask = { ...taskToUpdate, text: trimmedInput };
    const otherTasks = tasks.filter((task) => task.id !== id);

    const updatedTasks = [updatedTask, ...otherTasks];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);

    setEditingId(null);
    setEditInput("");
  }

  function handleEditKeyDown(e, id) {
    if (e.key === "Enter") saveEdit(id);
  }

  let visibleTasks = tasks;

  if (debouncedSearch.trim().length >= 2) {
    visibleTasks = tasks.filter((task) =>
      task.text.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }

  return (
    <div className="todo-container">
      <div className="input-row">
          <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={tasks.length === 0 ? "Add a task first..." : "Search tasks..."}
          className="task-input"
          disabled={tasks.length === 0}
          autoComplete="off"
          spellCheck="false"
        />
      </div>

      <div className="input-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          className="task-input"
        />
        <button onClick={handleTask} className="add-button">
          Add
        </button>
      </div>

      {visibleTasks.length === 0 ? (
        <p className="empty-text">No tasks found.</p>
      ) : (
        <ul className="task-list">
          {visibleTasks.map((task) => {

            if (task.id === editingId) {
              return (
                <li key={task.id} className="task-item">
                  <input
                    type="text"
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                    onKeyDown={(e) => handleEditKeyDown(e, task.id)}
                    className="edit-input"
                  />
                  <button onClick={() => saveEdit(task.id)} className="save-button">
                    Save
                  </button>
                  <button onClick={cancelEdit} className="cancel-button">
                    Cancel
                  </button>
                </li>
              );
            }

            return (
              <li key={task.id} className="task-item">
                <span>{task.text}</span>
                <button
                  onClick={() => startEdit(task)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}