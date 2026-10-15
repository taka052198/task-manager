let tasks=[];
let editingTask=null;

const addButton = document.getElementById("addButton");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const searchButton =document.getElementById("searchButton");
const searchInput=document.getElementById("searchInput");
const resetButton =document.getElementById("resetButton");

const savedTasks =localStorage.getItem("tasks");
if(savedTasks!==null){
    tasks=JSON.parse(savedTasks);
}

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function renderTasks(){
    const keyword=searchInput.value.trim();
    taskList.textContent="";

    tasks.forEach(function(task){
        if(task.text.includes(keyword)){
            createTask(task);
        }
    });
}

function createTask(task){
     const li = document.createElement("li");
    li.textContent = task.text;

    if(task.completed===true){
        li.classList.add("completed");
    }

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    const completeButton = document.createElement("button");
    completeButton.textContent = "完了";

    completeButton.addEventListener("click", function() {
        li.classList.toggle("completed");
        task.completed=!task.completed;

        localStorage.setItem("tasks",JSON.stringify(tasks));
    });

    

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";

    deleteButton.addEventListener("click", function() {
        const index=tasks.indexOf(task);
        tasks.splice(index,1);

        localStorage.setItem("tasks",JSON.stringify(tasks));
        li.remove();
    });

    const editButton =document.createElement("button");
    editButton.textContent="編集";

    editButton.addEventListener("click",function(){
        editingTask=task;
        taskInput.value=task.text;
    });

    buttonContainer.appendChild(completeButton);
    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(editButton);

    li.appendChild(buttonContainer);
    taskList.appendChild(li);
}

tasks.forEach(function(task){
        createTask(task);
    });

addButton.addEventListener("click", function() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    if(editingTask!==null){
        editingTask.text=taskText;
        saveTasks();

       renderTasks();

        editingTask=null;
    }else{
         const task={
        text:taskText,
        completed:false
    };

    tasks.push(task);
    saveTasks();

    renderTasks();

    }

   
    taskInput.value = "";
});

searchButton.addEventListener("click",function(){
    renderTasks();
});

resetButton.addEventListener("click",function(){
    searchInput.value="";
    renderTasks();
});

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addButton.click();
    }
});