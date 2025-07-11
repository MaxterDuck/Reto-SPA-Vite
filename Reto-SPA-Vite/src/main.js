import { showLoginView } from "./auth.js";
import { loadHome } from "./home.js";
import { initApp } from "./Users.js";

const app = document.getElementById("app");
const currentUser = JSON.parse(localStorage.getItem("user"));

if (!currentUser) {
  showLoginView();
} else {
  document.getElementById("app-layout").style.display = "flex";
  document.getElementById("sidebarName").textContent = currentUser.name;
  document.getElementById("sidebarRole").textContent = currentUser.role;
  navigateTo("home");
}

function navigateTo(view) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return showLoginView();

  document.getElementById("login").style.display = "none";
  document.getElementById("register").style.display = "none";
  document.getElementById("app-layout").style.display = "flex";

  if (view === "home") loadHome(app);
  else if (view === "users") initApp(app, user);
}

document.getElementById("navHome").addEventListener("click", () => navigateTo("home"));
document.getElementById("navUsers").addEventListener("click", () => navigateTo("users"));
document.getElementById("btnLogout").addEventListener("click", () => {
  localStorage.removeItem("user");
  showLoginView();
});
