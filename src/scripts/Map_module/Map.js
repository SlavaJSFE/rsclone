import { Loader } from '@googlemaps/js-api-loader';
import MarkerClusterer from '@googlemaps/markerclustererplus';
import { getPlaceCoord, getPlaceData, getXIdData } from './Data';
import createHTMLMapMarker from './HTMLMapMarker';
import { getIcon, layerNames } from '../constants/icon_constants';
import * as _ from 'lodash';
import createDOMElement from '../services/createDOMElement';
import { local } from '../constants/language';

const requests = [
  'historic_architecture',
  'towers',
  'fortifications',
  'monuments_and_memorials',
  'cultural',
  'nature_reserves',
  'religion',
];

const legendCategories = [
  { description: 'museums, art galleries', icon: '🏛️' },
  { description: 'sculptures,installation', icon: '🖼️' },
  { description: 'structures', icon: '🏡' },
  { description: 'theatres,music venues', icon: '🎭' },
  { description: 'fountains', icon: '⛲' },
  { description: 'monuments', icon: '🗿' },
  { description: 'streets', icon: '🛣️' },
  { description: 'churches', icon: '⛪' },
  { description: 'park,nature conservation areas,nature reserves', icon: '🏞️' },
  { description: 'cathedrals,monasteries,temples', icon: '🛐' },
  { description: 'defensive walls,fortification', icon: '🏰' },
  { description: 'synagogues', icon: '🕍' },
  { description: 'mosques', icon: '🕌' },
  { description: 'buddhist temples', icon: '☸️' },
  { description: 'cemeteries,war memorials', icon: '⚱️' },
];

export default class Map {
  constructor(town, id) {
    this.town = town;
    this.id = id;
    this.place_LON;
    this.place_LAT;
    this.map;
    this.data = [];
    this.markers = [];
    this.filterData;
  }

  handleApi() {
    getPlaceCoord(this.town)
      .then((coord) => {
        if (!coord) {
          this.initMap();
        }
        this.place_LON = coord.lon;
        this.place_LAT = coord.lat;
        const promiseArr = requests.map((request) => {
          return getPlaceData(this.place_LON, this.place_LAT, request).then((data) => {
            this.data.push(data);
          });
        });
        // after all async response handle next method
        Promise.all(promiseArr).then(() => this.initMap());
      })
      .catch((err) => console.log(err));

    return this;
  }

  initMap() {
    const loader = new Loader({
      apiKey: 'AIzaSyCVAtIn3L1lUn2_Tj580p_7iWaSwflyRZw',
      version: 'weekly',
      //!TODO
      language: `${local}`,
    });

    loader.load().then(() => {
      // coord of current town
      this.location = new google.maps.LatLng(this.place_LAT, this.place_LON);

      this.map = new google.maps.Map(document.getElementById('map'), {
        center: this.location,
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
      });

      this.createFilterData(this.data);

      this.filterData.forEach((place) => {
        this.createMarker(place);
      });

      this.createMarkerClusterer();

      this.createLegend();
      this.createTownSearch();
      this.createBackButton();

      this.setListeners();
    });
    return this;
  }

  setListeners = () => {
    const searchBtn = document.querySelector('.search-button');
    searchBtn.addEventListener('click', this.handleSearchButton);

    const backBtn = document.querySelector('.map-back');
    backBtn.addEventListener('click', this.goBackToMenu);
  };

  goBackToMenu = () => {
    const mapContainer = document.querySelector('#map');
    const tripsDetails = document.querySelector('.trip-details');
    tripsDetails.classList.remove('hidden');
    mapContainer.remove();
  };

  createMarker = (place) => {
    //get coord from api
    const lat = place.point.lat;
    const lng = place.point.lon;
    const coord = new google.maps.LatLng(lat, lng);

    const iconObj = getIcon(place.kinds);
    const icon = iconObj.e;

    // get index for background color of marker
    const index = legendCategories.findIndex((el) => el.icon === icon);

    const marker = createHTMLMapMarker({
      latlng: coord,
      map: this.map,
      html: `<div id="marker" data-category=${index} data-selected='false'><div class="marker-icon">${icon}</div></div>`,
    });

    //array of markers for clusterer
    this.markers.push(marker);

    google.maps.event.addListener(marker, 'click', (event) => {
      getXIdData(place.xid)
        .then((place) => {
          // current marker info
          event.stopPropagation();

          this.createInfoWindow(place);

          this.infoWindow.open(this.map, marker);

          this.infoWindow.addListener('domready', () => {
            // get path to marker
            this.target = event.path[1];
            const button = document.querySelector('.iw-button');
            button.addEventListener('click', this.handleAddButton);
          });

          this.map.addListener('click', () => {
            this.infoWindow.close();
          });
        })
        .catch((err) => console.log(err));
    });
  };

  createInfoWindow = (place) => {
    const content = `
    <div class="iw-container">
      <div class="iw-title">${place.name}</div>
      <div class="iw-content">
        <img class="iw-img" src="${place.preview.source}" height="150px" width="150px" alt="${
      place.name
    }"></img>
        <div class="iw-info">${place.wikipedia_extracts.text}</div>
      </div>
      <div class="iw-contacts">
        <div class="iw-address">Address: ${place.address.city || place.address.town}, ${
      place.address.country
    }, ${place.address.postcode}</div>
        <a href="https://www.wikidata.org/wiki/${
          place.wikidata
        }" class="iw-link" target="blank">Link: Wikidata</a>
      </div>
      <button class="iw-button">Add+</button>
    </div>
    `;

    this.infoWindow = new google.maps.InfoWindow({
      content: content,
      maxWidth: 350,
    });
  };

  createFilterData = (data) => {
    let arr = [];

    //filter duplicate
    data.forEach((item) => {
      arr.push(_.uniqBy(item, 'name'));
    });

    const filterCategories = [
      'pub',
      'foods',
      'shops',
      'marketplaces',
      // 'fountains',
      // 'other_theatres',
      // 'other_churches',
    ];

    //flat in one array, sort by increase and filter bad categories
    arr = arr
      .flat()
      .sort((a, b) => (a.dist > b.dist ? 1 : -1))
      .filter((item) => {
        let array = item.kinds.split(',');
        if (array.some((el) => filterCategories.indexOf(el) >= 0)) {
          return false;
        }
        return true;
      });

    // double filter duplicate
    let uniqArr = _.uniqBy(arr, 'name');

    // filter close dist markers
    let b = uniqArr[0].dist;
    this.filterData = arr.filter((el) => {
      if (el.dist - b < 10) return false;
      b = el.dist;
      return true;
    });

    this.filterData.push(uniqArr[0]);
  };

  createMarkerClusterer = () => {
    const markerCluster = new MarkerClusterer(this.map, this.markers, {
      gridSize: 100,
      imagePath: `./assets/images/m`,
    });

    this.markers = [];
  };

  createLegend = () => {
    const legend = document.getElementById('legend');

    legendCategories.forEach((obj, index) => {
      const description = obj.description;
      const icon = obj.icon;
      createDOMElement(
        'div',
        'legend',
        [
          createDOMElement('div', 'legend-icon', `${icon}`, null, ['data-category', `${index}`]),
          createDOMElement('div', 'legend-description', `${description}`),
        ],
        legend
      );
    });

    this.map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(legend);
  };

  createTownSearch = () => {
    const input = document.querySelector('.search-container');
    createDOMElement(
      'form',
      'search-location',
      [
        createDOMElement(
          'input',
          'search-input',
          null,
          null,
          ['type', 'search'],
          ['placeholder', 'Find your city']
        ),
        createDOMElement('button', 'search-button btn', [
          createDOMElement('i', 'material-icons', `search`),
        ]),
      ],
      input
    );

    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
  };

  createBackButton = () => {
    const backBtn = document.querySelector('.map_btn-container');

    createDOMElement(
      'div',
      'btn back-btn map-back',
      [createDOMElement('i', 'material-icons', 'arrow_back')],
      backBtn
    );

    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(backBtn);
  };

  handleAddButton = () => {
    const title = document.querySelector('.iw-title');

    if (this.target.dataset.selected === 'false') {
      this.target.dataset.selected = true;
    } else {
      this.target.dataset.selected = false;
    }

    const UID = JSON.parse(sessionStorage.getItem('user'));
    this.addToDataBase(UID, this.id, title.innerHTML);
  };

  async addToDataBase(UID, id, placeToVisit) {
    let response;
    let request = 'https://rsclone-833d0-default-rtdb.firebaseio.com/';
    let arrayOfPlaces = [];

    if (id) {
      request += `${UID}/${id}/placeToVisit/${this.town}.json`;
    } else {
      request += `${UID}/placeToVisit.json`;
    }

    response = await fetch(request);

    const data = await response.json();

    if (!data) {
      arrayOfPlaces.push(placeToVisit);
    } else {
      if (!data.includes(placeToVisit)) {
        data.push(placeToVisit);
        arrayOfPlaces = data;
      }
    }

    await fetch(request, {
      method: 'PUT',
      body: JSON.stringify(arrayOfPlaces),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  handleSearchButton = (event) => {
    event.preventDefault();
    const search = document.querySelector('.search-input');
    const value = search.value.toLowerCase();
    // this.town = search.value.toLowerCase();

    getPlaceCoord(value).then((coord) => {
      this.place_LON = coord.lon;
      this.place_LAT = coord.lat;

      const pos = {
        lat: this.place_LAT,
        lng: this.place_LON,
      };

      this.map.setCenter(pos);
      this.map.getCenter();

      const promiseArr = requests.map((request) => {
        return getPlaceData(this.place_LON, this.place_LAT, request).then((data) => {
          this.data.push(data);
        });
      });

      Promise.all(promiseArr).then(() => {
        this.createFilterData(this.data);

        this.filterData.forEach((place) => {
          this.createMarker(place);
        });

        this.createMarkerClusterer();
      });
    });
  };

  staticInitMap = () => {
    const loader = new Loader({
      apiKey: 'AIzaSyCVAtIn3L1lUn2_Tj580p_7iWaSwflyRZw',
      version: 'weekly',
      language: `${local}`,
    });

    loader.load().then(() => {
      // coord of current town
      this.location = new google.maps.LatLng(53.893009, 27.567444);

      this.map = new google.maps.Map(document.getElementById('map'), {
        center: this.location,
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.TERRAIN,
      });

      this.createLegend();
      this.createTownSearch();

      const button = document.querySelector('.search-button');
      button.addEventListener('click', this.handleSearchButton);
    });
  };
}
