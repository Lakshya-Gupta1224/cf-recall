import { useState, useEffect } from "react";
import { getView, saveView } from "../../public/utils/viewStorage.js";
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

  return (
    <div className="container p-3">
      <h1 className="title is-3">CF Recall</h1>

      <div className="tabs is-small is-toggle is-fullwidth">
        <ul>
          <li className={view === "today" ? "is-active" : ""}>
            <a onClick={() => setView("today")}>Today</a>
          </li>
          <li className={view === "leftover" ? "is-active" : ""}>
            <a onClick={() => setView("leftover")}>Leftover</a>
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
