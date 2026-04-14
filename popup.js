const slider = document.getElementById("slider");
const valueText = document.getElementById("value");
const input = document.getElementById("zoomInput");

slider.addEventListener("input", () => {
  valueText.textContent = slider.value + "%";
  input.value = slider.value;
});

input.addEventListener("input", () => {
  slider.value = input.value;
  valueText.textContent = input.value + "%";
});

document.getElementById("applyZoom").addEventListener("click", async () => {
  let zoom = parseFloat(input.value) / 100;

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: (zoom) => {
      document.body.style.zoom = zoom;
    },
    args: [zoom]
  });
});