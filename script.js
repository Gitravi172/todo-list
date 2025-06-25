const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let editTodo = null;

// Function to add to do
const addTodo = () => {
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("You most write something in your to do");
    return false;
  }

  if(addBtn.value === "Edit"){
    editTodo.target.previousElementSibling.innerHTML = inputText;
    // editLocalTodos(inputText);
    addBtn.value = "Add";
    inputBox.value = "";
  }

   else{
  // Create a tag
  const li = document.createElement("li");
  const p = document.createElement("p");
  p.innerHTML = inputText;
  li.appendChild(p);
  
//creating edit button.
  const editBtn = document.createElement("button")
  editBtn.innerText = "Edit";
  editBtn.classList.add("btn", "editBtn");
  li.appendChild(editBtn);


// creating delet button.
  const deleteBtn = document.createElement("button")
  deleteBtn.innerText = "Remove";
  deleteBtn.classList.add("btn", "deleteBtn");
  li.appendChild(deleteBtn);


  todoList.appendChild(li);
  inputBox.value = "";

  saveLocalsTodos(inputText);
  
}
};


// Function to update : (Edit/Delete) to do 
const updateTodo = (e) =>{
if(e.target.innerHTML === "Remove"){
  todoList.removeChild(e.target.parentElement);
  deleteLocalTodos(e.target.parentElement);
}

if(e.target.innerHTML === "Edit"){
  inputBox.value = e.target.previousElementSibling.innerHTML;
  inputBox.focus();
  addBtn.value = "Edit"
  editTodo = e;
}

}

// Function to save local todo.
const saveLocalsTodos = (todo) => {
  let todos;
if(localStorage.getItem("todos") === null){
  todos = [];
}

else{
  todos = JSON.parse(localStorage.getItem("todos"));
}

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to get local todo.
const getLocalTodos = () => {
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  }

  else{
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach(todo => {


        // Create p tag
  const li = document.createElement("li");
  const p = document.createElement("p");
  p.innerHTML = todo;
  li.appendChild(p);
  
//creating edit button.
  const editBtn = document.createElement("button")
  editBtn.innerText = "Edit";
  editBtn.classList.add("btn", "editBtn");
  li.appendChild(editBtn);


// creating delet button.
  const deleteBtn = document.createElement("button")
  deleteBtn.innerText = "Remove";
  deleteBtn.classList.add("btn", "deleteBtn");
  li.appendChild(deleteBtn);


  todoList.appendChild(li);
    });
  }
}

// Function to delete local todo.
const deleteLocalTodos = (todo) => {
  let todos;
  if(localStorage.getItem("todos") === null){
    todos = [];
  }
  
  else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  let todoText = todo.children[0].innerHTML;
  let todoIndex = todos.indexOf(todoText);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos))
  // Array funtion : slice / splice
  console.log(todoIndex);
}

const editLocalTodos = (oldTodoId) => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let todoIndex = todos.findIndex((t) => t.id === oldTodoId);
  if (todoIndex !== -1) {
    todos[todoIndex].text = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
  } else {
    console.warn("Todo not found");
  }
};


editLocalTodos(inputBox);

document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener("click", addTodo);
todoList.addEventListener('click', updateTodo);
