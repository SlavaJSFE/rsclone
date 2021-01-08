import { Loader } from '@googlemaps/js-api-loader';
import { getDataTrip, getDataProperties } from './Data';

const shape = {
  coords: [1, 1, 1, 20, 18, 20, 18, 1],
  type: 'poly',
};

export default class Map {
  constructor() {
    this.markers;
    this.map;
    this.data = {
      icon: [],
      coordinates: [],
      name: [],
    };
    this.location;
    this.service;
    this.infowindow;
  }

  // handleMethods() {
  //   getDataTrip().then((data) => {
  //     data.results.forEach((item) => {
  //       this.data.icon.push(item.icon);
  //       this.data.coordinates.push(item.geometry.location);
  //       this.data.name.push(item.name);
  //     });
  //     console.log(this.data);

  //     this.initMap();
  //   });

  //   return this;
  // }

  initMap() {
    const loader = new Loader({
      apiKey: 'AIzaSyCVAtIn3L1lUn2_Tj580p_7iWaSwflyRZw',
      libraries: ['places'],
      version: 'weekly',
    });

    loader.load().then(() => {
      this.location = new google.maps.LatLng(53.9006, 27.567444);
      this.infowindow = new google.maps.InfoWindow();

      this.map = new google.maps.Map(document.getElementById('map'), {
        center: this.location,
        zoom: 12,
      });

      this.createPlacesService();
    });
    return this;
  }

  createPlacesService = () => {
    this.service = new google.maps.places.PlacesService(this.map);

    const request = {
      location: this.location,
      radius: 2500,
      type: ['restaurant'],
    };

    this.service.nearbySearch(request, this.isReadyToCreateMarker);
  };

  isReadyToCreateMarker = (results, status) => {
    console.log(results);
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        this.createMarker(results[i]);
      }
    }
  };

  createMarker = (place) => {
    const marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location,
    });
    google.maps.event.addListener(marker, 'click', () => {
      this.infowindow.setContent(place.name);
      this.infowindow.open(this.map);
    });
  };
}
