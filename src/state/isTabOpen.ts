export const isTabOpen = localStorage.getItem("is-tab-open") === "1";

if (!isTabOpen) {
  localStorage.setItem("is-tab-open", "1");
  addEventListener("unload", () => {
    localStorage.removeItem("is-tab-open");
  });
}
