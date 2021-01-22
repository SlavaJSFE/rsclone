import createDOMElement from '../services/createDOMElement';

export default class Notes {
  constructor() {
    this.isOpen = false;
    this.isRewrite = false;
    this.target;
  }

  createNoteContainer = () => {
    const notesContainer = document.querySelector('.notes-container');

    const buttonContainer = createDOMElement('div', 'button-container', [
      createDOMElement('button', 'btn btn-success btn-create', 'Create Note'),
    ]);

    const notes = createDOMElement('div', 'notes');

    const createNote = createDOMElement('div', 'create_note-container', [
      createDOMElement('form', null, [
        createDOMElement(
          'textarea',
          'notes-textarea',
          null,
          null,
          ['placeholder', 'Write note...'],
          ['id', 'note-text'],
          ['maxlength', '96']
        ),
      ]),
      createDOMElement('i', 'material-icons accept-btn', 'check_circle_outline'),
      createDOMElement('i', 'material-icons close-btn', 'highlight_off'),
    ]);

    notesContainer.append(buttonContainer, notes, createNote);
    this.setListeners();
  };

  setListeners = () => {
    const createBtn = document.querySelector('.btn-create');
    createBtn.addEventListener('click', this.openCreateMenu);

    const acceptBtn = document.querySelector('.accept-btn');
    acceptBtn.addEventListener('click', this.createNote);

    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', this.closeNoteCreator);
  };

  openCreateMenu = () => {
    const createNoteContainer = document.querySelector('.create_note-container');

    if (this.isOpen === false) {
      createNoteContainer.classList.add('open');
      this.isOpen = true;
    } else {
      createNoteContainer.classList.remove('open');
      this.isOpen = false;
    }
  };

  createNote = () => {
    const noteContainer = document.querySelector('.notes');
    const textArea = document.querySelector('.notes-textarea');

    // textArea.value = '';

    if (this.isRewrite === true) {
      const noteContent = document.querySelector('.note-content');
      noteContent.innerHTML = textArea.value;
      this.isRewrite = false;
    } else {
      if (textArea.value === '') return;

      const note = createDOMElement('div', 'note', null, noteContainer);
      const noteContent = createDOMElement('h1', 'note-content', `${textArea.value}`, note);

      noteContent.style.transform = `rotate(${this.randomRotateNumber()}deg)`;
      noteContent.style.backgroundColor = this.randomColorNumber();

      note.addEventListener('mouseenter', () => {
        note.style.transform = 'scale(1.1)';
      });

      note.addEventListener('mouseleave', () => {
        note.style.transform = 'scale(1)';
      });

      note.addEventListener('click', this.rewriteNote);
    }

    textArea.value = '';
  };

  randomRotateNumber = () => Math.floor(Math.random() * (Math.abs(10 - -10) + 1) + -10);

  randomColorNumber() {
    const RANDOM_COLORS = ['#c2ff3d', '#ff3de8', '#3dc2ff', '#04e022', '#bc83e6', '#ebb328'];

    return RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)];
  }

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

  rewriteNote = (event) => {
    const { target } = event;
    let textArea = document.querySelector('.notes-textarea');
    const createContainer = document.querySelector('.create_note-container');

    createContainer.classList.add('open');
    this.isOpen = true;

    textArea.value += target.innerHTML;
    this.isRewrite = true;

    this.target = target;
  };
}
