import { Loader } from '@googlemaps/js-api-loader';
// import { google } from 'google-maps';
import MarkerClusterer from '@googlemaps/markerclustererplus';
// import mapboxgl from 'mapbox-gl';
import { getDataTrip, getDataProperties } from './Data';

const locations = [];
const title = [];
const description = [];

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
  }

  handleMethods() {
    getDataTrip().then((data) => {
      data.results.forEach((item) => {
        this.data.icon.push(item.icon);
        this.data.coordinates.push(item.geometry.location);
        this.data.name.push(item.name);
      });
      console.log(this.data);

      this.initMap();
    });

    return this;
  }

  initMap() {
    const loader = new Loader({
      apiKey: 'AIzaSyCVAtIn3L1lUn2_Tj580p_7iWaSwflyRZw',
      version: 'weekly',
    });
    loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 53.9006, lng: 27.567444 },
        zoom: 12,
      });

      this.createMarker();
    });
    return this;
  }

  createMarker = () => {
    this.markers = this.data.coordinates.map((item, index) => {
      const image = {
        url: this.data.icon[index],
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(20, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32),
        scaledSize: new google.maps.Size(20, 20),
      };

      new google.maps.Marker({
        position: this.data.coordinates[index],
        icon: image,
        shape: shape,
        title: this.data.name,
        map: this.map,
      });
    });
  };
}
