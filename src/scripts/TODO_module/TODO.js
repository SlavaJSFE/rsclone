import createDOMElement from '../services/createDOMElement';

export default class TODO {
  constructor(town, id) {
    this.town = town;
    this.id = id;
  }

  createTODOElements = () => {
    const container = document.querySelector('.todo-container');

    createDOMElement(
      'header',
      'todo-header',
      [createDOMElement('h2', null, 'Places to visit')],
      container
    );

    createDOMElement(
      'form',
      'todo-form',
      [
        createDOMElement('div', 'input-field', [
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
            'todo-button btn',
            [createDOMElement('i', 'material-icons', 'add')],
            null,
            ['type', 'submit']
          ),
        ]),
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
        createDOMElement('button', 'btn complete-btn', [
          createDOMElement('i', 'material-icons', 'done'),
        ]),
        createDOMElement('button', 'btn trash-btn', [
          createDOMElement('i', 'material-icons', 'delete'),
        ]),
      ],
      todoList
    );

    todoInput.value = '';

    if (!place) {
      this.setPlacesToDataBase(inputValue);
    }

    todo.addEventListener('click', this.handleTodoItem);
  };

  async setPlacesToDataBase(placeToVisit) {
    let response;
    let request = 'https://rsclone-833d0-default-rtdb.firebaseio.com/';
    let arrayOfPlaces = [];
    const UID = JSON.parse(sessionStorage.getItem('user'));

    if (this.id) {
      request += `${UID}/${this.id}/placeToVisit/${this.town}.json`;
    } else {
      request += `${UID}/placeToVisit.json`;
    }

    response = await fetch(request);

    const data = await response.json();
    if (!data) {
      arrayOfPlaces.push(placeToVisit);
    } else {
      if (!data.includes(placeToVisit)) {
        data.push(placeToVisit);
        arrayOfPlaces = data;
      }
    }

    await fetch(request, {
      method: 'PUT',
      body: JSON.stringify(arrayOfPlaces),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getPlacesFormDataBase() {
    let response;
    let request = 'https://rsclone-833d0-default-rtdb.firebaseio.com/';
    const UID = JSON.parse(sessionStorage.getItem('user'));

    if (this.id) {
      request += `${UID}/${this.id}/placeToVisit/${this.town}.json`;
    } else {
      request += `${UID}/placeToVisit.json`;
    }

    response = await fetch(request);

    const arrayOfPlaces = await response.json();

    if (arrayOfPlaces) {
      arrayOfPlaces.forEach((item) => {
        this.addTodoItem(null, item);
      });
    }
  }

  async removeFromDatabase(placeToVisit) {
    let response;
    let request = 'https://rsclone-833d0-default-rtdb.firebaseio.com/';
    const UID = JSON.parse(sessionStorage.getItem('user'));

    if (this.id) {
      request += `${UID}/${this.id}/placeToVisit/${this.town}.json`;
    } else {
      request += `${UID}/placeToVisit.json`;
    }

    response = await fetch(request);

    let arrayOfPlaces = await response.json();

    arrayOfPlaces = arrayOfPlaces.filter((place) => place !== placeToVisit);

    await fetch(request, {
      method: 'PUT',
      body: JSON.stringify(arrayOfPlaces),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  handleTodoItem = (event) => {
    const { target } = event;
    const todo = target.closest('.todo');
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
