const todoInput = document.getElementById('whatTodo');
const todoSubmit = document.getElementById('addTodo');
const todoList = document.querySelector('.todoBox');
const todayDate = document.getElementById('date');
const completeAllBtn = document.getElementById('complete-all');
let isAllCompleted = false; //전체 todos 체크 여부

let todos = [];

function init(){
    getToday();
    loadStorage();
    todoSubmit.addEventListener('click', createTodo);
    completeAllBtn.addEventListener('click', onClickCompleteAll); 
}
init();

// 날짜 얻기
function getToday() {
    let today = new Date();

    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();

    todayDate.innerHTML = `${year}/${month}/${date}`;
}

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

// todo 추가 시 실행
function createTodo(ev) {
    ev.preventDefault();
    const todoValue = todoInput.value;
    if (!todoValue) {
        alert('할 일을 입력해주세요')
    }else {
        printTodo(todoValue, 0)
        storeTodo(todoValue, 0)
        todoInput.value = ''; 
    }
    checkIsAllCompleted()
    
}

// 새로운 todo 저장
function storeTodo(todoValue, checkValue) {
    const todosObj = {
        text : todoValue,
        id : todos.length +1,
        checked : checkValue,
    };
    todos.push(todosObj);
    window.localStorage.setItem("TODO", JSON.stringify(todos));
}

// 새로운 todo 출력
function printTodo(todoValue, checkValue){
    const li = document.createElement('li');
    const checkBtn = document.createElement('button');
    const span = document.createElement('span');
    const editBtn = document.createElement('button');
    const delBtn = document.createElement('button');
    
    span.innerHTML = todoValue;
    checkBtn.classList.add('check');
    editBtn.innerHTML = '수정';
    editBtn.classList.add('edit-btn');
    delBtn.innerHTML = '삭제';
    delBtn.classList.add('del-btn');
    li.appendChild(checkBtn);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    li.id = todos.length + 1;

    if (checkValue == 1) {
        li.classList.add('completed');
    }
    todoList.appendChild(li);

    checkBtn.addEventListener("click", checkTodo);
    delBtn.addEventListener("click", deleteTodo);
    editBtn.addEventListener("click", editTodo);

}

function setIsAllCompleted (bool)
{
    isAllCompleted = bool;
}

// 모두 완료 안 됐을 때 실행
function completeAll()
{
    completeAllBtn.innerText = '전체 해제';
    todos.forEach(todo => {
        if (todo.checked == 0) {
            todo.checked = 1;
            document.getElementById(String(todo.id)).classList.add('completed');
        }
    })
    localStorage.setItem("TODO", JSON.stringify(todos));
}

// 모두 완료됐을 때 실행
function incompleteAll()
{
    completeAllBtn.innerText = '전체 선택';
    todos.forEach(todo => {
            todo.checked = 1;
            document.getElementById(String(todo.id)).classList.remove('completed');
    })
    todos = todos.map(todo => ({...todo, checked: 0}));
    localStorage.setItem("TODO", JSON.stringify(todos));
}

function getCompletedTodos() 
{
    return todos.filter(todo => todo.checked === 1);
}

// 전체 todos의 check 여부(isCompleted) 확인해서 상태 처리
function checkIsAllCompleted()
{
    if(todos.length === getCompletedTodos().length)
    {
        setIsAllCompleted(true);
        completeAllBtn.innerText = '전체 해제';
    }else {
        setIsAllCompleted(false);
        completeAllBtn.innerText = '전체 선택';
    }
}

// 전체완료 버튼 클릭시 실행
function onClickCompleteAll()
{
    if(!todos.length) return;

    if(isAllCompleted) incompleteAll();
    else completeAll();
    setIsAllCompleted(!isAllCompleted);
    // setLeftItems()
}

// todo 체크 버튼 클릭시 실행
function checkTodo(e) {
    const { target : button } = e;
    const li = button.parentNode;

    if (!li.classList.contains('completed')){
        li.classList.add('completed');
        todos.forEach( currentTodo => {
            if(currentTodo.id == Number(li.id)) {
                currentTodo.checked = 1;
            }
        });
    }
    else {
        li.classList.remove('completed')
        todos.forEach( currentTodo => {
            if(currentTodo.id == Number(li.id)) {
                currentTodo.checked = 0;
            }
        });
    }

    localStorage.setItem("TODO", JSON.stringify(todos));
    checkIsAllCompleted();
}

// todo 수정
function editTodo(e)
{
    const {target : button} = e;
    const li = button.parentNode;
    const span = li.querySelector('span');
    const editInput = document.createElement('input');
    editInput.classList.add('edit-input');
    editInput.value = span.innerText;
    
    editInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            updateTodo(e.target.value, e.target); // todo 수정
            li.removeChild(editInput);
        }
    })

    li.appendChild(editInput);
 
}

function updateTodo(text, elem)
{
    const li = elem.parentNode;
    const span = li.querySelector('span');
    span.innerHTML = text;
    todos = todos.map((todo) => todo.id === Number(li.id) ? {...todo, text: text} : todo);
    localStorage.setItem("TODO", JSON.stringify(todos));
}

// todo 삭제
function deleteTodo(e)
{
    const {target : button} = e;
    const li = button.parentNode;
    todoList.removeChild(li);
    todos = todos.filter((todo) => todo.id != Number(li.id));
    localStorage.setItem("TODO", JSON.stringify(todos));
    checkIsAllCompleted();
}