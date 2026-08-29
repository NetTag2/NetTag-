const signupForm = document.getElementById("signupForm");
const signinForm = document.getElementById("signinForm");

let profiles = JSON.parse(localStorage.getItem("nettagProfiles")) || {};

function showDashboard(profile) {
  const dashboard = document.getElementById("profileDisplay");

  if (!dashboard) {
    alert("Dashboard section was not found.");
    return;
  }

  document.getElementById("profileName").textContent = profile.name;
  document.getElementById("profileTag").textContent = "@" + profile.tag;
  document.getElementById("profileEmail").textContent = profile.email;

  document.getElementById("dashboardName").textContent = profile.name;
  document.getElementById("dashboardTag").textContent = "@" + profile.tag;
  document.getElementById("dashboardEmail").textContent = profile.email;

  document.getElementById("dashboardPoints").textContent =
    profile.points || 0;

  document.getElementById("dashboardRated").textContent =
    profile.picturesRated || 0;

  document.getElementById("dashboardTasks").textContent =
    profile.tasksCompleted || 0;

  dashboard.style.display = "block";

  setTimeout(function () {
    dashboard.scrollIntoView({ behavior: "smooth" });
  }, 100);
}


// SIGN IN
if (signinForm) {
  signinForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const loginInput = document.getElementById("loginTag");

    if (!loginInput) {
      alert("Login field not found.");
      return;
    }

    const loginTag = loginInput.value
      .trim()
      .replace(/^@/, "")
      .toLowerCase();

    if (!profiles[loginTag]) {
      alert("NetTag profile not found.");
      return;
    }

    showDashboard(profiles[loginTag]);
  });
}


// CREATE ACCOUNT
if (signupForm) {
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const tag = document.getElementById("tag").value
      .trim()
      .replace(/^@/, "")
      .toLowerCase();
    const email = document.getElementById("email").value.trim();

    if (!name || !tag || !email) {
      alert("Please fill in all fields.");
      return;
    }

    if (profiles[tag]) {
      alert("This NetTag already exists.");
      return;
    }

    const profile = {
      name: name,
      tag: tag,
      email: email,
      points: 0,
      picturesRated: 0,
      tasksCompleted: 0
    };

    profiles[tag] = profile;

    localStorage.setItem(
      "nettagProfiles",
      JSON.stringify(profiles)
    );

    signupForm.reset();

    showDashboard(profile);
  });
}
// HOTEL RATING TASKS

const hotelTasks = [
  {
    id: 1,
    hotel: "Hotel Task 1",
    imageA: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    imageB: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    hotel: "Hotel Task 2",
    imageA: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
    imageB: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80"
  }
];

const taskList = document.getElementById("taskList");

function loadHotelTasks() {
  if (!taskList) return;

  taskList.innerHTML = "";

  hotelTasks.forEach(function(task) {

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${task.hotel}</h3>

      <p>Which hotel picture looks better?</p>

      <div style="display:flex;gap:10px;flex-wrap:wrap;">

        <div style="flex:1;min-width:200px;">
          <img
            src="${task.imageA}"
            alt="Hotel picture A"
            style="width:100%;border-radius:12px;"
          >
          <button onclick="rateHotelTask(${task.id}, 'A')">
            ⭐ Rate Picture A
          </button>
        </div>

        <div style="flex:1;min-width:200px;">
          <img
            src="${task.imageB}"
            alt="Hotel picture B"
            style="width:100%;border-radius:12px;"
          >
          <button onclick="rateHotelTask(${task.id}, 'B')">
            ⭐ Rate Picture B
          </button>
        </div>

      </div>
    `;

    taskList.appendChild(card);
  });
}

function rateHotelTask(taskId, choice) {

  const savedTag = localStorage.getItem("nettagCurrentUser");

  if (!savedTag || !profiles[savedTag]) {
    alert("Please open your NetTag profile first.");
    return;
  }

  const profile = profiles[savedTag];

  profile.points = (profile.points || 0) + 10;
  profile.picturesRated = (profile.picturesRated || 0) + 1;
  profile.tasksCompleted = (profile.tasksCompleted || 0) + 1;

  localStorage.setItem(
    "nettagProfiles",
    JSON.stringify(profiles)
  );

  showDashboard(profile);

  alert("Rating submitted! +10 points");

  loadHotelTasks();
}

loadHotelTasks();
