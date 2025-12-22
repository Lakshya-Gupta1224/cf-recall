import { useEffect, useState } from "react";
import { getProblems } from "../../../public/utils/storage";
import { todayISO } from "../../../public/utils/date";

export function useProblems(filterFn) {
  const [list, setList] = useState([]);

  async function load() {
    const problems = await getProblems();
    const filtered = filterFn(Object.values(problems), todayISO());
    setList(filtered);
  }

  useEffect(() => {
    load();
    chrome.storage.onChanged.addListener(load);
    return () => chrome.storage.onChanged.removeListener(load);
  }, []);

  return { list, reload: load };
}
