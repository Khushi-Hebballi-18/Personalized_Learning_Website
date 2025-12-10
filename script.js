/* ------------------ SIGNUP ------------------ */
function signup() {
  let username = document.getElementById("signup-username").value;
  let password = document.getElementById("signup-password").value;

  if (!username || !password) {
    alert("Please fill all fields");
    return;
  }

  localStorage.setItem("user", username);
  localStorage.setItem("pass", password);

  alert("Account created successfully!");
  window.location.href = "login.html"; // redirect to login
}

/* ------------------ LOGIN ------------------ */
function login() {
  let username = document.getElementById("login-username").value;
  let password = document.getElementById("login-password").value;

  let savedUser = localStorage.getItem("user");
  let savedPass = localStorage.getItem("pass");

  if (username === savedUser && password === savedPass) {
    localStorage.setItem("loggedIn", "true"); // session
    alert("Login successful!");
    window.location.href = "index.html"; // dashboard
  } else {
    document.getElementById("login-error").innerText =
      "❌ Invalid username or password!";
  }
}

/* ------------------ CHECK LOGIN (Dashboard) ------------------ */
function checkLogin() {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html"; // block access
  }
}

/* ------------------ LOGOUT ------------------ */
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

/* ------------------ TO-DO LIST ------------------ */
function addTask() {
  const input = document.getElementById("new-task");
  const task = input.value.trim();

  if (task) {
    const li = document.createElement("li");
    li.textContent = task;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.border = "none";
    deleteBtn.style.background = "transparent";
    deleteBtn.style.fontSize = "1rem";

    deleteBtn.onclick = function () {
      li.remove();
    };

    li.appendChild(deleteBtn);
    document.getElementById("todo-list").appendChild(li);

    input.value = "";
  } else {
    alert("Please enter a task!");
  }
}

/* ------------------ DARK MODE ------------------ */
function toggleTheme() {
  const body = document.body;
  const btn = document.querySelector(".theme-toggle");

  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    btn.textContent = "☀️"; // Light mode icon
  } else {
    localStorage.setItem("theme", "light");
    btn.textContent = "🌙"; // Dark mode icon
  }
}

/* ------------------ PROFILE: Save / Load / Photo Preview ------------------ */

function saveProfile() {
  const name = document.getElementById("profile-name").value.trim();
  const cls = document.getElementById("profile-class").value.trim();
  const email = document.getElementById("profile-email").value.trim();
  const avatarData = localStorage.getItem("avatarData") || null;

  if (!name) {
    document.getElementById("profile-msg").style.color = "red";
    document.getElementById("profile-msg").textContent = "Please enter your name.";
    return;
  }

  const profile = {
    name,
    class: cls,
    email,
    avatar: avatarData
  };

  localStorage.setItem("profile", JSON.stringify(profile));

  document.getElementById("profile-msg").style.color = "green";
  document.getElementById("profile-msg").textContent = "Profile saved successfully ✅";

  loadProfileIntoDashboard();
}

function loadProfileIntoForm() {
  const raw = localStorage.getItem("profile");
  if (!raw) return;

  const profile = JSON.parse(raw);

  if (profile.name) document.getElementById("profile-name").value = profile.name;
  if (profile.class) document.getElementById("profile-class").value = profile.class;
  if (profile.email) document.getElementById("profile-email").value = profile.email;

  if (profile.avatar) {
    const img = document.getElementById("avatar-img");
    const placeholder = document.getElementById("avatar-placeholder");
    img.src = profile.avatar;
    img.style.display = "block";
    placeholder.style.display = "none";
    localStorage.setItem("avatarData", profile.avatar);
  }
}

function previewAvatar(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;

    const img = document.getElementById("avatar-img");
    const placeholder = document.getElementById("avatar-placeholder");

    img.src = dataUrl;
    img.style.display = "block";
    placeholder.style.display = "none";

    localStorage.setItem("avatarData", dataUrl);
  };
  reader.readAsDataURL(file);
}

function clearProfile() {
  localStorage.removeItem("profile");
  localStorage.removeItem("avatarData");

  document.getElementById("profile-name").value = "";
  document.getElementById("profile-class").value = "";
  document.getElementById("profile-email").value = "";

  document.getElementById("avatar-img").style.display = "none";
  document.getElementById("avatar-placeholder").style.display = "block";

  document.getElementById("profile-msg").textContent = "";

  loadProfileIntoDashboard();
}

/* ------------------ LOAD PROFILE INTO DASHBOARD ------------------ */
function loadProfileIntoDashboard() {
  try {
    const raw = localStorage.getItem("profile");
    if (!raw) return;

    const profile = JSON.parse(raw);

    // Update name if dashboard element exists
    const nameEl = document.getElementById("user-name");
    if (nameEl && profile.name) {
      nameEl.textContent = profile.name;
    }

    // Update avatar in sidebar if exists
    const sidebarAvatar = document.getElementById("sidebar-avatar");
    if (sidebarAvatar) {
      if (profile.avatar) {
        sidebarAvatar.src = profile.avatar;
        sidebarAvatar.style.display = "block";
      } else {
        sidebarAvatar.style.display = "none";
      }
    }

  } catch (e) {
    console.error("Error loading profile into dashboard", e);
  }
}

/* ------------------ ON LOAD (Theme + Dashboard Profile) ------------------ */
window.onload = function () {
  // Load theme
  const savedTheme = localStorage.getItem("theme");
  const btn = document.querySelector(".theme-toggle");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (btn) btn.textContent = "☀️";
  } else {
    if (btn) btn.textContent = "🌙";
  }

  // Load profile into dashboard if elements exist
  loadProfileIntoDashboard();
};
