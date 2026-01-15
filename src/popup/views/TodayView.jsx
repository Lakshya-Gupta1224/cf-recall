import { useState } from "react";
import { addDays, todayISO } from "../../../public/utils/date";
import { saveProblems, getProblems } from "../../../public/utils/storage";
import { useProblems } from "../hooks/useProblems";
import ProblemList from "../components/ProblemList";

export const SPACED_INTERVALS = [1, 3, 7, 14, 30, 60];

export default function TodayView() {
  const [selectedDate, setSelectedDate] = useState(todayISO());
  // console.log("selectedDate todayView: ", selectedDate);
  const { list, reload } = useProblems((problems) =>
    problems.filter(
      (p) => p.status === "pending" && p.nextReviewDate === selectedDate
    )
  );

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
      history: [...problem.history, { date: todayISO(), action: "reviewed" }],
    };

    await saveProblems(problems);
    reload();
  }

  async function deleteProblem(problemId) {
    chrome.runtime.sendMessage(
      {
        type: "DELETE_PROBLEM",
        payload: { problemId },
      },
      () => reload()
    );
  }

  return (
    <>
      <h2 className="subtitle is-6 has-text-weight-light">Today's Problems</h2>

      <ProblemList
        view="todayView"
        problems={list}
        onReview={markReviewed}
        onDelete={deleteProblem}
      />
    </>
  );
}
