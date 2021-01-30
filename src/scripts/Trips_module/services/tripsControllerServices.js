const services = {
  switchPagination(event, pagination, currentActive) {
    const leftArrow = pagination.querySelector('.left-arrow');
    const rightArrow = pagination.querySelector('.right-arrow');
    const pageNumber = Number.isInteger(parseInt(event.target.textContent, 10));

    if (event.target === currentActive.firstChild) {
      return;
    }

    if (pageNumber) {
      currentActive.classList.remove('active');
      event.target.closest('li').classList.add('active');
    }

    if (event.target === leftArrow && currentActive.previousSibling !== pagination.firstChild) {
      currentActive.classList.remove('active');
      currentActive.previousSibling.classList.add('active');
    }

    if (event.target === rightArrow && currentActive.nextSibling !== pagination.lastChild) {
      currentActive.classList.remove('active');
      currentActive.nextSibling.classList.add('active');
    }
  },

  setArrowsDisabled(pagination, currentActive) {
    if (currentActive.nextSibling === pagination.lastChild) {
      pagination.lastChild.classList.add('disabled');
    } else {
      pagination.lastChild.classList.remove('disabled');
    }

    if (currentActive.previousSibling === pagination.firstChild) {
      pagination.firstChild.classList.add('disabled');
    } else {
      pagination.firstChild.classList.remove('disabled');
    }
  },
};

export default services;
