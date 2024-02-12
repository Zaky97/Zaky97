// Firebase
import {
  app,
  database,
  ref,
  push,
  onValue,
  remove,
  update,
} from "./firebase.js";

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoTable = document.getElementById("todo-table");

// Function to show SweetAlert for successful task update
const showSuccessAlert = () => {
  Swal.fire({
    icon: "success",
    title: "Success!",
    text: "Task updated successfully!",
  });
};

// Function to show SweetAlert for error task update
const showErrorAlert = () => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Error updating task!",
  });
};

// Function to add a new task to Firebase
// Function to add a new task to Firebase
const addTask = (task) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString().slice(-2); // Get last 2 digits of the year
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because January is 0
  const day = currentDate.getDate().toString().padStart(2, "0");
  const formattedDate = `${day}-${month}-${year}`;

  push(ref(database, "tasks"), {
    task: task,
    date: formattedDate,
    completed: false,
  });
};

// Function to delete a task from Firebase
const deleteTask = (taskId) => {
  remove(ref(database, `tasks/${taskId}`))
    .then(() => {
      // Show success alert after task is deleted
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Your task has been deleted.",
      });
      // Refresh the tasks after successful deletion
      refreshTasks();
    })
    .catch((error) => {
      console.error("Error deleting task: ", error);
      showErrorAlert();
    });
};

// Function to edit a task in Firebase
const editTask = (taskId, newTask) => {
  const taskRef = ref(database, `tasks/${taskId}`);
  return update(taskRef, {
    task: newTask,
  })
    .then(() => {
      console.log("Task updated successfully!");
      showSuccessAlert();
      return Promise.resolve(); // Resolve the promise for SweetAlert preConfirm
    })
    .catch((error) => {
      console.error("Error updating task: ", error);
      showErrorAlert();
      return Promise.reject(); // Reject the promise for SweetAlert preConfirm
    });
};

// Function to refresh tasks after update/delete
const refreshTasks = () => {
  const tasksRef = ref(database, "tasks");
  onValue(tasksRef, (snapshot) => {
    renderTasks(snapshot);
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
      refreshTasks(); // Refresh tasks after successful edit
    }
  });
};

// Function to render tasks
const renderTasks = (snapshot) => {
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
    const taskRow = document.createElement("tr");
    taskRow.innerHTML = `
      <td>${counter}</td>
      <td colspan="3">${task}</td>
      <td>${date}</td>
      <td>
        <button class="btn btn-success edit-btn" style="font-size: 0.8rem;" data-task-id="${taskId}">
          <i class="fas fa-pencil-alt"></i>
        </button>
        <button class="btn btn-danger delete-btn" style="font-size: 0.8rem;" data-task-id="${taskId}">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    `;
    todoTable.querySelector("tbody").appendChild(taskRow);
    counter++;
  });

  // Add event listener to edit buttons
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const taskId = button.getAttribute("data-task-id");
      showEditDialog(taskId);
    });
  });

  // Add event listener to delete buttons
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const taskId = button.getAttribute("data-task-id");
      // Show confirmation dialog before deleting task
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this task!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          deleteTask(taskId);
        }
      });
    });
  });
};

// Event listener for form submission
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = todoInput.value.trim();
  if (task !== "") {
    addTask(task);
    todoInput.value = "";
  }
});

// Firebase event listener for fetching tasks
onValue(ref(database, "tasks"), (snapshot) => {
  renderTasks(snapshot);
});
