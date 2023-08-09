const todoInput = document.getElementById('whatTodo');
const todoSubmit = document.getElementById('addTodo');
const todoList = document.querySelector('.todoBox');

let todos = [];

function init(){
    loadStorage();
    // click? submit?
    todoSubmit.addEventListener('click', createTodo);
}
init();

// localStorage 로드
function loadStorage() {
    const storedTodo = window.localStorage.getItem("TODO");

    if(storedTodo != null) {
        const myTodoList = JSON.parse(storedTodo);
        myTodoList.forEach(todo => {
            const { text } = todo;
            const { checked } = todo;
            printTodo(text, checked);
            storeTodo(text, checked);
        });
    }
}

function createTodo(ev) {
    ev.preventDefault();
    // const? let?
    const todoValue = todoInput.value;
    if (!todoValue) {
        // toast창으로 수정
        alert('할 일을 입력해주세요')
    }else {
        printTodo(todoValue, 0)
        storeTodo(todoValue, 0)
        todoInput.value = ''; 
    }
    
}

function storeTodo(todoValue, checkValue) {
    const todosObj = {
        text : todoValue,
        id : todos.length +1,
        checked : checkValue,
    };
    todos.push(todosObj);
    window.localStorage.setItem("TODO", JSON.stringify(todos));
}

function printTodo(todoValue, checkValue){
    const li = document.createElement('li');
    const checkBtn = document.createElement('button');
    const span = document.createElement('span');
    // 체크박스, 삭제버튼 추가
    if (checkValue == 1){
        span.innerHTML = todoValue;
        li.appendChild(checkBtn);
        li.appendChild(span);
        li.id = todos.length + 1;
        // 추후 스타일 다시 지정
        li.style.color = "#ccc";
        li.style.textDecoration="line-through";
        todoList.appendChild(li);
    }
    else if (checkValue == 0) {
        span.innerHTML = todoValue;
        li.appendChild(checkBtn);
        li.appendChild(span);
        li.id = todos.length + 1;
        todoList.appendChild(li);
    }
}

function checkTodo()