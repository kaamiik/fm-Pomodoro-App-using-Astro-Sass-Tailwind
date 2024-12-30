const elements = {
  dialog: document.querySelector("dialog"),
  btnSettings: document.querySelector(".js-btn-settings"),
  btnClose: document.querySelector(".js-btn-close"),
  timeInputs: document.querySelectorAll('input[type="number"]'),
  fontRadios: document.querySelectorAll('input[name="font"]'),
  settingsForm: document.querySelector("form"),
  body: document.body,
  tabList: document.querySelector("[role='tablist']"),
  tabs: document.querySelectorAll("[role='tab']"),
  tabPanels: document.querySelectorAll("[role='tabpanel']"),
};

const timeValues = {
  pomodoro: 25,
  "short-break": 5,
  "long-break": 15,
};

let currentFont = "font-sans";
let currentColor = "coral";
let tabFocus = 0;
let activePanel = null;

const timerStates = new Map();

elements.tabPanels.forEach((panel) => {
  timerStates.set(panel.id, {
    interval: null,
    totalTime: 0,
    remainingTime: 0,
    isRunning: false,
  });
});

function changeTabFocus(event) {
  const keydownLeft = 37;
  const keydownRight = 39;

  if (event.keyCode === keydownLeft || event.keyCode === keydownRight) {
    elements.tabs[tabFocus].setAttribute("tabindex", -1);
  }

  if (event.keyCode === keydownRight) {
    tabFocus++;
    if (tabFocus >= elements.tabs.length) {
      tabFocus = 0;
    }
  } else if (event.keyCode === keydownLeft) {
    tabFocus--;
    if (tabFocus < 0) {
      tabFocus = elements.tabs.length - 1;
    }
  }

  elements.tabs[tabFocus].setAttribute("tabindex", 0);
  elements.tabs[tabFocus].focus();
}

function changeTabPanel(event) {
  const targetTab = event.target;
  const targetPanel = targetTab.getAttribute("aria-controls");
  const tabContainer = targetTab.parentNode;
  const divContainer = tabContainer.parentNode;
  const tabPanel = divContainer.querySelector(`#${targetPanel}`);

  tabContainer
    .querySelector("[aria-selected='true']")
    .setAttribute("aria-selected", false);

  targetTab.setAttribute("aria-selected", true);

  divContainer.querySelectorAll("[role='tabpanel']").forEach((panel) => {
    panel.classList.add("hidden");
  });

  tabPanel.classList.remove("hidden");
}

function updateTimerDisplay(panel) {
  const state = timerStates.get(panel.id);
  const timeElement = panel.querySelector("time");
  const minutes = Math.floor(state.remainingTime / 60);
  const seconds = state.remainingTime % 60;
  const timeString = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  timeElement.textContent = timeString;
  timeElement.setAttribute("datetime", timeString);
}

function updateProgressBar(panel) {
  const state = timerStates.get(panel.id);
  const circle = panel.querySelector("circle");
  const strokeDasharray = 440;
  const progress = 1 - state.remainingTime / state.totalTime;
  circle.style.strokeDashoffset = strokeDasharray * progress;
}

function resetTimer(panel) {
  const state = timerStates.get(panel.id);
  const timeType = panel.id.includes("1")
    ? "pomodoro"
    : panel.id.includes("2")
    ? "short-break"
    : "long-break";

  if (state.interval) {
    clearInterval(state.interval);
    state.interval = null;
  }

  state.totalTime = timeValues[timeType] * 60;
  state.remainingTime = state.totalTime;
  state.isRunning = false;

  updateTimerDisplay(panel);
  updateProgressBar(panel);
  panel.querySelector("button").textContent = "start";
}

function resetAllTimersExcept(currentPanelId) {
  elements.tabPanels.forEach((panel) => {
    if (panel.id !== currentPanelId) {
      resetTimer(panel);
    }
  });
}

function setTimerDuration(panel, minutes) {
  const state = timerStates.get(panel.id);

  if (state.interval) {
    clearInterval(state.interval);
    state.interval = null;
  }

  state.totalTime = minutes * 60;
  state.remainingTime = state.totalTime;
  state.isRunning = false;

  updateTimerDisplay(panel);
  updateProgressBar(panel);
  panel.querySelector("button").textContent = "start";
}

function startTimer(panel) {
  const state = timerStates.get(panel.id);
  const button = panel.querySelector("button");

  resetAllTimersExcept(panel.id);

  state.isRunning = true;
  state.interval = setInterval(() => {
    if (state.remainingTime > 0) {
      state.remainingTime--;
      updateTimerDisplay(panel);
      updateProgressBar(panel);
    } else {
      clearInterval(state.interval);
      state.interval = null;
      state.isRunning = false;
      button.textContent = "restart";
    }
  }, 1000);
}

function handleTimerButton(event) {
  const button = event.target;
  const panel = button.closest('[role="tabpanel"]');
  const state = timerStates.get(panel.id);

  switch (button.textContent.trim().toLowerCase()) {
    case "start":
      button.textContent = "pause";
      startTimer(panel);
      break;

    case "pause":
      button.textContent = "start";
      clearInterval(state.interval);
      state.interval = null;
      state.isRunning = false;
      break;

    case "restart":
      const timeType = panel.id.includes("1")
        ? "pomodoro"
        : panel.id.includes("2")
        ? "short-break"
        : "long-break";
      setTimerDuration(panel, timeValues[timeType]);
      break;
  }
}

function updateSettings() {
  elements.timeInputs.forEach((input) => {
    timeValues[input.id] = parseInt(input.value, 10);
  });

  const selectedFont = document.querySelector(
    "input[name='font']:checked"
  ).value;
  currentFont =
    selectedFont === "kumbh-sans"
      ? "font-sans"
      : selectedFont === "roboto-slab"
      ? "font-serif"
      : "font-mono";
  elements.body.className = currentFont;

  const selectedColor = document.querySelector(
    "input[name='color']:checked"
  ).value;
  const colorMap = {
    coral: "--primary-400",
    cyan: "--primary-500",
    purple: "--primary-600",
  };
  elements.body.style.setProperty(
    "--selected-color",
    `var(${colorMap[selectedColor]})`
  );

  const activePanel = document.querySelector("[role='tabpanel']:not(.hidden)");
  const timeType = activePanel.id.includes("1")
    ? "pomodoro"
    : activePanel.id.includes("2")
    ? "short-break"
    : "long-break";
  setTimerDuration(activePanel, timeValues[timeType]);
}

elements.tabPanels.forEach((panel) => {
  panel.querySelector("button").addEventListener("click", handleTimerButton);
});

elements.tabList.addEventListener("keydown", changeTabFocus);
elements.tabs.forEach((tab) => {
  tab.addEventListener("click", changeTabPanel);
});

elements.btnSettings.addEventListener("click", () => {
  elements.timeInputs.forEach((input) => {
    input.value = timeValues[input.id];

    const wrapper = input.closest("div");
    const increaseBtn = wrapper.querySelector(".js-increase-btn");
    const decreaseBtn = wrapper.querySelector(".js-decrease-btn");

    increaseBtn.addEventListener("click", () => {
      input.value = parseInt(input.value, 10) + 1;
    });

    decreaseBtn.addEventListener("click", () => {
      input.value = parseInt(input.value, 10) - 1;

      if (input.value < 0) {
        input.value = 0;
      }
    });
  });
  elements.dialog.showModal();
});

elements.settingsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updateSettings();
  elements.dialog.close();
});

elements.btnClose.addEventListener("click", () => {
  elements.dialog.close();
});

elements.tabs[0].click();
elements.tabPanels.forEach((panel) => {
  const timeType = panel.id.includes("1")
    ? "pomodoro"
    : panel.id.includes("2")
    ? "short-break"
    : "long-break";
  setTimerDuration(panel, timeValues[timeType]);
});
