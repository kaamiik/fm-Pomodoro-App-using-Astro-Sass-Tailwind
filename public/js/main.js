const dialog = document.querySelector("dialog");
const btnSettings = document.querySelector(".js-btn-settings");
const btnClose = document.querySelector(".js-btn-close");
const btnSubmit = document.querySelector(".js-submit-btn");
const timeInputs = document.querySelectorAll('input[type="number"]');
const fontRadios = document.querySelectorAll('input[name="font"]');
const settingsForm = document.querySelector("form");
const body = document.body;

const defaultFont = "font-sans";
let currentFont = defaultFont;

const tabList = document.querySelector("[role='tablist']");
const tabs = tabList.querySelectorAll("[role='tab']");
let tabFoucs = 0;

const progressbar = document.querySelector(".progressbar");
const time = document.querySelector("time");

function enableProgressBar() {
  progressbar.setAttribute("role", "progressbar");
  progressbar.setAttribute("aria-valuenow", time.textContent);
  progressbar.setAttribute("aria-live", "polite");
}

function changeTabFocus(event) {
  const keydownLeft = 37;
  const keydownRight = 39;

  if (event.keyCode === keydownLeft || event.keyCode === keydownRight) {
    tabs[tabFoucs].setAttribute("tabindex", -1);
  }

  if (event.keyCode === keydownRight) {
    tabFoucs++;

    if (tabFoucs >= tabs.length) {
      tabFoucs = 0;
    }
  } else if (event.keyCode === keydownLeft) {
    tabFoucs--;

    if (tabFoucs < 0) {
      tabFoucs = tabs.length - 1;
    }
  }

  tabs[tabFoucs].setAttribute("tabindex", 0);
  tabs[tabFoucs].focus();
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

  tabContainer.querySelectorAll("[role='tab']").forEach((tab) => {
    tab.classList.remove("bg-primary-400", "text-neutral-800");
    tab.classList.add("text-neutral-300");
  });

  targetTab.classList.add("bg-primary-400", "text-neutral-800");
  targetTab.classList.remove("text-neutral-300");

  divContainer.querySelectorAll("[role='tabpanel']").forEach((panel) => {
    panel.classList.add("hidden");
  });

  tabPanel.classList.remove("hidden");
}

function updateRadioButtons(fontClass) {
  fontRadios.forEach((radio) => {
    radio.checked = false;
  });

  if (fontClass === "font-sans") {
    document.getElementById("kumbh-sans").checked = true;
  } else if (fontClass === "font-serif") {
    document.getElementById("roboto-slab").checked = true;
  } else if (fontClass === "font-mono") {
    document.getElementById("space-mono").checked = true;
  }
}

// Progressbar code
enableProgressBar();

// Change Tabs
tabList.addEventListener("keydown", changeTabFocus);
tabs.forEach((tab) => {
  tab.addEventListener("click", changeTabPanel);
});

// Settings Code
btnSettings.addEventListener("click", () => {
  dialog.showModal();
});

timeInputs.forEach((input) => {
  const wrapper = input.closest("div");
  const increaseBtn = wrapper.querySelector(".js-increase-btn");
  const decreaseBtn = wrapper.querySelector(".js-decrease-btn");

  increaseBtn.addEventListener("click", () => {
    input.value = parseInt(input.value) + 1;
  });

  decreaseBtn.addEventListener("click", () => {
    input.value = parseInt(input.value) - 1;

    if (input.value < 0) {
      input.value = 0;
    }
  });
});

updateRadioButtons(currentFont);

fontRadios.forEach((radio) => {
  radio.addEventListener("change", (event) => {
    const selectedFontClass =
      event.target.value === "kumbh-sans"
        ? "font-sans"
        : event.target.value === "roboto-slab"
        ? "font-serif"
        : "font-mono";

    body.className = selectedFontClass;
  });
});

settingsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  // Update the fonts
  const selectedFont = document.querySelector(
    "input[name='font']:checked"
  ).value;

  currentFont =
    selectedFont === "kumbh-sans"
      ? "font-sans"
      : selectedFont === "roboto-slab"
      ? "font-serif"
      : "font-mono";

  // Update the color
  const selectedColor = document.querySelector(
    "input[name='color']:checked"
  ).value;

  const colorMap = {
    coral: "--primary-400",
    cyan: "--primary-500",
    purple: "--primary-600",
  };

  const selectedColorProperty = colorMap[selectedColor];
  body.style.setProperty("--selected-color", `var(${selectedColorProperty})`);

  dialog.close();
});

btnClose.addEventListener("click", () => {
  dialog.close();
  body.className = currentFont;
  updateRadioButtons(currentFont);
});
