const express = require("express");
const router = express.Router();
const db = require("../db");
const nodemailer = require("nodemailer");

// =====================
// MAILER
// =====================
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

// =====================
// VALIDATION SIMPLE
// =====================
function validate({ prenom, nom, email, message }) {
    if (!prenom || !nom || !email || !message) return "Champs manquants";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Email invalide";

    if (message.length > 2000) return "Message trop long";

    return null;
}

// =====================
// ROUTE
// =====================
router.post("/", async (req, res) => {
    const { prenom, nom, email, sujet, message, website } = req.body;

    // HONEYPOT ANTI BOT
    if (website) {
        return res.status(400).json({ error: "Bot detected" });
    }

    // VALIDATION
    const error = validate({ prenom, nom, email, message });
    if (error) {
        return res.status(400).json({ error });
    }

    const sql = `
        INSERT INTO contacts (prenom, nom, email, sujet, message)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [prenom, nom, email, sujet, message], async (err) => {
        if (err) {
            console.error("DB error:", err);
            return res.status(500).json({ error: "DB error" });
        }

        try {

            await transporter.sendMail({
                from: process.env.MAIL_USER,
                to: process.env.MAIL_TO,
                replyTo: email,
                subject: `🎭 Message du site des Têtes Nivoles - ${sujet || "Sans sujet"}`,
                html: `
                    <div style="font-family:Arial,sans-serif;background:#070F2B;color:#fff;padding:20px;">
                        <h2 style="color:#CDA268;">Nouveau message</h2>
                        <p><b style="color:#CDA268;">Prénom:</b> ${prenom}</p>
                        <p><b style="color:#CDA268;">Nom:</b> ${nom}</p>
                        <p><b style="color:#CDA268;">Email:</b> ${email}</p>
                        <p><b style="color:#CDA268;">Sujet:</b> ${sujet}</p>
                        <hr style="color:#CDA268;" />
                        <p style="white-space:pre-line;">${message}</p>
                    </div>
                `,
            });

            return res.json({ success: true });

        } catch (mailErr) {
            console.error("MAIL ERROR:", mailErr);
            return res.status(500).json({ error: "Mail error" });
        }
    });
});

module.exports = router;