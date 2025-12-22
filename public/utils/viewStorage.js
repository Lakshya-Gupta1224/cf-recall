export function saveView(view) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ view }, resolve);
  });
}

export function getView() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["view"], (res) => {
      resolve(res.view || "today");
    });
  });
}
