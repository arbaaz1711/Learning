function toggleLineThrough(index) {
  const label = document.getElementById("label-" + index);
  label.classList.toggle("completed");
}

function deleteTask(index, arr) {
  if (confirm("Are you sure you want to delete this task?")) {
    // Remove task from DOM
    const taskElement = document.getElementById("list-container-" + index);
    if (taskElement) {
      taskElement.remove();
    }

    // Send request to update server
    fetch("/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index: index }),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          console.log("Task deleted successfully");
        }
      })
      .catch((error) => {
        console.log(error);
        console.error("Error deleting task:", error);
      });
  }
}

function editTask(index) {
  const parentDiv = document.getElementById("list-container-" + index);
  const childDiv = parentDiv.querySelector("div");
  childDiv.style.display = "none";
  const task = parentDiv.querySelector("span");
  const input = document.createElement("input");
  const saveBtn = document.createElement("button");
  input.type = "text";
  input.classList.add("input-field");
  input.value = task.textContent;
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
    task.textContent = input.value;
    task.style.display = "block";
    childDiv.style.display = "flex";
    parentDiv.removeChild(input);
    parentDiv.removeChild(saveBtn);
    fetch(`/${index}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: input.value }),
    })
      .then((response) => {
        console.log(response, "response");
      })
      .catch((error) => {
        console.log(error, "error");
      });
  });
}
