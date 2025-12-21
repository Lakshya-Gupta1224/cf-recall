import { getProblems, saveProblems } from "../../utils/storage";
import { todayISO, addDays } from "../../utils/date";
export const SPACED_INTERVALS = [1, 3, 7, 14, 30, 60];

export default function AddProblem() {
  async function addProblem() {
    const problems = await getProblems();
    const id = "1791F";
    if (problems[id]) return alert("Problem already exists.");
    const today = todayISO();
    problems[id] = {
      id,
      name: "Range Update Point Query",
      url: "https://codeforces.com/problemset/problem/1791/F",
      intervalIndex: 0,
      nextReviewDate: addDays(today, SPACED_INTERVALS[0]),
      history: [{ date: today, action: "added" }],
      status: "pending",
    };

    await saveProblems(problems);
    alert("Problem added");
  }

  return (
    <button className="button is-link is-small" onClick={addProblem}>
      Add Sample Problem
    </button>
  );
}
