const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const todoList = document.querySelector(".list-group");
const clearButton = document.querySelector("#clear-todos");
const filter = document.querySelector("#filter");

eventListener();

function eventListener() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  secondCardBody.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup", filterTodos);
  clearButton.addEventListener("click", clearAllTodos);
}

function clearAllTodos(e) {
  const numberOfTodos = todoList.childElementCount;
  if (confirm("Tümünü silmek istediğinizden emin misniz?")) {
    // todolist.innerHTML = "";     //yavaş
    for (let i = 0; i < numberOfTodos; i++) {
      todoList.removeChild(todoList.firstElementChild);
    }
    localStorage.removeItem("todos");
  }
}

function addTodo(e) {
  const newTodo = todoInput.value.trim();
  let todos = getTodosFromStorage();
  if (todos.indexOf(newTodo) != -1) {
    //-1 değil yani var
    createAlert("warning", "Girdiğiniz todo zaten var.");
    todoInput.value = "";
  } else {
    if (newTodo === "") {
      //-1 değil yani o değer yok
      createAlert("danger", "Lütfen bir todo giriniz.");
    } else {
      addTodoToStorage(newTodo);
      addTodoToUI(newTodo);
      createAlert("success", "Todo başarılı bir şekilde oluşturuldu.");
    }
  }
  e.preventDefault();
}

function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");

  listItems.forEach(function (listItem) {
    const text = listItem.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      listItem.setAttribute("style", "display: none !important");
    } else {
      listItem.setAttribute("style", "display: block");
    }
  });
}

function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    removeFromStorage(e.target.parentElement.parentElement.textContent);

    createAlert("success", "Todo başarı ile silindi.");
  }
}

function removeFromStorage(todo) {
  let todos = getTodosFromStorage();

  todos.forEach(function (i, index) {
    if (todo === i) {
      todos.splice(index, 1);
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI() {
  let todos = getTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}

function getTodosFromStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();

  todos.push(newTodo);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function createAlert(type, message) {
  const alert = document.createElement("div");

  alert.className = `alert alert-${type}`;
  alert.textContent = message;

  firstCardBody.appendChild(alert);

  setTimeout(function () {
    alert.remove();
  }, 1000);
}

function addTodoToUI(newTodo) {
  const listItems = document.createElement("li");
  const link = document.createElement("a");

  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";

  listItems.className = "list-group-item d-flex justify-content-between";

  listItems.appendChild(document.createTextNode(newTodo));
  listItems.appendChild(link);

  todoList.appendChild(listItems);
  todoInput.value = "";
}
