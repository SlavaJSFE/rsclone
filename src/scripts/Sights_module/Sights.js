import 'regenerator-runtime/runtime';
import { isoCountries, layerNames } from './constants';
import objTranslate from '../Language_module/sightsLang.component';
import { local } from '../constants/language';

export default class Sights {
  constructor() {
    this.apiKey = '5ae2e3f221c38a28845f05b62bbe071f19521c604a8cf46705e35fc4';
    this.pageLength = 5;

    this.offset = 0;
    this.count = 10;

    this.lon = null;
    this.lat = null;
  }

  createSightsInfo = () => {
    this.createSearcher();
  };

  apiGet(method, query) {
    let otmAPI = `https://api.opentripmap.com/0.1/en/places/${method}?apikey=${this.apiKey}`;
    if (query !== undefined) {
      otmAPI += `&${query}`;
    }
    return fetch(otmAPI)
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => {
        console.log('Fetch Error :-S', err);
      });
  }

  getCountryName(countryCode) {
    if (Object.prototype.hasOwnProperty.call(isoCountries, this.countryCode)) {
      return isoCountries[countryCode];
    }
    return countryCode;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getCategoryName(kinds) {
    const names = [];
    kinds.split(',').forEach((kind) => {
      const item = layerNames[kind];
      if (item) names.push(this.parsePlural(item.n)?.single);
    });
    return names.join(', ');
  }

  firstLoad() {
    if (this.lat && this.lon) {
      this.apiGet(
        'radius',
        `radius=1000&limit=${this.pageLength}&offset=${this.offset}&lon=${this.lon}&lat=${this.lat}&rate=2&format=count`,
      ).then((data) => {
        this.count = data.count;
        this.offset = 0;
        document.querySelector(
          '#info',
        ).innerHTML += `<p>${this.count} ${objTranslate.sightsLang[`articleDescription_${local}`]}</p>`;
        this.loadList();
      });
    }
  }

  parsePlural(label) {
    const sbSingle = new Array('');
    const sbPlural = new Array('');
    let spaces = 0;
    for (let i = 0; i < label.length; i += 1) {
      let ch = label.charAt(i);
      if (ch !== '[') {
        sbSingle.push(ch);
        sbPlural.push(ch);
        if (ch === ' ') {
          spaces += 1;
        } else {
          spaces = 0;
        }
      } else {
        const sb = new Array('');
        let j = i + 1;
        for (; j < label.length; j += 1) {
          ch = label.charAt(j);
          if (ch === ']') break;
          sb.push(ch);
        }
        const len = j - i - 1;
        i = sbPlural.length;
        sbPlural.splice(Math.max(0, i - len), len);
        sbPlural.push(sb.join(''));
        if (spaces !== 0) {
          i = sbSingle.length;
          sbSingle.splice(Math.max(0, i - spaces), spaces);
        }
        i = j;
      }
    }
    return {
      single: this.capitalizeFirstLetter(sbSingle.join('')),
      plural: sbPlural.join(''),
    };
  }

  loadList() {
    if (this.lon && this.lat) {
      this.apiGet(
        'radius',
        `radius=1000&limit=${this.pageLength}&offset=${this.offset}&lon=${this.lon}&lat=${this.lat}&rate=2&format=json`,
      ).then((data) => {
        const list = document.querySelector('#list');
        list.innerHTML = '';
        data.forEach((item) => {
          list.appendChild(this.createListItem(item));
        });
        const nextBtn = document.querySelector('#nextButton');
        if (this.count < this.offset + this.pageLength) {
          nextBtn.style.visibility = 'hidden';
        } else {
          nextBtn.style.visibility = 'visible';
          nextBtn.innerText = `Next (${this.offset + this.pageLength} of ${this.count})`;
        }
      });
    }
  }

  createListItem(item) {
    const a = document.createElement('a');
    a.className = 'list-group-item list-group-item-action';
    a.setAttribute('data-id', item.xid);
    a.innerHTML = `<h5 class="list-group-item-heading">${item.name}</h5>
				<p class="list-group-item-text">${this.getCategoryName(item.kinds)}</p>`;
    a.addEventListener('click', () => {
      document.querySelectorAll('#list a').forEach((i) => {
        i.classList.remove('active');
      });
      a.classList.add('active');
      const xid = a.getAttribute('data-id');
      this.apiGet(`xid/${xid}`).then((data) => { this.onShowPOI(data); });
    });
    return a;
  }

  onShowPOI(data) {
    const poi = document.querySelector('#poi');
    poi.innerHTML = '';
    if (data.preview) {
      poi.innerHTML += `<img class= "imgSights" src = "${data.preview.source}"> `;
    }
    poi.innerHTML += data.wikipedia_extracts
      ? data.wikipedia_extracts.html
      : data.info
        ? data.info.descr
        : 'No description';

    poi.innerHTML += `<p> <a target="_blank" href="${data.otm}">Show more at OpenTripMap</a></p> `;
  }

  createSearcher() {
    const main_content_block = document.querySelector('.main-content-section');

    const sights_container = document.createElement('div');
    sights_container.classList.add('sights-container');

    const form = document.createElement('form');
    form.setAttribute('id', 'search_form');
    form.classList.add('input-group');

    const searchInputField = document.createElement('div');
    searchInputField.classList.add('input-field');

    form.appendChild(searchInputField);

    const searchInput = document.createElement('input');
    searchInput.setAttribute('id', 'textbox');
    searchInput.setAttribute('type', 'search');
    searchInput.setAttribute('placeholder', objTranslate.sightsLang[`inputPlaceholder_${local}`]);
    searchInput.setAttribute('aria-describedby', 'button-search');
    searchInput.classList.add('sights-search');

    const searchButton = document.createElement('button');
    // button.setAttribute('id', 'button-search');
    searchButton.setAttribute('type', 'button');
    searchButton.classList.add('btn', 'btn-link', 'search');

    const searchButtonIcon = document.createElement('i');
    searchButtonIcon.classList.add('material-icons');
    searchButtonIcon.textContent = 'search';

    searchButton.appendChild(searchButtonIcon);
    searchInputField.append(searchInput, searchButton);

    const info = document.createElement('div');
    info.setAttribute('id', 'info');
    info.classList.add('alert');

    const mainBlockRow = document.createElement('div');
    mainBlockRow.classList.add('rows');

    const mainBlockRow_left = document.createElement('div');
    mainBlockRow_left.classList.add('col-12', 'col-lg-5');
    const list = document.createElement('div');
    list.setAttribute('id', 'list');
    list.classList.add('list-group');
    const mainBlockRow_left_nav = document.createElement('div');
    mainBlockRow_left_nav.classList.add('text-center');

    const mainBlockRow_right = document.createElement('div');
    mainBlockRow_right.classList.add('col-12', 'col-lg-7');
    const poi = document.createElement('div');
    poi.setAttribute('id', 'poi');

    const button_next = document.createElement('button');
    button_next.setAttribute('id', 'nextButton');
    button_next.setAttribute('type', 'button');
    button_next.classList.add('btn', 'btn-primary');
    button_next.innerHTML = 'button_next';

    mainBlockRow_left_nav.appendChild(button_next);

    mainBlockRow_left.appendChild(list);
    mainBlockRow_left.appendChild(mainBlockRow_left_nav);
    mainBlockRow_right.appendChild(poi);

    mainBlockRow.appendChild(mainBlockRow_left);
    mainBlockRow.appendChild(mainBlockRow_right);

    sights_container.appendChild(form);
    sights_container.appendChild(info);
    sights_container.appendChild(mainBlockRow);

    main_content_block.appendChild(sights_container);
  }

  search(name) {
    if (name === null) {
      name = document.querySelector('#textbox').value;
    }
    this.apiGet('geoname', `name=${name}`).then((data) => {
      let message = 'Name not found';
      if (data.status === 'OK') {
        message = `${data.name},${this.getCountryName(data.country)}`;
        // console.log(data)
        this.lon = data.lon;
        this.lat = data.lat;
        this.firstLoad();
      }
      document.querySelector('#info').innerHTML = `<p> ${message}</p > `;
      document.querySelector('#info').classList.add('alert-primary');
    });
    event.preventDefault();
  }

  showNext() {
    this.offset += this.pageLength;
    this.loadList();
  }
}
