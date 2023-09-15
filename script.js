// Define a function that creates a hidden input element and pastes the clipboard data into it
function pasteClipboardData() {
  // Create a hidden input element
  var hiddenInput = document.createElement("input");
  // Set its type to text
  hiddenInput.type = "text";
  // Set its style to hide it from the view
  hiddenInput.style = "position: absolute; left: -1000px; top: -1000px";
  // Append it to the body
  document.body.appendChild(hiddenInput);
  // Focus on it
  hiddenInput.focus();
  // Execute the paste command
  document.execCommand("paste");
  // Return the input element
  return hiddenInput;
}

// Define a function that takes the URL from the hidden input element and modifies it
function modifyURLFromClipboard() {
  try {
    // Paste the clipboard data into the hidden input element
    var hiddenInput = pasteClipboardData();
    // Get the value of the input element, which is the URL from the clipboard
    var url = hiddenInput.value;
    // Use a regular expression to find the input in the URL
    var input = url.match(/150px\/(.+)\.jpeg/)[1];
    // Construct the new URL based on the input
    var new_url = "https://flim-1-0-2.s3.eu-central-1.amazonaws.com/full/" + input + ".png";
    // Display the new URL in a paragraph element with id="new-url"
    document.getElementById("new-url").innerHTML = new_url;
    // Remove the hidden input element from the body
    document.body.removeChild(hiddenInput);
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
