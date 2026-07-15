import { auth, db } from "./firebase-config.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";


onAuthStateChanged(auth, async(user)=>{

    if(!user){

        window.location.href="../Pages/connexion.html";
        return;

    }

    const docRef = doc(db,"users",user.uid);

    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){

        const data = docSnap.data();

        // Afficher le nom complet construit depuis Firestore.
        document.getElementById("profilname").textContent =
            `${data.prenom ?? ""} ${data.nom ?? ""}`.trim() || "Profil utilisateur";

        // Afficher l'adresse mail et les informations de l'utilisateur.
        document.getElementById("email").textContent = data.email ?? "";
        document.getElementById("universite").textContent = data.universite ?? "Non renseignée";
        document.getElementById("niv").textContent = data.niveau ?? "Non renseigné";
        document.getElementById("statut").textContent = data.statut ?? "Disponible";

    }

});