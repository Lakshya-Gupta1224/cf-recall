import { saveProblems, getProblems } from "../../../public/utils/storage";
import { addDays, todayISO } from "../../../public/utils/date";
import { useProblems } from "../hooks/useProblems";
import ProblemList from "../components/ProblemList";
import { SPACED_INTERVALS } from "./TodayView";

export default function LeftoverView() {
  const { list, reload } = useProblems((problems) =>
    problems.filter(
      (p) => p.status === "pending" && p.nextReviewDate < todayISO()
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
      history: [
        ...problem.history,
        { date: todayISO(), action: "reviewed_late" },
      ],
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
      <h2 className="subtitle is-6">Leftover Problems</h2>

      <ProblemList
      view="leftoverView"
        problems={list}
        onReview={markReviewed}
        onDelete={deleteProblem}
      />
    </>
  );
}
