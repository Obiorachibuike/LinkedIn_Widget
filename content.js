const data = {
  companyName: "TechCorp",
  matchScore: 86,
  accountStatus: "Target"
};

const createWidget = () => {
  const widget = document.createElement("div");
  widget.id = "fe-widget";
  widget.innerHTML = `
    <div class="fe-header">
      <strong class="fe-title">${data.companyName}</strong>
      <button id="fe-close">×</button>
    </div>
    <div class="fe-body">
      <div class="fe-progress-label">Match Score: ${data.matchScore}%</div>
      <div class="fe-progress-bar">
        <div class="fe-progress-fill" style="width: ${data.matchScore}%"></div>
      </div>
      <div class="fe-status ${data.accountStatus === 'Target' ? 'green' : 'red'}">
        ${data.accountStatus}
      </div>
    </div>
  `;
  document.body.appendChild(widget);

  document.getElementById("fe-close").addEventListener("click", () => {
    widget.style.display = "none";
    chrome.storage.sync.set({ widgetVisible: false });
  });
};

const createToggleButton = () => {
  const toggle = document.createElement("button");
  toggle.id = "fe-toggle-btn";
  toggle.innerText = "Toggle Widget";
  document.body.appendChild(toggle);

  toggle.addEventListener("click", () => {
    const widget = document.getElementById("fe-widget");
    if (widget) {
      const isVisible = widget.style.display !== "none";
      widget.style.display = isVisible ? "none" : "block";
      chrome.storage.sync.set({ widgetVisible: !isVisible });
    } else {
      createWidget();
      chrome.storage.sync.set({ widgetVisible: true });
    }
  });
};

// Load settings and initialize
chrome.storage.sync.get("widgetVisible", (result) => {
  createToggleButton();
  if (result.widgetVisible !== false) {
    createWidget();
  }
});
