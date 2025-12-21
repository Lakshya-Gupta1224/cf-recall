(function () {
  if (document.getElementById("cf-recall-btn")) return;

  const titleEl = document.querySelector(".problem-statement .title");
  if (!titleEl) return;

  const problemName = titleEl.innerText.trim();

  // /problemset/problem/1791/F
  const match = window.location.pathname.match(/problem\/(\d+)\/([A-Z0-9]+)/);
  if (!match) return;

  const contestId = match[1];
  const index = match[2];
  const problemId = `${contestId}${index}`;

  const table = document.querySelector("table.rtable");
  if (!table) return;

  const tbody = table.querySelector("tbody");
  if (!tbody) return;

  const tr = document.createElement("tr");
  tr.id = "cf-recall-row";
  tr.style = "text-align:center;";

  const td = document.createElement("td");
  td.class = "left";
  td.colspan = "1";

  const btn = document.createElement("button");
  btn.id = "cf-recall-btn";
  btn.innerHTML = "Add to CF Recall";

  btn.style.cssText = `
  padding: 6px 10px;
  background: #3273dc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  `;

  btn.onclick = () => {
    chrome.storage.local.get(["problems"], (result) => {
      const problems = result.problems || {};

      if (problems[problemId]) {
        alert("Problem already added!");
        return;
      }

      const today = new Date().toISOString().split("T")[0];
      let d = new Date(today);
      d.setDate(d.getDate() + 1);
      d = d.toISOString().split("T")[0];
      problems[problemId] = {
        id: problemId,
        name: problemName,
        url: window.location.href,
        intervalIndex: 0,
        nextReviewDate: d,
        history: [{ date: today, action: "added" }],
        status: "pending",
      };

      chrome.storage.local.set({ problems }, () => {
        alert("Problem added to CF Recall");
      });
    });
  };
  td.appendChild(btn);
  tr.appendChild(td);
  tbody.appendChild(tr);
})();
