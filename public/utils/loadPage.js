export function loadProblemPage(urlOfPage) {
  chrome.tabs.create({ url: urlOfPage });
}
