//랜덤번호 지정
//유저가 번호를 입력하고, go라는 버튼 누름
//유저가 랜덤번호를 맞히면 맞혔습니다.
//랜덤번호 < 유저번호 Down
//랜덤번호 > 유저번호 Up
//Reset 누르면 게임 리셋
//5번의 기회를 다 쓰면 게임 끝 (더이상 추측 불가, 버튼 disable)
//유저가 1~100 범위 밖 숫자를 입력하면 알려줌. 기회 차감 X
//유저가 이미 입력한 숫자를 또 입력하면 알려줌. 기회 차감 X

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5
let gameOver = false;
let chanceArea = document.getElementById("chance-area")
let history = []

playButton.addEventListener("click",play);
resetButton.addEventListener("click", reset)
userInput.addEventListener("focus", function () {userInput.value = "";});

function pickRandomNum() {
    computerNum = Math.floor(Math.random()*100)+1;
    console.log("정답",computerNum);
}

function play() {
    let userValue = userInput.value;

    if (userValue < 1 || userValue > 100) {
        resultArea.textContent = "1과 100 사이 숫자를 입력해 주세요."
        return;
    }

    if (history.includes(userValue)) {
        resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요."
        return
    }

    chances -- ;
    chanceArea.textContent = `남은 기회: ${chances}번`;
    console.log("chance", chances);

    if (userValue < computerNum) {
        resultArea.textContent = "Up!";
    }else if (userValue > computerNum) {
        resultArea.textContent = "Down!";
    }else {
        resultArea.textContent = "정답!";
        gameOver = true;
    }

    history.push(userValue)
    console.log(history)

    if (chances < 1) {
        gameOver = true;
    }

    if (gameOver) {
        playButton.disabled = true;
    }
    
    
}

function reset () {
    //user input이 정리됨
    userInput.value = "";
    //새로운 번호 생성
    pickRandomNum();
    resultArea.textContent = "결과가 나옵니다."
}


pickRandomNum();
