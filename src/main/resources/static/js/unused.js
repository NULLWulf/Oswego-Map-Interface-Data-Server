function toggleSidebar(id) {
  let elem = document.getElementById(id);
  let classes = elem.className.split(" ");
  let padding = {};

  if (elem.classList.contains("collapsed")) {
    // Remove the 'collapsed' class from the class list of the element, this sets it back to the expanded state.
    classes.splice(classes.indexOf("collapsed"), 1);
  } else {
    padding[id] = 0;
    // Add the 'collapsed' class to the class list of the element
    classes.push("collapsed");
  }

  // Update the class list on the element
  elem.className = classes.join(" ");
}

function ensureClose(id) {
  let elem = document.getElementById(id);
  if (!elem.classList.contains("collapsed")) {
    let classes = elem.className.split(" ");
    let padding = {};
    padding[id] = 0;
    classes.push("collapsed");
    elem.className = classes.join(" ");
  }
}
