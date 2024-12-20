// simple js script
document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addBtn = document.getElementById("add-btn");
    const ulElement = document.querySelector("ul");
    const hrLine = document.getElementById("hr-line");
    const showButton = document.getElementById("show-btn");

    let taskCounter = 0;
    

    // Add tasks
    addBtn.addEventListener("click", () => {
        if (taskInput.value === "") {
        console.log("Cannot add an empty task!");
        return;
        }

        // Create and append a new task
        createTaskElement(taskInput.value);
        taskCounter++;
        taskInput.value = ""; // Clear input after adding
    });

    // Function to create and append a task <li>
    function createTaskElement(taskText) {
        // Create <li>
        const li = document.createElement("li");
        li.className = "flex items-center justify-between w-full text-white mb-1";

        // Create <span>
        const span = document.createElement("span");
        span.textContent = taskText;

        // Create <button>
        const deleteBtn = document.createElement("button");
        deleteBtn.className =
        "bg-red-600 text-white text-xs px-2 py-1 rounded-md hover:bg-red-700";
        deleteBtn.textContent = "Delete";
        checkList()

        // Add click event to delete the task
        deleteBtn.addEventListener("click", () => {
            ulElement.removeChild(li); // Remove the <li> from the <ul>
            taskCounter--;
        });

        // Append <span> and <button> to <li>
        li.appendChild(span);
        li.appendChild(deleteBtn);

        // Append <li> to the <ul>
        ulElement.appendChild(li);

        
        
    }

    function checkList() {
        if (taskCounter > 0) {
            showButton.classList.remove("hidden");
            hrLine.classList.remove("hidden");
        }

        
    }
    
    
});
