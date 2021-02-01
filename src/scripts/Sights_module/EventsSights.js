import 'regenerator-runtime/runtime';
import Sights from './Sights';
import ContextMenu from './ContextMenu';

const sights = new Sights();

// document.querySelector('body').addEventListener('click', (event) => {
//   const buttonSearch = event.target.closest('.search');

//   if (buttonSearch !== null) {
//     sights.search(null);
//   }
// });

// document.querySelector('body').addEventListener('keydown', (event) => {
//   const buttonSearch = event.target.closest('.search');

//   if (buttonSearch !== null || event.keyCode === 13) {
//     sights.search(null);
//   }
// });

document.querySelector('body').addEventListener('click', (event) => {
  const nextButton = event.target.closest('#nextButton');
  if (nextButton !== null) {
    sights.showNext();
  }
});

(function () {
  function clickInsideElement(e, className) {
    let el = e.srcElement || e.target;
    if (el.classList.contains(className)) {
      return el;
    } else {
      while (el = el.parentNode) {
        if (el.classList && el.classList.contains(className)) {
          return el;
        }
      }
    }
    return false;
  }

  function getPosition(e) {
    let posx = 0, posy = 0;
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
      y: posy
    }
  }

  let taskItemClassName = "imgSights";
  let contextMenuLinkClassName = "context-menu__link", contextMenuActive = "context-menu--active";
  let taskItemInContext, clickCoords, clickCoordsX, clickCoordsY, menu;
  let menuState = 0, menuWidth, menuHeight, windowWidth,
    windowHeight;

  function initMenuFunction() {
    contextListener();
    clickListener();
    keyupListener();
    resizeListener();
  }

  function contextListener() {
    document.addEventListener("contextmenu", function (e) {
      taskItemInContext = clickInsideElement(e, taskItemClassName);

      if (taskItemInContext) {
        ContextMenu.createContextMenu();
        menu = document.querySelector("#context-menu");
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
    document.addEventListener("click", function (e) {
      let clickeElIsLink = clickInsideElement(e, contextMenuLinkClassName);

      if (clickeElIsLink) {
        e.preventDefault();
        menuItemListener(clickeElIsLink);
      } else {
        let button = e.which || e.button;
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
    }
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

    if ((windowWidth - clickCoordsX) < menuWidth) {
      menu.style.left = (windowWidth - menuWidth) - 0 + "px";
    } else {
      menu.style.left = clickCoordsX - 0 + "px";
    }

    if (Math.abs(windowHeight - clickCoordsY) < menuHeight) {
      menu.style.top = (windowHeight - menuHeight) - 0 + "px";
    } else {
      menu.style.top = clickCoordsY - 0 + "px";
    }
  }

  function menuItemListener(link) {
    const moveToAlbumSelectedId = link.getAttribute("data-action");
    switch (link.getAttribute("data-action")) {
      case "first": ContextMenu.rotateLeftPictureSights(); break;
      case "second": ContextMenu.rotateRightPictureSights(); break;
      case "third": ContextMenu.zoomPictureSights();
        const modal = document.querySelector('#myModal');
        const modalImg = document.querySelector('#img01');
        const captionText = document.querySelector('#caption');
        modal.style.display = "block";
        modalImg.src = document.querySelector(".imgSights").src;
        captionText.innerHTML = document.querySelector(".imgSights").alt;
        break;
      case "fourth": ContextMenu.mirrorPictureSights(); break;
    }
    toggleMenuOff();
  }
  initMenuFunction();

})();

document.querySelector('body').addEventListener('click', (event) => {
  const buttonClose = event.target.closest('.close');
  if (buttonClose !== null) {
    document.querySelector('#myModal').style.display = 'none';
  }
});
