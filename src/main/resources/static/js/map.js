////////////////////// Map Parameters ////////////////////////////////////

// SUNY-Oswego Token, locked down to certain domain access
mapboxgl.accessToken = "pk.eyJ1Ijoic3VueS1vc3dlZ28iLCJhIjoiY2wzYnI3dThoMDdtcDNqbzJhc2NrNHIyNCJ9.bC45EQZcAuxRLvk_AvR5Cw";
const defaultStyle = "mapbox://styles/suny-oswego/cl3bphxsb005s14qz971ul1vq"; // Default style URL, managed through Mapbox
const satelliteStyle = "mapbox://styles/mapbox/satellite-v9"; // Satellite Style URL
let currentStyle = 0; // Holds current map style

// Creates Map object
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: defaultStyle, // Default Style
  center: [-76.543134, 43.453054], // Starting geo-positon of map
  zoom: 15.65, // Initial zoom level start
  bearing: -37.25, // Starting cardinality slightly NW
  pitch: 0, // Initially top-down view of map
});

// Add Map Zoom and Rotation Control buttons
const nav = new mapboxgl.NavigationControl({
  compass: true,
});
map.addControl(nav, "bottom-left");

////////////////////// Map Functions ////////////////////////////////////
// Direct interactions and manipulations of the map /////////////////////

// When clicking on the map attempts to get features at clicked point
map.on("click", (event) => {
  try {
    // Attempts to get features within certain radius of "bound" parameter
    const features = boundFeatures(0.5, map, event);
    getBuildingAssets(features[0].properties); // passes building number and grabbed feature under point
  } catch {
    noBuildingSelected(); // no building selected context
  }
});

// Bounds feature within a box-like radius, returns array of features under point
// sorted closed to furthest
function boundFeatures(bound, map, event) {
  const bbox = [ // bounding box
    // based off of pixel width to determine bounds
    [event.point.x - bound, event.point.y - bound],
    [event.point.x + bound, event.point.y + bound],
  ];
  return map.queryRenderedFeatures(bbox, { layers: ["buildings"] }); // Returns array of building feature data
}

map.on("click", "buildings", (e) => {
  // If Zoom level is less than 18, use zoom level of 18
  const constraintZoom = map.getZoom() > 18 ? map.getZoom() : 18;
  // notes higher zoom level means more magnification
  map.flyTo({
    center: e.features[0].geometry.coordinates, // centers map based on exact point in geoJson array
    zoom: constraintZoom, // new constrained zoom, since this is an object data value, variable needs to be declares up top
    speed: 0.3,
  });
});

// Changes mouse cursor to pointer when over building feature
map.on("mouseenter", "buildings", () => {
  map.getCanvas().style.cursor = "pointer";
});

// Changes to default mouse icon when off of building feature
map.on("mouseleave", "buildings", () => {
  map.getCanvas().style.cursor = "";
});

// Populates map data context based on touch screen movement
map.on("touchmove", (event) => {
  populateLiveMapContext(event);
});

// Populates live map context when detecting mouse movement
map.on("mousemove", (event) => {
  populateLiveMapContext(event);
});

// Fly to region as selected from dropdown menu
function flyToRegionDropdown(id) {
  map.flyTo({
    center: regions[id].center,
    zoom: regions[id].zoom,
    speed: 0.6,
    bearing: regions[id].bearing,
  });
}

function toggleMapStyle() {
  // toggles map style between default and satellite view

  // If currentStyle is 0 , changed to satellite view
  if (currentStyle === 0) {
    map.setLayoutProperty("mapbox-satellite", "visibility", "visible");
    document.getElementById("style-toggle").innerHTML = "Default View";
    currentStyle = 1;
  } else {
    // If currentStyle is 1, change to default style
    map.setLayoutProperty("mapbox-satellite", "visibility", "none");
    document.getElementById("style-toggle").innerHTML = "Satellite View";
    currentStyle = 0;
  }
}

////////////////////// Fetch Requests ////////////////////////////////////

// gets Asset from dropdown list and populates dropdown list
function getAssetFromDropDown(assetId) {
  fetch(`/assets/${assetId}`)
    .then((response) => {
      return response.json(); // gets Asset and returns as Json
    })
    .then((data) => {
      populateAssetContext(data); // calls Populate Asset Context
    })
    .catch((err) => {
      // if eror in process assumes a fetch problem
      console.log("Fetch Problem: " + err.message);
    });
}

// Gets building assets from dropdown and populates building context
function getBuildingAssets(buildingData) {
  fetch(`/assets/property/${buildingData.building_code}`) // attempts to get building assets by passing in building number/code
    .then((response) => {
      return response.json();
    })
    .then((assetDataJson) => {
      populateBuildingContext(assetDataJson, buildingData); // passed buildingData and assetDataJson to build out building context and asset dropdown list
    })
    .catch((err) => {
      // displays message if previous chain fails, and populates Building Data without asset data
      console.log("Fetch problem: " + err.message);
      populateBuildingContext(null, buildingData);
    });
}

function refocusBuilding(building_code) {
  fetch(`/property/${building_code}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      map.flyTo({
        center: [data.longitude, data.latitude],
        zoom: 18,
        speed: 0.6,
      });
      getBuildingAssets(data);
    })
    .catch((err) => {
      console.log("Fetch problem: " + err.message);
    });
}

////////////////////// Progmatic HTML Population ////////////////////////////////////

// Populates building context, also attempts to populate asset list dropdown
function populateBuildingContext(assetData, property) {
  let assetsAvailable = assetData ? assetData.length : "No Assets Available"; // checks to see if asset data is available, needed to show no assets available on building context

  console.log(property);
  // sets html with building context
  document.getElementById("building-context").innerHTML = ` 
    <div><h2 class="header">${property.building_name}</h2></div>
    <div class="smalltext">
    <div><strong>Building No: </strong>${property.building_code}</div>
    <div><strong>Ft<sup>2</sup>: </strong>${property.square_ft}</div>
    <div><strong>Asset Count: </strong>${assetsAvailable}</div>
    <div><a href="https://aim.sucf.suny.edu/fmax/screen/MASTER_ASSET_VIEW?assetTag=${property.asset_id}" target="_blank"><strong>AIM Asset Property</strong></a></div>
    `;

  // attempts to get building picture
  document.getElementsByClassName("fs-logo-building")[0].src = `
    images/building-images/${property.building_code}.jpg
    `;

  if (assetData) {
    // if assetData has some length populates dropdown list
    let select = document.createElement("select");
    select.id = "asset-dropdown";

    for (let i = 0; i < assetData.length; i++) {
      // loops through asset data array and adds asset elements
      let assetOption =
        assetData[i].asset_id +
        " : " +
        assetData[i].description +
        " : " +
        assetData[i].assetType +
        " : " +
        assetData[i].assetGroup;
      let assetElement = document.createElement("option");
      assetElement.textContent = assetOption;
      assetElement.value = assetData[i].asset_id;
      select.appendChild(assetElement);
    }

    select.addEventListener("change", () => {
      // attaches event listener to dropdown that populates asset context based on selection
      getAssetFromDropDown(select.value);
    });
    document.getElementById("building-context").appendChild(select);
  } else {
    // if assetData =
    let errorMessageAsset = document.createElement("div");
    errorMessageAsset.innerHTML = `<div><h3>Error Retrieving Building Data</h3</div>`;
    document.getElementById("building-context").appendChild(errorMessageAsset);
  }
}

function populateAssetContext(asset) {
  // populates map context box
  let property = asset.property; // same thing as "building code"

  document.getElementById(
    "asset-context-header"
  ).innerHTML = `${asset.asset_id}`;

  document.getElementById("asset-context-data").innerHTML = `
    <div><strong>Group: </strong>${asset.assetGroup}</div>
    <div><strong>Type: </strong>${asset.assetType}</div>
    <div><strong>Description: </strong>${asset.description}</div>
    <div><strong>Facility: </strong>${asset.facility}</div>
    <div><strong>Location: </strong>${asset.location}</div>
    <div><strong>Status: </strong>${asset.status}</div>
    <div><a href="https://aim.sucf.suny.edu/fmax/screen/MASTER_ASSET_VIEW?assetTag=${asset.id}" target="_blank"><strong>AIM Asset View</strong></a></div>
    `;

  // document.getElementById("assset-context-controls").innerHTML = "";

  let refocus_button = document.createElement("button");
  refocus_button.classList.add("button");
  refocus_button.innerHTML = "Refocus Parent Building";
  refocus_button.addEventListener("click", () => {
    refocusBuilding(asset.property);
  });

  document.getElementById("asset-context-controls").replaceWith(refocus_button);
}

function populateLiveMapContext(event) {
  // populates map context box based on certain movement conditions
  // mouse moving, touchscreen, etc.
  document.getElementById("live-map-context").innerHTML = `
    <div><h2 class="header">Live Map Data</h2></div>
    <div><strong>Coords X:</strong> ${event.point.x}</div>
    <div><strong>Coords Y:</strong> ${event.point.y}</div>
    <div><strong>Mouse Lng:</strong> ${event.lngLat.lng}</div>
    <div><strong>Mouse Lat:</strong> ${event.lngLat.lat}</div>
    <div><strong>Center Lng</strong> ${map.getCenter().lng}</div>
    <div><strong>Center Lat:</strong> ${map.getCenter().lat}</div>
    <div><strong>Zoom:</strong> ${map.getZoom()}</div>
    <div><strong>Bearing:</strong> ${map.getBearing()}</div>
    <div><strong>Pitch:</strong> ${map.getPitch()}</div>
    `;
}

function noBuildingSelected() {
  document.getElementsByClassName("fs-logo-building")[0].src =
    "./images/branding/inverted_fs.png";
  document.getElementById(
    "building-context"
  ).innerHTML = `<div><h2>Select a Building or Feature</h2</div>`; // inserts into sidebar
}

////////////////////// JSON Data ////////////////////////////////////

// Fixed Region and Bearing Data
const regions = [
  {
    region: "central",
    center: [-76.54294334759209, 43.45347920082102],
    zoom: 16.875459902527414,
    bearing: -32,
  },
  {
    region: "lakeside",
    center: [-76.54021035103943, 43.45724401433708],
    zoom: 17.11144729,
    bearing: -37,
  },
  {
    region: "east",
    center: [-76.53636691718475, 43.45522585648385],
    zoom: 16.9951515,
    bearing: 0,
  },
  {
    region: "west",
    center: [-76.54866150274084, 43.45050187154001],
    zoom: 17.73465424,
    bearing: -50,
  },
  {
    region: "athletic",
    center: [-76.53619107389581, 43.4476488569735],
    zoom: 16.55784477,
    bearing: -32,
  },
  {
    region: "village",
    center: [-76.54833021875518, 43.44783233942783],
    zoom: 17.88606643,
    bearing: -42,
  },
  {
    region: "rice",
    center: [-76.54966430787358, 43.429976388125624],
    zoom: 17.75221243425645,
    bearing: -32,
  },
  {
    region: "fallbrook",
    center: [-76.53989823543341, 43.42480854657407],
    zoom: 17.250656149181214,
    bearing: -32,
  },
  {
    region: "downtown",
    center: [-76.5071990728699, 43.45745286540054],
    zoom: 18.37727826852788,
    bearing: -20,
  },
  {
    region: "syracuse",
    center: [-76.15364909821363, 43.05075196784364],
    zoom: 18.631023835047465,
    bearing: -19.686627218935314,
  },
];
