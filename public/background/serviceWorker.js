import { buildProblem } from "../utils/buildProblem.js";
import { getProblems, saveProblems } from "../utils/storage.js";


// adding problem
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "ADD_PROBLEM") {
    (async () => {
      const problems = await getProblems();

      const result = buildProblem(message.payload, problems);

      if (result.error) {
        sendResponse({ status: "DUPLICATE" });
        return;
      }

      problems[result.id] = result;
      await saveProblems(problems);

      sendResponse({ status: "SUCCESS" });
    })();
    return true;
  }
});

// deleting problem
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "DELETE_PROBLEM") {
    (async () => {
      const { problemId } = message.payload;

      const problems = await getProblems();

      if (!problems[problemId]) {
        sendResponse({ status: "NOT_FOUND" });
        return;
      }

      delete problems[problemId];

      await saveProblems(problems);

      sendResponse({ status: "SUCCESS" });
    })();

    return true; 
  }
});