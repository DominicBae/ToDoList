let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
let tabs = document.querySelectorAll(".task-tabs div");
let mode = 'all';
let filterList = [];
let underline = document.getElementById("under-line");

// 입력창에 내용이 있을 때만 버튼 활성화
taskInput.addEventListener("input", function() {
    if (taskInput.value.trim() === "") {
        addButton.classList.add("disabled");
    } else {
        addButton.classList.remove("disabled");
    }
});

addButton.addEventListener("click", addTask);

// Enter 키 이벤트 추가
taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function (event) {
        filter(event);
    });
}

taskInput.addEventListener("focus", function () {
    taskInput.value = "";
});

function addTask() {
    if (taskInput.value.trim() === "") {
        alert("할 일을 입력해주세요.");
        return;
    }
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    };
    taskList.push(task);
    taskInput.value = "";
    addButton.classList.add("disabled"); // 입력 후 버튼 비활성화
    render();
}

function render() {
    let list = [];

    if (mode === "all") {
        list = taskList;
    } else if (mode === "ongoing") {
        list = filterList;
    } else if (mode === "done") {
        list = filterList;
    }

    let resultHTML = '';
    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete) {
            resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-arrow-rotate-left fa-xl" style="color: #FFD43B;"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash fa-xl" style="color: #FF0000;"></i></button>
            </div>
        </div>`;
        } else {
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check fa-xl" style="color: #FFD43B;"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash fa-xl" style="color: #FF0000;"></i></button>
            </div>
        </div>`;
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filterTasks();
    render();
}

function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
    filterTasks();
    render();
}

function filter(event) {
    mode = event ? event.target.id : mode;
    filterTasks();

    // 모든 탭에서 selected-tab 클래스 제거
    tabs.forEach(tab => {
        tab.classList.remove("selected-tab");
    });

    // 클릭된 탭에 selected-tab 클래스 추가
    if (event) {
        event.target.classList.add("selected-tab");
    } else {
        document.getElementById(mode).classList.add("selected-tab");
    }

    render();
}

function filterTasks() {
    filterList = [];
    if (mode === "ongoing") {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete === false) {
                filterList.push(taskList[i]);
            }
        }
    } else if (mode === "done") {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete === true) {
                filterList.push(taskList[i]);
            }
        }
    }
}

function randomIDGenerate() {
    return Math.random().toString(36).substr(2, 16);
}

// 초기 상태 설정
filter();
