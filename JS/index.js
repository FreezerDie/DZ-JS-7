let sessionStartTime = Date.now();
let totalTime = localStorage.getItem("totalTime")
  ? parseInt(localStorage.getItem("totalTime"))
  : 0;
let lastVisit = localStorage.getItem("lastVisit")
  ? new Date(localStorage.getItem("lastVisit"))
  : null;

const updateTime = () => {
  const sessionTime = Math.floor((Date.now() - sessionStartTime) / 1000);
  document.getElementById("session-time").textContent = sessionTime;

  document.getElementById("total-time").textContent = totalTime;

  if (lastVisit) {
    document.getElementById("last-visit").textContent =
      lastVisit.toLocaleString();
  } else {
    document.getElementById("last-visit").textContent = "Никогда";
  }
};

const saveData = () => {
  const sessionTime = Math.floor((Date.now() - sessionStartTime) / 1000);
  totalTime += sessionTime;
  localStorage.setItem("totalTime", totalTime);
  localStorage.setItem("lastVisit", new Date().toISOString());
};

document.getElementById("reset-btn").addEventListener("click", () => {
  localStorage.removeItem("totalTime");
  localStorage.removeItem("lastVisit");
  totalTime = 0;
  sessionStartTime = Date.now();
  updateTime();
});

window.addEventListener("beforeunload", saveData());

setInterval(updateTime, 1000);

updateTime();
