// Reference to HTML element
const inputBox= document.getElementById("input-box");
const listContainer= document.getElementById("list-container");
const itemCountElement = document.getElementById("item-count");
const clearAllLink = document.getElementById("clearAll");

// Function to add a new task
function addTask() {
    //Get the trimmed task text from the input box
    const taskText = inputBox.value.trim();

    // Check if the input is empty
    if(inputBox.value === ""){
        alert("You have to write something!");
    }
    else{
        // Create a new list item
        let li = document.createElement("li");
        li.textContent = taskText;

        //Append the task to the list container
        listContainer.appendChild(li);

        //Create a delete button for the task
        let span=document.createElement("span");
        span.innerHTML="\u00d7";
        li.appendChild(span);

        // Clear input box and update task count
        inputBox.value = "";
        updateTaskCount();
    }
    //Save the updated task list
    saveData();
}

//Function to remove tasks when clicked on x icon in each task
function clearAllTasks() {
    listContainer.innerHTML = "";
    updateTaskCount();
}

//Function to get all saved data from local storage
function updateTaskCount() {
    const taskCount = listContainer.getElementsByTagName("li").length;
    itemCountElement.textContent = taskCount;
}

// Add event listener to the list container 
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } 
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

//Function to save task data to local storage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

//Function to show saved tasks on page load
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

//Add event listener to the "Clear All" link
clearAllLink.addEventListener("click", clearAllTasks);
//Initial update of the task count display
updateTaskCount();