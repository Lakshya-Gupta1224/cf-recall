import { useEffect, useState } from "react";
import { getProblems, saveProblems } from "../../utils/storage";
import { todayISO, addDays } from "../../utils/date";
import loadProblemPage from "../../utils/loadPage";
export const SPACED_INTERVALS = [1, 3, 7, 14, 30, 60];

export default function TodayList() {
  const [list, setList] = useState([]);

  async function load() {
    const problems = await getProblems();
    const today = todayISO();
    console.log(today.toString());
    const due = Object.values(problems).filter(
      (p) => p.nextReviewDate <= today && p.status === "pending"
    );
    setList(due);
  }

  async function markDone(problem) {
    const problems = await getProblems();
    const nextIndex = Math.min(
      problem.intervalIndex + 1,
      SPACED_INTERVALS.length - 1
    );
    const today = todayISO();
    problems[problem.id] = {
      ...problem,
      intervalIndex: nextIndex,
      nextReviewDate: addDays(today, SPACED_INTERVALS[nextIndex]),
      history: [...problem.history, { date: today, action: "reviewed" }],
    };
    await saveProblems(problems);
    load();
  }

  useEffect(() => {
    load();
    window.addEventListener("focus", load);

    return () => window.removeEventListener("focus", load);
  }, []);

  return (
    <div>
      <h2 className="subtitle is-6">Today's Problems</h2>
      {list.length === 0 && <p>No problems for today.</p>}
      {list.map((p) => (
        <div key={p.id} className="box">
          {p.name}
          <hr />
          <button
            className="button mr-1 is-info is-small"
            onClick={() => loadProblemPage(p.url)}
          >
            Revisit
          </button>
          <button
            className="button is-success is-small"
            onClick={() => markDone(p)}
          >
            Mark Reviewed
          </button>
        </div>
      ))}
    </div>
  );
}
