// Define a function that reads the URL from the clipboard and modifies it
async function modifyURLFromClipboard() {
  try {
    // Read the URL from the clipboard
    var url = await navigator.clipboard.readText();
    // Use a regular expression to find the input in the URL
    var input = url.match(/150px\/(.+)\.jpeg/)[1];
    // Construct the new URL based on the input
    var new_url = "https://flim-1-0-2.s3.eu-central-1.amazonaws.com/full/" + input + ".png";
    // Display the new URL in a paragraph element with id="new-url"
    document.getElementById("new-url").innerHTML = new_url;
  } catch (error) {
    console.error(error.message);
  }
}

// Define a function that opens a new tab with the modified URL
function openNewTabWithModifiedURL() {
  // Get the modified URL from the paragraph element with id="new-url"
  var new_url = document.getElementById("new-url").innerHTML;
  // Open the new URL in a new tab
  window.open(new_url, "_blank");
}

// Add a button that calls the modifyURLFromClipboard function when clicked
var button = document.createElement("button");
button.textContent = "Modify URL From Clipboard";
button.addEventListener("click", modifyURLFromClipboard);
document.body.appendChild(button);

// Add another button that calls the openNewTabWithModifiedURL function when clicked
var button2 = document.createElement("button");
button2.textContent = "Open New Tab With Modified URL";
button2.addEventListener("click", openNewTabWithModifiedURL);
document.body.appendChild(button2);

// Add a paragraph element that will display the modified URL
var p = document.createElement("p");
p.id = "new-url";
document.body.appendChild(p);
