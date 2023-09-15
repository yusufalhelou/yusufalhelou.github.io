// Define a function that asks for permission to read the clipboard
async function askClipboardReadPermission() {
  // Check if the browser supports the Permissions API
  if (!navigator.permissions) {
    // If not, throw an error
    throw new Error("Permissions API is not supported.");
  }
  // Query the current permission state for clipboard-read
  const permissionStatus = await navigator.permissions.query({
    name: "clipboard-read",
  });
  // If the state is "prompt", request permission from the user
  if (permissionStatus.state === "prompt") {
    // This will show a popup asking the user to allow or deny access
    await navigator.permissions.request({
      name: "clipboard-read",
    });
  }
  // Return the updated permission status
  return await navigator.permissions.query({
    name: "clipboard-read",
  });
}

// Define a function that takes the URL from the clipboard and modifies it
async function modifyURLFromClipboard() {
  try {
    // Ask for permission to read the clipboard
    const permission = await askClipboardReadPermission();
    // If the state is not "granted", throw an error
    if (permission.state !== "granted") {
      throw new Error("Not allowed to read clipboard.");
    }
    // Otherwise, proceed with reading and modifying the URL
    const url = await navigator.clipboard.readText();
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
