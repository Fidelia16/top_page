"use strict";

let flag = "pen-flag"; 
let counter = 9;       

const squares = document.getElementsByClassName("square"); // [cite: 623]
const squaresArray = Array.from(squares); // Chuyển sang mảng để dễ xử lý [cite: 650]

// Định nghĩa 8 đường có thể thắng [cite: 724, 778]
function JudgLine(targetArray, idArray) {
    return targetArray.filter(function(e) {
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
    });
}

const lineArray = [
    JudgLine(squaresArray, ["a_1", "a_2", "a_3"]),
    JudgLine(squaresArray, ["b_1", "b_2", "b_3"]),
    JudgLine(squaresArray, ["c_1", "c_2", "c_3"]),
    JudgLine(squaresArray, ["a_1", "b_1", "c_1"]),
    JudgLine(squaresArray, ["a_2", "b_2", "c_2"]),
    JudgLine(squaresArray, ["a_3", "b_3", "c_3"]),
    JudgLine(squaresArray, ["a_1", "b_2", "c_3"]),
    JudgLine(squaresArray, ["a_3", "b_2", "c_1"])
];

let winningLine = null;

const msgtxt1 = '<p class="image"><img src="img/penguins.jpg" width=61px height=61px></p><p class="text">Penguins Attack!</p>';
const msgtxt2 = '<p class="image"><img src="img/whitebear.jpg" width=61px height=61px></p><p class="text">WhiteBear Attack!</p>';
const msgtxt3 = '<p class="image"><img src="img/penguins.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInRight">Penguins Win!!</p>'; // [cite: 793]
const msgtxt4 = '<p class="image"><img src="img/whitebear.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInLeft">WhiteBear Win!!</p>'; // [cite: 794]
const msgtxt5 = '<p class="image"><img src="img/penguins.jpg" width=61px height=61px><img src="img/whitebear.jpg" width=61px height=61px></p><p class="text animate__animated animate__bounceIn">Draw!!</p>'; // [cite: 795]

window.addEventListener("DOMContentLoaded", function() {
    setMessage("pen-turn");
}, false);

// Gán sự kiện click cho từng ô
squaresArray.forEach(square => {
    square.addEventListener("click", () => isSelect(square));
});

function isSelect(selectSquare) {
    if (flag === "pen-flag") {
        selectSquare.classList.add("js-pen-checked");
        selectSquare.classList.add("js-unclickable");
        
        if (isWinner("penguins")) {
            setMessage("pen-win");
            gameOver("penguins"); // Gọi hàm kết thúc cho Penguin thắng
            return;
        }
        
        setMessage("bear-turn");
        flag = "bear-flag"; 
    } else {
        selectSquare.classList.add("js-bear-checked");
        selectSquare.classList.add("js-unclickable");
        
        if (isWinner("bear")) {
            setMessage("bear-win");
            gameOver("bear"); // Gọi hàm kết thúc cho Bear thắng
            return;
        }
        
        setMessage("pen-turn");
        flag = "pen-flag"; 
    }

    counter--;
    if (counter === 0) {
        setMessage("draw");
        gameOver("draw"); // Gọi hàm kết thúc khi hòa
    }
}

function isWinner(symbol) {
    const result = lineArray.some(function (line) {
        const subResult = line.every(function (square) {
            if (symbol === "penguins") return square.classList.contains("js-pen-checked"); // [cite: 1026]
            if (symbol === "bear") return square.classList.contains("js-bear-checked"); // [cite: 1063]
        });
        if (subResult) winningLine = line;
        return subResult;
    });
    return result;
}

function setMessage(id) {
    let msgtext = document.getElementById("msgtext");
    switch (id) {
        case "pen-turn": msgtext.innerHTML = msgtxt1; break;
        case "bear-turn": msgtext.innerHTML = msgtxt2; break;
        case "pen-win": msgtext.innerHTML = msgtxt3; break; // [cite: 1130]
        case "bear-win": msgtext.innerHTML = msgtxt4; break; // [cite: 1134]
        case "draw": msgtext.innerHTML = msgtxt5; break; // [cite: 1137]
        default: msgtext.innerHTML = msgtxt1;
    }
}
function gameOver(status) {
    squaresArray.forEach(function (square) {
        square.classList.add("js-unclickable");
    });

    if (status === "penguins") {
        if (winningLine) {
            winningLine.forEach(function (square) {
                square.classList.add("js-pen_highLight");
            });
        }
        $(document).snowfall({
            flakeColor: "rgb(255,240,245)", maxSpeed: 3, minSpeed: 1, maxSize: 20, minSize: 10, round: true
        });
    } else if (status === "bear") {
        if (winningLine) {
            winningLine.forEach(function (square) {
                square.classList.add("js-bear_highLight");
            });
        }
        $(document).snowfall({
            flakeColor: "rgb(175,238,238)", maxSpeed: 3, minSpeed: 1, maxSize: 20, minSize: 10, round: true
        });
    }
}