
//data 
let todos = [];

//selectors

const newP = document.querySelector('#pp');
const myList = document.querySelector('#myList');
const todoInput = document.querySelector('#inputTask'); 
const nav = document.querySelector('#nav'); 
const clearCompleted = document.querySelector('#clear');
const markAll = document.querySelector('#markAll');
const taskCount = document.querySelector('#taskCount');
const active = document.querySelector('#active');
const all = document.querySelector('#all');
const completed = document.querySelector('#completed');

const error = document.querySelector('.error');
error.style.display ='none'

//events

todoInput.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        addItemToList()
      e.preventDefault();
    }
  });


document.addEventListener("click", (e) =>{
    if (e.target.type === 'checkbox'){
        window.setTimeout(toggle(e.target.parentElement.getAttribute('data-key')),5000)
    }

    if (e.target.id == 'delete'){
        deleteTodo(e.target.parentElement.getAttribute('data-key'));
    }

});

clearCompleted.addEventListener("click", (e) =>{
    todos = todos.filter(todo => todo.active === true);
    addToLocalStorage(todos)
})


const markAllFunc = (e) =>{
   for (let i=0; i < todos.length; i++){
        if (todos[i].active === true){
        	todos[i].active = false;
          }

    }

    addToLocalStorage(todos);
}

markAll.addEventListener("click", markAllFunc) /* () =>{
    // const checkActive = todos.filter(todo => todo.active === true);
    for (let i=0; i < todos.length; i++){
        if (todos[i].active === true){
          todos[i].active = false;
          }

    }

    addToLocalStorage(todos);
} */



markAll.addEventListener("dblclick", () =>{
    // const checkActive = todos.filter(todo => todo.active === true);
    for (let i=0; i < todos.length; i++){
        if (todos[i].active === false){
        	todos[i].active = true;
          }

    }
 

    addToLocalStorage(todos);
})



active.addEventListener('click', (e)=>{
    const allActive = todos.filter(todo => todo.active === true);
    addToLocalStorage(allActive)
    nav.style.display = 'block'
})

completed.addEventListener('click', (e)=>{
    const allCompleted = todos.filter(todo => todo.active === false);
    addToLocalStorage(allCompleted);
    nav.style.display = 'block'
})

all.addEventListener('click', (e)=>{
    const allTodos = todos
    addToLocalStorage(allTodos)
    
})


// Function for the Creation of a unique id


const createId = () =>{
    return  Math.random().toString(36).substr(2,9)
}

const addItemToList = (name) =>{
    name = todoInput.value;
    const todo = {
        id: createId(),
        name: name,
        active: true
    }
    if (name.trim() === ''){
        window.setTimeout(errorApp, 30)
    } else{
        todos.push (todo);
        addToLocalStorage(todos);
        todoInput.value = '';
        error.style.display ='none'
    }
}

const errorApp = () =>{
  error.style.display ='block';
	error.innerHTML = `<i class="fas fa-exclamation-circle"></i> Error, Please Enter a Valid Input`
}

const renderTodos = (todos) =>{
    myList.innerHTML = '';
    todos.forEach ((item) =>{
        const li = document.createElement('li');
        const label = document.createElement('label')
        const checkbox = document.createElement('input');
        const iBtn = document.createElement('i');
        checkbox.setAttribute ('type', 'checkbox');
        checkbox.setAttribute ('name', 'task');
        iBtn.setAttribute ('class', 'fas fa-times-circle flex-alignSelf--right');
        iBtn.setAttribute('id', 'delete');
        li.setAttribute ('data-key', item.id);
        li.setAttribute('class', 'flex checked');
        label.innerText = item.name
        label.contentEditable = true
        checkbox.checked = item.active === false;
        li.appendChild(checkbox)
        li.appendChild(label)
        li.appendChild(iBtn)
        myList.append(li);
    })
    countIncompleteTasksCount(todos)
    if (todos.length > 0){
        nav.style.display = 'block'
    } else{
        nav.style.display = 'none'
    }
}

const addToLocalStorage = (todos) =>{
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos)
}

const getFromLocalStorage = () => {
    const ref = localStorage.getItem('todos');
    if (ref){
        todos = JSON.parse(ref);

        renderTodos(todos)
    }
}
const toggle = (id) => {
    todos.forEach((item) => {
            if (item.id == id) {
                item.active = !item.active;
            }
        });
    addToLocalStorage(todos);
  }
  
const deleteTodo = (id) =>{
    todos = todos.filter(item =>  item.id != id);
    addToLocalStorage(todos)
}

const countIncompleteTasksCount = (item)=>{
   const incompleteCount = item.filter(task => task.active).length
   const taskString = incompleteCount <= 1 ? "task" : "tasks"
   taskCount.innerHTML = `${incompleteCount} ${taskString} active`;
} 

getFromLocalStorage();
