const apiUrl = "http://localhost:3000/users";

export function showLoginView() {
  document.getElementById("login").style.display = "flex";
  document.getElementById("register").style.display = "none";
  document.getElementById("app-layout").style.display = "none";

  document.getElementById("btnLogin").onclick = login;
  document.getElementById("linkRegister").onclick = showRegisterView;
}

export function showRegisterView() {
  document.getElementById("login").style.display = "none";
  document.getElementById("register").style.display = "flex";
  document.getElementById("app-layout").style.display = "none";

  document.getElementById("btnRegister").onclick = register;
  document.getElementById("linkBackToLogin").onclick = showLoginView;
}

async function login() {
  const username = document.getElementById("loginUser").value.trim();
  const password = document.getElementById("loginPass").value.trim();
  if (!username || !password) return alert("Completa ambos campos.");

  const res = await fetch(apiUrl);
  const users = await res.json();
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    location.reload();
  } else {
    alert("Usuario o contraseña incorrectos.");
  }
}

async function register() {
  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const phone = document.getElementById("regPhone").value.trim();
  const enrollNumber = document.getElementById("regEnroll").value.trim();
  const dateOfAdmission = document.getElementById("regDate").value;

  if (!username || !password || !name || !email || !phone || !enrollNumber || !dateOfAdmission)
    return alert("Todos los campos son obligatorios.");

  const res = await fetch(apiUrl);
  const users = await res.json();
  if (users.find(u => u.username === username)) {
    return alert("Usuario ya existe.");
  }

  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, name, email, phone, enrollNumber, dateOfAdmission, role: "user" })
  });

  alert("Registro exitoso. Por favor inicia sesión.");
  showLoginView();
}
