const createGooglePopup = ({ OverlayView = google.maps.OverlayView, ...args }) => {
  class GooglePopup extends google.maps.OverlayView {
    constructor() {
      super();
      this.latlng = args.latlng;
      this.content = args.content;
      // debugger;
      this.content.classList.add('popup-bubble');

      const bubbleAnchor = document.createElement('div');
      bubbleAnchor.classList.add('popup-bubble-anchor');
      bubbleAnchor.append(this.content);
      this.containerDiv = document.createElement('div');
      this.containerDiv.classList.add('popup-container');
      this.containerDiv.appendChild(bubbleAnchor);
      GooglePopup.preventMapHitsAndGesturesFrom(this.containerDiv);
    }

    onAdd() {
      this.getPanes().floatPane.appendChild(this.containerDiv);
    }

    onRemove() {
      if (this.containerDiv.parentElement) {
        this.containerDiv.parentElement.removeChild(this.containerDiv);
      }
    }

    draw() {
      const divPosition = this.getProjection().fromLatLngToDivPixel(this.latlng);

      const display =
        Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ? 'block' : 'none';

      if (display === 'block') {
        this.containerDiv.style.left = divPosition.x + 'px';
        this.containerDiv.style.top = divPosition.y + 'px';
      }

      if (this.containerDiv.style.display !== display) {
        this.containerDiv.style.display = display;
      }
    }
  }

  return new GooglePopup();
};

export default createGooglePopup;
