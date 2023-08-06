const todoInput = document.getElementById('whatTodo');
const todoSubmit = document.getElementById('addTodo');
const todoList = document.querySelector('.todoList');

function init(){
    // click? submit?
    todoSubmit.addEventListener('click', createTodo);
}
init();

function createTodo(ev) {
    ev.preventDefault();
    // const? let?
    const todo = todoInput.value;
    addTodo(todo);
    todoInput.value = '';
}

function addTodo(todo) {
    const li = document.createElement('li');
    li.innerHTML = todo;
    todoList.appendChild(li);
}