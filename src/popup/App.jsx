import TodayList from "./components/TodayList.jsx";
import AddProblem from "./components/AddProblem.jsx";

function App() {
  return (
    <div className="container p-3">
      <h1 className="title is-5">CF Recall</h1>
      <AddProblem />
      <hr />
      <TodayList />
    </div>
  );
}

export default App;
