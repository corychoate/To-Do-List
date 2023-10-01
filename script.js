// Get the input box and list container elements from the HTML
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list");
let tasks = [];

// Function to add a task
function addTask() {
    // Get the task text from the input box
    const taskText = inputBox.value.trim(); 
    if (taskText === "") { 
        // Alert the user if the input is empty
        alert("You didn't enter a task!");
        return;
    }


    const task = {
        text: taskText,
        completed: false
    };

    tasks.push(task);
    displayTasks();
    saveData();


    //delete the text inside of the input box after the task is added
    inputBox.value = "";
}

// Function to display tasks
function displayTasks() {
    // Clear the list container after a task is entered into the list
    listContainer.innerHTML = "";

    // Iterate through each task in the tasks array
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerText = task.text;
        li.classList.toggle("checked", task.completed);

        const span = document.createElement("span");
        span.innerHTML = "\u00d7";

        li.appendChild(span);
        listContainer.appendChild(li);

        // Event listener for when the list item is clicked
        li.addEventListener("click", () => {
            task.completed = !task.completed;
            displayTasks();
            saveData();
        });

        // Event listener for when the '×' (delete) button is clicked
        span.addEventListener("click", (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            displayTasks();
            saveData();
        });
    });
    // clear the input box after the task is added
}

// Function to save tasks to local storage
function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadData() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        displayTasks();
    }
}

// Load tasks from local storage on page load
loadData();