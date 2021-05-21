let user = {
    user_name,
    stock_name,
    stock_amount,
    stock_price,
};

let users = [];

let new_add = querySelectorAll("#new_add");
let exist_add = querySelectorAll("#");

function addToList(task) {
    let div = document.createElement("div");
    div.className = "";

    let span = document.createElement("span");
    span.className = "";
    span.textContent = task.text;
    div.appendChild(span);

    if (task.type === Type.Todo) {
        let buttonDone = document.createElement("button");
        buttonDone.className = "btn btn-sm btn-success me-1";
        buttonDone.innerHTML = '<i class="bi bi-check"></i>';
        div.appendChild(buttonDone);

        buttonDone.addEventListener("click", () => {
            /* TODO */
            let move = document.querySelector("#done-list");
            buttonDone.remove();
            move.appendChild(div);
            task.type = Type.Done;
            saveTasks();
        });
    }

    let buttonRemove = document.createElement("button");
    buttonRemove.className = "btn btn-sm btn-danger";
    buttonRemove.innerHTML = '<i class="bi bi-x"></i>';
    div.appendChild(buttonRemove);

    buttonRemove.addEventListener("click", () => {
        div.remove();
        tasks = tasks.filter((t) => t !== task);
        saveTasks();
    });

    let list = document.querySelector(
        task.type === Type.Todo ? "#todo-list" : "#done-list"
    );
    list.appendChild(div);
}

//정보 조회 버튼 = #search, input _text = #name
let button_search = querySelectorAll("#search");
button_search.addEventlistener("click", () => {
    let search = querySelectorAll("#name");
    let name_search = search.value;

    if (!name_search.length) return;
});

//정보추가 버튼 - #new_add
let button_add = querySelectorAll("#new_add");
button_add = addEventListener("click", () => {});
//정보갱신

//load the data
window.addEventListener("load", () => {
    loadData();
});

function loadData() {
    let recentInfo = localStorage.getItem("users");
    if (!recentInfo.length) return;

    users = JSON.parse(recentInfo);
    users.forEach(/*리스트에 추가하는 함수*/);
}

//save data
function saveInfo() {
    localStorage.setItem();
}
