//const crawl = require("./crawl");

let user = {
    /*
    user_name,
    stock_name,
    stock_amount,
    stock_price,
    total,
    current_price,
    margin
    */
};

//localStorage에 저장하는 key도 user_list로 저장
let user_list = [];

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
function getIndex(name) {
    let idx = user_list.findIndex((obj) => obj.user_name === name);
    return idx;
}

function getCurrentPrice(obj) {}

function getMarginSearch(user) {
    let price = parseInt(user["current_price"]);
    let amount = parseInt(user.stock_amount);
    let avg_price = parseInt(user.total) / amount;
    let margin = (price - avg_price) * amount;
    return margin;
}

function addSpanChild(div, idx) {
    let target = user_list[idx];
    let child = document.createElement("span");
    child.className = "me-4";
    child.textContent = `${target["user_name"]}님의 주식 ${target["stock_name"]}의 정보: 현재 가격은 ${target["current_price"]}, 수익금은 ${target["margin"]}입니다.`;
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

    let s_idx = getIndex(name);
    let current_price = getCurrentPrice(user_list[s_idx]);
    user_list[s_idx]["current_price"] = current_price;
    let margin = getMarginSearch(user_list[s_idx]);
    user_list[s_idx]["margin"] = margin;

    //html document element 만들고 추가
    let div = document.createElement("div");
    div.className =
        "d-flex-grow-1 align-items-center bg-light rounded-2 p-2 outer";
    addSpanChild(div, s_idx);

    let show_area = document.querySelector("#info");
    show_area.appendChild(div);

    let buttonRemove = document.createElement("button");
    buttonRemove.className = "btn btn-sm btn-danger";
    buttonRemove.innerHTML = '<i class="bi bi-x"></i>';
    div.appendChild(buttonRemove);

    buttonRemove.addEventListener("click", () => {
        div.remove();
    });
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

function getMarginAmend(user, price, change) {
    change = -change;
    let avg_price = parseInt(user.total) / parseInt(user.stock_amount);
    let margin = (price - avg_price) * change;
    return margin;
}

//정보갱신
let button_existadd = document.querySelector("#exist_add");
button_existadd.addEventListener("click", () => {
    let getname = getData("#exist_name");
    let stname = getData("#exist_stname");
    let change = parseInt(getData("#stock_change"));
    let price = parseInt(getData("#exist_stprice"));

    //매수/매도량에 0을 입력하면 데이터 삭제
    if (change === 0) {
        user_list = user_list.filter((obj) => obj["user_name"] !== getname);
        saveInfo();
        console.log(user_list);
        return;
    }

    if (price === 0) {
        price = parseInt(user["current_price"]);
    } else {
        price = parseInt(user["stock_price"]);
    }

    let t_idx = getIndex(getname);
    let original_amount = parseInt(user_list[t_idx].stock_amount);

    if (change < 0) {
        let margin = getMarginAmend(user_list[t_idx], price, change);
    }
    user_list[t_idx].total += change * price;
    user_list[t_idx].stock_amount = original_amount + change;

    //let open = window.open("./window.html");
});
