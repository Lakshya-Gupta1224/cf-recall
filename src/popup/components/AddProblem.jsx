// import { getProblems, saveProblems } from "../../../public/utils/storage";
// import { todayISO, addDays } from "../../../public/utils/date";
// export const SPACED_INTERVALS = [1, 3, 7, 14, 30, 60];

// export default function AddNewProblem(problemToAdd) {
//   const { problemId } = problemToAdd;
//   let problems = getProblems();
//   if (!problems) {
//     problems = {};
//   }

//   if (problems[problemId]) {
//     alert("Problem already added!");
//     return;
//   }

//   const today = todayISO();
//   const d = addDays(todayISO, 1);
//   problemToAdd = {
//     ...problemToAdd,
//     nextReviewDate: d,
//     history: [{ date: today, action: "added" }],
//   };
//   problems[problemId] = problemToAdd;
//   saveProblems(problems, () => alert("Problem added to CF Recall"));

//   // chrome.storage.local.set({ problems }, () => {
//   //   alert("Problem added to CF Recall");
//   // });
//   // chrome.storage.local.get(["problems"], (result) => {
//   //   problems[problemId] = {
//   //     id: problemId,
//   //     name: problemName,
//   //     url: window.location.href,
//   //     intervalIndex: 0,
//   //     nextReviewDate: d,
//   //     history: [{ date: today, action: "added" }],
//   //     status: "pending",
//   //   };
//   // });

//   // async function addProblem() {
//   //   const problems = await getProblems();
//   //   const id = "1791F";
//   //   if (problems[id]) return alert("Problem already exists.");
//   //   const today = todayISO();
//   //   problems[id] = {
//   //     id,
//   //     name: "Range Update Point Query",
//   //     url: "https://codeforces.com/problemset/problem/1791/F",
//   //     intervalIndex: 0,
//   //     nextReviewDate: addDays(today, SPACED_INTERVALS[0]),
//   //     history: [{ date: today, action: "added" }],
//   //     status: "pending",
//   //   };

//   //   await saveProblems(problems);
//   //   alert("Problem added");
//   // }

//   // return (
//   //   <button className="button is-link is-small" onClick={addProblem}>
//   //     Add Sample Problem
//   //   </button>
//   // );
// }
