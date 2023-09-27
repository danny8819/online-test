const user = localStorage.getItem("user");
const subTime = localStorage.getItem("subTime");
const score = localStorage.getItem("score");
const scoreTable = document.getElementById("user-score");

scoreTable.innerHTML = `<td>${user}</td>
<td>${score}</td>
<td>${subTime}</td>
<td>1</td>`;
