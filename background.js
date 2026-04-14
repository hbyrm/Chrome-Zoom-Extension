let currentZoom = 1;

function applyZoom(tabId) {
  chrome.scripting.executeScript({
    target: { tabId },
    func: (zoom) => {
      document.body.style.zoom = zoom;
    },
    args: [currentZoom]
  });
}

chrome.commands.onCommand.addListener(async (command) => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (command === "zoom_in") {
    currentZoom += 0.1;
  } else if (command === "zoom_out") {
    currentZoom -= 0.1;
  }

  applyZoom(tab.id);
});