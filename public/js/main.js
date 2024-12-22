const btnSettings = document.querySelector(".js-btn-settings");
const dialog = document.querySelector("dialog");
const btnClose = document.querySelector(".js-btn-close");
const btnSubmit = document.querySelector(".js-submit-btn");

btnSettings.addEventListener("click", () => {
  dialog.showModal();
});

btnClose.addEventListener("click", () => {
  dialog.close();
});

btnSubmit.addEventListener("click", () => {
  dialog.close();
});
