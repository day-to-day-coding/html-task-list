function clickPress(event) {
  // on enter
  if (event.keyCode == 13) {
    saveTask(document.getElementById("task").value);
  }
}

function saveTask(task) {
  const taskList = JSON.parse(localStorage.getItem("tasklist"));
  // tasklist is null then create a new empty array
  if (!taskList) {
    taskList = [];
  }
  // push the task and its status
  taskList.push({
    task: task,
    done: false,
  });

  // save the updated tasklist
  localStorage.setItem("tasklist", JSON.stringify(taskList));
  // render the updated tasklist
  renderTaskList();
  // clear the input field
  document.getElementById("task").value = "";
}

function renderTaskList() {
  const taskList = JSON.parse(localStorage.getItem("tasklist"));
  // get ui element
  const ui = document.getElementById("tasks");
  // clear ui content else it will keep append
  ui.textContent = "";
  // check if taskList is not empty
  if (taskList) {
    taskList.forEach((task, index) => {
      // create a li element
      const liElement = document.createElement("li");
      liElement.id = index;
      liElement.className = "collection-item";
      // create a checkbox input
      const checkbox = document.createElement("label");
      const input = document.createElement("input");
      input.id = index;
      input.type = "checkbox";
      input.setAttribute("onclick", `taskStatusToggle(${index})`);
      // check if task is done
      if (task.done) {
        input.setAttribute("checked", "checked");
      }
      // task text in span
      const span = document.createElement("span");
      span.style = "color: black;";
      span.textContent = task.task;

      checkbox.appendChild(input);
      checkbox.appendChild(span);
      liElement.appendChild(checkbox);
      // create a btn element
      const btn = document.createElement("a");
      btn.className = "waves-effect waves-red btn-flat task-delete";
      btn.setAttribute("onclick", `deleteTask(${index});`);

      // create an icon element
      const icon = document.createElement("i");
      icon.textContent = "delete";
      icon.className = "material-icons prefix";
      // make icon child of btn
      btn.appendChild(icon);
      // make btn child of liElement
      liElement.appendChild(btn);
      ui.appendChild(liElement);
    });
  }
}

function taskStatusToggle(index) {
  const taskList = JSON.parse(localStorage.getItem("tasklist"));
  // toggle the status from true to false and false to true
  taskList[index]["done"] = !taskList[index]["done"];
  // save the updated list
  localStorage.setItem("tasklist", JSON.stringify(taskList));
  renderTaskList();
}

function deleteTask(index) {
  const taskList = JSON.parse(localStorage.getItem("tasklist"));
  if (taskList) {
    // remove the index element from the array
    taskList.splice(index, 1);
    // save the updated tasklist
    localStorage.setItem("tasklist", JSON.stringify(taskList));
    renderTaskList();
  }
}
