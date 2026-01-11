import ProblemItem from "./ProblemItem.jsx";

export default function ProblemList({ view, showAllUpcoming=false, problems, onReview, onDelete }) {
  if (problems.length === 0) {
    if (view === "todayView") {
      return <p>You’re done for today!<br />Check leftovers or future dates.</p>;
    }
    if (view === "leftoverView") {
      return <p>No leftover problems.</p>;
    }
    if (view === "calendarView" && showAllUpcoming) {
      return <p>No upcoming problems.</p>;
    }
    if (view === "calendarView" && !showAllUpcoming) {
      return <p>No problems for the selected date.</p>;
    }
  }

  return (
    <>
      {problems.map((p) => (
        <ProblemItem
          key={p.id}
          showAllUpcoming={showAllUpcoming}
          problem={p}
          onReview={onReview}
          onDelete={onDelete}
        />
      ))}
    </>
  );
}
