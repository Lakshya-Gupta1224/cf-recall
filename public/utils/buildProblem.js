import { todayISO, addDays } from "./date.js";

export function buildProblem(problemToAdd, existingProblems) {
  const { id } = problemToAdd;

  if (existingProblems[id]) {
    return { error: "DUPLICATE" };
  }

  const today = todayISO();
  const nextReviewDate = addDays(today, 1);

  return {
    ...problemToAdd,
    nextReviewDate,
    history: [{ date: today, action: "added" }],
  };
}
