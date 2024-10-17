const inputBox = document.querySelector("#inputBox");
const addBtn = document.querySelector("#addBtn");
const todo_container_list = document.querySelector("#todo_container_list");

let todos = [];
window.onload = () => {
  todos = JSON.parse(localStorage.getItem("todo")) || [];
  createTodoElements();
};

addBtn.addEventListener("click", function () {
  // IF INPUT IS EMPTY GIVE ALERT MSG TO THE USER
  if (inputBox.value == "") {
    return alert("YOU MUST ENTER THE TODO");
  }

  //ADD INPUT VALUE TO THE TODOS ARRAY
  let todo = {
    text: inputBox.value,
    completed: false,
  };

  todos.push(todo);
  localStorage.setItem("todo", JSON.stringify(todos));

  // CREATE ELEMENT AND DISPLAY THE ELEMENT
  createTodoElements();

  inputBox.value = "";
});

function createTodoElements() {
  todo_container_list.innerHTML = "";
  todos.forEach((todo, index) => {
    let li = document.createElement("LI");
    li.setAttribute("data-key", index);

    // CREATE STUFFS INSIDE THE LIST

    //CHECK BUTTON
    let checkedBtn = document.createElement("BUTTON");
    checkedBtn.type = "button";
    checkedBtn.classList.add("checkIcon");
    checkedBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

    //TODO PARA
    let todoPara = document.createElement("P");
    todoPara.classList.add("todo");
    todoPara.textContent = todo.text;
    todoPara.setAttribute("data-key", index);

    // Apply 'completed' class if the todo is marked completed
    if (todo.completed) {
      todoPara.classList.add("completed");
    }

    //DELETE BUTTON
    let deleteBtn = document.createElement("BUTTON");
    deleteBtn.type = "button";
    deleteBtn.classList.add("deleteIcon");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can deleteIcon"></i>';

    //ADD CLICK EVENT TO MARK US COMPLETED
    checkedBtn.addEventListener("click", function () {
      // Toggle completed state
      todos[index].completed = !todos[index].completed;
      localStorage.setItem("todo", JSON.stringify(todos)); // Update localStorage
      createTodoElements(); // Re-render the list
    });

    //ADD CLICK EVENT TO DELETE THE TODO
    deleteBtn.addEventListener("click", function () {
      todos.splice(index, 1); // REMOVE THE TODOS ARRAY
      localStorage.setItem("todo", JSON.stringify(todos)); //UPDATE THE LOCAL STORAGE
      createTodoElements(); // RE RENDER THE LIST
    });

    //APPEND ELEMENTS TO THE LIST ITEM
    li.appendChild(checkedBtn);
    li.appendChild(todoPara);
    li.appendChild(deleteBtn);
    todo_container_list.appendChild(li);
  });
}
