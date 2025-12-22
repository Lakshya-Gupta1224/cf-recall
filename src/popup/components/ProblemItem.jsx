import { loadProblemPage } from "../../../public/utils/loadPage.js";

export default function ProblemItem({ problem, onReview, onDelete }) {
  return (
    <div className="box">
      {problem.name}
      <hr />

      <button
        className="button mr-1 is-info is-small"
        onClick={() => loadProblemPage(problem.url)}
      >
        Revisit
      </button>

      <button
        className="button mr-1 is-success is-small"
        onClick={() => onReview(problem)}
      >
        Mark Reviewed
      </button>

      <button
        className="button is-small is-danger"
        onClick={() => onDelete(problem.id)}
      >
        Delete
      </button>
    </div>
  );
}
