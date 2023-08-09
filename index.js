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
        // li.style.color = "#ccc";
        // li.style.textDecoration="line-through";
        li.classList.toggle('completed');
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

// checkTodo가 실행되면 completed 클래스가 추가되도록, 목록의 맨 뒤로 가도록
// completed 클래스 -> 체크했을때 css 스타일
function checkTodo(e) {
    const { target : span } = e;
    const li = span.parentNode;

    if (li.className == null){
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