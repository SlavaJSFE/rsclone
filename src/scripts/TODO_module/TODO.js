import createDOMElement from '../services/createDOMElement';

export default class TODO {
  createTODOElements = () => {
    const container = document.querySelector('.todo-container');

    createDOMElement('header', null, [createDOMElement('h1', null, 'TODO List')], container);

    createDOMElement(
      'form',
      'todo-form',
      [
        createDOMElement(
          'input',
          'todo-input',
          null,
          null,
          ['type', 'text'],
          ['placeholder', 'Add your TODO item']
        ),
        createDOMElement(
          'button',
          'todo-button',
          [createDOMElement('i', 'fas fa-plus-square')],
          null,
          ['type', 'submit']
        ),
        createDOMElement('div', 'select', [
          createDOMElement(
            'select',
            'filter-todo',
            [
              createDOMElement('option', null, 'All', null, ['value', 'all']),
              createDOMElement('option', null, 'Completed', null, ['value', 'completed']),
              createDOMElement('option', null, 'Uncomplited', null, ['value', 'uncompleted']),
            ],
            null,
            ['name', 'todos']
          ),
        ]),
      ],
      container
    );

    createDOMElement(
      'div',
      'todoItems-container',
      [createDOMElement('ul', 'todo-list')],
      container
    );

    this.setListeners();
  };

  setListeners = () => {
    const addButton = document.querySelector('.todo-button');
    addButton.addEventListener('click', this.addTodoItem);

    const filterTodo = document.querySelector('.filter-todo');
    filterTodo.addEventListener('change', this.select);
  };

  addTodoItem = (event) => {
    event.preventDefault();
    const todoInput = document.querySelector('.todo-input');
    const todoList = document.querySelector('.todo-list');

    console.log(todoInput.value);

    const inputValue = todoInput.value.trim();
    if (inputValue === '') return;

    const todo = createDOMElement(
      'div',
      'todo',
      [
        createDOMElement('li', 'todo-item', inputValue),
        createDOMElement('button', 'complete-btn', [createDOMElement('i', 'fas fa-check')]),
        createDOMElement('button', 'trash-btn', [createDOMElement('i', 'fas fa-trash')]),
      ],
      todoList
    );

    todoInput.value = '';

    todo.addEventListener('click', this.handleTodoItem);
  };

  handleTodoItem = (event) => {
    const { target } = event;
    const todo = target.parentElement;
    console.log(target.closest('.trash-btn'));

    if (target.closest('.trash-btn')) {
      todo.classList.toggle('fall');
      todo.addEventListener('transitionend', () => {
        todo.remove();
      });
    }
    if (target.closest('.complete-btn')) {
      todo.classList.toggle('completed');
      console.log(todo);
    }
  };

  select = (event) => {
    const todoList = document.querySelector('.todo-list');
    const todos = todoList.childNodes;
    console.log(todos);
    const { target } = event;
    console.log(target.value);
    todos.forEach((item) => {
      if (target.value === 'all') {
        item.style.display = 'flex';
      } else if (target.value === 'completed') {
        if (item.classList.contains('completed')) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      } else {
        if (!item.classList.contains('completed')) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      }
    });
  };
}
