
export function loadTasks() {
  const savedTasks = localStorage.getItem("myTasks");

  if (savedTasks) {
    return JSON.parse(savedTasks); 
  }
  return []; 
}

export function saveTasks(tasks) {
  localStorage.setItem("myTasks", JSON.stringify(tasks)); 
}