// Import necessary Firebase modules
import {
  app,
  database,
  auth,
  ref,
  push,
  onValue,
  remove,
  update,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "./firebase.js";

// Function to create a new user
function createUser(name, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Add user data to the database
      const newUser = {
        name: name,
        email: email,
      };
      push(ref(database, "users"), newUser);
    })
    .catch((error) => {
      console.error("Error creating user:", error);
    });
}

// Function to display accounts in real-time
function displayAccounts() {
  const accountListBody = document.getElementById("ListAccount");
  onValue(ref(database, "users"), (snapshot) => {
    accountListBody.innerHTML = "";
    snapshot.forEach((childSnapshot) => {
      const userData = childSnapshot.val();
      const row = `
        <tr>
          <td>${userData.name}</td>
          <td>${userData.email}</td>
        </tr>
      `;
      accountListBody.innerHTML += row;
    });
  });
}

// Function to delete a user
function deleteUser(userId) {
  remove(ref(database, "users/" + userId))
    .then(() => {
      console.log("User deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
}

// Event listener for the form submission
document
  .getElementById("createUserForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("inputName").value;
    const email = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;
    createUser(name, email, password);
    // Clear form fields after submission
    document.getElementById("inputName").value = "";
    document.getElementById("inputEmail").value = "";
    document.getElementById("inputPassword").value = "";
  });

// Call the function to display accounts when the page loads
displayAccounts();
