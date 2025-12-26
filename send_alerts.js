

// src/send_alerts.js
require("dotenv").config();  // ⚠️ Toujours en haut

const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const path = require("path");
console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS, process.env.ALERT_RECEIVER);

// === Firebase Admin ===
const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json"); 
// Assure-toi que ce fichier est bien dans src/
admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccountPath)),
});

const db = admin.firestore();

// === Nodemailer ===
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // mot de passe d'application Gmail
  },
});

// === Fonction pour envoyer email ===
async function sendEmail(alert) {
  try {
    await transporter.sendMail({
      from: `IoT Alerts <${process.env.EMAIL_USER}>`,
      to: process.env.ALERT_RECEIVER,
      subject: `ALERTE : ${alert.sensor}`,
      html: `
        <h2>Alerte IoT</h2>
        <p>Capteur : ${alert.sensor}</p>
        <p>Message : ${alert.message}</p>
        <p>Heure : ${new Date(alert.timestamp).toLocaleString()}</p>
      `,
    });
    console.log("Email envoyé !");
  } catch (err) {
    console.error("Erreur email:", err);
  }
}

// === Surveillance Firestore ===
console.log("Surveillance des alertes activée...");
db.collection("alerts").onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if (change.type === "added") sendEmail(change.doc.data());
  });
});



