import createDOMElement from '../services/createDOMElement';

export default class TODO {
  constructor(town, id) {
    this.town = town;
    this.id = id;
  }

  createTODOElements = () => {
    const container = document.querySelector('.todo-container');

    createDOMElement('header', null, [createDOMElement('h1', null, 'Places to visit')], container);

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
              createDOMElement('option', null, 'Uncompleted', null, ['value', 'uncompleted']),
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
    this.getPlacesFormDataBase();
  };

  setListeners = () => {
    const addButton = document.querySelector('.todo-button');
    addButton.addEventListener('click', this.addTodoItem);

    const filterTodo = document.querySelector('.filter-todo');
    filterTodo.addEventListener('change', this.filterTodo);

    if (this.id) {
      const backToMenuBtn = document.querySelector('.todo-back');
      backToMenuBtn.addEventListener('click', this.goBackToMenu);
    }
  };

  addTodoItem = (event, place) => {
    if (event) {
      event.preventDefault();
    }
    const todoInput = document.querySelector('.todo-input');
    const todoList = document.querySelector('.todo-list');
    let inputValue;

    if (place) {
      todoInput.value = place;
      inputValue = todoInput.value.trim();
    } else {
      inputValue = todoInput.value.trim();
    }

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

  async getPlacesFormDataBase() {
    const UID = JSON.parse(sessionStorage.getItem('user'));

    let response = await fetch(
      `https://rsclone-833d0-default-rtdb.firebaseio.com/${UID}/${this.id}/placeToVisit/${this.town}.json`
    );

    const arrayOfPlaces = await response.json();
    console.log(arrayOfPlaces);

    arrayOfPlaces.forEach((item) => {
      this.addTodoItem(null, item);
    });
  }

  async removeFromDatabase(placeToVisit) {
    const UID = JSON.parse(sessionStorage.getItem('user'));

    let response = await fetch(
      `https://rsclone-833d0-default-rtdb.firebaseio.com/${UID}/${this.id}/placeToVisit/${this.town}.json`
    );

    let arrayOfPlaces = await response.json();

    arrayOfPlaces = arrayOfPlaces.filter((place) => place !== placeToVisit);

    await fetch(
      `https://rsclone-833d0-default-rtdb.firebaseio.com/${UID}/${this.id}/placeToVisit/${this.town}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(arrayOfPlaces),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  handleTodoItem = (event) => {
    const { target } = event;
    const todo = target.parentElement;
    const arrOfChildren = todo.children;

    if (target.closest('.trash-btn')) {
      todo.classList.toggle('fall');
      todo.addEventListener('transitionend', () => {
        todo.remove();
      });
      this.removeFromDatabase(arrOfChildren[0].innerHTML);
    }
    if (target.closest('.complete-btn')) {
      todo.classList.toggle('completed');
    }
  };

  filterTodo = (event) => {
    const todoList = document.querySelector('.todo-list');
    const todos = todoList.childNodes;

    const { target } = event;

    todos.forEach((item) => {
      switch (target.value) {
        case 'All':
          item.style.display = 'flex';
          break;
        case 'Completed':
          if (item.classList.contains('completed')) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
          break;
        case 'Uncompleted':
          if (!item.classList.contains('completed')) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
      }
    });
  };

  goBackToMenu = () => {
    const todoContainer = document.querySelector('.todo-container');
    const backBtn = document.querySelector('.todo-back');
    const tripsDetails = document.querySelector('.trip-details');
    tripsDetails.classList.remove('hidden');
    todoContainer.remove();
    backBtn.remove();
  };
}
