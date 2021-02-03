import 'regenerator-runtime/runtime';
import objTranslate from '../Language_module/contextMenuLang.component';
import { local } from '../constants/language';
import Sights from './Sights';

export default class ContextMenu {
  static createContextMenu() {
    const poi = document.querySelector('#poi');
    const contextMenu = document.createElement('div');
    contextMenu.classList.add('contextMenu');
    const menubar = `<div id="context-menu" class="context-menu">
                        <ul class="context-menu__items">
                          <li class="context-menu__item">
                            <a href="#" class="context-menu__link" data-action="first"><i class="material-icons">rotate_left</i> ${objTranslate.contextMenuLang['contextMenu1_' + local]}</a>
                          </li>
                          <li class="context-menu__item">
                            <a href="#" class="context-menu__link" data-action="second"><i class="material-icons">rotate_right</i> ${objTranslate.contextMenuLang['contextMenu2_' + local]}</a>
                          </li>
                          <li class="context-menu__item">
                            <a href="#" class="context-menu__link" data-action="third"><i class="material-icons">zoom_out_map</i> ${objTranslate.contextMenuLang['contextMenu3_' + local]}</a>
                          </li>
                          <li class="context-menu__item">
                            <a href="#" class="context-menu__link" data-action="fourth"><i class="material-icons" style='transform: rotate(-90deg)'>flip</i> ${objTranslate.contextMenuLang['contextMenu4_' + local]}</a>
                          </li>
                        </ul>
                      </div>`;

    contextMenu.innerHTML = menubar;
    poi.appendChild(contextMenu);
  }

  static rotateLeftPictureSights() {
    document.querySelector('img').classList.toggle('rotateleftPictureSights');
  }

  static rotateRightPictureSights() {
    document.querySelector('img').classList.toggle('rotaterightPictureSights');
  }

  static mirrorPictureSights() {
    document.querySelector('img').classList.toggle('mirrorY');
  }

  static zoomPictureSights() {
    const appWrapper = document.querySelector('.app-wrapper');
    this.zoom = document.createElement('div');
    this.zoom.classList.add('zoom');
    const zoombar = `<div id="myModal" class="modalSights">
                      <span class="close">&times;</span>
                      <img class="modal-content" id="img01">
                      <div id="caption"></div>
                    </div>`;

    this.zoom.innerHTML = zoombar;
    appWrapper.appendChild(this.zoom);

    this.addButtonCloseFullScreenImgListener();
  }

  static addButtonCloseFullScreenImgListener() {
    this.zoom.addEventListener('click', () => {
      document.querySelector('#myModal').style.display = 'none';
    });
  }
}
