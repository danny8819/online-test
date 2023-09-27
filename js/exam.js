import answer from "./data.js";

async function loadData() {
  const res = await fetch("./text.json");
  const data = await res.json();
  const single = getRandomArrayElements(data.single, 30);
  const multi = getRandomArrayElements(data.multi, 10);
  let singleStr = single.reduce((accumulator, currentValue, currentIndex) => {
    let options = "";
    for (let key in currentValue.options) {
      options += `<input type="radio" id=${currentIndex + 1 + key} name=${
        currentValue.id
      } value=${key} /> <label for=${currentIndex + 1 + key}>${
        key + "." + currentValue.options[key]
      }</label><br />`;
    }
    return (
      accumulator +
      `<h4>${currentIndex + 1}.${currentValue.question}</h4>${options}`
    );
  }, "<h2>单选题</h2>");
  let multiStr = multi.reduce((accumulator, currentValue, currentIndex) => {
    let options = "";
    for (let key in currentValue.options) {
      options += `<input type="checkbox" id=${currentIndex + 1 + key} name=${
        currentValue.id
      } value=${key} /> <label for=${currentIndex + 1 + key}>${
        key + "." + currentValue.options[key]
      }</label><br />`;
    }
    return (
      accumulator +
      `<h4>${currentIndex + 1}.${currentValue.question}</h4>${options}`
    );
  }, "<h2>多选题</h2>");
  document.getElementById("exam-content").innerHTML = singleStr + multiStr;
  return { single, multi };
}
loadData();

let times = 3600;
function countDown(time) {
  var m = parseInt((time / 60) % 60);
  m = m < 10 ? "0" + m : m;
  var s = parseInt(time % 60);
  s = s < 10 ? "0" + s : s;
  const r = m + "分" + s + "秒";
  return r;
}

//  设置定时器1秒运行1次
window.setInterval(function () {
  times -= 1;
  if (times <= 0) {
    // 自动交卷
    return;
  }
  let time1 = countDown(times);
  let pTime = document.getElementById("timer");
  pTime.innerHTML = time1;
}, 1000);

function getRandomArrayElements(arr, count) {
  var shuffled = arr.slice(0),
    i = arr.length,
    min = i - count,
    temp,
    index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}
const submitBtn = document.getElementById("submit-cta");
const favDialog = document.getElementById("favDialog");
const submitBtn2 = document.getElementById("confirmBtn");
const goBackBtn = document.getElementById("go-back");
const goHomeBtn = document.getElementById("go-home");
submitBtn.addEventListener("click", () => {
  favDialog.showModal();
});

submitBtn2.addEventListener("click", handelSubmit);

function handelSubmit() {
  const hiddenScore = document.querySelector(".score-container");
  hiddenScore.classList.remove("score-hidden");
  const scoreDash = document.getElementById("score-dashboard");
  const inputs = document.getElementsByTagName("input");
  const msgArr = [];
  const multiQsArr = [];
  const multiAsArr = [];
  let score = 0;
  let misMsg = "";

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    if (input.type === "radio" && input.checked === true) {
      if (answer.single[input.name] === input.value) {
        score = score + 2;
      } else {
        msgArr.push(
          `单项选择题第${input.id.slice(0, -1)}题回答错误，正确答案应该为${
            answer.single[input.name]
          }。`
        );
      }
    } else if (input.type === "checkbox" && input.checked === true) {
      multiAsArr.push(input.id);
      multiQsArr.push(input.name);
    }
  }

  const multiObj = {};
  for (let i = 0; i < multiQsArr.length; i++) {
    const key = multiQsArr[i];
    const value = multiAsArr[i];

    if (!multiObj[key]) {
      multiObj[key] = [];
    }

    multiObj[key].push(value);
  }

  const score2 = Object.keys(multiObj).reduce((acc, key) => {
    const multiAnswer = answer.multi[key];
    const correct = multiObj[key].filter(
      (item) =>
        item.slice(-1) === multiAnswer[0] ||
        item.slice(-1) === multiAnswer[1] ||
        item.slice(-1) === multiAnswer[2] ||
        item.slice(-1) === multiAnswer[3]
    );

    if (correct.length === multiAnswer.length) {
      acc += 4;
    } else if (correct.length > 0) {
      acc += 2;
      msgArr.push(
        `多项选择题第${multiObj[key][0].slice(
          0,
          -1
        )}题回答部分错误，正确答案应该为${answer.multi[key].map(
          (item) => item
        )}。`
      );
    } else {
      acc += 0;
      msgArr.push(
        `多项选择题第${multiObj[key][0].slice(
          0,
          -1
        )}题回答错误，正确答案应该为${answer.multi[key].map((item) => item)}。`
      );
    }

    return acc;
  }, 0);

  score = score + score2;
  for (let i = 0; i < msgArr.length; i++) {
    misMsg += "<p>" + msgArr[i] + "</p>";
  }
  scoreDash.innerHTML = `<h2>你的测试成绩为${score}分！</h2>
  ${misMsg}
  <p>您的考试已结束！</p>`;
  const subTime = new Date();
  subTime.getTime();
  localStorage.setItem("subTime", subTime);
  localStorage.setItem("score", score);
}

goBackBtn.addEventListener("click", () => {
  window.location.reload();
});
goHomeBtn.addEventListener("click", () => {
  window.location.href = "./home.html";
});
