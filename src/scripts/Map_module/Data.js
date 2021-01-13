// const api = `https://api.opentripmap.com/0.1/en/places/radius?radius=3000&lon=27.5676043&lat=53.90423209999999&limit=300&apikey=5ae2e3f221c38a28845f05b6b4769a5488ad4d3bf7cfc1d16c76e7a4
// `;

export const getPlaceCoord = async function a(townName) {
  const response = await fetch(`https://api.opentripmap.com/0.1/en/places/geoname?name=${townName}&apikey=5ae2e3f221c38a28845f05b6b4769a5488ad4d3bf7cfc1d16c76e7a4
  `);
  return response.json();
};

export const getPlaceData = async function b(lon, lat, kind = 'interesting_places') {
  const response = await fetch(`https://api.opentripmap.com/0.1/en/places/radius?radius=30000&lon=${lon}&lat=${lat}1&kinds=${kind}&rate=3h&format=json&apikey=5ae2e3f221c38a28845f05b6b4769a5488ad4d3bf7cfc1d16c76e7a4
  `);
  return response.json();
};

export const getXIdData = async function b(xid) {
  const response = await fetch(
    `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=5ae2e3f221c38a28845f05b6b4769a5488ad4d3bf7cfc1d16c76e7a4`
  );
  return response.json();
};

// format=json
// `https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=tourist_attraction&location=53.9006,27.567444&radius=10000&key=AIzaSyCVAtIn3L1lUn2_Tj580p_7iWaSwflyRZw`;

// `https://maps.googleapis.com/maps/api/place/nearbysearch/json?type=tourist_attraction&location=53.9006,27.567444&radius=10000&key=AIzaSyCVAtIn3L1lUn2_Tj580p_7iWaSwflyRZw`;
