const crawl = require("./crawl");

let user = {
    /*
    user_name,
    stock_name,
    stock_amount,
    stock_price,
    */
};
//localStorage에 저장하는 key도 user_list로 저장
let user_list = [];

//load the data
function loadData() {
    let lastData = localStorage.getItem("user_list");
    if (!lastData) return;

    user_list = JSON.parse(lastData);
    //user_list.forEach((t) => user_list.push(t));
}

window.addEventListener("load", () => {
    loadData();
});

//save data
function saveInfo() {
    localStorage.setItem("user_list", JSON.stringify(user_list));
}

/*
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
*/
//정보 조회 (버튼 = #search, input _text = #name)
function selectData(name) {
    let target = user_list.filter((t) => {
        t["user_name"] === name;
    });
    return target;
}

function getMargin(user, current_price) {
    let amount = user["stock_amount"];
    let old_price = user["stock_price"];
    let diff = current_price - old_price;
    return diff * amount;
}

let button_search = document.querySelectorAll("#search");
button_search.addEventlistener("click", () => {
    let name_box = document.querySelectorAll("#name");
    let name = name_box.value;
    if (!name.length) return;

    let data = selectData(name);
    let current_price;
    let margin = getMargin(data, current_price);
    data["margin"] = margin;

    //html document element 만들고 추가
    let div = document.createElement("div");
    div.className = "d-flex-grow-1 align-items-center bg-light rounded-2 p-2";

    let span_name = document.createElement("span");
    span_name.className = "me-1 mb-2 mt-2";
    span_name.textContent = data["user_name"];
    div.appendChild(span_name);

    let span_stname = document.createElement("span");
    span_stname.className = "me-1 mb-2 mt-2";
    span_stname.textContent = data["stock_name"];
    div.appendChild(span_stname);

    let span_amount = document.createElement("span");
    span_amount.className = "me-1 mb-2 mt-2";
    span_amount.textContent = data["stock_amount"];
    div.appendChild(span_amount);

    let span_price = document.createElement("span");
    span_price.className = "me-1 mb-2 mt-2";
    span_price.textContent = data["stock_price"];
    div.appendChild(span_price);

    let span_margin = document.createElement("span");
    span_margin.className = "me-1 mb-2 mt-2";
    span_margin.textContent = data["stock_margin"];
    div.appendChild(span_margin);

    let show_area = document.querySelectorAll("#info");
    show_area.appendChild(div);
});

//정보추가 버튼 - #new_add
let button_add = querySelectorAll("#new_add");
button_add = addEventListener("click", () => {});
//정보갱신
