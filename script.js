let tasks = [];

// Add Task
document.getElementById("addButton").addEventListener("click", function () {

    let input = document.getElementById("taskInput");
    let task = input.value;

    if (task === "") {
        alert("Enter a task");
        return;
    }

    tasks.push({
        id: Date.now(),
        title: task,
        completed: false
    });

    input.value = "";
    displayTasks();
});


// Display Tasks
function displayTasks() {

    let list = document.getElementById("taskList");

    list.innerHTML = "";

    tasks.map(function (task) {

        list.innerHTML += `
            <li class="task">

                <span class="${task.completed ? 'completed' : ''}">
                    ${task.title}
                </span>

                <button onclick="completeTask(${task.id})">
                    ${task.completed ? "Completed" : "Complete"}
                </button>

                <button onclick="deleteTask(${task.id})">
                    Delete
                </button>

            </li>
        `;
    });

    // filter() - count pending tasks
    let pending = tasks.filter(function (task) {
        return task.completed === false;
    });

    // reduce() - count completed tasks
    let completed = tasks.reduce(function (count, task) {
        return count + (task.completed ? 1 : 0);
    }, 0);

    document.getElementById("totalTasks").innerText = tasks.length;
    document.getElementById("pendingTasks").innerText = pending.length;
    document.getElementById("completedTasks").innerText = completed;
}


// Complete Task
function completeTask(id) {

    tasks.map(function (task) {

        if (task.id === id) {
            task.completed = true;
        }

    });

    displayTasks();
}


// Delete Task
function deleteTask(id) {

    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });

    displayTasks();
}


// Load Sample Tasks using fetch()
document.getElementById("loadButton").addEventListener("click", function () {

    fetch("https://jsonplaceholder.typicode.com/todos?_limit=3")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            tasks = data.map(function (item, index) {

                let sampleTasks = [
                    "Study DSA",
                    "Complete Web Technology Assignment",
                    "Practice JavaScript"
                ];

                return {
                    id: item.id,
                    title: sampleTasks[index],
                    completed: false
                };

            });

            displayTasks();
        });
});


// Display empty task list initially
displayTasks();