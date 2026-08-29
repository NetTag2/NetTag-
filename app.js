const signupForm = document.getElementById("signupForm");
const signinForm = document.getElementById("signinForm");

let profiles = JSON.parse(localStorage.getItem("nettagProfiles")) || {};

// CREATE ACCOUNT
if (signupForm) {
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const tag = document.getElementById("tag").value.trim().replace(/^@/, "").toLowerCase();
    const email = document.getElementById("email").value.trim();

    if (!name || !tag || !email) {
      alert("Please fill in all fields.");
      return;
    }

    if (profiles[tag]) {
      alert("This NetTag already exists.");
      return;
    }

    profiles[tag] = {
      name: name,
      tag: tag,
      email: email,
      balance: 0,
      totalEarned: 0,
      tasksCompleted: 0
    };

    localStorage.setItem("nettagProfiles", JSON.stringify(profiles));

    document.getElementById("profileName").textContent = name;
    document.getElementById("profileTag").textContent = "@" + tag;
    document.getElementById("profileEmail").textContent = email;

    document.getElementById("profileNameDisplay").textContent = name;
    document.getElementById("profileTagDisplay").textContent = "@" + tag;
    document.getElementById("profileEmailDisplay").textContent = email;

    document.getElementById("profileDisplay").style.display = "block";

    alert("NetTag account created successfully!");

    signupForm.reset();
  });
}


// OPEN PROFILE
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

    const profile = profiles[loginTag];

    document.getElementById("profileName").textContent = profile.name;
    document.getElementById("profileTag").textContent = "@" + profile.tag;
    document.getElementById("profileEmail").textContent = profile.email;

    document.getElementById("profileNameDisplay").textContent = profile.name;
    document.getElementById("profileTagDisplay").textContent = "@" + profile.tag;
    document.getElementById("profileEmailDisplay").textContent = profile.email;

    document.getElementById("profileDisplay").style.display = "block";

    alert(`Welcome back, ${profile.name}!`);
  });
}
