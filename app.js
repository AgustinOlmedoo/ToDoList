document.addEventListener("DOMContentLoaded", function() {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
    let todos = [];


    if (localStorage.getItem("todos")) {
        todos = JSON.parse(localStorage.getItem("todos"));
        renderTodos();
    }

    todoForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const todoText = todoInput.value.trim();
        if (todoText !== "") {
            addTodoItem(todoText);
            todoInput.value = "";
        }
    });

    function addTodoItem(todoText) {
        const todoItem = {
            text: todoText,
            completed: false
        };
        todos.push(todoItem);
        saveTodos();
        renderTodos();
    }

    function saveTodos() {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function renderTodos() {
        todoList.innerHTML = "";
        todos.forEach((todo, index) => {
            const todoItem = document.createElement("div");
            todoItem.classList.add("todo-item", "mb-2", "d-flex", "justify-content-between", "align-items-center");
            
            const todoTextElement = document.createElement("span");
            todoTextElement.textContent = todo.text;
            if (todo.completed) {
                todoTextElement.classList.add("completed");
            }
            todoItem.appendChild(todoTextElement);

            const buttonsDiv = document.createElement("div");

            const completeButton = document.createElement("button");
            completeButton.classList.add("btn", "btn-sm", "btn-success", "mr-1");
            completeButton.textContent = "Completar";
            completeButton.addEventListener("click", function() {
                todo.completed = true;
                saveTodos();
                renderTodos();
            });
            if (!todo.completed) {
                buttonsDiv.appendChild(completeButton);
            }

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("btn", "btn-sm", "btn-danger");
            deleteButton.textContent = "Eliminar";
            deleteButton.addEventListener("click", function() {
                todos.splice(index, 1);
                saveTodos();
                renderTodos();
            });
            buttonsDiv.appendChild(deleteButton);

            if (todo.completed) {
                const checkImage = document.createElement("img");
                checkImage.src = "images/check-svgrepo-com.svg";
                checkImage.alt = "Completado";
                checkImage.classList.add("check-image"); 
                buttonsDiv.appendChild(checkImage); 
            }

            todoItem.appendChild(buttonsDiv);

            todoList.appendChild(todoItem);
        });
    }
});
