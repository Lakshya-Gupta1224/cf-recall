export function getProblems() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["problems"], (result) => {
      resolve(result.problems || {});
    });
  });
}

export function saveProblems(problems) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ problems }, resolve);
  });
}
