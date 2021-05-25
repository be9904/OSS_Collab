let user = {
    /*
    user_name,
    stock_name,
    stock_amount,
    stock_price,
    total
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
    user_list.forEach(getAvgPrice);
}

window.addEventListener("load", () => {
    loadData();
});

//정보 조회 (버튼 = #search, input _text = #name)
function getIndex(name) {
    let idx = user_list.findIndex((obj) => obj.user_name === name);
    return idx;
}
function getAvgPrice(user) {
    let avg_price = parseInt(user.total) / parseInt(user.stock_amount);
    user["stock_price"] = avg_price;
}

function addSpanChild(div, idx) {
    let target = user_list[idx];
    let child = document.createElement("span");
    child.className = "me-auto";
    child.textContent = `${target["user_name"]}님의 주식 ${target["stock_name"]}의 정보: 현재 가격은 ${target["current_price"]}, ${target["amount"]}주 보유하고 있습니다.`;
    return child;
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

    //html document element 만들고 추가
    let div = document.createElement("div");
    div.className =
        "d-flex-grow-1 align-items-center bg-light rounded-2 p-2 outer";

    let target = user_list[s_idx];
    let child = document.createElement("span");
    child.className = "me-auto";
    child.textContent = `${target["user_name"]}님의 주식 ${target["stock_name"]}의 정보: 현재 가격은 ${target["current_price"]}, ${target["amount"]}주 보유하고 있습니다.`;
    div.appendChild(child);

    let Remove = document.createElement("span");
    Remove.className = "remove";
    Remove.textContent = "삭제";
    div.appendChild(Remove);

    Remove.addEventListener("click", () => {
        div.remove();
    });

    let show_area = document.querySelector("#info");
    show_area.appendChild(div);
    name_box.value = "";
});

let searchEnter = document.querySelector("#name");
searchEnter.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        let name_box = document.querySelector("#name");
        let name = name_box.value;
        if (!name.length) return;
        if (!user_list.some((t) => t["user_name"] === name)) {
            alert("일치하는 데이터가 존재하지 않습니다.");
            clear("#name");
            return;
        }
        let s_idx = getIndex(name);

        //html document element 만들고 추가
        let div = document.createElement("div");
        div.className =
            "d-flex align-items-center bg-light rounded-2 p-2 outer";
        let target = user_list[s_idx];
        let child = document.createElement("span");
        child.className = "me-auto";
        child.textContent = `${target["user_name"]}님의 주식 ${target["stock_name"]}의 정보: 현재 가격은 ${target["current_price"]}, ${target["amount"]}주 보유하고 있습니다.`;
        div.appendChild(child);
        console.log(target);

        let Remove = document.createElement("div");
        Remove.className = "remove";
        Remove.textContent = "삭제";
        div.appendChild(Remove);

        Remove.addEventListener("click", () => {
            div.remove();
        });

        let show_area = document.querySelector("#info");
        show_area.appendChild(div);
        name_box.value = "";
    }
});

////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//정보추가 버튼 - #new_add
function getData(id) {
    let input = document.querySelector(id);
    if (!input.value) return -1;
    let input_value = input.value;
    return input_value;
}

function clear(id) {
    let input = document.querySelector(id);
    input.value = "";
}

let button_newadd = document.querySelector("#new_add");
button_newadd.addEventListener("click", () => {
    let message = "빈칸을 채워주세요";
    let name = getData("#new_name");
    if (name === -1) {
        alert(message);
        return;
    }
    user["user_name"] = name;
    let stname = getData("#new_stname");
    if (stname === -1) {
        alert(message);
        return;
    }
    user["stock_name"] = stname;
    let amount = getData("#stock_amount");
    if (amount === -1) {
        alert(message);
        return;
    }
    user["stock_amount"] = amount;
    let price = getData("#new_stprice");
    if (price === -1) {
        alert(message);
        return;
    }
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

let addEnter = document.querySelector("#new_stprice");
addEnter.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        let message = "빈칸을 채워주세요";
        let name = getData("#new_name");
        if (name === -1) {
            alert(message);
            return;
        }
        user["user_name"] = name;
        let stname = getData("#new_stname");
        if (stname === -1) {
            alert(message);
            return;
        }
        user["stock_name"] = stname;
        let amount = getData("#stock_amount");
        if (amount === -1) {
            alert(message);
            return;
        }
        user["stock_amount"] = amount;
        let price = getData("#new_stprice");
        if (price === -1) {
            alert(message);
            return;
        }
        user["stock_price"] = price;

        user["total"] = parseInt(price) * parseInt(amount);

        user_list.push(user);
        user = {};
        saveInfo();
        clear("#new_name");
        clear("#new_stname");
        clear("#stock_amount");
        clear("#new_stprice");
    }
});

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//정보갱신
function getMarginAmend(user, price, change) {
    change = -change;
    let margin = (price - user["stock_price"]) * change;
    return margin;
}

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
    /*레거시
    if (price === 0) {
        price = parseInt(user["current_price"]);
    } else {
        price = parseInt(user["stock_price"]);
    }
    */

    let t_idx = getIndex(getname);
    let original_amount = parseInt(user_list[t_idx].stock_amount);

    if (change < 0) {
        let margin = getMarginAmend(user_list[t_idx], price, change);
        let string = "매도 결과 ";
        if (margin < 0) {
            string = string + margin + "원 손실이 났습니다.";
        } else {
            string = string + margin + "원 이득을 봤습니다.";
        }
        alert(string);
    } else {
        let message =
            getname +
            "님의 주식 " +
            stname +
            "을(를) " +
            change +
            "개 더 매수했습니다.";
        alert(message);
    }
    //user_list[t_idx].total += change * price; 레거시
    user_list[t_idx].stock_amount = original_amount + change;
    clear("#exist_name");
    clear("#exist_stname");
    clear("#stock_change");
    clear("#exist_stprice");
});

let amendEnter = document.querySelector("#exist_stprice");
amendEnter.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        let message = "빈칸을 채워주세요";
        let getname = getData("#exist_name");
        if (getname === -1) {
            alert(message);
            return;
        }
        let stname = getData("#exist_stname");
        if (stname === -1) {
            alert(message);
            return;
        }
        let change = parseInt(getData("#stock_change"));
        if (change === -1) {
            alert(message);
            return;
        }
        let price = parseInt(getData("#exist_stprice"));
        if (price === -1) {
            alert(message);
            return;
        }
        //매수/매도량에 0을 입력하면 데이터 삭제
        if (change === 0) {
            user_list = user_list.filter((obj) => obj["user_name"] !== getname);
            saveInfo();
            console.log(user_list);
            return;
        }

        let t_idx = getIndex(getname);
        let original_amount = parseInt(user_list[t_idx].stock_amount);

        if (change < 0) {
            let margin = getMarginAmend(user_list[t_idx], price, change);
            let string = "매도 결과 ";
            if (margin < 0) {
                string = string + margin + "원 손실이 났습니다.";
            } else {
                string = string + margin + "원 이득을 봤습니다.";
            }
            alert(string);
        } else {
            let message =
                getname +
                "님의 주식 " +
                stname +
                "을(를) " +
                change +
                "개 더 매수했습니다.";
            alert(message);
        }
        user_list[t_idx].stock_amount = original_amount + change;
        clear("#exist_name");
        clear("#exist_stname");
        clear("#stock_change");
        clear("#exist_stprice");
    }
});
