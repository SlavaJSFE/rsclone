import createDOMElement from '../services/createDOMElement';



export default class Notes {
  createNotes() {
    const mainContent = document.querySelector('.main-content-block');
    const blockNotes = createDOMElement('div', 'block-notes');
    mainContent.append(blockNotes);
    const list = createDOMElement('div', 'list');
    blockNotes.appendChild(list);
    const box = createDOMElement('div', 'box');
    blockNotes.appendChild(box);
    const noteText = createDOMElement('p');
    const noteRussia = 'Текст заметки:';
    const noteEnglish = 'Note text:';
    noteText.append(noteEnglish);
    box.appendChild(noteText);
    const textarea = createDOMElement('textarea');
    box.appendChild(textarea);
    const noteData = createDOMElement('p');
    box.appendChild(noteData);
    const addNotes = createDOMElement('button', "add-btn");
    const addNotesRussia = 'добавить';
    const addNotesEnglish = 'add notes';
    addNotes.append(addNotesEnglish);
    box.appendChild(addNotes);
    const clearNote = createDOMElement('button', "clear-btn");
    const clearNoteRussia = 'удалить';
    const clearNoteEnglish = 'delete notes';
    clearNote.append(clearNoteEnglish);
    box.appendChild(clearNote);


    list.innerHTML = `<h3>Today is ${new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: 'numeric' }).format()}</h3>`

    let notes = [];
    let id;
    if (localStorage.getItem('todo') != undefined) {
      notes = JSON.parse(localStorage.getItem('todo'));
      id = notes.length;
      getDataFromStorage();
    } else {
      id = 0;
    }

    function getDataFromStorage() {
      notes.forEach(note => {
        list.insertAdjacentHTML('beforeend',
          `<div class = "note" data-id="${note.id}">
       <!-- <span class="notify ${note.notifyDate}">${note.notifyDate}</span>
        <span class="info ${note.notifyDate}">?</span>-->
        <span class="complete">V</span>
        <p class="${note.completed}">Text: ${note.text}, <br> created: ${note.createdDate}</p>
        <span class="delete"></span>
    </div>`)

      })
    }
    addNotes.onclick = function () {
      if (textarea.value.trim() === '') return
      let text = textarea.value;
      let date;
      let note = {
        id: id,
        text: text,
        createdDate: new Date().toLocaleDateString(),
        completed: '',
        notifyDate: date
      }
      id += 1;
      let i = notes.length;
      notes[i] = note;
      addNoteToList(note);
      localStorage.setItem('todo', JSON.stringify(notes));
      textarea.value = '';
    }

    function addNoteToList(note) {
      list.insertAdjacentHTML('beforeend',
        `<div class = "note" data-id="${note.id}">
         <!-- <span class="notify ${note.notifyDate}">${note.notifyDate}</span>
          <span class="info ${note.notifyDate}">?</span>-->
          <span class="complete">V</span>
          <p class="${note.completed}">Text: ${note.text}, <br> created: ${note.createdDate}</p>
          <span class="delete"></span>
      </div>`);
      addListenerToNote(list.lastChild);

    }

    function addListenerToNote(note) {
      note.addEventListener('click', event => {
        if (event.target.classList.contains('complete')) {
          event.target.nextElementSibling.classList.toggle('line-through');
          note.querySelector('p').classList.contains('line-through')
            ? notes[note.dataset.id].completed = 'line-through'
            : notes[note.dataset.id].completed = '';
          localStorage.setItem('todo', JSON.stringify(notes));
        } else if (event.target.classList.contains('delete')) {
          deleteNote(+note.dataset.id);
        }
      })
    }

    document.querySelectorAll('.note').forEach(note => addListenerToNote(note))
    clearNote.onclick = function () {
      localStorage.clear('todo');
      location.reload()
    }

  }
}