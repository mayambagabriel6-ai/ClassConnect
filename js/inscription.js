// Import de l'instance Firebase et des fonctions Auth/Firestore.
import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword, deleteUser } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// Récupérer le formulaire d'inscription.
const form = document.getElementById("registerForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nom = document.getElementById("nom")?.value.trim() ?? "";
    const prenom = document.getElementById("prenom")?.value.trim() ?? "";
    const email = document.getElementById("email")?.value.trim() ?? "";
    const mdp = document.getElementById("mdp")?.value.trim() ?? "";
    const mdp2 = document.getElementById("mdp2")?.value.trim() ?? "";

    // Champs profil partagés entre les deux types d'utilisateurs.
    const universite = document.getElementById("uni")?.value.trim() ?? "";
    const filiere = document.getElementById("fil")?.value.trim() ?? "";
    // Normaliser le niveau d'étude sur un seul champ Firestore.
    const niveau = document.getElementById("niv")?.value.trim() ?? document.getElementById("promo")?.value.trim() ?? "";

    // Extraire les matières et les disponibilités cochées.
    const matieres = Array.from(document.querySelectorAll('input[name="matieres"]:checked')).map((checkbox) => checkbox.value);
    const disponibilites = Array.from(document.querySelectorAll('input[name="disponibilité"]:checked')).map((checkbox) => checkbox.value);

    if (!nom || !prenom || !email || !mdp || !mdp2) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (mdp !== mdp2) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    const role = window.location.pathname.includes("tuteur") ? "tuteur" : "etudiant";
    let newUser = null;

    try {
      // Créer un nouvel utilisateur Firebase Auth.
      const userCredential = await createUserWithEmailAndPassword(auth, email, mdp);
      newUser = userCredential.user;

      // Enregistrer le profil dans Firestore.
      console.log("Écriture Firestore pour user", newUser.uid);
      await setDoc(doc(db, "users", newUser.uid), {
        nom,
        prenom,
        email,
        role,
        universite,
        filiere,
        niveau,
        matieres,
        disponibilites,
        statut: "Disponible",
        dateCreation: new Date().toISOString()
      });
      console.log("Profil Firestore créé pour user", newUser.uid);

      alert("Bienvenue sur ClassConnect 🎓");
      window.location.href = "connexion.html";
    } catch (error) {
      console.error("Erreur d'inscription Firebase:", error);

      if (newUser) {
        try {
          await deleteUser(newUser);
          console.warn("Compte Auth supprimé après échec de Firestore.");
        } catch (deleteError) {
          console.error("Échec suppression utilisateur Auth:", deleteError);
        }
      }

      if (error.code === "auth/email-already-in-use") {
        alert("Cet email est déjà utilisé. Connectez-vous ou choisissez une autre adresse.");
      } else if (error.code === "auth/invalid-email") {
        alert("L'adresse email n'est pas valide.");
      } else if (error.code === "auth/weak-password") {
        alert("Le mot de passe est trop faible. Utilisez au moins 6 caractères.");
      } else if (error.code === "permission-denied") {
        alert("L'inscription Auth a réussi, mais l'écriture Firestore est bloquée par les règles de sécurité. Vérifie tes règles Firestore.");
      } else {
        alert(error.message || "Une erreur est survenue lors de l'inscription.");
      }
    }
  });
}
