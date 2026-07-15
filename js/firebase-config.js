// Initialise Firebase avec la configuration du projet.
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCg6VfD2sEDWp3v5yHOsYG_b_dXjEgscCE",
  authDomain: "classconnect-926cf.firebaseapp.com",
  projectId: "classconnect-926cf",
  storageBucket: "classconnect-926cf.firebasestorage.app",
  messagingSenderId: "18984880826",
  appId: "1:18984880826:web:86e0f457d76f287b949083"
};

// Application Firebase partagée entre auth et Firestore.
const app = initializeApp(firebaseConfig);

// Export des instances Authentication et Firestore.
export const auth = getAuth(app);
export const db = getFirestore(app);