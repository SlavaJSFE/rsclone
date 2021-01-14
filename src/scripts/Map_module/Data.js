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
