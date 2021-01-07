const api = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants&location=53.9006,27.567444&radius=10000&key=AIzaSyCVAtIn3L1lUn2_Tj580p_7iWaSwflyRZw`;

export const getDataTrip = async function a() {
  const response = await fetch(api);
  return response.json();
};

`https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants&location=53.9006,27.567444&radius=10000&key=AIzaSyCVAtIn3L1lUn2_Tj580p_7iWaSwflyRZw`;
