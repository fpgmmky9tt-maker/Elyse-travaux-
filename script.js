
/* ELYSE TRAVAUX - JAVASCRIPT */

// Numéro WhatsApp de l'entreprise
const WHATSAPP_NUMBER = "212787089301";

// Année automatique dans le footer
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Sélection automatique du produit
const productSelect = document.getElementById("produit");

document.querySelectorAll("[data-product]").forEach(function(link) {
  link.addEventListener("click", function() {
    const productName = this.getAttribute("data-product");

    if (productSelect) {
      productSelect.value = productName;
    }
  });
});

// Formulaire de devis
const quoteForm = document.getElementById("quote-form");
const formMessage = document.getElementById("form-message");

if (quoteForm) {
  quoteForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const data = new FormData(quoteForm);

    const nom = (data.get("nom") || "").trim();
    const entreprise = (data.get("entreprise") || "").trim();
    const ville = (data.get("ville") || "").trim();
    const email = (data.get("email") || "").trim();
    const produit = (data.get("produit") || "").trim();
    const longueur = (data.get("longueur") || "").trim();
    const hauteur = (data.get("hauteur") || "").trim();
    const details = (data.get("details") || "").trim();

    if (!nom || !ville || !produit || !details) {
      formMessage.textContent =
        "Veuillez remplir tous les champs obligatoires.";
      return;
    }

    // Message envoyé vers WhatsApp
    const message = [
      "Bonjour ELYSE TRAVAUX,",
      "",
      "Je souhaite obtenir un devis.",
      "",
      "INFORMATIONS CLIENT",
      "Nom : " + nom,
      "Entreprise : " + (entreprise || "Non renseignée"),
      "Ville : " + ville,
      "E-mail : " + (email || "Non renseigné"),
      "",
      "DEMANDE DE DEVIS",
      "Produit : " + produit,
      "Longueur : " + (longueur || "À définir"),
      "Hauteur : " + (hauteur || "À définir"),
      "",
      "Description du projet :",
      details,
      "",
      "Merci de me contacter pour étudier mon projet."
    ].join("\n");

    const whatsappURL =
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(message);

    // Préparer un lien de secours
    formMessage.textContent = "";

    const fallbackLink = document.createElement("a");
    fallbackLink.href = whatsappURL;
    fallbackLink.target = "_blank";
    fallbackLink.rel = "noopener noreferrer";
    fallbackLink.textContent =
      "Cliquez ici pour ouvrir WhatsApp et envoyer votre devis.";

    formMessage.appendChild(fallbackLink);

    // Ouverture de WhatsApp
    const newWindow = window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );

    if (!newWindow) {
      // Le lien reste disponible si le navigateur
      // bloque l'ouverture automatique.
      formMessage.insertAdjacentText(
        "afterbegin",
        "Si WhatsApp ne s'ouvre pas : "
      );
    }
  });
}
