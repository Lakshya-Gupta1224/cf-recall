import { useState, useEffect } from "react";
import { getView, saveView } from "../../public/utils/viewStorage.js";
import { useProblems } from "./hooks/useProblems.js";
import TodayView from "./views/TodayView";
import LeftoverView from "./views/LeftoverView.jsx";
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
    problems.filter((p) => p.status === "pending" && p.nextReviewDate === today)
  );

  const { list: leftoverList } = useProblems((problems, today) =>
    problems.filter((p) => p.status === "pending" && p.nextReviewDate < today)
  );

  return (
    <div className="container p-3">
      <center>
        <h1 className="title is-3">CF Recall</h1>
        <hr />
      </center>

      <div className="tabs is-toggle is-toggle-rounded is-small is-fullwidth">
        <ul>
          <li className={view === "today" ? "is-active" : ""}>
            <a onClick={() => setView("today")}>
              Today
              {todayList.length > 0 && (
                <span className="tag is-primary is-small is-rounded ml-2">
                  {todayList.length}
                </span>
              )}
            </a>
          </li>
          <li className={view === "leftover" ? "is-active" : ""}>
            <a onClick={() => setView("leftover")}>
              Leftover
              {leftoverList.length > 0 && (
                <span className="tag is-danger is-small is-rounded ml-2">
                  {leftoverList.length}
                </span>
              )}
            </a>
          </li>
          <li className={view === "calendar" ? "is-active" : ""}>
            <a onClick={() => setView("calendar")}>Calendar</a>
          </li>
        </ul>
      </div>

      {view === "today" && <TodayView />}
      {view === "leftover" && <LeftoverView />}
      {view === "calendar" && <CalendarView />}
    </div>
  );
}
