const todoInput = document.getElementById('whatTodo');
const todoSubmit = document.getElementById('addTodo');
const todoList = document.querySelector('.todoBox');

let todos = [];

function init(){
    loadStorage();
    todoSubmit.addEventListener('click', createTodo);
}
init();

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
    // 삭제버튼 추가
    if (checkValue == 1){
        span.innerHTML = todoValue;
        li.appendChild(checkBtn);
        li.appendChild(span);
        li.id = todos.length + 1;
        li.classList.add('completed');
        todoList.appendChild(li);
    }
    else if (checkValue == 0) {
        span.innerHTML = todoValue;
        li.appendChild(checkBtn);
        li.appendChild(span);
        li.id = todos.length + 1;
        todoList.appendChild(li);
    }

    checkBtn.addEventListener("click", checkTodo);
}

// 완료된 todo는 목록의 맨 뒤로 가도록 수정 필요
function checkTodo(e) {
    const { target : span } = e;
    const li = span.parentNode;

    if (!li.className){
        li.classList.add('completed');
        todos.forEach( currentTodo => {
            if(currentTodo.id == Number(li.id)) {
                currentTodo.checked = 1;
            }
        })
    }
    else if (li.className == 'completed') {
        li.classList.remove('completed')
        todos.forEach( currentTodo => {
            if(currentTodo.id == Number(li.id)) {
                currentTodo.checked = 0;
            }
        })
    }
    localStorage.setItem("TODO", JSON.stringify(todos));
}