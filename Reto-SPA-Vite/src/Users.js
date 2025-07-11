const apiUrl = "http://localhost:3000/users";
let users = [];

export async function initApp(container, currentUser) {
  const isAdmin = currentUser?.role === "admin";

  container.innerHTML = `
    <main>
      <div class="topbar">
        <h2>Students List</h2>
        <div class="topbar-right">
          <input type="search" id="search" class="search-input" placeholder="Buscar..." />
          ${isAdmin ? '<button class="add-user-btn" id="btnAdd">AGREGAR USUARIO</button>' : ""}
        </div>
      </div>
      <div class="user-list">
        <div class="user-list-header">
          <div></div>
          <div>Nombre</div>
          <div>Correo</div>
          <div>Teléfono</div>
          <div>Matrícula</div>
          <div>Fecha de admisión</div>
          <div></div>
        </div>
        <div id="userList"></div>
      </div>
    </main>

    <div class="form-popup" id="userForm" style="display: none;">
      <input type="hidden" id="editId" />
      <input type="text" id="name" placeholder="Nombre Completo" />
      <input type="email" id="email" placeholder="correo@ejemplo.com" />
      <input type="tel" id="phone" placeholder="1234567890" />
      <input type="text" id="enrollNumber" placeholder="12345678901234" />
      <input type="date" id="dateOfAdmission" />
      ${isAdmin ? `
        <input type="text" id="username" placeholder="Nombre de usuario" />
        <input type="password" id="password" placeholder="Contraseña" />
      ` : ""}
      <button id="saveBtn">Guardar</button>
      <button onclick="closeForm()">Cancelar</button>
    </div>
  `;

  if (isAdmin) {
    document.getElementById("btnAdd").addEventListener("click", openForm);
    document.getElementById("saveBtn").addEventListener("click", () => saveUser(isAdmin));
  }

  document.getElementById("search").addEventListener("input", filterUsers);
  loadUsers(isAdmin);
}

function openForm() {
  document.getElementById("editId").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("enrollNumber").value = "";
  document.getElementById("dateOfAdmission").value = "";

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  if (usernameInput && passwordInput) {
    usernameInput.value = "";
    passwordInput.value = "";
  }

  document.getElementById("userForm").style.display = "block";
}

window.closeForm = function () {
  document.getElementById("userForm").style.display = "none";
};

function renderUsers(list = users, isAdmin = false) {
  const el = document.getElementById("userList");
  el.innerHTML = "";
  list.forEach(user => {
    const div = document.createElement("div");
    div.className = "user";
    div.innerHTML = `
      <img src="/imgs/Incognito.jpeg" alt="User" />
      <div>${user.name}</div>
      <div>${user.email}</div>
      <div>${user.phone}</div>
      <div>${user.enrollNumber}</div>
      <div>${user.dateOfAdmission}</div>
      <div class="actions">
        ${isAdmin ? `
          <button onclick="editUser(${user.id})">✏️</button>
          <button onclick="deleteUser(${user.id})">🗑️</button>
        ` : ""}
      </div>
    `;
    el.appendChild(div);
  });
}

// Validaciones
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validatePhone(phone) {
  return /^\d{10,15}$/.test(phone);
}

// Guardar
function saveUser(isAdmin) {
  const id = document.getElementById("editId").value;
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const enrollNumber = document.getElementById("enrollNumber").value.trim();
  const dateOfAdmission = document.getElementById("dateOfAdmission").value;

  let username = "", password = "";
  if (isAdmin) {
    username = document.getElementById("username").value.trim();
    password = document.getElementById("password").value.trim();
    if (!username || !password) return alert("Usuario y contraseña son obligatorios");
  }

  if (!name || !email || !phone || !enrollNumber || !dateOfAdmission)
    return alert("Todos los campos son obligatorios");

  if (!validateEmail(email)) return alert("Correo inválido");
  if (!validatePhone(phone)) return alert("Teléfono inválido");

  const newUser = {
    name,
    email,
    phone,
    enrollNumber,
    dateOfAdmission,
    role: "user"
  };

  if (isAdmin) {
    newUser.username = username;
    newUser.password = password;
  }

  if (id) {
    fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: parseInt(id), ...newUser })
    }).then(() => loadUsers(true));
  } else {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        if (isAdmin && data.find(u => u.username === username)) {
          return alert("Ese nombre de usuario ya existe");
        }

        fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser)
        }).then(() => loadUsers(true));
      });
  }

  closeForm();
}

// Editar
window.editUser = function (id) {
  fetch(`${apiUrl}/${id}`)
    .then(res => res.json())
    .then(user => {
      document.getElementById("editId").value = user.id;
      document.getElementById("name").value = user.name;
      document.getElementById("email").value = user.email;
      document.getElementById("phone").value = user.phone;
      document.getElementById("enrollNumber").value = user.enrollNumber;
      document.getElementById("dateOfAdmission").value = user.dateOfAdmission;

      const usernameInput = document.getElementById("username");
      const passwordInput = document.getElementById("password");
      if (usernameInput) usernameInput.value = user.username || "";
      if (passwordInput) passwordInput.value = user.password || "";

      document.getElementById("userForm").style.display = "block";
    });
};

// Eliminar
window.deleteUser = function (id) {
  fetch(`${apiUrl}/${id}`, { method: "DELETE" }).then(() => loadUsers(true));
};

// Cargar usuarios
function loadUsers(isAdmin = false) {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      users = data;
      renderUsers(users, isAdmin);
    });
}

// Buscar
function filterUsers(e) {
  const q = e.target.value.toLowerCase();
  const filtered = users.filter(u => u.name.toLowerCase().includes(q));
  const currentUser = JSON.parse(localStorage.getItem("user"));
  renderUsers(filtered, currentUser?.role === "admin");
}
