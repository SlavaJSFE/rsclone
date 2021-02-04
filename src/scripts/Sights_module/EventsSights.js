import 'regenerator-runtime/runtime';
import ContextMenu from './ContextMenu';

(function () {
  function clickInsideElement(e, className) {
    let el = e.srcElement || e.target;
    if (el.classList.contains(className)) {
      return el;
    }
    while ((el = el.parentNode)) {
      if (el.classList && el.classList.contains(className)) {
        return el;
      }
    }

    return false;
  }

  function getPosition(e) {
    let posx = 0;
    let posy = 0;
    if (!e) e = window.event;
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return {
      x: posx,
      y: posy,
    };
  }

  const taskItemClassName = 'imgSights';
  const contextMenuLinkClassName = 'context-menu__link';
  const contextMenuActive = 'context-menu--active';
  let taskItemInContext; let clickCoords; let clickCoordsX; let clickCoordsY; let
    menu;
  let menuState = 0;
  let menuWidth;
  let menuHeight;
  let windowWidth;
  let windowHeight;

  function initMenuFunction() {
    contextListener();
    clickListener();
    keyupListener();
    resizeListener();
  }

  function contextListener() {
    document.addEventListener('contextmenu', (e) => {
      taskItemInContext = clickInsideElement(e, taskItemClassName);

      if (taskItemInContext) {
        ContextMenu.createContextMenu();
        menu = document.querySelector('#context-menu');
        e.preventDefault();

        toggleMenuOn();
        positionMenu(e);
      } else {
        taskItemInContext = null;
        toggleMenuOff();
      }
    });
  }

  function clickListener() {
    document.addEventListener('click', (e) => {
      const clickeElIsLink = clickInsideElement(e, contextMenuLinkClassName);

      if (clickeElIsLink) {
        e.preventDefault();
        menuItemListener(clickeElIsLink);
      } else {
        const button = e.which || e.button;
        if (button === 1) {
          toggleMenuOff();
        }
      }
    });
  }

  function keyupListener() {
    window.onkeyup = function (e) {
      if (e.keyCode === 27) {
        toggleMenuOff();
      }
    };
  }

  function resizeListener() {
    window.onresize = function (_e) {
      toggleMenuOff();
    };
  }

  function toggleMenuOn() {
    if (menuState !== 1) {
      menuState = 1;
      menu.classList.add(contextMenuActive);
    }
  }

  function toggleMenuOff() {
    if (menuState !== 0) {
      menuState = 0;
      menu.classList.remove(contextMenuActive);
    }
  }

  function positionMenu(e) {
    clickCoords = getPosition(e);
    clickCoordsX = clickCoords.x;
    clickCoordsY = clickCoords.y;
    menuWidth = menu.offsetWidth + 4;
    menuHeight = menu.offsetHeight + 4;

    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    if (windowWidth - clickCoordsX < menuWidth) {
      menu.style.left = `${windowWidth - menuWidth - 0}px`;
    } else {
      menu.style.left = `${clickCoordsX - 0}px`;
    }

    if (Math.abs(windowHeight - clickCoordsY) < menuHeight) {
      menu.style.top = `${windowHeight - menuHeight - 0}px`;
    } else {
      menu.style.top = `${clickCoordsY - 0}px`;
    }
  }

  function menuItemListener(link) {
    const moveToAlbumSelectedId = link.getAttribute('data-action');
    switch (link.getAttribute('data-action')) {
      case 'first':
        ContextMenu.rotateLeftPictureSights();
        break;
      case 'second':
        ContextMenu.rotateRightPictureSights();
        break;
      case 'third':
        ContextMenu.zoomPictureSights();
        const modal = document.querySelector('#myModal');
        const modalImg = document.querySelector('#img01');
        const captionText = document.querySelector('#caption');
        modal.style.display = 'block';
        modalImg.src = document.querySelector('.imgSights').src;
        captionText.innerHTML = document.querySelector('.imgSights').alt;
        break;
      case 'fourth':
        ContextMenu.mirrorPictureSights();
        break;
    }
    toggleMenuOff();
  }
  initMenuFunction();
}());
