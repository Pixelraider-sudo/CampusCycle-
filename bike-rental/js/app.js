/* ═══════════════════════════════════════════════
   CAMPUSCYCLE — IMPROVED VERSION
   - Single owner account + owner‑only staff creation
   - Bike image galleries with auto‑rotation (every minute) and hover switching
═══════════════════════════════════════════════ */

/* ── STORAGE KEYS ── */
const K = {
  BIKES: "cc_bikes",
  HISTORY: "cc_history",
  DAY: "cc_day",
  ACTIVITY: "cc_activity",
  ACCOUNTS: "cc_accounts",
  RESERVATIONS: "cc_reservations",
  FAVORITES: "cc_favorites",
  PREFS: "cc_prefs",
  SESSION: "cc_session",
  REMEMBER: "cc_remember",
  IMAGE_INDEXES: "cc_image_indexes", // new: store current image index per bike
};

/* ── DEFAULT BIKES (with image galleries) ── */
const DEFAULT_BIKES = [
  {
    id: 1,
    name: "Trail Blazer",
    type: "Mountain Bike",
    specs: "21-speed · Med Frame",
    tags: ["Rugged", "Offroad"],
    condition: "good",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    imageGallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=600&q=80",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80",
    ],
    status: "available",
    renter: null,
    sid: null,
    phone: null,
    startTime: null,
    returnBy: null,
    payMethod: "cash",
    usageCount: 4,
    avgDuration: 45,
    rating: 4.5,
    ratingCount: 3,
    maintenanceNote: "",
  },
  {
    id: 2,
    name: "City Cruiser",
    type: "City Bike",
    specs: "7-speed · Large Frame",
    tags: ["Smooth", "City"],
    condition: "excellent",
    img: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=600&q=80",
    imageGallery: [
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=600&q=80",
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600&q=80",
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&q=80",
    ],
    status: "available",
    renter: null,
    sid: null,
    phone: null,
    startTime: null,
    returnBy: null,
    payMethod: "cash",
    usageCount: 7,
    avgDuration: 38,
    rating: 4.8,
    ratingCount: 6,
    maintenanceNote: "",
  },
  {
    id: 3,
    name: "Road Runner",
    type: "Road Bike",
    specs: "18-speed · Small Frame",
    tags: ["Fast", "Light"],
    condition: "good",
    img: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80",
    imageGallery: [
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80",
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80",
    ],
    status: "available",
    renter: null,
    sid: null,
    phone: null,
    startTime: null,
    returnBy: null,
    payMethod: "cash",
    usageCount: 3,
    avgDuration: 60,
    rating: 4.2,
    ratingCount: 2,
    maintenanceNote: "",
  },
  {
    id: 4,
    name: "Hybrid Pro",
    type: "Hybrid Bike",
    specs: "24-speed · Med Frame",
    tags: ["Versatile"],
    condition: "fair",
    img: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&q=80",
    imageGallery: [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&q=80",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80",
    ],
    status: "available",
    renter: null,
    sid: null,
    phone: null,
    startTime: null,
    returnBy: null,
    payMethod: "cash",
    usageCount: 5,
    avgDuration: 52,
    rating: 4.0,
    ratingCount: 4,
    maintenanceNote: "Gears need tuning",
  },
  {
    id: 5,
    name: "Street King",
    type: "BMX",
    specs: "Single-speed · Compact",
    tags: ["Tricks", "Compact"],
    condition: "good",
    img: "https://images.unsplash.com/photo-1526401485004-46910ecc8e51?w=600&q=80",
    imageGallery: [
      "https://images.unsplash.com/photo-1526401485004-46910ecc8e51?w=600&q=80",
      "https://images.unsplash.com/photo-1561728091-dbb39f9c2d0c?w=600&q=80",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80",
    ],
    status: "available",
    renter: null,
    sid: null,
    phone: null,
    startTime: null,
    returnBy: null,
    payMethod: "cash",
    usageCount: 2,
    avgDuration: 30,
    rating: 3.8,
    ratingCount: 2,
    maintenanceNote: "",
  },
  {
    id: 6,
    name: "Compact Fold",
    type: "Folding Bike",
    specs: "6-speed · Universal",
    tags: ["Portable"],
    condition: "excellent",
    img: "https://images.unsplash.com/photo-1594942572014-04a43b9e33a3?w=600&q=80",
    imageGallery: [
      "https://images.unsplash.com/photo-1594942572014-04a43b9e33a3?w=600&q=80",
      "https://images.unsplash.com/photo-1597942002282-57f5a73ae23a?w=600&q=80",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80",
    ],
    status: "available",
    renter: null,
    sid: null,
    phone: null,
    startTime: null,
    returnBy: null,
    payMethod: "cash",
    usageCount: 1,
    avgDuration: 0,
    rating: 0,
    ratingCount: 0,
    maintenanceNote: "",
  },
];

/* ── DATA HELPERS (unchanged) ── */
const get = (k) => {
  try {
    return JSON.parse(localStorage.getItem(k));
  } catch (e) {
    return null;
  }
};
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const getBikes = () =>
  get(K.BIKES) || JSON.parse(JSON.stringify(DEFAULT_BIKES));
const saveBikes = (v) => save(K.BIKES, v);
const getHistory = () => get(K.HISTORY) || [];
const saveHistory = (v) => save(K.HISTORY, v);
const getActivity = () => get(K.ACTIVITY) || [];
const getAccounts = () => get(K.ACCOUNTS) || [];
const saveAccounts = (v) => save(K.ACCOUNTS, v);
const getReserves = () => get(K.RESERVATIONS) || [];
const saveReserves = (v) => save(K.RESERVATIONS, v);
const getFavorites = () => get(K.FAVORITES) || [];
const saveFavorites = (v) => save(K.FAVORITES, v);
const getPrefs = () => get(K.PREFS) || { theme: "dark" };
const savePrefs = (v) => save(K.PREFS, v);
const getDay = () => {
  const today = new Date().toDateString();
  const d = get(K.DAY);
  if (d && d.date === today) return d;
  return { date: today, earn: 0, count: 0 };
};
const saveDay = (v) => save(K.DAY, v);
const nextId = () => {
  const b = getBikes();
  return b.length ? Math.max(...b.map((x) => x.id)) + 1 : 1;
};

/* ── ACTIVITY LOG (unchanged) ── */
function logActivity(msg, type = "info") {
  const icons = {
    rent: "🚲",
    return: "✅",
    reserve: "📅",
    cancel: "❌",
    admin: "⚙️",
    system: "🔧",
    payment: "💰",
    auth: "🔐",
  };
  const log = getActivity();
  log.unshift({
    id: Date.now(),
    msg,
    type,
    icon: icons[type] || "•",
    time: Date.now(),
  });
  if (log.length > 100) log.length = 100;
  save(K.ACTIVITY, log);
}

/* ── UTILS (unchanged) ── */
function calcCharge(startMs, endMs) {
  const mins = Math.max(0, Math.round((endMs - startMs) / 60000));
  return { mins, cost: mins <= 60 ? 60 : 60 + (mins - 60) };
}
function fmtTime(ms) {
  return new Date(ms).toLocaleTimeString("en-KE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
function fmtDuration(mins) {
  if (!mins) return "—";
  if (mins < 60) return mins + "m";
  return Math.floor(mins / 60) + "h " + (mins % 60) + "m";
}
function fmtTimeAgo(ts) {
  const s = Math.round((Date.now() - ts) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return Math.round(s / 60) + "m ago";
  return Math.round(s / 3600) + "h ago";
}
function starsHtml(rating, count) {
  if (!rating || !count)
    return '<span style="color:var(--text3);font-size:11px">No ratings yet</span>';
  const full = Math.round(rating);
  const stars = "★".repeat(full) + "☆".repeat(5 - full);
  return `<span style="color:var(--accent)">${stars}</span> <span style="font-size:10px;color:var(--text3)">(${count})</span>`;
}
function condHtml(c) {
  const map = {
    excellent: "Excellent",
    good: "Good",
    fair: "Fair",
    poor: "Poor",
  };
  return `<span class="cond-pill ${c || "good"}">${map[c] || "Good"}</span>`;
}
function isReturningSoon(b) {
  if (!b.returnBy) return false;
  const [h, m] = b.returnBy.split(":").map(Number);
  const ret = new Date();
  ret.setHours(h, m, 0, 0);
  const diff = Math.round((ret - Date.now()) / 60000);
  return diff >= 0 && diff <= 15;
}
function toast(msg, type = "info", dur = 3500) {
  const wrap = document.getElementById("toast-wrap");
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  const icons = { success: "✅", error: "❌", info: "ℹ️", warn: "⚠️" };
  el.innerHTML = `<span>${icons[type] || "•"}</span><span>${msg}</span>`;
  wrap.appendChild(el);
  setTimeout(() => el.classList.add("show"), 50);
  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 350);
  }, dur);
}

/* ═══════════════════════════════════════════════
   AUTH SYSTEM (Modified)
═══════════════════════════════════════════════ */
let currentUser = null;
let loginAttempts = 0;
let lockedUntil = 0;
let inactivityTimer = null;
const MAX_ATTEMPTS = 3;
const LOCK_DURATION = 5 * 60 * 1000;
const INACTIVITY_LIMIT = 30 * 60 * 1000;

function initAuth() {
  // Check remember me
  const remId = get(K.REMEMBER);
  if (remId) {
    const acc = getAccounts().find((a) => a.id === remId);
    if (acc) {
      currentUser = acc;
      updateAuthUI();
      return;
    }
  }
  const sesId = get(K.SESSION);
  if (sesId) {
    const acc = getAccounts().find((a) => a.id === sesId);
    if (acc) {
      currentUser = acc;
      updateAuthUI();
    }
  }
  // Hide signup tab if accounts exist
  const accounts = getAccounts();
  const signupTab = document.getElementById("tab-signup");
  if (accounts.length > 0 && signupTab) {
    signupTab.style.display = "none";
    if (document.getElementById("pane-signup").style.display !== "none") {
      switchAuthTab("login");
    }
  } else if (accounts.length === 0 && signupTab) {
    signupTab.style.display = "";
  }
}

function updateAuthUI() {
  const loggedIn = !!currentUser;
  const profile = document.getElementById("nav-profile");
  const pill = document.getElementById("profile-pill");
  if (loggedIn) {
    profile.style.display = "flex";
    pill.textContent = `👤 ${currentUser.name.split(" ")[0]}`;
  } else {
    profile.style.display = "none";
  }
  if (
    document.getElementById("view-admin").classList.contains("active") &&
    !loggedIn
  ) {
    switchView("student", null);
  }
}

function goAdmin(btn) {
  if (currentUser) {
    switchView("admin", btn);
    renderAdmin();
  } else {
    switchView("auth", btn);
    const accounts = getAccounts();
    const note = document.getElementById("first-acc-note");
    const roleGroup = document.getElementById("role-group");
    if (!accounts.length) {
      note.style.display = "block";
      roleGroup.style.display = "none";
    } else {
      note.style.display = "none";
      roleGroup.style.display = "block";
    }
  }
  document
    .querySelectorAll(".nav-tab")
    .forEach((t) => t.classList.remove("active"));
  if (btn) btn.classList.add("active");
}

function doLogin() {
  const username = document.getElementById("l-username").value.trim();
  const password = document.getElementById("l-password").value;
  const remember = document.getElementById("l-remember").checked;
  const alert = document.getElementById("login-alert");
  const lockMsg = document.getElementById("lockout-msg");

  if (Date.now() < lockedUntil) {
    const rem = Math.ceil((lockedUntil - Date.now()) / 60000);
    showAlert(
      alert,
      `Too many attempts. Locked for ${rem} more minute(s).`,
      "error",
    );
    return;
  }

  if (!username || !password) {
    showAlert(alert, "Please fill all fields.", "error");
    return;
  }

  const accounts = getAccounts();
  const acc = accounts.find(
    (a) => a.username.toLowerCase() === username.toLowerCase(),
  );

  if (!acc || acc.password !== password) {
    loginAttempts++;
    const rem = MAX_ATTEMPTS - loginAttempts;
    if (loginAttempts >= MAX_ATTEMPTS) {
      lockedUntil = Date.now() + LOCK_DURATION;
      loginAttempts = 0;
      showAlert(
        alert,
        `Too many failed attempts. Locked for 5 minutes.`,
        "error",
      );
      lockMsg.style.display = "block";
      lockMsg.textContent = "Account temporarily locked for security.";
    } else {
      showAlert(
        alert,
        `Incorrect username or password. ${rem} attempt(s) left.`,
        "error",
      );
    }
    return;
  }

  loginAttempts = 0;
  lockedUntil = 0;
  lockMsg.style.display = "none";
  currentUser = acc;
  save(K.SESSION, acc.id);
  if (remember) save(K.REMEMBER, acc.id);
  else localStorage.removeItem(K.REMEMBER);

  const accs = getAccounts();
  const a = accs.find((x) => x.id === acc.id);
  if (a) {
    a.lastLogin = Date.now();
    saveAccounts(accs);
  }

  document.getElementById("l-password").value = "";
  alert.style.display = "none";
  updateAuthUI();
  switchView("admin", null);
  renderAdmin();
  startInactivityTimer();
  logActivity(`${acc.name} logged in`, "auth");
  toast(`Welcome back, ${acc.name.split(" ")[0]}! 👋`, "success");
}

function doSignup() {
  // Only allowed if no accounts exist (first account) OR current user is owner
  const accounts = getAccounts();
  const isFirst = !accounts.length;
  if (!isFirst && (!currentUser || currentUser.role !== "owner")) {
    toast("Only the owner can create new accounts.", "error");
    return;
  }

  const name = document.getElementById("s-name").value.trim();
  const username = document.getElementById("s-username").value.trim();
  const password = document.getElementById("s-password").value;
  const secq = document.getElementById("s-secq").value;
  const seca = document.getElementById("s-seca").value.trim();
  const alert = document.getElementById("signup-alert");

  if (!name || !username || !password || !secq || !seca) {
    showAlert(alert, "All fields required.", "error");
    return;
  }
  if (password.length < 6) {
    showAlert(alert, "Password must be at least 6 characters.", "error");
    return;
  }
  if (
    accounts.find((a) => a.username.toLowerCase() === username.toLowerCase())
  ) {
    showAlert(alert, "Username already taken.", "error");
    return;
  }

  let role = isFirst ? "owner" : "staff"; // force staff for non‑first accounts
  // If current user is owner and they are creating an account, role is staff (they can't create another owner)
  if (!isFirst && currentUser && currentUser.role === "owner") {
    role = "staff";
  }

  const acc = {
    id: "acc_" + Date.now(),
    name,
    username,
    password,
    role,
    secq,
    seca: seca.toLowerCase(),
    createdAt: Date.now(),
    lastLogin: null,
  };
  accounts.push(acc);
  saveAccounts(accounts);

  if (isFirst) {
    currentUser = acc;
    save(K.SESSION, acc.id);
    updateAuthUI();
    switchView("admin", null);
    renderAdmin();
    logActivity(`${name} created account (owner)`, "auth");
    toast(`Account created! Welcome, ${name.split(" ")[0]}! 🎉`, "success");
  } else {
    showAlert(
      alert,
      `Staff account for ${name} created successfully!`,
      "success",
    );
    toast(`Staff account created for ${name}`, "success");
  }

  // Reset form
  ["s-name", "s-username", "s-password", "s-seca"].forEach(
    (id) => (document.getElementById(id).value = ""),
  );
  document.getElementById("s-secq").value = "";
}

function confirmAddStaff() {
  // Called from the new "Add Staff" modal. Only allowed if currentUser is owner.
  if (!currentUser || currentUser.role !== "owner") {
    toast("Only the owner can add staff.", "error");
    return;
  }
  const name = document.getElementById("staff-name").value.trim();
  const username = document.getElementById("staff-username").value.trim();
  const password = document.getElementById("staff-password").value;
  const secq = document.getElementById("staff-secq").value;
  const seca = document.getElementById("staff-seca").value.trim();
  const alert = document.getElementById("staff-alert");

  if (!name || !username || !password || !secq || !seca) {
    showAlert(alert, "All fields required.", "error");
    return;
  }
  if (password.length < 6) {
    showAlert(alert, "Password must be at least 6 characters.", "error");
    return;
  }
  const accounts = getAccounts();
  if (
    accounts.find((a) => a.username.toLowerCase() === username.toLowerCase())
  ) {
    showAlert(alert, "Username already taken.", "error");
    return;
  }

  const acc = {
    id: "acc_" + Date.now(),
    name,
    username,
    password,
    role: "staff",
    secq,
    seca: seca.toLowerCase(),
    createdAt: Date.now(),
    lastLogin: null,
  };
  accounts.push(acc);
  saveAccounts(accounts);
  showAlert(alert, `Staff account for ${name} created!`, "success");
  setTimeout(() => closeModal("add-staff-modal"), 1500);
  renderAccountsList(); // refresh the list in admin panel
  logActivity(`${currentUser.name} created staff account: ${name}`, "admin");
  toast(`Staff account for ${name} added.`, "success");
  // Clear form
  ["staff-name", "staff-username", "staff-password", "staff-seca"].forEach(
    (id) => (document.getElementById(id).value = ""),
  );
  document.getElementById("staff-secq").value = "";
}

function doForgot() {
  const username = document.getElementById("f-username").value.trim();
  const secaInput = document.getElementById("f-seca");
  const newpwInput = document.getElementById("f-newpw");
  const secqGrp = document.getElementById("f-secq-grp");
  const newpwGrp = document.getElementById("f-newpw-grp");
  const alert = document.getElementById("forgot-alert");

  const accounts = getAccounts();
  const acc = accounts.find(
    (a) => a.username.toLowerCase() === username.toLowerCase(),
  );

  if (!acc) {
    showAlert(alert, "Username not found.", "error");
    return;
  }

  if (secqGrp.style.display === "none") {
    document.getElementById("f-secq-grp").style.display = "block";
    document.getElementById("f-secq-label").textContent = acc.secq;
    alert.style.display = "none";
    return;
  }

  if (newpwGrp.style.display === "none") {
    if (secaInput.value.trim().toLowerCase() !== acc.seca) {
      showAlert(alert, "Incorrect answer. Try again.", "error");
      return;
    }
    newpwGrp.style.display = "block";
    alert.style.display = "none";
    return;
  }

  const newpw = newpwInput.value.trim();
  if (newpw.length < 6) {
    showAlert(alert, "Password must be at least 6 characters.", "error");
    return;
  }
  const accs = getAccounts();
  const target = accs.find((a) => a.id === acc.id);
  if (target) {
    target.password = newpw;
    saveAccounts(accs);
  }

  ["f-username", "f-seca", "f-newpw"].forEach(
    (id) => (document.getElementById(id).value = ""),
  );
  secqGrp.style.display = "none";
  newpwGrp.style.display = "none";
  showAlert(alert, "Password reset successful! You can now login.", "success");
  setTimeout(() => switchAuthTab("login"), 2000);
}

function logout() {
  logActivity(`${currentUser?.name || "User"} logged out`, "auth");
  currentUser = null;
  localStorage.removeItem(K.SESSION);
  localStorage.removeItem(K.REMEMBER);
  stopInactivityTimer();
  updateAuthUI();
  switchView("student", null);
  document.querySelector(".nav-tab.active")?.classList.remove("active");
  document.querySelectorAll(".nav-tab")[0].classList.add("active");
  toast("Logged out successfully.", "info");
}

function changePassword() {
  if (!currentUser) return;
  const cur = document.getElementById("cp-cur").value;
  const newpw = document.getElementById("cp-new").value;
  const confirm = document.getElementById("cp-confirm").value;
  const alert = document.getElementById("chpw-alert");

  if (cur !== currentUser.password) {
    showAlert(alert, "Current password incorrect.", "error");
    return;
  }
  if (newpw.length < 6) {
    showAlert(alert, "New password must be at least 6 chars.", "error");
    return;
  }
  if (newpw !== confirm) {
    showAlert(alert, "Passwords do not match.", "error");
    return;
  }

  const accs = getAccounts();
  const a = accs.find((x) => x.id === currentUser.id);
  if (a) {
    a.password = newpw;
    saveAccounts(accs);
    currentUser.password = newpw;
  }
  save(K.SESSION, currentUser.id);
  showAlert(alert, "Password updated successfully!", "success");
  ["cp-cur", "cp-new", "cp-confirm"].forEach(
    (id) => (document.getElementById(id).value = ""),
  );
  logActivity(`${currentUser.name} changed password`, "auth");
  toast("Password updated! 🔐", "success");
}

function startInactivityTimer() {
  stopInactivityTimer();
  resetInactivityTimer();
  ["mousemove", "keydown", "click", "scroll", "touchstart"].forEach((ev) =>
    document.addEventListener(ev, resetInactivityTimer, { passive: true }),
  );
}
function stopInactivityTimer() {
  if (inactivityTimer) clearTimeout(inactivityTimer);
}
function resetInactivityTimer() {
  stopInactivityTimer();
  inactivityTimer = setTimeout(() => {
    if (currentUser) {
      toast("Auto-logged out due to inactivity.", "warn");
      logout();
    }
  }, INACTIVITY_LIMIT);
}

function showAlert(el, msg, type = "error") {
  el.className = `auth-alert ${type}`;
  el.textContent = msg;
  el.style.display = "block";
}

function switchAuthTab(tab) {
  ["login", "signup", "forgot"].forEach((t) => {
    document.getElementById("pane-" + t).style.display =
      t === tab ? "block" : "none";
    const tabEl = document.getElementById("tab-" + t);
    if (tabEl) tabEl.classList.toggle("active", t === tab);
  });
}

function togglePw(id, btn) {
  const inp = document.getElementById(id);
  if (inp.type === "password") {
    inp.type = "text";
    btn.textContent = "🙈";
  } else {
    inp.type = "password";
    btn.textContent = "👁";
  }
}

/* ═══════════════════════════════════════════════
   THEME & CLOCK (unchanged)
═══════════════════════════════════════════════ */
function initTheme() {
  const prefs = getPrefs();
  if (prefs.theme === "light") {
    document.body.classList.add("light");
    document.getElementById("theme-btn").textContent = "☀️";
  }
}
function toggleTheme() {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  document.getElementById("theme-btn").textContent = isLight ? "☀️" : "🌙";
  const prefs = getPrefs();
  prefs.theme = isLight ? "light" : "dark";
  savePrefs(prefs);
}

function startClock() {
  const el = document.getElementById("nav-clock");
  setInterval(() => {
    const now = new Date();
    el.textContent = now.toLocaleTimeString("en-KE", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }, 1000);
}

/* ═══════════════════════════════════════════════
   RENDER ENGINE (with image rotation)
═══════════════════════════════════════════════ */
let currentFilter = "all",
  currentSort = "default",
  currentSearch = "";
let currentRentId = null,
  currentReturnId = null,
  currentReserveId = null;
let currentEditId = null,
  currentPayHistId = null,
  currentRateId = null;
let selectedPayM = "cash",
  selectedRetPayStatus = "paid",
  selectedRetPayM = "cash";
let selectedPaymentM = "cash",
  selectedRating = 0;
let timerInterval = null;
let rotationInterval = null;
let bikeImageIndices = {}; // store current index per bike

// Load saved indices or initialize
function loadImageIndices() {
  const saved = get(K.IMAGE_INDEXES);
  if (saved && typeof saved === "object") {
    bikeImageIndices = saved;
  } else {
    bikeImageIndices = {};
  }
}
function saveImageIndices() {
  save(K.IMAGE_INDEXES, bikeImageIndices);
}

// Ensure every bike has an imageGallery array
function ensureGallery(bike) {
  if (!bike.imageGallery || bike.imageGallery.length === 0) {
    // Create a gallery using the main img and fallbacks
    const fallbacks = [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=600&q=80",
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80",
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&q=80",
      "https://images.unsplash.com/photo-1526401485004-46910ecc8e51?w=600&q=80",
      "https://images.unsplash.com/photo-1594942572014-04a43b9e33a3?w=600&q=80",
    ];
    bike.imageGallery = [
      bike.img || fallbacks[0],
      ...fallbacks.filter((u) => u !== bike.img).slice(0, 2),
    ];
  }
  return bike;
}

// Update the displayed image for a specific bike card
function updateBikeImage(bikeId) {
  const bike = getBikes().find((b) => b.id === bikeId);
  if (!bike) return;
  ensureGallery(bike);
  const idx = bikeImageIndices[bikeId] || 0;
  const gallery = bike.imageGallery;
  if (!gallery || gallery.length === 0) return;
  const imgSrc = gallery[idx % gallery.length];
  const imgElement = document.querySelector(
    `.bike-card[data-id="${bikeId}"] .bike-img img`,
  );
  if (imgElement && imgElement.src !== imgSrc) {
    imgElement.src = imgSrc;
  }
}

// Rotate all bikes to next image
function rotateAllBikeImages() {
  const bikes = getBikes();
  bikes.forEach((bike) => {
    ensureGallery(bike);
    const idx = (bikeImageIndices[bike.id] || 0) + 1;
    bikeImageIndices[bike.id] = idx % bike.imageGallery.length;
    updateBikeImage(bike.id);
  });
  saveImageIndices();
}

function startImageRotation() {
  if (rotationInterval) clearInterval(rotationInterval);
  rotationInterval = setInterval(() => {
    rotateAllBikeImages();
  }, 60000); // every minute
}

// After rendering grid, attach hover events and initialize images
function attachImageHover() {
  document.querySelectorAll(".bike-card").forEach((card) => {
    const bikeId = parseInt(card.getAttribute("data-id"));
    const img = card.querySelector(".bike-img img");
    if (!img) return;
    let hoverTimer = null;

    const showNextImage = () => {
      const bike = getBikes().find((b) => b.id === bikeId);
      if (!bike) return;
      ensureGallery(bike);
      const gallery = bike.imageGallery;
      if (!gallery || gallery.length === 0) return;
      const currentIdx = bikeImageIndices[bikeId] || 0;
      const nextIdx = (currentIdx + 1) % gallery.length;
      img.src = gallery[nextIdx];
    };

    const revertImage = () => {
      const bike = getBikes().find((b) => b.id === bikeId);
      if (!bike) return;
      ensureGallery(bike);
      const currentIdx = bikeImageIndices[bikeId] || 0;
      img.src = bike.imageGallery[currentIdx % bike.imageGallery.length];
    };

    img.addEventListener("mouseenter", () => {
      if (hoverTimer) clearTimeout(hoverTimer);
      showNextImage();
    });
    img.addEventListener("mouseleave", () => {
      if (hoverTimer) clearTimeout(hoverTimer);
      hoverTimer = setTimeout(revertImage, 300);
    });
  });
}

function renderAll() {
  renderGrid();
  renderStats();
  renderAnalytics();
  renderHistory();
  checkFleetWarning();
  checkExpiredReservations();
  if (
    currentUser &&
    document.getElementById("view-admin").classList.contains("active")
  )
    renderAdmin();
  attachImageHover(); // after grid update
}

/* ── BIKE GRID ── (modified to include data-id and image from gallery) */
function renderGrid() {
  const bikes = getBikes();
  const maxUse = Math.max(...bikes.map((b) => b.usageCount || 0), 0);
  const favs = getFavorites();

  let list = bikes.filter((b) => {
    if (currentFilter === "all") return true;
    if (currentFilter === "returning")
      return b.status === "taken" && isReturningSoon(b);
    return b.status === currentFilter;
  });

  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    list = list.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.type.toLowerCase().includes(q) ||
        (b.tags || []).some((t) => t.toLowerCase().includes(q)),
    );
  }

  if (currentSort === "available")
    list.sort((a) => (a.status === "available" ? -1 : 1));
  else if (currentSort === "popular")
    list.sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0));
  else if (currentSort === "rating")
    list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  else if (currentSort === "name")
    list.sort((a, b) => a.name.localeCompare(b.name));

  const grid = document.getElementById("bike-grid");
  if (!list.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;padding:60px;text-align:center;color:var(--text3);font-family:var(--font-m);font-size:13px">No bikes match your filter 🚲</div>`;
    return;
  }

  grid.innerHTML = list
    .map((b, i) => {
      ensureGallery(b);
      // Ensure we have an index for this bike
      if (bikeImageIndices[b.id] === undefined) bikeImageIndices[b.id] = 0;
      const currentImg =
        b.imageGallery[bikeImageIndices[b.id] % b.imageGallery.length];
      return bikeCard(
        b,
        b.usageCount === maxUse && maxUse > 0,
        favs.includes(b.id),
        currentImg,
        i,
      );
    })
    .join("");
  saveImageIndices();
}

function bikeCard(b, isPopular, isFav, currentImg, idx) {
  const delay = Math.min(idx * 0.05, 0.3);
  let statusClass = b.status;
  if (b.status === "taken" && isReturningSoon(b)) statusClass = "returning";

  const labels = {
    available: "Available",
    taken: "Rented Out",
    returning: "Returning Soon",
    reserved: "Reserved",
    maintenance: "Maintenance",
  };
  const sl = labels[statusClass] || labels[b.status];

  // Image + overlay
  let overlayHtml = "";
  if (b.status === "taken") {
    const stamp =
      statusClass === "returning"
        ? `<div class="returning-stamp">SOON ⚡</div>`
        : `<div class="taken-stamp">TAKEN</div>`;
    overlayHtml = `<div class="taken-overlay">${stamp}</div>`;
  } else if (b.status === "reserved") {
    overlayHtml = `<div class="taken-overlay"><div class="reserved-stamp">RESERVED</div></div>`;
  } else if (b.status === "maintenance") {
    overlayHtml = `<div class="taken-overlay"><div class="maint-stamp">🔧 MAINT.</div></div>`;
  }

  const popularCrown = isPopular
    ? `<div class="popular-crown">🏆 Most Popular</div>`
    : "";
  const favBtn = `<button class="fav-btn${isFav ? " active" : ""}" onclick="toggleFav(${b.id},this)" title="${isFav ? "Unfavorite" : "Favorite"}">${isFav ? "❤️" : "🤍"}</button>`;

  // Tags
  const tags = (b.tags || [])
    .map((t) => `<span class="bike-tag">${t}</span>`)
    .join("");

  // Avg stats
  const avgTime = b.avgDuration ? fmtDuration(Math.round(b.avgDuration)) : "—";
  const avgCard = `<div class="bike-avg"><div class="avg-item"><div class="avg-val">${b.usageCount || 0}</div><div class="avg-key">Rentals</div></div><div class="avg-item"><div class="avg-val">60/-</div><div class="avg-key">KES/hr</div></div><div class="avg-item"><div class="avg-val">${avgTime}</div><div class="avg-key">Avg Time</div></div></div>`;

  // Renter / status info
  let statusBox = "",
    warningHtml = "",
    actionsHtml = "";
  if (b.status === "taken" && b.startTime) {
    const { cost } = calcCharge(b.startTime, Date.now());
    const returnStr = b.returnBy || "—";
    if (b.returnBy) {
      const [rh, rm] = b.returnBy.split(":").map(Number);
      const retMs = new Date();
      retMs.setHours(rh, rm, 0, 0);
      const diff = Math.round((retMs - Date.now()) / 60000);
      if (diff <= 0)
        warningHtml = `<div class="overdue-bar">🔴 OVERDUE by ${Math.abs(diff)} min! Cost rising…</div>`;
      else if (diff <= 10)
        warningHtml = `<div class="warning-bar">⚠️ Due back in ${diff} min!</div>`;
    }
    const elapsed = Math.round((Date.now() - b.startTime) / 60000);
    if (elapsed >= 55 && elapsed < 65)
      warningHtml = `<div class="warning-bar">⏳ Approaching 1hr — surcharge kicks in!</div>`;
    statusBox = `<div class="renter-box"><div class="renter-row"><span class="r-key">Rented by</span><span class="r-val">${b.renter || "—"}</span></div><div class="renter-row"><span class="r-key">Student ID</span><span class="r-val" style="font-size:11px;color:var(--text2)">${b.sid || "—"}</span></div><div class="renter-row"><span class="r-key">Since</span><span class="r-val accent">${fmtTime(b.startTime)}</span></div><div class="renter-row"><span class="r-key">Return by</span><span class="r-val green">${returnStr}</span></div><div class="live-timer" id="timer-${b.id}">00:00:00</div><div class="cost-live" id="cost-live-${b.id}">💰 KES ${cost} so far</div></div>`;
    actionsHtml = `<div class="bike-actions"><button class="btn btn-disabled" disabled>Rented Out</button><button class="btn btn-notify" onclick="notifyMe(${b.id},'${b.name}')">🔔 Notify</button></div><div class="bike-actions"><button class="btn btn-return" onclick="openReturnModal(${b.id})">✅ Mark Returned</button></div>`;
  } else if (b.status === "reserved") {
    const res = getReserves().find(
      (r) => r.bikeId === b.id && r.status === "active",
    );
    if (res) {
      const [rh, rm] = res.until.split(":").map(Number);
      const retMs = new Date();
      retMs.setHours(rh, rm, 0, 0);
      const diff = Math.max(0, Math.round((retMs - Date.now()) / 60000));
      statusBox = `<div class="reserved-box"><div class="renter-row"><span class="r-key">Reserved by</span><span class="r-val">${res.name}</span></div><div class="renter-row"><span class="r-key">Until</span><span class="r-val yellow">${res.until}</span></div><div class="renter-row"><span class="r-key">Expires in</span><span class="r-val yellow">${diff} min</span></div></div>`;
    }
    actionsHtml = `<div class="bike-actions"><button class="btn btn-disabled" disabled>Reserved</button><button class="btn btn-notify" onclick="notifyMe(${b.id},'${b.name}')">🔔 Notify</button></div>`;
  } else if (b.status === "maintenance") {
    statusBox = `<div class="maint-box"><div class="renter-row"><span class="r-key">Status</span><span class="r-val" style="color:var(--text3)">Under Maintenance</span></div>${b.maintenanceNote ? `<div class="renter-row"><span class="r-key">Note</span><span style="font-size:11px;color:var(--text3)">${b.maintenanceNote}</span></div>` : ""}</div>`;
    actionsHtml = `<div class="bike-actions"><button class="btn btn-disabled" disabled>Not Available</button></div>`;
  } else {
    actionsHtml = `<div class="bike-actions"><button class="btn btn-rent" onclick="openRentModal(${b.id})">Rent This Bike</button><button class="btn btn-reserve" onclick="openReserveModal(${b.id})">📅</button></div><div class="bike-actions"><button class="btn btn-rate" onclick="openRateModal(${b.id},'${b.name}')">⭐ Rate</button></div>`;
  }

  return `<div class="bike-card ${statusClass}${isPopular ? " popular" : ""}" data-status="${b.status}" data-id="${b.id}" style="animation-delay:${delay}s">
    <div class="s-badge ${statusClass}"><span class="s-dot"></span>${sl}</div>
    ${popularCrown}
    <div class="bike-img">
      <img src="${currentImg}" alt="${b.name}" onerror="this.src='https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600'"/>
      ${overlayHtml}
    </div>
    <div class="bike-body">
      <div class="bike-meta"><span class="bike-id">#BC-${String(b.id).padStart(3, "0")}</span><span class="bike-usage">${b.usageCount || 0} rents</span></div>
      <div class="bike-name">${b.name}</div>
      <div class="bike-type">${b.type} · ${b.specs}</div>
      <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px"><div class="bike-stars">${starsHtml(b.rating, b.ratingCount)}</div>${condHtml(b.condition)}</div>
      ${tags ? `<div class="bike-tags">${tags}</div>` : ""}
      ${avgCard}
      ${warningHtml}
      ${statusBox}
      ${actionsHtml}
    </div>
    ${favBtn}
  </div>`;
}

// The rest of the functions (stats, analytics, history, fleet warning, etc.) remain unchanged.
// Only add/modify the functions that handle bike creation/editing to include the gallery field.

function addBike() {
  if (!currentUser || currentUser.role !== "owner") {
    toast("Owner access only", "error");
    return;
  }
  const name = document.getElementById("new-name").value.trim();
  const type = document.getElementById("new-type").value.trim();
  const specs = document.getElementById("new-specs").value.trim();
  const img = document.getElementById("new-img").value.trim();
  const cond = document.getElementById("new-cond").value;
  const tagsRaw = document.getElementById("new-tags").value;
  const galleryRaw = document.getElementById("new-gallery").value;
  if (!name || !type) {
    toast("Name and type are required", "error");
    return;
  }
  const tags = tagsRaw
    ? tagsRaw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];
  let gallery = [];
  if (galleryRaw) {
    gallery = galleryRaw
      .split(",")
      .map((u) => u.trim())
      .filter((u) => u);
  } else if (img) {
    gallery = [img];
  } else {
    gallery = [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    ];
  }
  const bikes = getBikes();
  bikes.push({
    id: nextId(),
    name,
    type,
    specs: specs || "Standard",
    tags,
    condition: cond,
    img: img || gallery[0],
    imageGallery: gallery,
    status: "available",
    renter: null,
    sid: null,
    phone: null,
    startTime: null,
    returnBy: null,
    payMethod: "cash",
    usageCount: 0,
    avgDuration: 0,
    rating: 0,
    ratingCount: 0,
    maintenanceNote: "",
  });
  saveBikes(bikes);
  logActivity(`${name} added to fleet`, "admin");
  closeModal("add-bike-modal");
  renderAll();
  toast(`🚲 ${name} added to the fleet!`, "success");
}

function openEditBikeModal(id) {
  if (!currentUser) {
    toast("Login required", "error");
    return;
  }
  const bike = getBikes().find((b) => b.id === id);
  if (!bike) return;
  currentEditId = id;
  document.getElementById("edit-bike-id").value = id;
  document.getElementById("edit-modal-sub").textContent =
    `Editing: ${bike.name}`;
  document.getElementById("edit-name").value = bike.name;
  document.getElementById("edit-type").value = bike.type;
  document.getElementById("edit-specs").value = bike.specs;
  document.getElementById("edit-cond").value = bike.condition || "good";
  document.getElementById("edit-img").value = bike.img || "";
  document.getElementById("edit-gallery").value = (
    bike.imageGallery || []
  ).join(", ");
  document.getElementById("edit-tags").value = (bike.tags || []).join(", ");
  document.getElementById("edit-maint").value = bike.maintenanceNote || "";
  const prev = document.getElementById("eb-preview");
  if (bike.img) {
    prev.src = bike.img;
    prev.style.display = "block";
  } else {
    prev.style.display = "none";
  }
  openModal("edit-bike-modal");
}

function saveEditBike() {
  const id = parseInt(document.getElementById("edit-bike-id").value);
  const bikes = getBikes();
  const bike = bikes.find((b) => b.id === id);
  if (!bike) return;
  bike.name = document.getElementById("edit-name").value.trim() || bike.name;
  bike.type = document.getElementById("edit-type").value.trim() || bike.type;
  bike.specs = document.getElementById("edit-specs").value.trim() || bike.specs;
  bike.condition = document.getElementById("edit-cond").value;
  const img = document.getElementById("edit-img").value.trim();
  if (img) bike.img = img;
  const galleryRaw = document.getElementById("edit-gallery").value.trim();
  if (galleryRaw) {
    bike.imageGallery = galleryRaw
      .split(",")
      .map((u) => u.trim())
      .filter((u) => u);
  } else if (img) {
    bike.imageGallery = [img];
  } else if (!bike.imageGallery || bike.imageGallery.length === 0) {
    bike.imageGallery = [
      bike.img ||
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    ];
  }
  const tagsRaw = document.getElementById("edit-tags").value;
  bike.tags = tagsRaw
    ? tagsRaw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : bike.tags;
  bike.maintenanceNote = document.getElementById("edit-maint").value.trim();
  saveBikes(bikes);
  logActivity(`${bike.name} details updated`, "admin");
  closeModal("edit-bike-modal");
  renderAll();
  toast(`${bike.name} updated!`, "success");
}

function removeBike(id) {
  if (!currentUser || currentUser.role !== "owner") {
    toast("Owner access only", "error");
    return;
  }
  const bike = getBikes().find((b) => b.id === id);
  if (!bike) return;
  if (bike.status === "taken") {
    toast("Cannot remove a bike that is currently rented.", "error");
    return;
  }
  if (!confirm(`Remove ${bike.name} from the fleet?`)) return;
  saveBikes(getBikes().filter((b) => b.id !== id));
  logActivity(`${bike.name} removed from fleet`, "admin");
  renderAll();
  toast(`${bike.name} removed.`, "info");
}

function setMaintenance(id, onMaint) {
  const bikes = getBikes();
  const bike = bikes.find((b) => b.id === id);
  if (!bike) return;
  if (bike.status === "taken" && onMaint) {
    toast("Cannot set maintenance on a rented bike.", "error");
    return;
  }
  bike.status = onMaint ? "maintenance" : "available";
  saveBikes(bikes);
  logActivity(
    `${bike.name} ${onMaint ? "set to" : "cleared from"} maintenance`,
    "system",
  );
  renderAll();
  toast(
    `${bike.name} ${onMaint ? "set to maintenance" : "back to available"}.`,
    "info",
  );
}

/* ═══════════════════════════════════════════════
   PAYMENT
═══════════════════════════════════════════════ */
function openPaymentModal(histId) {
  const h = getHistory();
  const entry = h.find((x) => x.id === histId);
  if (!entry) return;
  currentPayHistId = histId;
  document.getElementById("payment-modal-sub").textContent =
    `${entry.bikeName} — ${entry.renter}`;
  document.getElementById("payment-hist-id").value = histId;
  document.getElementById("payment-summary").innerHTML = `
    <div style="display:flex;justify-content:space-between;margin-bottom:8px"><span style="color:var(--text3);font-size:12px">Amount Due</span><strong style="font-size:20px;font-family:var(--font-d);color:var(--accent)">KES ${entry.cost}</strong></div>
    <div style="display:flex;justify-content:space-between"><span style="color:var(--text3);font-size:12px">Duration</span><strong>${fmtDuration(entry.duration)}</strong></div>`;
  selectedPaymentM = "cash";
  document
    .querySelectorAll("#payment-modal .pay-opt")
    .forEach((b, i) => b.classList.toggle("active", i === 0));
  openModal("payment-modal");
}

function setPaymentM(m, btn) {
  selectedPaymentM = m;
  btn
    .closest(".pay-toggle")
    .querySelectorAll(".pay-opt")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
}

function confirmPayment() {
  const h = getHistory();
  const entry = h.find((x) => x.id === currentPayHistId);
  if (!entry) return;
  entry.payStatus = "paid";
  entry.payMethod = selectedPaymentM;
  entry.paidAt = Date.now();
  saveHistory(h);
  const day = getDay();
  day.earn += entry.cost;
  saveDay(day);
  logActivity(
    `Payment received KES ${entry.cost} for ${entry.bikeName} (${selectedPaymentM})`,
    "payment",
  );
  closeModal("payment-modal");
  renderAll();
  toast(
    `💰 KES ${entry.cost} payment recorded via ${selectedPaymentM.toUpperCase()}!`,
    "success",
  );
}

/* ═══════════════════════════════════════════════
   RATING
═══════════════════════════════════════════════ */
function openRateModal(id, name) {
  currentRateId = id;
  selectedRating = 0;
  document.getElementById("rate-bike-id").value = id;
  document.getElementById("rate-modal-sub").textContent = name;
  document.getElementById("rating-note").textContent = "Tap a star to rate";
  document
    .querySelectorAll(".star")
    .forEach((s) => s.classList.remove("active"));
  openModal("rate-modal");
}

function pickStar(val) {
  selectedRating = val;
  document
    .querySelectorAll(".star")
    .forEach((s, i) => s.classList.toggle("active", i < val));
  const labels = ["", "Poor", "Fair", "Good", "Great", "Excellent!"];
  document.getElementById("rating-note").textContent = labels[val] || "";
}

function submitRating() {
  if (!selectedRating) {
    toast("Please select a star rating", "error");
    return;
  }
  const bikes = getBikes();
  const bike = bikes.find((b) => b.id === currentRateId);
  if (!bike) return;
  const prev = bike.ratingCount || 0;
  bike.rating = ((bike.rating || 0) * prev + selectedRating) / (prev + 1);
  bike.ratingCount = prev + 1;
  saveBikes(bikes);
  closeModal("rate-modal");
  renderAll();
  toast(`⭐ Thanks for rating ${bike.name}!`, "success");
}

/* ═══════════════════════════════════════════════
   FAVORITES
═══════════════════════════════════════════════ */
function toggleFav(id, btn) {
  const favs = getFavorites();
  const idx = favs.indexOf(id);
  if (idx > -1) {
    favs.splice(idx, 1);
    btn.textContent = "🤍";
    btn.classList.remove("active");
  } else {
    favs.push(id);
    btn.textContent = "❤️";
    btn.classList.add("active");
  }
  saveFavorites(favs);
}

/* ═══════════════════════════════════════════════
   NOTIFICATIONS
═══════════════════════════════════════════════ */
function notifyMe(id, name) {
  toast(`🔔 You'll be notified when ${name} is back!`, "info");
}

/* ═══════════════════════════════════════════════
   FILTER / SORT / SEARCH
═══════════════════════════════════════════════ */
function filterBikes(status, btn) {
  currentFilter = status;
  document
    .querySelectorAll(".f-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderGrid();
}
function sortBikes(val) {
  currentSort = val;
  renderGrid();
}
function searchBikes(val) {
  currentSearch = val;
  renderGrid();
}

/* ═══════════════════════════════════════════════
   ADMIN RENDER (unchanged)
═══════════════════════════════════════════════ */
function renderAdmin() {
  if (!currentUser) return;
  const isOwner = currentUser.role === "owner";
  document.getElementById("admin-role-badge").textContent =
    currentUser.role.toUpperCase() + " — " + currentUser.name;
  ["btn-add-bike", "btn-reset-day", "btn-export", "accounts-panel"].forEach(
    (id) => {
      const el = document.getElementById(id);
      if (el) el.style.display = isOwner ? "" : "none";
    },
  );

  const bikes = getBikes(),
    day = getDay(),
    history = getHistory();
  const active = bikes.filter((b) => b.status === "taken");
  const avail = bikes.filter((b) => b.status === "available");
  const done = history.filter((h) => h.duration);
  const avgDur = done.length
    ? Math.round(done.reduce((a, h) => a + h.duration, 0) / done.length)
    : 0;
  const unpaid = history.filter(
    (h) => h.payStatus === "unpaid" && h.status === "done",
  ).length;
  const pop = bikes.reduce(
    (a, b) => (b.usageCount > a.usageCount ? b : a),
    bikes[0],
  );

  document.getElementById("admin-kpis").innerHTML = `
    <div class="kpi-card accent"><div class="kpi-val">KES ${day.earn}</div><div class="kpi-key">Today's Earnings</div></div>
    <div class="kpi-card green"><div class="kpi-val">${avail.length}</div><div class="kpi-key">Available</div></div>
    <div class="kpi-card red"><div class="kpi-val">${active.length}</div><div class="kpi-key">Currently Rented</div></div>
    <div class="kpi-card"><div class="kpi-val" style="color:var(--text2)">${day.count}</div><div class="kpi-key">Today's Rentals</div></div>
    <div class="kpi-card blue"><div class="kpi-val">${avgDur ? fmtDuration(avgDur) : "—"}</div><div class="kpi-key">Avg Duration</div></div>
    <div class="kpi-card"><div class="kpi-val" style="color:var(--yellow)">${unpaid}</div><div class="kpi-key">Unpaid</div></div>`;

  renderCharts();
  renderActivityFeed();
  if (isOwner) renderAccountsList();
  renderFleetTable();
  renderReservations();
  renderMaintenance();
  renderAdminHistory();
}

/* ── CHARTS (unchanged) ── */
function renderCharts() {
  const history = getHistory().filter((h) => h.startTime);
  const hours = new Array(24).fill(0);
  history.forEach((h) => {
    const hr = new Date(h.startTime).getHours();
    hours[hr]++;
  });
  const slots = [];
  for (let i = 6; i <= 22; i++) slots.push({ h: i, c: hours[i] });
  const maxH = Math.max(...slots.map((x) => x.c), 1);
  const barW = Math.floor(320 / slots.length) - 2;
  const peakBars = slots
    .map((d, i) => {
      const bh = d.c ? Math.max(8, Math.round((d.c / maxH) * 100)) : 4;
      const x = i * (barW + 2),
        y = 110 - bh;
      const label = d.h > 12 ? `${d.h - 12}p` : d.h === 12 ? "12p" : `${d.h}a`;
      return `<rect x="${x}" y="${y}" width="${barW}" height="${bh}" fill="${d.c ? "var(--accent)" : "var(--border2)"}" rx="2"/>
    <text x="${x + barW / 2}" y="125" text-anchor="middle" font-size="7" fill="var(--text3)">${label}</text>
    ${d.c ? `<text x="${x + barW / 2}" y="${y - 3}" text-anchor="middle" font-size="8" fill="var(--text2)">${d.c}</text>` : ""}`;
    })
    .join("");
  document.getElementById("chart-peak").innerHTML =
    `<svg viewBox="0 0 320 130" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:130px">${peakBars}</svg>`;

  const bikes = getBikes();
  const bikeRevenue = {};
  history
    .filter((h) => h.status === "done")
    .forEach((h) => {
      bikeRevenue[h.bikeName] = (bikeRevenue[h.bikeName] || 0) + h.cost;
    });
  const revEntries = bikes
    .map((b) => ({ name: b.name.split(" ")[0], rev: bikeRevenue[b.name] || 0 }))
    .filter((x) => x.rev > 0);
  const maxR = Math.max(...revEntries.map((x) => x.rev), 1);
  const revBarW = revEntries.length
    ? Math.floor(280 / revEntries.length) - 4
    : 40;
  const revBars = revEntries
    .map((d, i) => {
      const bh = Math.max(8, Math.round((d.rev / maxR) * 100));
      const x = i * (revBarW + 4),
        y = 110 - bh;
      return `<rect x="${x}" y="${y}" width="${revBarW}" height="${bh}" fill="var(--green)" rx="2"/>
    <text x="${x + revBarW / 2}" y="125" text-anchor="middle" font-size="8" fill="var(--text3)">${d.name.substring(0, 6)}</text>
    <text x="${x + revBarW / 2}" y="${y - 3}" text-anchor="middle" font-size="8" fill="var(--text2)">${d.rev}</text>`;
    })
    .join("");
  document.getElementById("chart-revenue").innerHTML = revEntries.length
    ? `<svg viewBox="0 0 280 130" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:130px">${revBars}</svg>`
    : `<div style="text-align:center;padding:40px;font-family:var(--font-m);font-size:11px;color:var(--text3)">No data yet</div>`;

  const top3 = [...bikes]
    .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
    .slice(0, 3);
  document.getElementById("chart-top3").innerHTML =
    top3
      .map(
        (b, i) => `
    <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)">
      <div style="font-family:var(--font-d);font-size:28px;color:${["var(--accent)", "var(--text2)", "var(--text3)"][i]};width:24px">${i + 1}</div>
      <div style="flex:1">
        <div style="font-weight:700;font-size:13px">${b.name}</div>
        <div style="font-family:var(--font-m);font-size:10px;color:var(--text3)">${b.usageCount || 0} rentals · ${starsHtml(b.rating, b.ratingCount)}</div>
      </div>
    </div>`,
      )
      .join("") ||
    `<div style="text-align:center;padding:30px;font-family:var(--font-m);font-size:11px;color:var(--text3)">No data yet</div>`;
}

/* ── ACTIVITY FEED (unchanged) ── */
function renderActivityFeed() {
  const log = getActivity().slice(0, 30);
  const wrap = document.getElementById("activity-feed");
  if (!log.length) {
    wrap.innerHTML = `<div class="feed-empty">No activity yet. Start renting! 🚲</div>`;
    return;
  }
  wrap.innerHTML = log
    .map(
      (entry) => `
    <div class="feed-item">
      <span class="feed-icon">${entry.icon}</span>
      <span class="feed-msg">${entry.msg}</span>
      <span class="feed-time">${fmtTimeAgo(entry.time)}</span>
    </div>`,
    )
    .join("");
}

/* ── ACCOUNTS LIST (unchanged) ── */
function renderAccountsList() {
  const accounts = getAccounts();
  const list = document.getElementById("accounts-list");
  if (!accounts.length) {
    list.innerHTML = `<div class="no-history">No accounts yet</div>`;
    return;
  }
  list.innerHTML = accounts
    .map(
      (a) => `<div class="acc-item">
    <div class="acc-info">
      <div class="acc-name">${a.name}</div>
      <div class="acc-meta">@${a.username} · ${a.lastLogin ? "Last login: " + fmtTime(a.lastLogin) : "Never logged in"}</div>
    </div>
    <span class="acc-role-pill ${a.role}">${a.role}</span>
  </div>`,
    )
    .join("");
}

/* ── FLEET TABLE (unchanged) ── */
function renderFleetTable() {
  const bikes = getBikes();
  const isOwner = currentUser?.role === "owner";
  document.getElementById("fleet-tbody").innerHTML = bikes
    .map((b) => {
      const isActive = b.status === "taken";
      const { mins, cost } =
        isActive && b.startTime
          ? calcCharge(b.startTime, Date.now())
          : { mins: 0, cost: 0 };
      const unpaidEntry = isActive
        ? getHistory()
            .filter((h) => h.bikeId === b.id && h.status === "active")
            .slice(-1)[0]
        : null;
      return `<tr>
      <td><strong>${b.name}</strong><br><span style="font-family:var(--font-m);font-size:10px;color:var(--text3)">#BC-${String(b.id).padStart(3, "0")}</span></td>
      <td style="font-size:12px;color:var(--text2)">${b.type}</td>
      <td><span class="status-pill ${isActive ? "active" : "done"}">${isActive ? "Rented" : b.status.charAt(0).toUpperCase() + b.status.slice(1)}</span></td>
      <td>${condHtml(b.condition)}</td>
      <td>${b.renter || '<span style="color:var(--text3)">—</span>'}</td>
      <td style="font-family:var(--font-m);font-size:11px">${b.startTime ? fmtTime(b.startTime) : "—"}</td>
      <td style="font-family:var(--font-m);font-size:11px">${isActive ? fmtDuration(mins) : "—"}</td>
      <td style="color:var(--accent);font-family:var(--font-m)">${isActive ? "KES " + cost : "—"}</td>
      <td>${unpaidEntry ? `<span class="status-pill unpaid">unpaid</span>` : '<span style="color:var(--text3);font-size:11px">—</span>'}</td>
      <td style="font-family:var(--font-m);font-size:12px;color:var(--text2)">${b.usageCount || 0}</td>
      <td>
        <div style="display:flex;flex-wrap:wrap;gap:4px">
          ${isActive ? `<button class="btn-sm ret" onclick="openReturnModal(${b.id})">Return</button>` : ""}
          <button class="btn-sm edit" onclick="openEditBikeModal(${b.id})">Edit</button>
          ${isOwner && b.status !== "taken" && b.status !== "maintenance" ? `<button class="btn-sm maint" onclick="setMaintenance(${b.id},true)">Maint</button>` : ""}
          ${isOwner && b.status === "maintenance" ? `<button class="btn-sm ret" onclick="setMaintenance(${b.id},false)">✓ Fixed</button>` : ""}
          ${isOwner ? `<button class="btn-sm rm" onclick="removeBike(${b.id})">Remove</button>` : ""}
        </div>
      </td>
    </tr>`;
    })
    .join("");
}

/* ── RESERVATIONS (unchanged) ── */
function renderReservations() {
  const res = getReserves().filter((r) => r.status === "active");
  const wrap = document.getElementById("reservations-list");
  if (!res.length) {
    wrap.innerHTML = `<div class="no-history" style="padding:20px">No active reservations 📅</div>`;
    return;
  }
  wrap.innerHTML = res
    .map((r) => {
      const [h, m] = r.until.split(":").map(Number);
      const exp = new Date();
      exp.setHours(h, m, 0, 0);
      const diff = Math.max(0, Math.round((exp - Date.now()) / 60000));
      return `<div class="res-item">
      <div class="res-info">
        <div class="res-name">${r.bikeName} → ${r.name}</div>
        <div class="res-meta">${r.sid} · ${r.phone || "no phone"} · Until ${r.until}</div>
      </div>
      <div style="display:flex;align-items:center;gap:10px">
        <div class="res-countdown">⏰ ${diff}min left</div>
        <button class="btn-sm rm" onclick="cancelReservation(${r.id})">Cancel</button>
      </div>
    </div>`;
    })
    .join("");
}

/* ── MAINTENANCE (unchanged) ── */
function renderMaintenance() {
  const bikes = getBikes().filter((b) => b.status === "maintenance");
  const wrap = document.getElementById("maintenance-list");
  if (!bikes.length) {
    wrap.innerHTML = `<div class="no-history" style="padding:20px">No bikes under maintenance 🔧</div>`;
    return;
  }
  wrap.innerHTML = bikes
    .map(
      (b) => `<div class="maint-item">
    <div>
      <div style="font-size:14px;font-weight:700">${b.name} <span style="font-family:var(--font-m);font-size:10px;color:var(--text3)">#BC-${String(b.id).padStart(3, "0")}</span></div>
      <div style="font-size:12px;color:var(--text3);margin-top:3px">${b.maintenanceNote || "No note provided"}</div>
    </div>
    <button class="btn-sm ret" onclick="setMaintenance(${b.id},false)">✓ Mark Fixed</button>
  </div>`,
    )
    .join("");
}

/* ── ADMIN HISTORY (unchanged) ── */
function renderAdminHistory() {
  const h = [...getHistory()].reverse();
  const wrap = document.getElementById("admin-history");
  if (!h.length) {
    wrap.innerHTML = `<div class="no-history">No rental history yet 📋</div>`;
    return;
  }
  wrap.innerHTML = `
    <div class="history-head">
      <div class="history-title">All Rentals</div>
      <div style="display:flex;gap:8px"><button class="btn-export" onclick="exportCSV()">📤 CSV</button><button class="btn-export" onclick="exportPDF()">🖨️ Print</button></div>
    </div>
    <table class="history-table">
      <thead><tr><th>Bike</th><th>Student</th><th>Reg No.</th><th>Start</th><th>Duration</th><th>Cost</th><th>Pay</th><th>Method</th><th>Status</th><th>Action</th></tr></thead>
      <tbody>${h
        .map(
          (entry) => ` 
        <tr>
          <td>${entry.bikeName}</td>
          <td>${entry.renter}</td>
          <td style="font-family:var(--font-m);font-size:10px;color:var(--text2)">${entry.sid || "—"}</td>
          <td style="font-family:var(--font-m);font-size:11px">${entry.startStr}</td>
          <td style="font-family:var(--font-m);font-size:11px">${entry.duration ? fmtDuration(entry.duration) : '<span style="color:var(--red)">Active</span>'}</td>
          <td style="color:var(--accent);font-family:var(--font-m)">KES ${entry.cost}</td>
          <td><span class="status-pill ${entry.payStatus || "unpaid"}">${entry.payStatus || "unpaid"}</span></td>
          <td style="font-family:var(--font-m);font-size:10px;color:var(--text3)">${(entry.payMethod || "cash").toUpperCase()}</td>
          <td><span class="status-pill ${entry.status}">${entry.status}</span></td>
          <td>${entry.status === "done" && entry.payStatus !== "paid" ? `<button class="btn-sm pay" onclick="openPaymentModal(${entry.id})">Pay</button>` : ""}</td>
        </tr>`,
        )
        .join("")}
      </tbody>
    </table>`;
}

/* ═══════════════════════════════════════════════
   EXPORT (unchanged)
═══════════════════════════════════════════════ */
function exportCSV() {
  const h = getHistory();
  if (!h.length) {
    toast("No history to export", "warn");
    return;
  }
  const header = [
    "Bike",
    "Student",
    "Student ID",
    "Phone",
    "Start",
    "Duration (mins)",
    "Cost (KES)",
    "Pay Status",
    "Pay Method",
    "Status",
  ];
  const rows = h.map((e) => [
    e.bikeName,
    e.renter,
    e.sid || "",
    e.phone || "",
    e.startStr,
    e.duration || "Active",
    e.cost,
    e.payStatus || "unpaid",
    e.payMethod || "cash",
    e.status,
  ]);
  const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `campuscycle_${new Date().toLocaleDateString("en-KE").replace(/\//g, "-")}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  toast("📥 CSV exported!", "success");
}
function exportPDF() {
  window.print();
}

/* ═══════════════════════════════════════════════
   RESET DAY (unchanged)
═══════════════════════════════════════════════ */
function resetDay() {
  if (!currentUser || currentUser.role !== "owner") {
    toast("Owner only", "error");
    return;
  }
  if (!confirm("Reset today's earnings and rental count? (History preserved)"))
    return;
  saveDay({ date: new Date().toDateString(), earn: 0, count: 0 });
  logActivity("Day stats reset by " + currentUser.name, "admin");
  renderAll();
  toast("Day stats reset ✅", "info");
}

/* ═══════════════════════════════════════════════
   MODAL HELPERS (unchanged)
═══════════════════════════════════════════════ */
function openModal(id) {
  document.getElementById(id).classList.add("open");
}
function closeModal(id) {
  document.getElementById(id).classList.remove("open");
}
function handleBdClick(e, id) {
  if (e.target.id === id) closeModal(id);
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape")
    [
      "rent-modal",
      "return-modal",
      "add-bike-modal",
      "edit-bike-modal",
      "reserve-modal",
      "payment-modal",
      "profile-modal",
      "change-pw-modal",
      "rate-modal",
      "add-staff-modal",
    ].forEach(closeModal);
});

/* ── PROFILE MODAL (unchanged) ── */
function openProfileModal() {
  if (!currentUser) return;
  document.getElementById("profile-card").innerHTML = `
    <div class="p-name">${currentUser.name}</div>
    <div class="p-row"><span class="p-key">Username</span><span>@${currentUser.username}</span></div>
    <div class="p-row"><span class="p-key">Role</span><span class="acc-role-pill ${currentUser.role}">${currentUser.role.toUpperCase()}</span></div>
    <div class="p-row"><span class="p-key">Account Since</span><span>${new Date(currentUser.createdAt).toLocaleDateString("en-KE")}</span></div>
    <div class="p-row"><span class="p-key">Last Login</span><span>${currentUser.lastLogin ? fmtTime(currentUser.lastLogin) : "First time"}</span></div>`;
  openModal("profile-modal");
}

/* ═══════════════════════════════════════════════
   VIEW SWITCHER (unchanged)
═══════════════════════════════════════════════ */
function switchView(view, btn) {
  document
    .querySelectorAll(".view")
    .forEach((v) => v.classList.remove("active"));
  document.getElementById("view-" + view).classList.add("active");
  document
    .querySelectorAll(".nav-tab")
    .forEach((t) => t.classList.remove("active"));
  if (btn) btn.classList.add("active");
}

/* ═══════════════════════════════════════════════
   AUTO SYSTEMS (unchanged)
═══════════════════════════════════════════════ */
function checkMidnightReset() {
  const day = getDay();
  if (day.date !== new Date().toDateString()) {
    saveDay({ date: new Date().toDateString(), earn: 0, count: 0 });
    logActivity("New day — stats auto reset", "system");
  }
}
setInterval(() => {
  checkExpiredReservations();
  checkMidnightReset();
  renderStats();
  renderAnalytics();
  if (
    currentUser &&
    document.getElementById("view-admin").classList.contains("active")
  ) {
    renderActivityFeed();
    renderReservations();
    renderMaintenance();
    if (currentUser.role === "owner") renderAdminHistory();
  }
}, 10000);

/* ═══════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  loadImageIndices();
  initTheme();
  startClock();
  initAuth();
  checkMidnightReset();
  checkExpiredReservations();
  renderAll();
  startTimers();
  startImageRotation(); // start the auto-rotation

  if (currentUser) startInactivityTimer();

  document.getElementById("profile-modal").addEventListener("click", (e) => {
    if (e.target.id === "profile-modal") closeModal("profile-modal");
  });
});

window.openModal = function (id) {
  if (id === "profile-modal" && currentUser) {
    document.getElementById("profile-card").innerHTML = `
      <div class="p-name">${currentUser.name}</div>
      <div class="p-row"><span class="p-key">Username</span><span>@${currentUser.username}</span></div>
      <div class="p-row"><span class="p-key">Role</span><span class="acc-role-pill ${currentUser.role}">${currentUser.role}</span></div>
      <div class="p-row"><span class="p-key">Account Since</span><span>${new Date(currentUser.createdAt).toLocaleDateString("en-KE")}</span></div>
      <div class="p-row"><span class="p-key">Last Login</span><span>${currentUser.lastLogin ? fmtTime(currentUser.lastLogin) : "First time"}</span></div>`;
  }
  document.getElementById(id).classList.add("open");
};
window.closeModal = closeModal;
