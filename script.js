// select all elements

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

let todos = [];

runEvents();

function runEvents() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", pageLoaded);
    secondCardBody.addEventListener("click", removeTodoToUI);
    clearButton.addEventListener("click", allTodosEveryWhere);
    filterInput.addEventListener("keyup" , filter);
}

function filter(e){
    const filterValue = e.target.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".list-group-item");
    
    if(todoListesi.length>0){
        todoListesi.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(filterValue)){
                todo.setAttribute("style" , "display : block");
            }else{
                todo.setAttribute("style", "display : none !important")
            }
        });
    }else{
        showAlert("warning", "Log in to filter")
    }


}


function pageLoaded(){
    checkTodosFromStorage();
    todos.forEach(function(todo) {
        addTodoUI(todo)
    })

}

    function allTodosEveryWhere(){
        const todoListesi = document.querySelectorAll(".list-group-item");
        if(todoListesi.length>0){
                // the deletion process was performed from the screen.
                todoListesi.forEach(function(todo){
                    todo.remove();
                });
                //delete from storage

                todos=[];
                localStorage.setItem("todos", JSON.stringify(todos))
                showAlert("success" , "Successfully deleted.")
        }else{
            showAlert("warning", "Create at least one todo to delete.")
        }
        console.log(todoListesi)
    }



function removeTodoToUI(e){
    if(e.target.className==="fa fa-remove"){
        // delete from screen
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        // delete from storage
        removeTodoToStorage(todo.textContent);
        showAlert("success" , "Todo Deleted Successfully.")
    }
}

function removeTodoToStorage(removeTodo){
    checkTodosFromStorage();
    todos.forEach(function(todo,index){
        if(removeTodo===todo){
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}



function addTodo(e) {
    const inputText = addInput.value.trim();
    if (inputText == null || inputText == "") {
        showAlert("danger", "Please do not leave blank");
    } else {
        // adding to the interface
        addTodoUI(inputText);
        addTodoToStorage(inputText);
        showAlert("success", "Added Todo.");

    }
    // Add storage
    e.preventDefault();
}



function addTodoUI(newTodo) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href = "#"
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove"

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = "";

}

function addTodoToStorage(newTodo) {
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));

}

function checkTodosFromStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type, message) {
    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.textContent = message;
    firstCardBody.appendChild(div);
    setTimeout(function () {
        div.remove();
    }, 2500);

}