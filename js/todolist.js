// Firebase import and initialization
import {
  app,
  database,
  ref,
  push,
  onValue,
  remove,
  update,
} from "./firebase.js";

// DOM elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoTable = document.getElementById("todo-table");
const countTaskActive = document.getElementById("counttask");
const countTaskComplete = document.getElementById("countsuccess");
const contentContainer = document.querySelector(".content");

// Function to show Bootstrap toast for notifications
const showToast = (type, message) => {
  // Create toast element
  const toast = document.createElement("div");
  toast.classList.add(
    "toast",
    `bg-${type}`,
    "position-absolute",
    "bottom-0",
    "end-0",
    "p-3"
  );
  toast.setAttribute("role", "alert");
  toast.setAttribute("aria-live", "assertive");
  toast.setAttribute("aria-atomic", "true");
  toast.innerHTML = `
    <div class="toast-body">
      ${message}
    </div>
  `;
  // Append toast to container
  contentContainer.appendChild(toast);
  // Initialize Bootstrap toast and show
  const bsToast = new bootstrap.Toast(toast);
  bsToast.show();
  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.remove();
  }, 3000);
};

// Function to add a new task to Firebase
const addTask = (task) => {
  // Get current date for task creation
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString().slice(-2);
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const formattedDate = `${day}-${month}-${year}`;

  // Push new task to Firebase database
  push(ref(database, "tasks"), {
    task: task,
    date: formattedDate,
  })
    .then(() => {
      showToast("success", "Task added successfully!");
    })
    .catch((error) => {
      console.error("Error adding task: ", error);
      showToast("danger", "Error adding task!");
    });
};

// Function to delete a task from Firebase
const deleteTask = (taskId) => {
  remove(ref(database, `tasks/${taskId}`))
    .then(() => {
      showToast("success", "Task deleted successfully!");
      refreshTasks();
    })
    .catch((error) => {
      console.error("Error deleting task: ", error);
      showToast("danger", "Error deleting task!");
    });
};

// Function to edit a task in Firebase
const editTask = (taskId, newTask) => {
  const taskRef = ref(database, `tasks/${taskId}`);
  return update(taskRef, {
    task: newTask,
  })
    .then(() => {
      showToast("success", "Task updated successfully!");
      refreshTasks();
    })
    .catch((error) => {
      console.error("Error updating task: ", error);
      showToast("danger", "Error updating task!");
    });
};

// Function to mark a task as complete
const completeTask = (taskId) => {
  const taskRef = ref(database, `tasks/${taskId}`);
  const completedTaskRef = ref(database, `completedTasks/${taskId}`);

  onValue(taskRef, (snapshot) => {
    const task = snapshot.val();
    if (task) {
      push(completedTaskRef, task)
        .then(() => {
          remove(taskRef)
            .then(() => {
              showToast("success", "Task completed and deleted successfully!");
              refreshTasks();
              refreshCompletedTaskCount();
            })
            .catch((error) => {
              console.error("Error deleting task: ", error);
              showToast("danger", "Error deleting task!");
            });
        })
        .catch((error) => {
          console.error("Error completing task: ", error);
          showToast("danger", "Error completing task!");
        });
    }
  });
};

// Function to refresh tasks after update/delete
const refreshTasks = () => {
  const tasksRef = ref(database, "tasks");
  onValue(tasksRef, (snapshot) => {
    renderTasks(snapshot);
  });
};

// Function to refresh completed task count
const refreshCompletedTaskCount = () => {
  const completedTasksRef = ref(database, "completedTasks");
  onValue(completedTasksRef, (snapshot) => {
    let count = 0;
    snapshot.forEach((childSnapshot) => {
      count++;
    });
    countTaskComplete.textContent = count + " Completed";
  });
};

// Function to show SweetAlert for editing a task
const showEditDialog = (taskId) => {
  Swal.fire({
    title: "Edit Task",
    input: "text",
    inputPlaceholder: "Enter new task",
    inputValue: "",
    showCancelButton: true,
    confirmButtonText: "Save",
    cancelButtonText: "Cancel",
    preConfirm: (newTask) => {
      return editTask(taskId, newTask.trim());
    },
  }).then((result) => {
    if (result.isConfirmed) {
      refreshTasks();
    }
  });
};

// Function to render tasks
const renderTasks = (snapshot) => {
  let activeTaskCount = 0;

  // Clear existing table content and add new rows for tasks
  todoTable.innerHTML = `
    <thead>
      <tr>
        <th>#</th>
        <th colspan="3">Tugas</th>
        <th>Tanggal</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  `;
  let counter = 1;
  snapshot.forEach((childSnapshot) => {
    const task = childSnapshot.val().task;
    const date = childSnapshot.val().date;
    const taskId = childSnapshot.key;
    activeTaskCount++;
    // Create table row for each task
    const taskRow = document.createElement("tr");
    taskRow.innerHTML = `
      <td>${counter}</td>
      <td colspan="3">${task}</td>
      <td>${date}</td>
      <td>
        <button class="btn btn-warning edit-btn" style="font-size: 0.8rem;" data-task-id="${taskId}">
          <i class="fas fa-pencil-alt"></i>
        </button>
        <button class="btn btn-success complete-btn" style="font-size: 0.8rem;" data-task-id="${taskId}">
          <i class="bi bi-check-lg"></i>
        </button>
      </td>
    `;
    // Append row to table body
    todoTable.querySelector("tbody").appendChild(taskRow);
    counter++;
  });

  // Update active task count display
  countTaskActive.textContent = activeTaskCount + " Task";

  // Add event listeners to edit and complete buttons
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const taskId = button.getAttribute("data-task-id");
      showEditDialog(taskId);
    });
  });

  const completeButtons = document.querySelectorAll(".complete-btn");
  completeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const taskId = button.getAttribute("data-task-id");
      completeTask(taskId);
    });
  });
};

// Event listener for form submission to add new task
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = todoInput.value.trim();
  if (task !== "") {
    addTask(task);
    todoInput.value = "";
  }
});

// Initialize task and completed task count
refreshTasks();
refreshCompletedTaskCount();
