import createDOMElement from '../../services/createDOMElement.js';

const services = {
  fillModalNewTrip() {
    const modalWindow = document.getElementById('modal1');
    const modalContent = createDOMElement('div', 'modal-content');
    createDOMElement('h4', null, 'Create New Trip', modalContent);

    const form = createDOMElement('form', null, null, modalContent, ['id', 'new-trip-form']);

    const inputTripName = createDOMElement('div', 'input-field', null, form);
    createDOMElement('i', 'material-icons prefix', 'wysiwyg', inputTripName);
    createDOMElement('input', null, null, inputTripName, ['type', 'text'], ['id', 'trip-name'], ['required', '']);
    createDOMElement('label', null, 'Trip Name', inputTripName, ['for', 'trip-name']);

    const inputDestination = createDOMElement('div', 'input-field', null, form);
    createDOMElement('i', 'material-icons prefix', 'place', inputDestination);
    createDOMElement('input', 'autocomplete', null, inputDestination,
      ['type', 'text'], ['id', 'first-destination'], ['required', '']);
    createDOMElement('label', 'active', 'Your First Destination', inputDestination, ['for', 'first-destination']);

    const inputStartDate = createDOMElement('div', 'input-field', null, form);
    createDOMElement('i', 'material-icons prefix', 'today', inputStartDate);
    createDOMElement('input', 'datepicker', null, inputStartDate, ['type', 'text'], ['id', 'start-date']);
    createDOMElement('label', null, 'Start Date', inputStartDate, ['for', 'start-date']);

    const inputEndDate = createDOMElement('div', 'input-field', null, form);
    createDOMElement('i', 'material-icons prefix', 'today', inputEndDate);
    createDOMElement('input', 'datepicker', null, inputEndDate, ['type', 'text'], ['id', 'end-date']);
    createDOMElement('label', null, 'End Date', inputEndDate, ['for', 'end-date']);

    const button = createDOMElement('button', 'btn waves-effect waves-light', 'Create New Trip', form,
      ['type', 'submit'], ['new-trip-submit']);
    createDOMElement('i', 'material-icons right', 'send', button);

    modalWindow.innerHTML = '';
    modalWindow.appendChild(modalContent);
  }
};

export default services;
