import createDOMElement from '../../services/createDOMElement';
import translate from '../../Language_module/tripsLang';
import { local } from '../../constants/language';

const services = {
  createNewTripBtn() {
    const button = createDOMElement('button', 'new-trip-btn btn', translate[`newTrip_${local}`]);
    createDOMElement('i', 'material-icons left', 'add', button);

    return button;
  },

  fillModalNewTrip(modal) {
    const modalWindow = modal;

    const createNewTrip = translate[`createNewTrip_${local}`];
    const tripName = translate[`tripName_${local}`];
    const your1stDestination = translate[`your1stDestination_${local}`];
    const startDate = translate[`startDate_${local}`];
    const endDate = translate[`endDate_${local}`];
    const createTrip = translate[`createTrip_${local}`];

    const modalContent = `<div class="modal-content">
                            <i class="material-icons close" id="close-modal-btn">close</i>
                            <h4>${createNewTrip}</h4>
                            <form id="new-trip-form">
                              <div class="input-field">
                                <i class="material-icons prefix">wysiwyg</i>
                                <input id="trip-name" type="text" required>
                                <label for="trip-name">${tripName}</label>
                              </div>
                              <div class="input-field">
                                <i class="material-icons prefix">place</i>
                                <input id="first-destination" class="autocomplete" type="text" required>
                                <label for="first-destination">${your1stDestination}</label>
                              </div>
                              <div class="input-field">
                                <i class="material-icons prefix">today</i>
                                <input id="start-date" type="text" class="datepicker">
                                <label for="start-date">${startDate}</label>
                              </div>
                              <div class="input-field">
                                <i class="material-icons prefix">today</i>
                                <input id="end-date" type="text" class="datepicker">
                                <label for="end-date">${endDate}</label>
                              </div>
                              <button id="new-trip-submit" class="btn waves-effect waves-light" type="submit" name="action">
                                ${createTrip}
                                <i class="material-icons right">send</i>
                              </button>
                            </form>
                          </div>`;

    modalWindow.innerHTML = modalContent;
  },

  fillModalNotAuthorized(modal) {
    const modalWindow = modal;

    const notAuthorized = translate[`notAuthorized_${local}`];
    const toBeAbleLogIn = translate[`toBeAbleLogIn_${local}`];

    const modalContent = `<div class="modal-content">
                            <h4>${notAuthorized}</h4>
                            <p>${toBeAbleLogIn}</p>
                            <i class="material-icons close" id="close-modal-btn">close</i>
                          </div>`;

    modalWindow.innerHTML = modalContent;
  },

  fillModalChangeTripName(modal) {
    const modalWindow = modal;

    const changeTripName = translate[`changeTripName_${local}`];
    const tripName = translate[`tripName_${local}`];
    const change = translate[`change_${local}`];

    const modalContent = `<div class="modal-content">
                            <i class="material-icons close" id="close-modal-btn">close</i>
                            <h4>${changeTripName}</h4>
                            <form id="change-name-form">
                              <div class="input-field">
                                <i class="material-icons prefix">wysiwyg</i>
                                <input id="change-name-input" class="autocomplete" type="text" required>
                                <label for="change-name-input">${tripName}</label>
                              </div>
                              <button id="change-name-submit" class="btn waves-effect waves-light" type="submit">
                                ${change}
                                <i class="material-icons right">send</i>
                              </button>
                            </form>
                          </div>`;

    modalWindow.innerHTML = modalContent;
  },

  fillModalChangeDates(modal) {
    const modalWindow = modal;

    const changeTripDates = translate[`changeTripDates_${local}`];
    const startDate = translate[`startDate_${local}`];
    const endDate = translate[`endDate_${local}`];
    const change = translate[`change_${local}`];

    const modalContent = `<div class="modal-content">
                            <i class="material-icons close" id="close-modal-btn">close</i>
                            <h4>${changeTripDates}</h4>
                            <form id="change-dates-form">
                              <div class="input-field">
                                <i class="material-icons prefix">today</i>
                                <input id="change-start-date" type="text" class="datepicker">
                                <label for="change-start-date">${startDate}</label>
                              </div>
                              <div class="input-field">
                                <i class="material-icons prefix">today</i>
                                <input id="change-end-date" type="text" class="datepicker">
                                <label for="change-end-date">${endDate}</label>
                              </div>
                              <button id="new-trip-submit" class="btn waves-effect waves-light" type="submit" name="action">
                                ${change}
                                <i class="material-icons right">send</i>
                              </button>
                            </form>
                          </div>`;

    modalWindow.innerHTML = modalContent;
  },

  fillModalRemoveTrip(modal) {
    const modalWindow = modal;

    const sureWantRemoveTrip = translate[`sureWantRemoveTrip_${local}`];
    const ifRemoveAllDeleted = translate[`ifRemoveAllDeleted_${local}`];
    const cancel = translate[`cancel_${local}`];
    const remove = translate[`remove_${local}`];

    const modalContent = `<div class="modal-content" id="remove-trip-modal">
                            <h4>${sureWantRemoveTrip}</h4>
                            <p>${ifRemoveAllDeleted}</p>
                            <i class="material-icons close" id="close-modal-btn">close</i>
                            <div class="two-modal-buttons">
                              <button id="cancel-remove-trip" class="btn waves-effect waves-light">${cancel}</button>
                              <button id="remove-trip-permanently" class="btn waves-effect waves-light" type="submit">
                                ${remove}
                                <i class="material-icons left">delete</i>
                              </button>
                            </div>
                          </div>`;

    modalWindow.innerHTML = modalContent;
  },

  fillModalAddDestination(modal) {
    const modalWindow = modal;

    const addDestination = translate[`addDestination_${local}`];
    const add = translate[`add_${local}`];

    const modalContent = `<div class="modal-content">
                            <i class="material-icons close" id="close-modal-btn">close</i>
                            <h4>${addDestination}</h4>
                            <form id="new-destination-form">
                              <div class="input-field">
                                <i class="material-icons prefix">place</i>
                                <input id="add-destination" class="autocomplete" type="text" required>
                                <label for="add-destination">${addDestination}</label>
                              </div>
                              <button id="new-destination-submit" class="btn waves-effect waves-light" type="submit">
                                ${add}
                                <i class="material-icons right">send</i>
                              </button>
                            </form>
                          </div>`;

    modalWindow.innerHTML = modalContent;
  },

  fillModalRemoveDestination(modal, currentCity) {
    const modalWindow = modal;

    const removeDestination = translate[`removeDestination_${local}`];
    const sureWantDelete = translate[`sureWantDelete_${local}`];
    const ifRemovePermDeleted = translate[`ifRemovePermDeleted_${local}`];
    const cancel = translate[`cancel_${local}`];
    const remove = translate[`remove_${local}`];

    const modalContent = `<div class="modal-content" id="remove-destination-modal">
                            <h4>${removeDestination}</h4>
                            <p>${sureWantDelete} \n
                            <span id="place-to-remove">${currentCity}</span> ${ifRemovePermDeleted}</p>
                            <i class="material-icons close" id="close-modal-btn">close</i>
                            <div class="two-modal-buttons">
                              <button id="cancel-remove-destination" class="btn waves-effect waves-light">${cancel}</button>
                              <button id="remove-destination-permanently" class="btn waves-effect waves-light" type="submit">
                                ${remove}
                                <i class="material-icons left">delete</i>
                              </button>
                            </div>
                          </div>`;

    modalWindow.innerHTML = modalContent;
  },

  createPagination(routeArray) {
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';

    if (routeArray.length < 2) {
      pagination.style.visibility = 'hidden';
    }

    const leftArrow = createDOMElement('li', 'waves-effect disabled', null, pagination);
    const linkLeftArrow = createDOMElement('a', null, null, leftArrow, ['href', '']);
    createDOMElement('i', 'material-icons left-arrow', 'chevron_left', linkLeftArrow);

    routeArray.forEach((destination, index) => {
      const liElement = createDOMElement('li', 'waves-effect', null, pagination);
      createDOMElement('a', null, `${index + 1}`, liElement, ['href', '']);

      if (index === 0) {
        // liElement.classList.remove('waves-effect');
        liElement.classList.add('active');
      }
    });

    const rightArrow = createDOMElement('li', 'waves-effect', null, pagination);
    const linkRightArrow = createDOMElement('a', null, null, rightArrow, ['href', '']);
    createDOMElement('i', 'material-icons right-arrow', 'chevron_right', linkRightArrow);
  },

  createNoTripsInfo() {
    const infoContainer = createDOMElement('div', 'no-trips z-depth-5');

    const image = createDOMElement('img', 'no-trips-image', null, null,
      ['src', './assets/images/bicycle-4426751_1280.jpg']);

    const title = createDOMElement('h2', 'no-trips-title',
      translate[`noTripsCreateAndPlanJourney_${local}`]);

    infoContainer.append(image, title);

    return infoContainer;
  },

  createImportantContent() {
    const importantContainer = createDOMElement('div', 'important-container');

    const goBackBtn = createDOMElement('div', 'btn back-btn', null, importantContainer);
    createDOMElement('i', 'material-icons', 'arrow_back', goBackBtn);

    const photo = createDOMElement('div', 'important-photo', null, importantContainer);
    createDOMElement('img', 'important-img', null, photo, ['src', './assets/images/passport-2642170_640.jpg']);
    createDOMElement('p', 'important-description',
      translate[`ifYouTravelDoNotForgetPassport_${local}`], photo);

    return importantContainer;
  },
};

export default services;
