import { loadProblemPage } from "../../../public/utils/loadPage.js";

export default function ProblemItem({
  showAllUpcoming = false,
  problem,
  onReview,
  onDelete,
}) {
  return (
    <div className="box pt-2 pl-3 pr-3 pb-3">
      {showAllUpcoming && (
        <div className="columns is-mobile mb-0">
          <div className="column is-two-thirds has-text-weight-normal">
            {problem.name}
          </div>
          <div className="column is-size-7 has-text-weight-light has-text-right">
            {problem.nextReviewDate}
            <br />
            <span
              className={`mt-2 platform-tag ${
                problem.platform === "leetcode" ? "lc" : "cf"
              }`}
            >
              {problem.platform === "leetcode" ? "LC" : "CF"}
            </span>
          </div>
        </div>
      )}
      {!showAllUpcoming && (
        <div className="mb-2 has-text-weight-normal is-flex is-justify-content-space-between">
          {problem.name}
          <span
            className={`platform-tag ${
              problem.platform === "leetcode" ? "lc" : "cf"
            }`}
          >
            {problem.platform === "leetcode" ? "LC" : "CF"}
          </span>
        </div>
      )}
      <div className="buttons">
        <button
          className="button is-info  is-responsive"
          onClick={() => loadProblemPage(problem.url)}
        >
          Revisit
        </button>

        <button
          className="button is-success  is-responsive"
          onClick={() => onReview(problem)}
        >
          Mark Reviewed
        </button>

        <button
          className="button is-danger is-inverted is-responsive"
          onClick={() => onDelete(problem.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
