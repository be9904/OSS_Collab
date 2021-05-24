//const crawl = require("./crawl");
const open = require("open");

let input = process.argv[2];

let price = parseInt(crawl.getPrice(input));

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

console.log(`현재 ${input}의 시세는 ${price}원입니다.`);

if (process.argv[3] === "yes" || process.argv[3] === "y") {
    console.log("Stock Checker 홈페이지에 접솝합니다.");
    open("https://www.naver.com");
} else {
    console.log(
        "잘 생각하셨습니다. 주식에 신경 끄시고 하던 과제나 마저 하시길 바랍니다."
    );
}
