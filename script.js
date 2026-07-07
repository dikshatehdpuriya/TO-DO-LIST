const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

window.onload = loadTasks;

addTask.addEventListener("click", addNewTask);

taskInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addNewTask();
    }
});

function addNewTask(){

    const taskText = taskInput.value.trim();

    if(taskText === ""){
        alert("Please enter a task!");
        return;
    }

    createTask(taskText);

    saveTask(taskText);

    taskInput.value="";
}

function createTask(taskText, completed=false){

    const li = document.createElement("li");
    li.className="task";

    if(completed){
        li.classList.add("completed");
    }

    li.innerHTML=`
        <span>${taskText}</span>

        <div class="icons">
            <i class="fa-solid fa-check"></i>
            <i class="fa-solid fa-trash"></i>
        </div>
    `;

    li.querySelector(".fa-check").addEventListener("click",function(){

        li.classList.toggle("completed");

        updateStorage();
    });

    li.querySelector(".fa-trash").addEventListener("click",function(){

        li.remove();

        updateStorage();
    });

    taskList.appendChild(li);
}

function saveTask(task){

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({
        text:task,
        completed:false
    });

    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function updateStorage(){

    const tasks=[];

    document.querySelectorAll(".task").forEach(task=>{

        tasks.push({
            text:task.querySelector("span").innerText,
            completed:task.classList.contains("completed")
        });

    });

    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function loadTasks(){

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task=>{

        createTask(task.text,task.completed);

    });

}