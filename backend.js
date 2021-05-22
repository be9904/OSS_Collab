//const crawl = require("./crawl");

let user = {
    /*
    user_name,
    stock_list
    */
};
let stock = {
    /*
    stock_name,
    stock_amount,
    stock_price,
    */
};
//localStorage에 저장하는 key도 user_list로 저장
let user_list = [];
let stock_list = [];

//save data
function saveInfo() {
    localStorage.setItem("user_list", JSON.stringify(user_list));
}

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

//정보 조회 (버튼 = #search, input _text = #name)
function selectData(name) {
    let target = user_list.filter((t) => {
        t["user_name"] === name;
    });
    return target;
}

//한 사람당 여러 주식 갖도록 바꾸면 이 함수도 변경해야 함
function getMargin(user, current_price) {
    let amount = parseInt(user["stock_amount"]);
    let old_price = parseInt(user["stock_price"]);
    let diff = current_price - old_price;
    return diff * amount;
}

function addSpanChild(div, user_key) {
    let child = document.createElement("span");
    child.className = "me-1 mb-2 mt-2";
    child.textContent = data[user_key];
    div.appendChild(child);
}

let button_search = document.querySelector("#search");
button_search.addEventListener("click", () => {
    let name_box = document.querySelector("#name");
    let name = name_box.value;
    if (!name.length) return;
    if (!user_list.some((t) => t["user_name"] === name)) {
        alert("일치하는 데이터가 존재하지 않습니다.");
        clear("#name");
        return;
    }

    let data = selectData(name);
    let current_price;
    //let margin = getMargin(data, current_price);
    //data["margin"] = margin;

    //html document element 만들고 추가
    let div = document.createElement("div");
    div.className = "d-flex-grow-1 align-items-center bg-light rounded-2 p-2";

    addSpanChild(div, "user_name");
    addSpanChild(div, "stock_name");
    addSpanChild(div, "stock_amount");
    addSpanChild(div, "stock_price");
    addSpanChild(div, "stock_margin");

    let show_area = document.querySelector("#info");
    show_area.appendChild(div);
});

//정보추가 버튼 - #new_add
function getData(id) {
    let input = document.querySelector(id);
    let input_value = input.value;
    return input_value;
}

function clear(id) {
    let input = document.querySelector(id);
    input.value = "";
}

let button_newadd = document.querySelector("#new_add");
button_newadd.addEventListener("click", () => {
    let name = getData("#new_name");
    user["user_name"] = name;
    let stname = getData("#new_stname");
    user["stock_name"] = stname;
    let amount = getData("#stock_amount");
    user["stock_amount"] = amount;
    let price = getData("#new_stprice");
    user["stock_price"] = price;

    user["total"] = parseInt(price) * parseInt(amount);

    user_list.push(user);
    user = {};
    saveInfo();
    clear("#new_name");
    clear("#new_stname");
    clear("#stock_amount");
    clear("#new_stprice");
    //console.log(user_list);
});

//정보갱신
let button_existadd = document.querySelector("#exist_add");
button_existadd.addEventListener("click", () => {
    let name = getData("#exist_name");
    let stname = getData("#exist_stname");
    let change = parseInt(getData("#stock_change"));
    let price = parseInt(getData("#exist_stprice"));

    let t_idx = user_list.findIndex((obj) => obj.user_name === name);
    let original_amount = parseInt(user_list[t_idx].stock_amount);

    if (change < 0) {
        let avg_price = user_list[t_idx].total / user_list[t_idx].stock_amount;
        let margin = (price - avg_price) * change;
    } else {
        user_list[t_idx].total += change * price;
    }
    user_list[t_idx].stock_amount = original_amount + change;

    let open = window.open("./window.html");
});
