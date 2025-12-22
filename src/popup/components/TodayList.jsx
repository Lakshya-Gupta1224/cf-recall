import { useEffect, useState } from "react";
import { getProblems, saveProblems } from "../../../public/utils/storage";
import { todayISO, addDays } from "../../../public/utils/date";
import { loadProblemPage } from "../../../public/utils/loadPage";
export const SPACED_INTERVALS = [1, 3, 7, 14, 30, 60];

export default function TodayList() {
  const [list, setList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(todayISO());

  // async function load() {
  //   const problems = await getProblems();
  //   const today = todayISO();
  //   console.log(today.toString());
  //   const due = Object.values(problems).filter(
  //     (p) => p.nextReviewDate <= today && p.status === "pending"
  //   );
  //   setList(due);
  // }

  async function loadForDate(date) {
    const problems = await getProblems();

    const filtered = Object.values(problems).filter(
      (p) => p.nextReviewDate === date && p.status === "pending"
    );

    setList(filtered);
  }

  async function markReviewed(problem) {
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
    loadForDate(selectedDate);
  }

  async function deleteProblem(problemId) {
    chrome.runtime.sendMessage(
      {
        type: "DELETE_PROBLEM",
        payload: { problemId },
      },
      (response) => {
        if (response?.status === "SUCCESS") {
          console.log("Problem deleted");
          loadForDate(selectedDate);
        } else {
          console.log("Problem not found");
        }
      }
    );
  }

  useEffect(() => {
    loadForDate(selectedDate);

    const listener = () => loadForDate(selectedDate);
    chrome.storage.onChanged.addListener(listener);

    return () => chrome.storage.onChanged.removeListener(listener);
  }, []);

  useEffect(() => {
    loadForDate(selectedDate);
    window.addEventListener("focus", loadForDate);

    return () => window.removeEventListener("focus", loadForDate);
  }, []);

  return (
    <div>
      {/* <h2 className="subtitle is-6">Today's Problems</h2> */}
      <div className="field">
        <label htmlFor="inputDatePicker" className="label">
          Select date
        </label>
        <input
          id="inputDatePicker"
          type="date"
          min={todayISO()}
          className="input is-small mb-3"
          value={selectedDate}
          onChange={(e) => {
            const date = e.target.value;
            setSelectedDate(date);
            loadForDate(date);
          }}
        />
      </div>
      {list.length === 0 && <p>No problems for this day.</p>}
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
            className="button mr-1 is-success is-small"
            onClick={() => markReviewed(p)}
          >
            Mark Reviewed
          </button>
          <button
            className="button is-small is-danger"
            onClick={() => deleteProblem(p.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
