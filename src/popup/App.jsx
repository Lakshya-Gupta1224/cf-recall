import { useState, useEffect } from "react";
import { getView, saveView } from "../../public/utils/viewStorage.js";
import { useProblems } from "./hooks/useProblems.js";
import TodayView from "./views/TodayView";
import LeftoverView from "./views/LeftOverView.jsx";
import CalendarView from "./views/CalendarView.jsx";

export default function App() {
  const [view, setView] = useState("today");

  // loading pre-saved view
  useEffect(() => {
    getView().then((savedView) => {
      setView(savedView);
    });
  }, []);

  // updating view
  useEffect(() => {
    if (view) saveView(view);
  }, [view]);

  if (!view) setView("today");

  const { list: todayList } = useProblems((problems, today) =>
    problems.filter(
      (p) => p.status === "pending" && p.nextReviewDate === today,
    ),
  );

  const { list: leftoverList } = useProblems((problems, today) =>
    problems.filter((p) => p.status === "pending" && p.nextReviewDate < today),
  );

  return (
    <div className="container p-3">
      <center>
        <h1 className="title is-4 mb-0">CF & LC Recall</h1>
        <hr className="mt-2 mb-4" />
      </center>

      <div className="tabs is-toggle is-toggle-rounded is-small is-fullwidth cf-tabs">
        <ul>
          <li className={view === "today" ? "is-active" : ""}>
            <a onClick={() => setView("today")}>
              <span className="tab-label">
                Today
                {todayList.length > 0 && (
                  <span className="tab-badge is-success">
                    {todayList.length}
                  </span>
                )}
              </span>
            </a>
          </li>

          <li className={view === "leftover" ? "is-active" : ""}>
            <a onClick={() => setView("leftover")}>
              <span className="tab-label">
                Leftover
                {leftoverList.length > 0 && (
                  <span className="tab-badge is-danger">
                    {leftoverList.length}
                  </span>
                )}
              </span>
            </a>
          </li>

          <li className={view === "calendar" ? "is-active" : ""}>
            <a onClick={() => setView("calendar")}>
              <span className="tab-label">Calendar</span>
            </a>
          </li>
        </ul>
      </div>

      {view === "today" && <TodayView />}
      {view === "leftover" && <LeftoverView />}
      {view === "calendar" && <CalendarView />}
    </div>
  );
}
