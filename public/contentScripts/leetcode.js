(function () {
  // Prevent duplicate observers
  if (window.__cfRecallLeetCodeInjected) return;
  window.__cfRecallLeetCodeInjected = true;

  let lastProblemSlug = null;
  let storageListenerRegistered = false;
  let scheduled = false;

  function extractProblem() {
    const match = window.location.pathname.match(/^\/problems\/([^/]+)/);
    if (!match) return null;

    const slug = match[1];
    return slug;
  }

  function findToolbarElement() {
    // the top bar which has run and submit buttons
    return document.getElementById("ide-top-btns");
  }

  function injectButton(problemDetails) {
    let btn =
      document.getElementById("cf-recall-btn") ??
      document.createElement("button");

    const titleEl = findToolbarElement();
    if (!titleEl) return;

    btn.id = "cf-recall-btn";
    btn.textContent = "Add to LC Recall";

    btn.style.cssText = `
      margin-left: 12px;
      padding: 6px 10px;
      background: #7d7d7d2e;
      color: #f8a01bf3;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
      `;

    function markAdded(alreadyExists = false) {
      btn.textContent = alreadyExists
        ? "Already in LC Recall"
        : "Add to LC Recall";

      btn.disabled = alreadyExists;
      btn.style.color = alreadyExists ? "#28c244" : "#f8a01bf3";
      btn.style.background = "#7d7d7d2e";
      btn.style.cursor = alreadyExists ? "default" : "pointer";
    }

    // Check existing storage
    chrome.storage.local.get(["problems"], (res) => {
      if (res.problems && res.problems[problemDetails.id]) {
        markAdded(true);
      }
    });

    // Sync across popup actions
    if (!storageListenerRegistered) {
      chrome.storage.onChanged.addListener((changes, areaName) => {
        if (areaName !== "local") return;
        if (!changes.problems) return;

        const oldP = changes.problems.oldValue || {};
        const newP = changes.problems.newValue || {};

        const btn = document.getElementById("cf-recall-btn");
        if (!btn || !window.__cfRecallCurrentProblemId) return;

        if (
          !oldP[window.__cfRecallCurrentProblemId] &&
          newP[window.__cfRecallCurrentProblemId]
        ) {
          btn.textContent = "Already in LC Recall";
          btn.disabled = true;
          btn.style.color = "#28c244";
          btn.style.background = "#7d7d7d2e";
          btn.style.cursor="default";
        }
        
        if (
            oldP[window.__cfRecallCurrentProblemId] &&
            !newP[window.__cfRecallCurrentProblemId]
        ) {
            btn.textContent = "Add to LC Recall";
            btn.disabled = false;
            btn.style.color = "#f8a01bf3";
            btn.style.background = "#7d7d7d2e";
            btn.style.cursor="pointer";
        }
      });

      storageListenerRegistered = true;
    }

    btn.onclick = () => {
      chrome.runtime.sendMessage(
        {
          type: "ADD_PROBLEM",
          payload: problemDetails,
        },
        (response) => {
          if (
            response?.status === "SUCCESS" ||
            response?.status === "DUPLICATE"
          ) {
            markAdded(true);
          }
        }
      );
    };

    if (!document.getElementById("cf-recall-btn")) {
      titleEl.appendChild(btn);
    }
    if (!titleEl.contains(btn)) {
      titleEl.appendChild(btn);
    }
  }

  function tryInject() {
    const slug = extractProblem();
    if (!slug) return;

    // Prevent reinjection on same problem
    if (slug === lastProblemSlug && document.getElementById("cf-recall-btn")) {
      return;
    }
    // console.log("mutation detected try injected ran!");

    const titleEl = findToolbarElement();
    if (!titleEl) return;

    lastProblemSlug = slug;

    const problemDetails = {
      id: `leetcode:${slug}`,
      platform: "leetcode",
      name: slug,
      url: window.location.href,
      intervalIndex: 0,
      status: "pending",
    };
    // add problemId to window object when problem changes
    window.__cfRecallCurrentProblemId = problemDetails.id;

    injectButton(problemDetails);
  }

  // Observe SPA changes, dom changes by Leetcode
  const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(() => {
      scheduled = false;
      tryInject();
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Initial attempt
  tryInject();
})();
