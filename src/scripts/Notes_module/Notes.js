import createDOMElement from '../services/createDOMElement';
import translate from '../Language_module/notesLang';
import { local } from '../constants/language';

export default class Notes {
  constructor(town, id) {
    this.town = town;
    this.id = id;
    this.isOpen = false;
  }

  createNoteContainer = () => {
    const notesContainer = document.querySelector('.notes-container');

    const createBtn = createDOMElement('button', 'btn btn-success btn-create',
      translate[`createNote_${local}`]);
    createDOMElement('i', 'material-icons left', 'edit', createBtn);

    const notes = createDOMElement('div', 'note-container');

    const createNote = createDOMElement('div', 'create_note-container', [
      createDOMElement('form', null, [
        createDOMElement(
          'textarea',
          'notes-textarea',
          null,
          null,
          ['placeholder', translate[`writeNote_${local}`]],
          ['id', 'note-text'],
          ['maxlength', '96'],
        ),
      ]),
      createDOMElement('i', 'material-icons accept-btn', 'check_circle_outline'),
      createDOMElement('i', 'material-icons close-btn', 'highlight_off'),
    ]);

    notesContainer.append(createBtn, notes, createNote);
    this.setListeners();

    this.getNotesFormDataBase();
  };

  setListeners = () => {
    const createBtn = document.querySelector('.btn-create');
    createBtn.addEventListener('click', this.openCreateMenu);

    const acceptBtn = document.querySelector('.accept-btn');
    acceptBtn.addEventListener('click', this.createNote);

    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', this.closeNoteCreator);

    if (this.id) {
      const backBtn = document.querySelector('.note-back');
      backBtn.addEventListener('click', this.backToMenu);
    }
  };

  backToMenu = () => {
    const noteContainer = document.querySelector('.notes-container');
    const backBtn = document.querySelector('.note-back');
    const tripsDetails = document.querySelector('.trip-details');

    tripsDetails.classList.remove('hidden');
    noteContainer.remove();
    backBtn.remove();
  };

  openCreateMenu = () => {
    const createNoteContainer = document.querySelector('.create_note-container');
    const textArea = document.querySelector('.notes-textarea');

    if (this.isOpen === false) {
      createNoteContainer.classList.add('open');
      textArea.focus();
      this.isOpen = true;
    } else {
      createNoteContainer.classList.remove('open');
      this.isOpen = false;
    }
  };

  createNote = (event, noteValue) => {
    const noteContainer = document.querySelector('.note-container');
    const textArea = document.querySelector('.notes-textarea');
    let inputValue;

    if (noteValue) {
      textArea.value = noteValue;
      inputValue = textArea.value.trim();
    } else {
      inputValue = textArea.value.trim();
    }

    if (textArea.value === '') return;

    const note = createDOMElement('div', 'note', null, noteContainer);
    const noteContent = createDOMElement('div', 'note-content', inputValue, note);

    noteContent.style.transform = `rotate(${this.randomRotateNumber()}deg)`;
    noteContent.style.backgroundColor = this.randomColorNumber();

    note.addEventListener('mouseenter', () => {
      note.style.transform = 'scale(1.1)';
    });

    note.addEventListener('mouseleave', () => {
      note.style.transform = 'scale(1)';
    });

    note.addEventListener('dblclick', this.removeNote);

    if (!noteValue) {
      this.addNoteToDatabase(inputValue);
    }

    textArea.value = '';
  };

  randomRotateNumber = () => Math.floor(Math.random() * (Math.abs(10 - -10) + 1) + -10);

  randomColorNumber() {
    this.randomColor = ['#c2ff3d', '#ff3de8', '#3dc2ff', '#04e022', '#bc83e6', '#ebb328'];

    return this.randomColor[Math.floor(Math.random() * this.randomColor.length)];
  }

  removeNote = (event) => {
    const { target } = event;
    this.removeNotesFormDataBase(target.innerHTML);
    target.remove();
  };

  closeNoteCreator = () => {
    const createContainer = document.querySelector('.create_note-container');
    const textArea = document.querySelector('.notes-textarea');

    if (this.isRewrite === true) {
      this.target.remove();
      this.isRewrite = false;
    }
    createContainer.classList.remove('open');
    this.isOpen = false;

    textArea.value = '';
  };

  async addNoteToDatabase(note) {
    let request = 'https://rsclone-833d0-default-rtdb.firebaseio.com/';
    let arrayOfNotes = [];
    const UID = JSON.parse(sessionStorage.getItem('user'));

    if (this.id) {
      request += `${UID}/${this.id}/Notes/${this.town}.json`;
    } else {
      request += `${UID}/Notes.json`;
    }

    const response = await fetch(request);

    const data = await response.json();
    if (!data) {
      arrayOfNotes.push(note);
    } else {
      if (!data.includes(note)) {
        data.push(note);
        arrayOfNotes = data;
      }
    }

    await fetch(request, {
      method: 'PUT',
      body: JSON.stringify(arrayOfNotes),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async getNotesFormDataBase() {
    let request = 'https://rsclone-833d0-default-rtdb.firebaseio.com/';
    const UID = JSON.parse(sessionStorage.getItem('user'));

    if (this.id) {
      request += `${UID}/${this.id}/Notes/${this.town}.json`;
    } else {
      request += `${UID}/Notes.json`;
    }

    const response = await fetch(request);

    const arrayOfNotes = await response.json();

    if (arrayOfNotes) {
      arrayOfNotes.forEach((note) => {
        this.createNote(null, note);
      });
    }
  }

  async removeNotesFormDataBase(removeNote) {
    let request = 'https://rsclone-833d0-default-rtdb.firebaseio.com/';
    const UID = JSON.parse(sessionStorage.getItem('user'));

    if (this.id) {
      request += `${UID}/${this.id}/Notes/${this.town}.json`;
    } else {
      request += `${UID}/Notes.json`;
    }

    const response = await fetch(request);

    let arrayOfNotes = await response.json();

    arrayOfNotes = arrayOfNotes.filter((note) => note !== removeNote);

    await fetch(request, {
      method: 'PUT',
      body: JSON.stringify(arrayOfNotes),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
