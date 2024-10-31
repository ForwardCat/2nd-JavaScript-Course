const todoList = [{
  name: 'Make Dinner',
  dueDate: '28-10-2024'
}, {
  name: 'Wash dishes',
  dueDate: '28-10-2024'
}];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class="delete-todo-button js-delete-button">Delete</button>
    `;
    todoListHTML += html;    
  });
  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        renderTodoList();
      });
    });

  // document.querySelectorAll('.js-delete-button')
  //   .forEach((deleteButton, index) => {
  //     deleteButton.addEventListener('click', () => {
  //       todoList.splice(index, 1);
  //       renderTodoList();
  //     });
  //   });
}

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });
// document.body.addEventListener('keydown', (event) => {
//     if (event.key === 'Enter') {
//       addTodo();
//     }
//   })

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;
  
  todoList.push({
    // name: name,
    // dueDate: dueDate

    name,
    dueDate
  });
  inputElement.value = '';

  renderTodoList();
}