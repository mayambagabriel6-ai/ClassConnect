// Import Firebase auth instance et la méthode de connexion.
import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

// Attendre que le DOM soit chargé avant d'attacher le gestionnaire de formulaire.
document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("nom")?.value.trim() ?? "";
    const password = document.getElementById("mdp")?.value.trim() ?? "";

    if (!email || !password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      // Authentifier l'utilisateur avec Firebase Auth.
      await signInWithEmailAndPassword(auth, email, password);
      // Rediriger vers la page d'accueil après connexion.
      window.location.href = "../Pages/accueil.html";
    } catch (error) {
      alert(error.message || "Échec de la connexion.");
      console.error(error);
    }
  });
});
