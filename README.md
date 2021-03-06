# A brief overview

여러분들은 주식투자를 하면서 변동하는 주가에 일희일비 하고 있지 않으신가요? 혹은 기업의 가치를 보고 장기투자를 하겠다는 마음을 먹었지만 실상은 하던 과제를 제쳐두고 단타 치기에 몰두하고 있진 않은가요? Stock checker는 시시때때로 주식 차트만 바라보며 시간낭비 하는 당신이 장기투자를 할 수 있도록 도와줄 것입니다.

누구나 자신이 투자한 종목의 시세변동이 궁금할 것입니다. 다만 궁금증을 참지 못해 주식차트를 보다 보면 어느 순간 보유한 종목을 매도하거나 다른 종목을 매수하고 있는 자신을 보게 됩니다. Stock checker는 증권 사이트에 들어가지 않고도 자신이 보유하고 있는 주식의 시세와 사용자의 수익 정보와 같은 간단한 정보만 보여줌으로써 여러분들의 궁금증을 해소시켜 줄 것입니다. 또한 여러분들이 Stock checker앱에 접속한 시간을 표기하고 제한시간이 지날 경우 자동으로 닫힘으로써 당신이 시간낭비를 하지 않도록 도와줄 것입니다.
<br>
Stock checker는 주식투자를 하고 있는 소프트웨어학과 학생들을 위해 최적화되어 있습니다. 소프트웨어학과 학생 여러분, 이젠 Stock checker를 활용하여 주식에 시간 낭비 하지 마시고 마음껏 여러분들의 과제에 집중하시기 바랍니다.

<img src="https://user-images.githubusercontent.com/65922112/119496019-04539100-bd9e-11eb-9372-4268012e91c3.png" width="600">

### Quick Start

```JS
npm install --save open
npm install -g oss-stockchecker
stock <stockName> <yes/no>
```

# Links to resources

-   네이버 증권: https://m.stock.naver.com/sise/siseList.nhn?menu=market_sum&sosok=0
-   npm open: https://www.npmjs.com/package/open

# Installation

### 1. npm open

웹 브라우저를 열기 위한 npm 모듈입니다.

```JS
npm install --save open
```

# API reference

-   npm open
-   https

# Examples

Stock checker는 크게 두 부분으로 나뉩니다. 하나는 Command Line Interface이고, 나머지 하나는 Web app입니다.
우선 CLI 환경에서 Stock Checker를 이용하기 위해서는 아래의 명령어를 따라 치시면 됩니다.

```JS
npm install --save open
npm install -g oss-stockchecker
stock <stockName> <yes/no>
```

<img src="https://user-images.githubusercontent.com/65922112/119500964-5814a900-bda3-11eb-9905-f283c8271368.png" width="400">

프로그램을 실행하면 해당 주식의 시세를 알아낼 수 있습니다. 여기서 yes를 입력하게 되면 Stock checker Web app이 열립니다.

조회하고 싶은 주식 종목의 목록을 보기 위해서는 다음의 명령어를 실행해주시면 됩니다.

```JS
stock list
```

<img src="https://user-images.githubusercontent.com/65922112/119500796-256ab080-bda3-11eb-9ca3-4ef70dcf21c7.png" width="400">

<br>
Web app에 접속하면 사용자의 정보조회, 정보추가, 그리고 정보갱신을 할 수 있습니다.

### 1. 정보조회

<!--맨위 search부분 사진-->
<img src="https://user-images.githubusercontent.com/65922112/119497296-5ea12180-bd9f-11eb-93d8-e0e4378e2031.png" width="600">

위의 input box에 사용자의 이름을 입력하면 localStorage에 저장된 정보를 조회하여 사용자가 보유한 주식 종목명, 시세, 수익을 보여줍니다. 삭제를 누르면 조회된 정보 기록을 삭제할 수 있습니다.

### 2. 정보추가

<!--정보추가 부분 사진-->
<img src="https://user-images.githubusercontent.com/65922112/119497420-84c6c180-bd9f-11eb-9c4c-83f53234229a.png" width="400">

처음 Stock checker를 이용하는 사용자라면 정보추가를 먼저 해줘야 합니다. 위의 사진에 보이는 input box에 내용을 입력하고 추가를 하면 됩니다. 빈 칸을 다 채워줘야 하며 다 채우지 않을 시에는 정보가 추가되지 않습니다.

### 3. 정보갱신

<!--정보갱신 부분사진-->
<img src="https://user-images.githubusercontent.com/65922112/119497494-9b6d1880-bd9f-11eb-93a5-bdd3f4e4f90c.png" width="400">

<img src="https://user-images.githubusercontent.com/65922112/119497520-a627ad80-bd9f-11eb-95fc-793845db2a28.png" width="500">

기존 사용자의 정보를 변경하고자 할 경우 위의 내용을 입력하고 추가하면 됩니다. 예를 들어 홍길동 사용자가 삼성전자 주식을 5주 추가로 매수했다면 차례대로 홍길동, 삼성전자, 5, 84000을 입력하면 되고, 반대로 5주를 매도했다면 홍길동, 삼성전자, -5, 87000을 입력하면 됩니다. 사용자의 정보를 삭제하고 싶을 때는 이름을 입력하고 '추가 매수량 또는 매도량'을 입력하는 부분에 0을 넣어주면 됩니다.

#### 사진 1. 기존 정보 조회

<img src="https://user-images.githubusercontent.com/65922112/119497963-16ceca00-bda0-11eb-9d9e-b6eef03a355f.png" width="700">

<!--저장되어 있는 정보를 조회한 사진-->

#### 사진 2. 정보 삭제 후 다시 정보 조회

<img src="https://user-images.githubusercontent.com/65922112/119498030-29490380-bda0-11eb-8018-16dd056e5c9d.png" width="400">

<img src="https://user-images.githubusercontent.com/65922112/119498144-441b7800-bda0-11eb-8b1f-6dc2f797ee1b.png" width="700">
<!--삭제 후 정보를 조회한 사진-->

### 시연 연상 링크

https://youtu.be/OybW0K935mY

# Release

## oss-stockchecker 1.0.9

# How to contribute

[Stock Checker Github Repository](https://github.com/be9904/OSS_Collab/issues)로 들어와서 issue를 새로 만들거나 기존에 생성된 issue에 comment를 달아주시면 됩니다.
혹은 아래의 이메일로 연락을 주시면 됩니다.

-   vldpfh321@gmail.com
-   be9904@gmail.com
-   jsjsam412@gmail.com

# License

MIT License

Copyright (c) 2021 be9904

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

# Code of Conduct

-   우리는 모든 오픈소스 참여자들이 존중되는 분위기를 만들어야 한다.
-   우리는 모욕적인 행동, 경멸적인 농담이나 언급, 원치 않는 성적인 접근과 같이 다른 사람에게 공격적이거나 적대적인 근무환경을 조성하고 모욕적인 발언으로 해를 가하는 그 어떠한 말이나 행동을 용인하지 않는다.
-   주류 의견에 배치되는 의견도 환영하며 우리는 그 의견을 존중할 것이다. 또한 참여자들의 피드백을 감사히 받아들일 것이다.
-   불만을 얘기하는 사람에게 불합리한 조치는 없을 것이며, 그 어떠한 보복도 엄격하게 금지한다.
