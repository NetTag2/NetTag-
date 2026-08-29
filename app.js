const signupForm = document.getElementById("signupForm");
const signinForm = document.getElementById("signinForm");

let profiles = JSON.parse(localStorage.getItem("nettagProfiles")) || {};

function openDashboard(profile) {
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

  document.getElementById("profileDisplay").style.display = "block";

  document.getElementById("profileDisplay").scrollIntoView({
    behavior: "smooth"
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

    openDashboard(profile);

    alert("NetTag account created successfully!");
  });
}


// SIGN IN
if (signinForm) {
  signinForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const loginTag = document.getElementById("loginTag").value
      .trim()
      .replace(/^@/, "")
      .toLowerCase();

    if (!profiles[loginTag]) {
      alert("NetTag profile not found.");
      return;
    }

    openDashboard(profiles[loginTag]);

    alert(`Welcome back, ${profiles[loginTag].name}!`);
  });
}
