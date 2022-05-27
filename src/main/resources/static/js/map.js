////////////////////// Map Parameters ////////////////////////////////////

// SUNY-Oswego Token, locked down to certain domain access
mapboxgl.accessToken =
  "pk.eyJ1Ijoic3VueS1vc3dlZ28iLCJhIjoiY2wzYnI3dThoMDdtcDNqbzJhc2NrNHIyNCJ9.bC45EQZcAuxRLvk_AvR5Cw";
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


////////////////////// Map Functions ////////////////////////////////////
// Direct interactions and manipulations of the map /////////////////////

// Add Map Zoom and Rotation Control buttons
const nav = new mapboxgl.NavigationControl({
  compass: true,
});
map.addControl(nav, "bottom-left");

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
  const bbox = [
    // bounding box
    // based off of pixel width to determine bounds
    [event.point.x - bound, event.point.y - bound],
    [event.point.x + bound, event.point.y + bound],
  ];
  return map.queryRenderedFeatures(bbox, { layers: ["buildings"] }); // Returns array of building feature data
}

// When a building feature is clicked, gets building coordinates and center view on said building
map.on("click", "buildings", (e) => {
  // If Zoom level is less than 18, use zoom level of 18
  const constraintZoom = map.getZoom() > 18 ? map.getZoom() : 18;
  // notes higher zoom level means more magnification
  map.flyTo({
    center: e.features[0].geometry.coordinates,
    zoom: constraintZoom,
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
const region_dropdown = document.getElementById("region-dropdown");
region_dropdown.onchange = () => {
  let id = region_dropdown.value;
  map.flyTo({
    center: regions[id].center,
    zoom: regions[id].zoom,
    speed: 0.6,
    bearing: regions[id].bearing,
  });
}

// // Toggles between Default Style and Satellite Raster view
const style_toggle = document.getElementById("style-toggle");
style_toggle.onclick = () => {
  // If currentStyle is 0 , changed to satellite view
  if (currentStyle === 0) {
    map.setLayoutProperty("mapbox-satellite", "visibility", "visible");
    document.getElementById("style-toggle").innerHTML = "Default View";
    currentStyle = 1;
    // If currentStyle is 1, change to default style
  } else {
    map.setLayoutProperty("mapbox-satellite", "visibility", "none");
    document.getElementById("style-toggle").innerHTML = "Satellite View";
    currentStyle = 0;
  }
}

////////////////////// Fetch Requests ////////////////////////////////////

// Gets Asset from dropdown list and populates asset context
function getAssetFromDropDown(assetId) {
  fetch(`/assets/${assetId}`)
    .then((response) => {
      return response.json(); // gets Asset and returns as Json
    })
    .then((data) => {
      populateAssetContext(data); // calls Populate Asset Context
    })
    .catch((err) => {
      // if error in process assumes a fetch problem
      console.log("Fetch Problem: " + err.message);
    });
}

// Gets Building Assets from database then populates Building and Asset context
// Building Data can come from data in GeoJson layer or from database depending
// on where this function is called from
function getBuildingAssets(buildingData) {
  // attempts to get building assets by passing in building number/code
  fetch(`/assets/property/${buildingData.building_code}`)
    .then((response) => {
      return response.json();
    })
    .then((assetDataJson) => {
      // Passes Building Data and Asset data from database
      populateBuildingContext(assetDataJson, buildingData);
    })
    .catch((err) => {
      // Displays message if previous chain fails, and populates Building Data Context without asset data
      console.log("Fetch problem: " + err.message);
      populateBuildingContext(null, buildingData);
    });
}

// Calls database to get building data as opposed to data from the GeoJson layer
function refocusBuilding(building_code) {
  fetch(`/property/${building_code}`)
    .then((response) => {
      return response.json();
    })
    // "data" refers to building data from database
    .then((data) => {
      // Centers map of building geo-position coordinates
      map.flyTo({
        center: [data.longitude, data.latitude],
        zoom: 18,
        speed: 0.6,
      });
      // Passes retrieved building data from database
      getBuildingAssets(data);
    })
    .catch((err) => {
      console.log("Fetch problem: " + err.message);
    });
}

////////////////////// Programmatic HTML Population ////////////////////////////////////

// Populates building context, attempts to populate Asset drop dropdown if said data is present
function populateBuildingContext(assetData, property) {
  // Checks to see if asset data is available, else assigns string to show that assets are not available
  let assetsAvailable = assetData ? assetData.length : "No Assets Available";

  // Sets building-context HTML with building data
  // Asset Count will be either actual asset context array count or "No Assets Available"
  document.getElementById("building-context").innerHTML = ` 
    <div><h2 class="header">${property.building_name}</h2></div>
    <div class="smalltext">
    <div><strong>Building No: </strong>${property.building_code}</div>
    <div><strong>Ft<sup>2</sup>: </strong>${property.square_ft}</div>
    <div><strong>Asset Count: </strong>${assetsAvailable}</div>
    <div><a href="https://aim.sucf.suny.edu/fmax/screen/MASTER_ASSET_VIEW?assetTag=${property.asset_id}" target="_blank">
    <strong>AIM Asset Property</strong></a></div>
    `;

  // Attempts to set building image header with respective building
  setBuildingImage(property.building_code);
  // Calls function to build out asset population dropdown
  populateBuildingAssetList(assetData);
}

// If asset data is available will populate asset dropdown list
// otherwise produces an error message
function populateBuildingAssetList(assetData) {
  if (assetData) {
    // if assetData has some length populates dropdown list
    let select = document.createElement("select");
    select.id = "asset-dropdown";

    assetData.forEach((asset)=>{
      select.innerHTML = select.innerHTML + `
      <option value="${asset.asset_id}">${asset.asset_id} ${asset.description} ${asset.assetType} ${asset.assetGroup}</option>
      `;
    })

    // Attaches event listener to drop-down that populates asset context based on selection
    select.addEventListener("change", () => {
      getAssetFromDropDown(select.value);
    });
    document.getElementById("building-context").appendChild(select);
  } else {
    let errorMessageAsset = document.createElement("div");
    errorMessageAsset.innerHTML = `<div><h3>Error Retrieving Building Asset Data</h3</div>`;
    document.getElementById("building-context").appendChild(errorMessageAsset);
  }
}

// Populates asset context box html
function populateAssetContext(asset) {
  // Sets context box with Assset ID #
  document.getElementById(
    "asset-context-header"
  ).innerHTML = `${asset.asset_id}`;

  // Sets asset context html
  document.getElementById("asset-context-data").innerHTML = `
    <div><strong>Group: </strong>${asset.assetGroup}</div>
    <div><strong>Type: </strong>${asset.assetType}</div>
    <div><strong>Description: </strong>${asset.description}</div>
    <div><strong>Facility: </strong>${asset.facility}</div>
    <div><strong>Location: </strong>${asset.location}</div>
    <div><strong>Status: </strong>${asset.status}</div>
    <div><a href="https://aim.sucf.suny.edu/fmax/screen/MASTER_ASSET_VIEW?assetTag=${asset.id}" target="_blank"><strong>AIM Asset View</strong></a></div>
    `;

  // Creates asset context box function
  let refocus_button = document.createElement("button");
  refocus_button.classList.add("button");
  refocus_button.innerHTML = "Refocus Parent Building";

  // Attaches refocus building, which when clicked will center the map on the asset's parent building
  // as well as populate the building context box with respective building data
  refocus_button.addEventListener("click", () => {
    refocusBuilding(asset.property);
  });

  // Ensures Prior Button HTML is cleared out
  document.getElementById("asset-context-controls").innerHTML = "";
  // Replaces current building box with new refocus button,
  document.getElementById("asset-context-controls").appendChild(refocus_button);
}

// Populates live map context when function is called, (currently mouse movement, touch screen interaction)
function populateLiveMapContext(event) {
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

// Called when interaction on map results in no building being selected, replaces building header image
// with default facility services logo and sets context box accordingly
function noBuildingSelected() {
  document.getElementsByClassName("fs-logo-building")[0].src =
    "./images/branding/inverted_fs.png";
  document.getElementById(
    "building-context"
  ).innerHTML = `<div><h2>Select a Building or Feature</h2</div>`; // inserts into sidebar
}

// Sets building image from passed building code else defaults to inverted FS logo
function setBuildingImage(building_code) {
  // Attempts to get image of building else
  try {
    document.getElementsByClassName("fs-logo-building")[0].src = `
    images/building-images/${building_code}.jpg
    `;
  } catch {
    document.getElementsByClassName("fs-logo-building")[0].src =
      "images/branding/inverted_fs.png.jpg";
  }
}

////////////////////// JSON Data ////////////////////////////////////

window.onload = () => {
  console.log("Page is loaded")
}

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
