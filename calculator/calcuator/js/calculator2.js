'use strict';

// ワークエリア
var wkFirst = "1" //初回FLG
var wkTotal = 0;  //合計
var wkInput = ""; //現在クリックされたボタンの値
var wkCalc = "+"; //初期値 "+"
var wkBefore = "1"; //１つ前の入力 … 0:数値  1:演算子

// ページ上の要素（Element)を参照
const elementcalcLog = document.getElementById("calcLog");
const elementResult = document.getElementById("result");
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const num3 = document.getElementById("num3");
const num4 = document.getElementById("num4");
const num5 = document.getElementById("num5");
const num6 = document.getElementById("num6");
const num7 = document.getElementById("num7");
const num8 = document.getElementById("num8");
const num9 = document.getElementById("num9");
const num0 = document.getElementById("num0");
const elementAdd = document.getElementById("add");
const elementSub = document.getElementById("sub");
const elementMult = document.getElementById("mult");
const elementDiv = document.getElementById("div");
const elementEqual = document.getElementById("equal");
const elementCancel = document.getElementById("cancel");

const elementShowMore = document.getElementById("showMore");

elementResult.innerHTML = 0;

// イベントを登録
function num(btn) {
  btn.addEventListener("click", function () {
    edit(btn.textContent);
  })
}
let nums = [num0, num1, num2, num3, num4, num5, num6, num7, num8, num9];
for (let i = 0; i < nums.length; i++) {
  num(nums[i]);
}
function keydownEvent(event) {
  if (event.key === "1") edit("1");
  if (event.key === "2") edit("2");
  if (event.key === "3") edit("3");
  if (event.key === "4") edit("4");
  if (event.key === "5") edit("5");
  if (event.key === "6") edit("6");
  if (event.key === "7") edit("7");
  if (event.key === "8") edit("8");
  if (event.key === "9") edit("9");
  if (event.key === "0") edit("0");

  if (event.key === "+") update("+");
  if (event.key === "-") update("-");
  if (event.key === "*") update("*");
  if (event.key === "/") update("/");
  if (event.key === "=" || event.key === "Enter") dspResult();
  if (
    event.key === "c" ||
    event.key === "C" ||
    event.key === "Escape" ||
    event.key === "Backspace" ||
    event.key === "Delete"
  ) {
    clear();
  }
}
document.addEventListener("keydown", keydownEvent);
elementAdd.addEventListener("click", function () { update("+") });
elementSub.addEventListener("click", function () { update("-") });
elementMult.addEventListener("click", function () { update("*") });
elementDiv.addEventListener("click", function () { update("/") });
elementCancel.addEventListener("click", function () { clear() });
elementEqual.addEventListener("click", function () { dspResult() });



let fullValue = "";
elementShowMore.addEventListener("click", function () {
  let toShow = "";

  if (wkCalc === "=" && wkFirst === "0") {
    toShow = String(wkTotal);
  } else if (fullValue !== "") {
    toShow = fullValue;
  } else {
    toShow = elementResult.innerText.replace(/\.\.\.$/, "");
  }

  if (toShow && toShow !== "0") {
    Swal.fire(toShow);
  } else {
    Swal.fire({
      icon: "error",
      title: "NO DATA",
    });
  }
});

/** 数字がクリックされたときの処理 */
function edit(wkInput) {
  if (wkBefore === "0") {
    fullValue = fullValue + wkInput; 
  } else {
    fullValue = wkInput;
  }

  
  if (fullValue.length > 10) {
    elementResult.innerHTML = fullValue.substring(0, 10) + "...";
  } else {
    elementResult.innerHTML = fullValue;
  }

  wkFirst = "0";
  wkBefore = "0";
}

/** 演算子がクリックされたときの処理 */
function update(calcType) {
  // １つ前の入力が数値
  if (wkBefore === "0") {
    elementcalcLog.innerHTML = elementcalcLog.innerHTML
      + Number(fullValue)
      + (calcType === "*" ? "X" : calcType); //計算ログ
    calculator();
    // 【Ｃ】自分で考える
  }
  // １つ前の入力が演算子（演算子 入力しなおし）
  else {
    // 初回入力
    if (wkFirst === "1") {
      elementcalcLog.innerHTML = "0" + calcType; //計算ログ
    }
    else {
      // 演算子 入力しなおし
      let wkLogLastWord = elementcalcLog.innerHTML.slice(-1); //ログ最後の１文字
      if (["+", "-", "*", "/"].includes(wkLogLastWord)) {
        elementcalcLog.innerHTML = elementcalcLog.innerHTML.slice(0, -1) + calcType; //計算ログ　末尾1文字（前回の演算子）を削除
      }
      // イコールの後の演算子
      else {
        elementcalcLog.innerHTML = elementcalcLog.innerHTML + calcType; //計算ログ
      }
    }
  }
  wkCalc = calcType;  //演算子save
  wkBefore = "1";
}

/** =がクリックされたときの処理 */
// 【Ｄ】自分で考える
function dspResult() {
  if (wkFirst === "0" && wkBefore === "0") {
    elementcalcLog.innerHTML = elementcalcLog.innerHTML + +fullValue;
    calculator();
    wkCalc = "=";
    wkBefore = "1";
  }
}

/** 計算結果をクリアします。(clear Result) */
// 【Ｅ】自分で考える
function clear() {
  elementResult.innerHTML = 0;
  elementcalcLog.innerHTML = "";
  wkFirst = "1";
  wkTotal = 0;
  wkCalc = "+";
  wkBefore = "1";
  fullValue=0;
}

function calculator() {
  let operand = Number(fullValue);

  switch (wkCalc) {
    case "+":
      wkTotal = +wkTotal + operand;
      break;
    case "-":
      wkTotal = +wkTotal - operand;
      break;
    case "*":
      wkTotal = +wkTotal * operand;
      break;
    case "/":
      if (operand === 0) {
        elementResult.innerHTML = "Error!!!";
        Swal.fire({
          icon: "error",
          title: "Do not divide 0",
        });
        wkTotal = 0;
        wkFirst = "1";
        fullValue = "";
        return;
      }
      wkTotal = +wkTotal / operand;
      break;
  }


  fullValue = String(wkTotal);


  if (fullValue.length > 10) {
    elementResult.innerHTML = fullValue.substring(0, 10) + "...";
  } else {
    elementResult.innerHTML = fullValue;
  }
}
