// Track current filter
let currentFilter = 'all';

// Function to load initial tasks when page loads
function loadInitialTasks() {
  changePriority('all');
}

// Helper function to refresh current view
function refreshCurrentView() {
  const prioritySelect = document.getElementById('priority');
  currentFilter = prioritySelect.value;
  changePriority(currentFilter);
}

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
          // Refresh the current filtered view instead of reloading the page
          refreshCurrentView();
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
  const taskText = document.getElementById(`task-text-${index}`);
  const editContainer = document.getElementById(`edit-container-${index}`);
  const editInput = document.getElementById(`edit-input-${index}`);

  if (editContainer.style.display === "none") {
    // Enter edit mode
    taskText.style.display = "none";
    editContainer.style.display = "flex";
    editInput.focus();

    // Add event listener for Enter key
    editInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        if (editInput.value.trim() === "") {
          alert("Please enter a task");
          return;
        }
        saveEditedTask(editInput, id);
      }
    });
  }
  // saveBtn.addEventListener("click", () => {
  //   if (input.value.trim() === "") {
  //     alert("Please enter a task");
  //     return;
  //   }
  //   console.log("taskId", id);
  //   task.textContent = input.value;
  //   task.style.display = "block";
  //   actionBtns.style.display = "flex";
  //   parentDiv.removeChild(input);
  //   parentDiv.removeChild(saveBtn);
  //   fetch(`/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ value: input.value.trim() }),
  //   })
  //     .then((response) => response.json()) // Parse the response as JSON
  //     .then((data) => {
  //       console.log(data, "responseUpdate"); // Now 'data' will contain the parsed response
  //       alert(data.message); // Access 'message' from the parsed response object
  //     })
  //     .catch((error) => {
  //       console.log(error, "error");
  //     });
  // });
}

function saveEditedTask(index, id) {
  const taskText = document.getElementById(`task-text-${index}`);
  const editContainer = document.getElementById(`edit-container-${index}`);
  const editInput = document.getElementById(`edit-input-${index}`);

  fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value: editInput.value.trim() }),
  })
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      console.log(data, "responseUpdate"); // Now 'data' will contain the parsed response
      alert(data.message); // Access 'message' from the parsed response object
      if (data.Success) {
        // Refresh the current filtered view to show updated task
        refreshCurrentView();
      }
    })
    .catch((error) => {
      console.log(error, "error");
    });
}

function changePriority(priority) {
  console.log(priority, "Selected priority filter");
  
  // Update current filter
  currentFilter = priority;
  
  // Update the select dropdown to reflect current filter
  const prioritySelect = document.getElementById('priority');
  if (prioritySelect.value !== priority) {
    prioritySelect.value = priority;
  }
  
  // Show loading state
  showLoadingState();
  
  // Make AJAX request to filter endpoint
  fetch(`/api/filter/${priority}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then(response => response.json()) // Get JSON response instead of HTML
  .then(data => {
    if (data.success) {
      // Render the tasks using the received JSON data
      renderTaskList(data.data);
      console.log(`Filtered tasks for priority: ${priority}`);
    } else {
      throw new Error(data.error || 'Failed to filter tasks');
    }
  })
  .catch(error => {
    console.error("Error filtering tasks:", error);
    alert("Error filtering tasks");
    // Show error state
    showErrorState();
  })
  .finally(() => {
    hideLoadingState();
  });
}

function showLoadingState() {
  const taskListContainer = document.getElementById('task-list-container');
  taskListContainer.innerHTML = `
    <div style="text-align: center; padding: 3rem; color: white;">
      <i class="fas fa-spinner fa-spin" style="font-size: 2rem; margin-bottom: 1rem;"></i>
      <div>Filtering tasks...</div>
    </div>
  `;
}

function hideLoadingState() {
  // Loading state is automatically hidden when content is replaced
}

function showErrorState() {
  const taskListContainer = document.getElementById('task-list-container');
  taskListContainer.innerHTML = `
    <div style="text-align: center; padding: 3rem; color: white; background: rgba(255, 255, 255, 0.1); border-radius: 10px;">
      <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem; color: #f56565;"></i>
      <div>Error loading tasks. Please try again.</div>
    </div>
  `;
}

// Function to render task list from JSON data
function renderTaskList(todoList) {
  const taskListContainer = document.getElementById('task-list-container');
  
  if (todoList.length === 0) {
    taskListContainer.innerHTML = `
      <div class="no-tasks-container">
        <i class="fas fa-tasks empty-icon" style="font-size: 16px"></i>
        <span>No tasks found. Add your first task above!</span>
      </div>
    `;
    return;
  }
  
  let tableHTML = `
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th width="5%">S.No</th>
            <th width="50%">Task Title</th>
            <th width="15%">Priority</th>
            <th width="15%">Actions</th>
          </tr>
        </thead>
        <tbody>
  `;
  
  todoList.forEach((task, index) => {
    tableHTML += `
      <tr id="task-row-${index}">
        <td class="text-center">${index + 1}</td>
        <td>
          <div class="task-title-container" id="task-title-${index}">
            <div class="task-content">
              <div class="priority-indicator ${task.priority.toLowerCase()}"></div>
              <span class="task-description" id="task-text-${index}">${escapeHtml(task.task)}</span>
            </div>
            <div class="edit-input-container" style="display: none" id="edit-container-${index}">
              <input
                type="text"
                class="form-control edit-task-input"
                id="edit-input-${index}"
                value="${escapeHtml(task.task)}"
              />
              <button
                class="btn btn-success save-btn"
                onclick="saveEditedTask('${index}', '${task._id}')"
                title="Save"
              >
                <i class="fas fa-check"></i>
              </button>
            </div>
          </div>
        </td>
        <td>
          <span class="priority-badge ${task.priority.toLowerCase()}" style="text-transform: capitalize">
            ${task.priority}
          </span>
        </td>
        <td>
          <div class="action-buttons">
            <button
              class="btn btn-outline-primary btn-sm edit-btn"
              onclick="editTask('${index}', '${task._id}')"
              title="Edit"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              class="btn btn-outline-danger btn-sm delete-btn"
              onclick="deleteTask('${index}', '${task._id}')"
              title="Delete"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  });
  
  tableHTML += `
        </tbody>
      </table>
    </div>
  `;
  
  taskListContainer.innerHTML = tableHTML;
}

// Helper function to escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Load tasks when page is ready
document.addEventListener('DOMContentLoaded', function() {
  loadInitialTasks();
});

