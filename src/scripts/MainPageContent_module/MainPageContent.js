import 'regenerator-runtime/runtime';
import objTranslate from '../Language_module/mainPageLang.component';
import { local } from '../constants/language';

export default class MainPageContent {
  constructor() {}

  static createMainPageContent() {
    const main_content_block = document.querySelector('.main-page-wrapper');

    const videoContainer = document.createElement('div');
    videoContainer.classList.add('videoContainer');

    const videoBlock1 = document.createElement('div');
    videoBlock1.classList.add('videoBlock1');
    const video1 = document.createElement('video');
    video1.classList.add('video1');
    video1.setAttribute('controls', 'controls');
    video1.setAttribute('poster', '../assets/images/VideoPicture1.jpg');
    const source1 = document.createElement('source');
    source1.setAttribute('src', 'assets/video/London.mp4');
    source1.setAttribute('type', 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"');

    const videoBlock2 = document.createElement('div');
    videoBlock2.classList.add('videoBlock2');
    const video2 = document.createElement('video');
    video2.classList.add('video1');
    video2.setAttribute('controls', 'controls');
    video2.setAttribute('poster', '../assets/images/VideoPicture2.jpg');
    const source2 = document.createElement('source');
    source2.setAttribute('src', 'assets/video/Riga.mp4');
    source2.setAttribute('type', 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"');

    const videoBlock3 = document.createElement('div');
    videoBlock3.classList.add('videoBlock3');
    const video3 = document.createElement('video');
    video3.classList.add('video1');
    video3.setAttribute('controls', 'controls');
    video3.setAttribute('poster', '../assets/images/VideoPicture3.jpg');
    const source3 = document.createElement('source');
    source3.setAttribute('src', 'assets/video/Warszawa.mp4');
    source3.setAttribute('type', 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"');

    const videoBlock4 = document.createElement('div');
    videoBlock4.classList.add('videoBlock4');
    const video4 = document.createElement('video');
    video4.classList.add('video1');
    video4.setAttribute('controls', 'controls');
    video4.setAttribute('poster', '../assets/images/VideoPicture4.jpg');
    const source4 = document.createElement('source');
    source4.setAttribute('src', 'assets/video/Minsk.mp4');
    source4.setAttribute('type', 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"');

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('infoContainer');

    const textInfoMainPage = document.createElement('div');
    textInfoMainPage.classList.add('infoMainPage');
    const infoMainPage = `<p class="infoMainPage__article">${
      objTranslate.mainPageLang[`infoMainPage__article_${local}`]
    }</p>
													<p class="infoMainPage__articleDescription">${
                            objTranslate.mainPageLang[`infoMainPage__articleDescription_${local}`]
                          }</p>
													<p class="infoMainPage__articleAdvantages">${
                            objTranslate.mainPageLang[`infoMainPage__articleAdvantages_${local}`]
                          }</p>
														<ul type="square">
															<li>${objTranslate.mainPageLang[`infoMainPage__articleAdvantages__li1_${local}`]}</li>
															<li>${objTranslate.mainPageLang[`infoMainPage__articleAdvantages__li2_${local}`]}</li>
															<li>${objTranslate.mainPageLang[`infoMainPage__articleAdvantages__li3_${local}`]}</li>
															<li>${objTranslate.mainPageLang[`infoMainPage__articleAdvantages__li4_${local}`]}</li>
														</ul>`;
    textInfoMainPage.innerHTML = infoMainPage;

    video1.appendChild(source1);
    videoBlock1.appendChild(video1);
    video2.appendChild(source2);
    videoBlock2.appendChild(video2);
    video3.appendChild(source3);
    videoBlock3.appendChild(video3);
    video4.appendChild(source4);
    videoBlock4.appendChild(video4);

    videoContainer.appendChild(videoBlock1);
    videoContainer.appendChild(videoBlock2);
    videoContainer.appendChild(videoBlock3);
    videoContainer.appendChild(videoBlock4);

    infoContainer.appendChild(textInfoMainPage);
    main_content_block.appendChild(infoContainer);

    main_content_block.appendChild(videoContainer);
  }
}
