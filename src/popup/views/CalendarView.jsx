import { useEffect, useState } from "react";
import { getProblems, saveProblems } from "../../../public/utils/storage";
import {
  saveCalendarDate,
  getCalendarDate,
} from "../../../public/utils/calendarStorage";
import { addDays, todayISO } from "../../../public/utils/date";
import ProblemList from "../components/ProblemList";
import { SPACED_INTERVALS } from "./TodayView";

export default function CalendarView() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [list, setList] = useState([]);
  const [checkboxState, setCheckboxState] = useState(false);

  useEffect(() => {
    getCalendarDate().then((savedDate) => {
      setSelectedDate(savedDate || todayISO());
    });
  }, []);

  async function load(date) {
    const problems = await getProblems();
    let filtered;
    if (checkboxState === false) {
      filtered = Object.values(problems).filter(
        (p) => p.status === "pending" && p.nextReviewDate === date
      );
    } else {
      filtered = Object.values(problems).filter(
        (p) => p.status === "pending" && p.nextReviewDate >= date
      );
    }
    setList(filtered);
  }

  const handleCheckboxChange = (isChecked) => {
    setCheckboxState(isChecked);
  };

  useEffect(() => {
    load(selectedDate);
  }, [checkboxState]);

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
        { date: todayISO(), action: "reviewed_calendar" },
      ],
    };
    await saveProblems(problems);
    load(selectedDate);
  }
  async function deleteProblem(problemId) {
    chrome.runtime.sendMessage(
      {
        type: "DELETE_PROBLEM",
        payload: { problemId },
      },
      () => load(selectedDate)
    );
  }

  // when date is selected and changed
  useEffect(() => {
    saveCalendarDate(selectedDate);
    const listener = () => load(selectedDate);
    chrome.storage.onChanged.addListener(listener);

    return () => chrome.storage.onChanged.removeListener(listener);
  }, [selectedDate]);

  return (
    <>
      <div className="field">
        <label htmlFor="datePicker" className="label subtitle is-6">
          Select date
        </label>
        <input
          id="datePicker"
          type="date"
          className="input is-small mb-3"
          value={selectedDate || todayISO()}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <div className="field">
          <label
            htmlFor="showUpcomingCheckbox"
            className="checkbox is-flex is-align-items-center"
          >
            <input
              type="checkbox"
              checked={checkboxState}
              id="showUpcomingCheckbox"
              className="mr-2"
              onChange={(e) => handleCheckboxChange(e.target.checked)}
            />
            <h6 className="has-text-weight-light subtitle is-6">Show upcoming problems from this date</h6>
          </label>
        </div>
      </div>

      <ProblemList
        view="calendarView"
        showAllUpcoming={checkboxState}
        problems={list}
        onReview={markReviewed}
        onDelete={deleteProblem}
      />
    </>
  );
}
