const DAYS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

function updateTime() {
  const now = new Date();
  document.getElementById("day-label").textContent = DAYS[now.getDay()];
  document.getElementById("date-label").textContent =
    now.getDate() + " " + MONTHS[now.getMonth()] + " " + now.getFullYear();
}
updateTime();

// Set min date on date input to today
const todayStr = (() => {
  const n = new Date();
  return (
    n.getFullYear() +
    "-" +
    String(n.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(n.getDate()).padStart(2, "0")
  );
})();
document.getElementById("due-date").min = todayStr;

function todayDateStr() {
  const n = new Date();
  return (
    n.getFullYear() +
    "-" +
    String(n.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(n.getDate()).padStart(2, "0")
  );
}

function isOverdue(dueDateStr) {
  if (!dueDateStr) return false;
  return dueDateStr < todayDateStr();
}

function formatDate(str) {
  if (!str) return null;
  const [y, m, d] = str.split("-");
  return d + " " + MONTHS[parseInt(m, 10) - 1] + " " + y;
}

let tasks = [];
let selectedPrio = "medium";
let nextId = 1;

function selectPrio(btn) {
  document
    .querySelectorAll(".prio-btn")
    .forEach((b) => (b.className = "prio-btn"));
  selectedPrio = btn.dataset.prio;
  btn.classList.add("active-" + selectedPrio);
}
document.querySelector('[data-prio="medium"]').click();

function addTask() {
  const input = document.getElementById("task-input");
  const text = input.value.trim();
  if (!text) {
    input.focus();
    return;
  }
  const due = document.getElementById("due-date").value || null;
  tasks.push({ id: nextId++, text, prio: selectedPrio, done: false, due });
  input.value = "";
  document.getElementById("due-date").value = "";
  render();
}

document.getElementById("task-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    addTask();
  }
});

function toggleDone(id) {
  const t = tasks.find((t) => t.id === id);
  if (t) t.done = !t.done;
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  render();
}

function deleteAll() {
  if (!tasks.length) return;
  tasks = [];
  render();
}

function prioLabel(p) {
  return p === "low" ? "Low" : p === "medium" ? "Medium" : "High";
}

function makeItem(t) {
  const overdue = !t.done && isOverdue(t.due);
  const div = document.createElement("div");
  div.className =
    "task-item" + (overdue ? " is-overdue" : "") + (t.done ? " done-item" : "");

  const cb = document.createElement("div");
  cb.className = "custom-cb" + (t.done ? " checked" : "");
  cb.setAttribute("role", "checkbox");
  cb.setAttribute("aria-checked", t.done ? "true" : "false");
  cb.innerHTML = '<i class="ti ti-check" aria-hidden="true"></i> v';
  cb.onclick = () => toggleDone(t.id);

  const body = document.createElement("div");
  body.className = "task-body";

  const txt = document.createElement("div");
  txt.className = "task-text" + (t.done ? " crossed" : "");
  txt.textContent = t.text;

  const meta = document.createElement("div");
  meta.className = "task-meta";

  const ptag = document.createElement("span");
  ptag.className = "prio-tag prio-" + t.prio;
  ptag.textContent = prioLabel(t.prio);
  meta.appendChild(ptag);

  if (t.due) {
    const dtag = document.createElement("span");
    if (overdue) {
      dtag.className = "overdue-tag";
      dtag.innerHTML =
        '<i class="ti ti-clock-exclamation" aria-hidden="true" style="font-size:11px;vertical-align:-1px"></i> Terlambat · ' +
        formatDate(t.due);
    } else {
      dtag.className = "due-tag";
      dtag.innerHTML =
        '<i class="ti ti-calendar" aria-hidden="true" style="font-size:11px;vertical-align:-1px"></i> ' +
        formatDate(t.due);
    }
    meta.appendChild(dtag);
  }

  body.appendChild(txt);
  body.appendChild(meta);

  const del = document.createElement("button");
  del.className = "del-btn";
  del.setAttribute("aria-label", "Hapus tugas");
  del.innerHTML = '<i class="ti ti-trash" aria-hidden="true"></i> Delete';
  del.onclick = () => deleteTask(t.id);

  div.appendChild(cb);
  div.appendChild(body);
  div.appendChild(del);
  return div;
}

function render() {
  // Sort active: overdue first (by date asc), then by priority weight desc, then no-due last
  const prioWeight = { high: 3, medium: 2, low: 1 };
  const active = tasks
    .filter((t) => !t.done)
    .sort((a, b) => {
      const ao = isOverdue(a.due),
        bo = isOverdue(b.due);
      if (ao && !bo) return -1;
      if (!ao && bo) return 1;
      if (a.due && b.due && ao && bo) return a.due < b.due ? -1 : 1;
      return prioWeight[b.prio] - prioWeight[a.prio];
    });
  const done = tasks.filter((t) => t.done);
  const overdueCount = active.filter((t) => isOverdue(t.due)).length;

  const aList = document.getElementById("active-list");
  const dList = document.getElementById("done-list");

  aList.innerHTML = "";
  if (!active.length) {
    aList.innerHTML =
      '<div class="empty-state">Belum ada tugas. Tambahkan tugas baru di atas.</div>';
  } else {
    active.forEach((t) => aList.appendChild(makeItem(t)));
  }

  dList.innerHTML = "";
  if (!done.length) {
    dList.innerHTML =
      '<div class="empty-state">Tugas yang selesai akan muncul di sini.</div>';
  } else {
    done.forEach((t) => dList.appendChild(makeItem(t)));
  }

  document.getElementById("active-count").textContent = active.length;
  document.getElementById("done-count").textContent = done.length;

  const ob = document.getElementById("overdue-count");
  const on = document.getElementById("overdue-note");
  if (overdueCount > 0) {
    ob.textContent = overdueCount + " overdue";
    ob.style.display = "";
    on.style.display = "";
    document.getElementById("overdue-note-text").textContent =
      overdueCount +
      " tugas melewati tenggat waktu. Segera selesaikan atau perbarui jadwalnya.";
  } else {
    ob.style.display = "none";
    on.style.display = "none";
  }
}

render();
