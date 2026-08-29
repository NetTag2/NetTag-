import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBKh7-kPq-4ZM-sZtgBSVc4vRbbN45zBeo",
  authDomain: "nettag2-ff06e.firebaseapp.com",
  projectId: "nettag2-ff06e",
  storageBucket: "nettag2-ff06e.firebasestorage.app",
  messagingSenderId: "142294037982",
  appId: "1:142294037982:web:2ec7d89b61bf554478594f",
  measurementId: "G-NFGJ8KTC83"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const signupForm = document.getElementById("signupForm");
const signinForm = document.getElementById("signinForm");
const message = document.getElementById("message");

if (signupForm) {
  signupForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const tag = document.getElementById("tag").value.trim().toLowerCase();
    const email = document.getElementById("email").value.trim();

    if (!name || !tag || !email) {
      message.textContent = "Please complete all fields.";
      return;
    }

    try {
      const usersRef = collection(db, "users");

      const existingUser = await getDocs(
        query(usersRef, where("tag", "==", tag))
      );

      if (!existingUser.empty) {
        message.textContent = "This NetTag already exists.";
        return;
      }

      await addDoc(usersRef, {
        name: name,
        tag: tag,
        email: email,
        createdAt: new Date().toISOString()
      });

      message.textContent = "Your NetTag profile was created successfully!";
      signupForm.reset();

    } catch (error) {
      console.error(error);
      message.textContent = "Unable to create profile. Please try again.";
    }
  });
}

if (signinForm) {
  signinForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const loginTag = document
      .getElementById("loginTag")
      .value
      .trim()
      .toLowerCase();

    try {
      const usersRef = collection(db, "users");

      const result = await getDocs(
        query(usersRef, where("tag", "==", loginTag))
      );

      if (result.empty) {
        message.textContent = "NetTag profile not found.";
        return;
      }

      const user = result.docs[0].data();

      message.textContent = `Welcome back, ${user.name}!`;

      const profileName = document.getElementById("profileName");
      const profileTag = document.getElementById("profileTag");
      const profileEmail = document.getElementById("profileEmail");
      const profileDisplay = document.getElementById("profileDisplay");

      if (profileName) profileName.textContent = user.name;
      if (profileTag) profileTag.textContent = user.tag;
      if (profileEmail) profileEmail.textContent = user.email;
      if (profileDisplay) profileDisplay.style.display = "block";

    } catch (error) {
      console.error(error);
      message.textContent = "Unable to open profile. Please try again.";
    }
  });
}    
