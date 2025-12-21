import { useEffect, useState } from "react";
import { getProblems } from "../../utils/storage";

export default function TodayList() {
  const [list, setList] = useState([]);
  useEffect(() => {
    getProblems().then((problems) => {
      const today = new Date().toISOString().split("T")[0];
      const due = Object.values(problems).filter(
        (p) => p.nextReviewDate === today
      );
      setList(due);
    });
  });
  return (
    <div>
      <h2 className="subtitle is-6">Today's Problems</h2>
      {list.length === 0 && <p>No problems for today.</p>}
      {list.map((p) => (
        <div key={p.id} className="box">
          {p.name}
        </div>
      ))}
    </div>
  );
}
