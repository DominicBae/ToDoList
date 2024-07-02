// 유저가 값을 입력한다
// +버튼을 클릭하면 할 일이 추가된다
// check 버튼을 누르면 할 일이 끝나면서 밑줄이 간다
// 1. check 버튼을 클릭하는 순간 false를 true로
// 2. true이면 끝난 걸로 간주하고 밑줄 보여주기
// 3. false이면 안 끝난걸로 간주하고 그대로
// delete 버튼을 누르면 할 일이 삭제된다
// 진행 중 끝남 탭을 누르면 언더바가 이동한다
// 끝남탭은 끝난 아이템만 진행중탭은 진행중인 아이템만 이동한다

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];

addButton.addEventListener("click", addTask)

function addTask() {
    let taskContent = taskInput.value;
    taskList.push(taskContent);
    console.log(taskList);
    render();
}

function render() {
    let resultHTML = '';
    for (let i = 0; i < taskList.length; i++) {
        resultHTML += `<div class="task">
                    <div>${taskList[i]}</div>
                    <div>
                        <button>Check</button>
                        <button>Delete</button>
                    </div>
                </div>`
    }
    document.getElementById("task-board").innerHTML = resultHTML;
}