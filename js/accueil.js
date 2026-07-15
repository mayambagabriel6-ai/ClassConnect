// Affiche des profils statiques sur la page d'accueil sans Firestore.
// Cette page utilise uniquement des données locales pour l'instant.

// Données de démonstration des profils visibles sur la page d'accueil.
const profiles = [
  {
    name: "Oksana Nangonda",
    role: "Tuteur",
    roleClass: "tut",
    // Image SVG intégrée pour représenter visuellement chaque profil.
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%235e60ce'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='42' fill='white' font-family='Arial, sans-serif'%3EJD%3C/text%3E%3C/svg%3E",
    universite: "Université de Kinshasa",
    niveau: "Master 1",
    description: "Tuteur en mathématiques et physique, disponible les soirs de semaine.",
    matieres: ["Mathématiques", "Physique"],
    disponibilites: ["Lundi soir", "Mercredi soir", "Vendredi soir"],
    contactLink: "../Pages/messagerie.html"
  },
  {
    name: "Zayana Ndombasi",
    role: "Étudiante",
    roleClass: "et",
    // Image SVG intégrée pour représenter visuellement chaque profil.
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%232f9e44'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='42' fill='white' font-family='Arial, sans-serif'%3ESM%3C/text%3E%3C/svg%3E",
    universite: "Université Catholique du Congo",
    niveau: "Licence 3",
    description: "Étudiante active cherchant un tuteur en informatique et statistiques.",
    matieres: ["Programmation", "Statistiques"],
    disponibilites: ["Mardi après-midi", "Jeudi après-midi"],
    contactLink: "../Pages/messagerie.html"
  },
  {
    name: "Sonia Magindu",
    role: "Tuteur",
    roleClass: "tut",
    // Image SVG intégrée pour représenter visuellement chaque profil.
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23d9480f'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='42' fill='white' font-family='Arial, sans-serif'%3EPK%3C/text%3E%3C/svg%3E",
    universite: "Université Protestante au Congo",
    niveau: "Master 2",
    description: "Tuteur expérimenté en économie et gestion, disponible pour aider aux projets et aux examens.",
    matieres: ["Économie", "Gestion"],
    disponibilites: ["Lundi matin", "Mercredi matin", "Vendredi matin"],
    contactLink: "../Pages/messagerie.html"
  }
];

// Sélectionne le conteneur où les cartes de profil seront injectées.
const container = document.getElementById("cardsContainer");

// Si le conteneur existe, on génère le HTML des cartes à partir des données locales.
if (container) {
  container.innerHTML = profiles.map((profile) => `
    <article class="card">
      <div class="avatar">
        <img src="${profile.image}" alt="Photo de ${profile.name}">
      </div>
      <p class="badge badge-${profile.roleClass}">${profile.role}</p>
      <h3>${profile.name}</h3>
      <p><strong>Université :</strong> ${profile.universite}</p>
      <p><strong>Niveau :</strong> ${profile.niveau}</p>
      <p>${profile.description}</p>
      <div class="tags-competences">
        ${profile.matieres.map((matiere) => `<span class="tag">${matiere}</span>`).join("")}
      </div>
      <a href="${profile.contactLink}" class="contact-link"><button class="contact-button"><i class="fas fa-envelope"></i> Contacter</button></a>
    </article>
  `).join("");
}
