function saveTask(task) {
  let taskList = JSON.parse(localStorage.getItem("tasklist"));

  taskList.push(task);
  if (!taskList && !taskList.length) {
    taskList = [];
  }
  console.log(taskList);
  localStorage.setItem("tasklist", taskList);
}

function clickPress(event) {
  if (event.keyCode == 13) {
    saveTask(document.getElementById("task").value);
    // do something
  }
}
