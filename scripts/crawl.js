const https = require("https");

let url = "https://m.stock.naver.com/sise/siseList.nhn?menu=market_sum&sosok=0";
let jsondata;

let User_Agent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36 Edg/89.0.774.63";

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
            console.log(jsondata);
            console.log(jsondata.result.itemList);
            console.log(typeof jsondata.result.itemList[1].nm);
        });
    }
);
