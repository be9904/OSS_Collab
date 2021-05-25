#!/usr/bin/env node

const https = require("https");

let url = "https://m.stock.naver.com/sise/siseList.nhn?menu=market_sum&sosok=0";
let jsondata;

let User_Agent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36 Edg/89.0.774.63";

// 주식 종목 검색
function search(input, data, length) {
    for (let i = 0; i < length; i++) {
        if (input === data.result.itemList[i].nm) {
            // console.log("Match found");
            return i;
        }
    }
    // console.log("Match not found");
    return false;
}

// 시세 표기 시 천 단위에서 콤마로 끊어주는 함수
function addComma(price) {
    let over = parseInt(price / 1000);
    let below = "";
    let i;
    let n = 10;
    for (i = 0; i < 3; i++) {
        let digit;
        digit = price % n;
        if (n > 10) {
            let m = n / 10;
            digit = parseInt(digit / m);
        }
        below = digit + below;
        n *= 10;
    }
    price = over + "," + below;
    return price;
}

// 시가 총액 조단위 표기
function convertMarketCapJ(input) {
    let j;
    j = parseInt(input / 10000);
    return j;
}

// 시가 총액 억단위 표기
function convertMarketCapE(input) {
    let e;
    e = addComma(input);
    e = e.slice(e.length - 5, e.length);
    return e;
}

// 콘솔에 보기 쉽게 출력해주는 함수
function fancyPrint(obj, price, index) {
    let change = obj.result.itemList[index].cr;
    if (obj.result.itemList[index].cr > 0) {
        change = "+" + change;
    }
    console.log("\n---------------------------------------------------");
    console.log(` 종목: ${obj.result.itemList[index].nm}`);
    console.log("---------------------------------------------------");
    console.log(` 시세: ${price} 원`);
    console.log("---------------------------------------------------");
    console.log(` 등락률: ${change} %`);
    console.log("---------------------------------------------------");
    console.log(
        ` 시가총액: ${convertMarketCapJ(
            obj.result.itemList[index].mks
        )}조 ${convertMarketCapE(obj.result.itemList[index].mks)} 억원`
    );
    console.log("---------------------------------------------------\n");
}

https.get(
    url,
    {
        headers: {
            "User-Agent": User_Agent,
        },
    },
    (res) => {
        let data = "";

        res.on("data", (d) => {
            data += d;
        });

        res.on("end", () => {
            let expression = new RegExp("var jsonData = {.*};");
            let jsonarr = expression.exec(data);
            let text = jsonarr[0].split("=");

            jsondata = JSON.parse(text[1].trim().slice(0, -1));
            //console.log(jsondata.result.itemList);

            /////////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////////
            /////////////////////////////////////////////////////////////////////////////////////////

            const open = require("open");

            let input = process.argv[2];
            if (process.argv[2] === "list") {
                console.log("\n조회 가능한 종목 목록입니다.\n");
                for (let i = 0; i < jsondata.result.itemList.length; i++) {
                    console.log(jsondata.result.itemList[i].nm);
                }
            } else {
                // 종목 검색
                let index = search(
                    input,
                    jsondata,
                    jsondata.result.itemList.length
                );

                // 일치하는 결과 있을 때
                if (index !== false) {
                    let price = jsondata.result.itemList[index].nv;
                    price = addComma(price); // 시세에 콤마 표시

                    // 결과 출력
                    fancyPrint(jsondata, price, index);

                    // 사이트 접속 o
                    if (process.argv[3] === "yes" || process.argv[3] === "y") {
                        console.log(
                            "Stock Checker 홈페이지에 접속합니다. 잠시만 기다려주세요...\n"
                        );
                        setTimeout(() => {
                            open("index.html"); // github pages link goes here
                        }, 3000);
                    }

                    // 사이트 접속 x
                    else {
                        console.log(
                            "잘 생각하셨습니다. 주식에 신경 끄시고 하던 과제나 마저 하시길 바랍니다.\n"
                        );
                    }
                }

                //일치하는 결과 없을 때
                else {
                    console.log(
                        "\n검색하신 주식은 현재 찾을 수 없습니다. 종목 이름을 다시 확인해주세요.\n"
                    );
                }
            }
        });
    }
);
