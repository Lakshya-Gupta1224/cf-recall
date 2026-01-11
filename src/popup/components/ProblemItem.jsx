import { loadProblemPage } from "../../../public/utils/loadPage.js";

export default function ProblemItem({
  showAllUpcoming = false,
  problem,
  onReview,
  onDelete,
}) {
  return (
    <div className="box pt-3">
      {showAllUpcoming && (
        <div className="columns is-mobile mb-0">
          <div className="column is-half">{problem.name}</div>
          <div className="column is-half">{problem.nextReviewDate}</div>
          <hr className="mt-0 mb-2" />
        </div>
      )}
      {!showAllUpcoming && <div className="mb-2">{problem.name}</div>}
      <div className="buttons">
        <button
          className="button is-info  is-responsive is-outlined"
          onClick={() => loadProblemPage(problem.url)}
        >
          Revisit
        </button>

        <button
          className="button is-success  is-responsive is-outlined"
          onClick={() => onReview(problem)}
        >
          Mark Reviewed
        </button>

        <button
          className="button is-danger is-responsive is-outlined"
          onClick={() => onDelete(problem.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
