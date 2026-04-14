require("dotenv").config();

const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

// =====================
// SECURITY MIDDLEWARE
// =====================

// CORS (à durcir en prod)
app.use(cors({
    origin: "*", // en prod mettre ton domaine o2switch
}));

app.use(express.json());

// =====================
// RATE LIMITER GLOBAL CONTACT
// =====================
const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        error: "Trop de messages envoyés. Réessaie plus tard."
    }
});

// =====================
// DB
// =====================
const db = require("./db");

// =====================
// ROUTES + LIMITER (IMPORTANT ORDRE)
// =====================
const contactRoutes = require("./routes/contact");

app.use("/api/contact", contactLimiter);
app.use("/api/contact", contactRoutes);

// =====================
app.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});