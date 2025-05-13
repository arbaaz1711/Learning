function deleteTask(index, taskId) {
  let id = JSON.stringify({ taskId });
  if (confirm("Are you sure you want to delete this task?")) {
    // Send request to update server
    fetch("/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: id,
    })
      .then((response) => {
        if (response.ok) {
          // Reload the page to show updated list with correct numbering
          window.location.reload();
        } else {
          alert("Error deleting task");
        }
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        alert("Error deleting task");
      });
  }
}

function editTask(index, id) {
  const parentDiv = document.getElementById("list-container-" + index);
  const actionBtns = document.getElementById("btn-container-" + index);
  console.log(actionBtns, "actionBtns");
  actionBtns.style.display = "none";
  const task = parentDiv.getElementsByClassName("task-description")[0];
  const input = document.createElement("input");
  const saveBtn = document.createElement("button");
  input.type = "text";
  input.classList.add("input-field");
  input.value = task.textContent.trim();
  task.textContent = "";
  task.style.display = "none";
  parentDiv.appendChild(input);
  parentDiv.appendChild(saveBtn);
  saveBtn.textContent = "Save";
  saveBtn.classList.add("save-btn");
  input.focus();
  saveBtn.addEventListener("click", () => {
    if (input.value.trim() === "") {
      alert("Please enter a task");
      return;
    }
    console.log("taskId", id);
    task.textContent = input.value;
    task.style.display = "block";
    actionBtns.style.display = "flex";
    parentDiv.removeChild(input);
    parentDiv.removeChild(saveBtn);
    fetch(`/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: input.value.trim() }),
    })
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        console.log(data, "responseUpdate"); // Now 'data' will contain the parsed response
        alert(data.message); // Access 'message' from the parsed response object
      })
      .catch((error) => {
        console.log(error, "error");
      });
  });
}

function changePriority(priority, todoList) {
  const taskContainer = document.getElementsByClassName("tasks-list");
  const filteredList = JSON.parse(todoList).map((item, index) => {
    if (item.priority === priority) {
      taskContainer[index].style.display = "flex";
    } else if (priority === "all") {
      taskContainer[index].style.display = "flex";
    } else {
      taskContainer[index].style.display = "none";
    }
  });
}
