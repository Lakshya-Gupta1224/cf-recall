import { useEffect, useState } from "react";
import { getProblems, saveProblems } from "../../../public/utils/storage";
import { addDays, todayISO } from "../../../public/utils/date";
import ProblemList from "../components/ProblemList";
import { SPACED_INTERVALS } from "./TodayView";

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(todayISO());
  const [list, setList] = useState([]);

  async function load(date) {
    const problems = await getProblems();

    const filtered = Object.values(problems).filter(
      (p) => p.status === "pending" && p.nextReviewDate === date
    );

    setList(filtered);
  }

  async function markReviewed(problem) {
    const problems = await getProblems();
    const nextIndex = Math.min(
      problem.intervalIndex + 1,
      SPACED_INTERVALS.length - 1
    );
    problems[problem.id] = {
      ...problem,
      intervalIndex: nextIndex,
      nextReviewDate: addDays(todayISO(), SPACED_INTERVALS[nextIndex]),
      history: [
        ...problem.history,
        { date: todayISO(), action: "reviewed_calendar" },
      ],
    };
    await saveProblems(problems);
    load(selectedDate);
  }
  async function deleteProblem(problemId) {
    chrome.runtime.sendMessage(
      {
        type: "DELETE_PROBLEM",
        payload: { problemId },
      },
      () => load(selectedDate)
    );
  }

  useEffect(() => {
    load(selectedDate);

    const listener = () => load(selectedDate);
    chrome.storage.onChanged.addListener(listener);

    return () => chrome.storage.onChanged.removeListener(listener);
  }, [selectedDate]);

  useEffect(() => {
    load(selectedDate);
  }, [selectedDate]);

  return (
    <>
      <div className="field">
        <label htmlFor="datePicker" className="label">
          Select date
        </label>
        <input
          id="datePicker"
          type="date"
          className="input is-small mb-3"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <ProblemList
        view="calendarView"
        problems={list}
        onReview={markReviewed}
        onDelete={deleteProblem}
      />
    </>
  );
}
