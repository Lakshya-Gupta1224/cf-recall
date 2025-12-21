import { getProblems, saveProblems } from "../../utils/storage";

export default function AddProblem() {
  async function addSampleProblem() {
    const problems = await getProblems();

    problems["1791F"] = {
      id: "1791F",
      name: "Range Update Point Query",
      nextReviewDate: new Date().toISOString().split("T")[0],
      intervalIndex: 0,
    };

    await saveProblems(problems);
    alert("Problem added");
  }

  return (
    <button className="button is-link is-small" onClick={addSampleProblem}>
      Add Sample Problem
    </button>
  );
}
