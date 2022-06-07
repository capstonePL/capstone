let date = new Date();

const rendarCalendar = () => {
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

  document.querySelector(".year-month").textContent = `${viewYear}년 ${
    viewMonth + 1
  }월`;

  const prevLast = new Date(viewYear, viewMonth, 0);
  const thisLast = new Date(viewYear, viewMonth + 1, 0);

  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay();

  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();

  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = [];

  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }

  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  const dates = prevDates.concat(thisDates, nextDates);
  const firstDateIndex = dates.indexOf(1);
  const lastDateIndex = dates.lastIndexOf(TLDate);

  dates.forEach((date, i) => {
    const condition =
      i >= firstDateIndex && i < lastDateIndex + 1 ? "this" : "other";
    dates[
      i
    ] = `<div class="date"><span class=${condition}>${date}</sapn></div>`;
  });

  document.querySelector(".dates").innerHTML = dates.join("");

  const today = new Date();
  if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    for (let date of document.querySelectorAll(".this")) {
      if (+date.innerText === today.getDate()) {
        date.classList.add("today");
        break;
      }
    }
  }
};

rendarCalendar();

const prevMonth = () => {
  date.setMonth(date.getMonth() - 1);
  rendarCalendar();
};

const nextMonth = () => {
  date.setMonth(date.getMonth() + 1);
  rendarCalendar();
};

const goToday = () => {
  date = new Date();
  rendarCalendar();
};

function show() {
  document.querySelector(".background").className = "background show";
}

function close() {
  document.querySelector(".background").className = "background";
}

document.querySelector("#show").addEventListener("click", show);
document.querySelector("#close").addEventListener("click", close);

let form = document.querySelector("form.row");
let ul = document.querySelector(".task_list");

let toDos = [];
const savedTodos = localStorage.getItem("toDos");
console.log(savedTodos);
if (savedTodos !== null) {
  const parsedTodos = JSON.parse(savedTodos);
  toDos = parsedTodos;
  parsedTodos.forEach(paintTodo);
}

let htmlTemplate = function (todo) {
  let li = `
      <li>${todo}<span class="del">X</span></li>
  `;
  ul.innerHTML += li;
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let todo = form.task.value.trim();
  if (todo.length) {
    htmlTemplate(todo);
    form.reset();
  }
  console.log(todo);
});

ul.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove();
  }
});
