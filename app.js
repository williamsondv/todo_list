let prioritySlider = document.getElementById("slider");
let output = document.getElementById("sliderValue");

prioritySlider.oninput = function () {
  output.innerHTML = this.value;
};

class todoListItem {
  constructor(priority, text, strikeThrough) {
    this.priority = priority;
    this.text = text;
    this.strikeThrough = strikeThrough;
  }
}

function addToDo() {
  let taskText = document.getElementById("taskName").value;
  let priority = document.getElementById("slider").value;
  let toDoItems = document.querySelectorAll("ul");
  let removeButton = document.createElement("input");
  removeButton.setAttribute("type", "button");
  removeButton.setAttribute("value", "Remove");
  removeButton.setAttribute("class", "removeButton");

  let adjacentHTML = `<li priority=${priority} data-category="list" clicked="false">Priority ${priority}: ${taskText}  <input type='button' class='removeButton' value='Remove'></input></li>`;

  for (let i = 0; i < toDoItems.length; i++) {
    if (priority === toDoItems[i].getAttribute("priority")) {
      toDoItems[i].insertAdjacentHTML("afterbegin", adjacentHTML);
    }
  }
}
document
  .getElementById("submitButton")
  .addEventListener("click", function (event) {
    addToDo();
  });

let parentElement = document.querySelector(".listDiv");

parentElement.addEventListener("click", function (event) {
  if (event.target.value === "Remove") {
    event.target.parentElement.remove();
    event.target.remove();
  }
});

parentElement.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    if (event.target.getAttribute("clicked") === "true") {
      event.target.className = "unclicked";
      event.target.setAttribute("clicked", "false");
    } else {
      event.target.setAttribute("clicked", "true");
      event.target.className = "strikeThrough";
    }
  }
});

let inputTextbox = document.getElementById("taskName");

inputTextbox.addEventListener("click", function (event) {
  inputTextbox.value = "";
});

inputTextbox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addToDo();
  }
});

window.onbeforeunload = function () {
  let taskNodeList = document.querySelectorAll("li");
  let objectArray = [];

  for (let i = 0; i < taskNodeList.length; i++) {
    let newItem = new todoListItem(
      taskNodeList[i].getAttribute("priority"),
      taskNodeList[i].textContent,
      taskNodeList[i].className
    );
    objectArray.push(newItem);
  }
  objectArray.reverse();
  window.localStorage.setItem("objectArray", JSON.stringify(objectArray));
};

window.onload = function () {
  if (JSON.parse(window.localStorage.getItem("objectArray") != null)) {
    let taskArray = JSON.parse(window.localStorage.getItem("objectArray"));
    let toDoItems = document.querySelectorAll("ul");

    for (let task of taskArray) {
      let priority = task.priority;
      let taskText = task.text;
      if (task.strikeThrough === "strikeThrough") {
        classText = ` clicked="true" class="strikeThrough"`;
      } else {
        classText = ` class=unclicked`;
      }

      for (let i = 0; i < toDoItems.length; i++) {
        let onLoadHTML = `<li priority=${priority} data-category="list"${classText}>${taskText}  <input type='button' class='removeButton' value='Remove'></input></li>`;
        if (priority === toDoItems[i].getAttribute("priority")) {
          toDoItems[i].insertAdjacentHTML("afterbegin", onLoadHTML);
        }
      }
    }
    localStorage.clear();
  }
};
