import { useState } from "react";
import SocialLink from "../ui/SocialLinks.jsx";
import { SOCIAL_LINKS } from "../../constants/navigation";

export default function Contact() {
    const [form, setForm] = useState({
        prenom: "", nom: "", email: "", sujet: "", message: "",
    });
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState(null);
    const [toast, setToast] = useState(null);

    const inputClass =
        "peer w-full bg-transparent border-b border-white/20 text-white pt-6 pb-2 " +
        "text-base md:text-lg focus:outline-none focus:border-[#CDA268] transition-all " +
        "focus:shadow-[0_0_20px_rgba(205,162,104,0.2)]";

    const labelClass =
        "absolute left-0 top-4 text-white/50 text-base md:text-lg transition-all " +
        "duration-300 pointer-events-none " +
        "peer-focus:-translate-y-5 peer-focus:scale-90 peer-focus:text-[#CDA268] " +
        "peer-valid:-translate-y-5 peer-valid:scale-90 peer-valid:text-[#CDA268]";

    const floatingLabel = (name) =>
        `absolute left-0 top-4 text-white/50 text-base md:text-lg transition-all duration-300 pointer-events-none ${
            focused === name || form[name]
                ? "-translate-y-5 scale-90 !text-[#CDA268]"
                : ""
        }`;

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const validate = () => {
        if (!form.prenom.trim()) return "Veuillez indiquer votre prénom.";
        if (!form.nom.trim()) return "Veuillez indiquer votre nom.";
        if (!form.email.includes("@")) return "Email invalide.";
        if (form.message.trim().length < 5) return "Votre message est trop court.";
        return null;
    };

    const showToast = (type, message) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const error = validate();
        if (error) return showToast("error", error);

        try {
            setLoading(true);
            const res = await fetch("http://localhost:3001/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            let data = null;
            try { data = await res.json(); } catch { /* backend down */ }

            if (!res.ok) throw new Error(data?.error || "Erreur serveur");

            showToast("success", "Message envoyé ! Nous vous répondrons très rapidement.");
            setForm({ prenom: "", nom: "", email: "", sujet: "", message: "" });
        } catch {
            showToast("error", "Serveur indisponible. Veuillez réessayer plus tard.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            id="contact"
            className="flex justify-center px-6 sm:px-10 md:px-16 py-20 md:py-32 bg-[#070F2B]"
        >
            <div className="w-full max-w-7xl flex flex-col md:flex-row gap-12 md:gap-20">

                {/* ── COLONNE GAUCHE ── */}
                <div className="flex-1 flex flex-col gap-6 md:gap-8">
                    <p className="text-[#CDA268] uppercase tracking-[0.4em] text-xs sm:text-sm">
                        Contact
                    </p>
                    <div className="w-14 md:w-16 h-px bg-[#CDA268]" />
                    <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-light leading-tight">
                        Entrons en contact
                    </h2>
                    <p className="text-white/60 max-w-md leading-relaxed text-sm sm:text-base">
                        Une question, un projet ou une collaboration ?
                        Nous vous répondrons rapidement.
                    </p>

                    {/* ── RÉSEAUX SOCIAUX ── */}
                    <div className="mt-auto pt-4 md:pt-8">
                        <p className="text-white/50 uppercase tracking-[0.2em] text-md mb-4">
                            Suivez nous
                        </p>
                        <ul className="flex gap-3" aria-label="Nos réseaux sociaux">
                            {SOCIAL_LINKS.map((link) => (
                                <li key={link.name}>
                                    <SocialLink link={link} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ── FORMULAIRE ── */}
                <form
                    onSubmit={handleSubmit}
                    className="flex-1 flex flex-col gap-8"
                    noValidate
                >
                    {/* Prénom + Nom */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                        <div className="relative">
                            <input name="prenom" value={form.prenom} onChange={handleChange}
                                   onFocus={() => setFocused("prenom")} onBlur={() => setFocused(null)}
                                   className={inputClass} required />
                            <label className={floatingLabel("prenom")}>Prénom</label>
                        </div>
                        <div className="relative">
                            <input name="nom" value={form.nom} onChange={handleChange}
                                   onFocus={() => setFocused("nom")} onBlur={() => setFocused(null)}
                                   className={inputClass} required />
                            <label className={floatingLabel("nom")}>Nom</label>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <input name="email" type="email" value={form.email} onChange={handleChange}
                               onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                               className={inputClass} required />
                        <label className={floatingLabel("email")}>Email</label>
                    </div>

                    {/* Sujet */}
                    <div className="relative">
                        <input name="sujet" value={form.sujet} onChange={handleChange}
                               onFocus={() => setFocused("sujet")} onBlur={() => setFocused(null)}
                               className={inputClass} />
                        <label className={floatingLabel("sujet")}>Sujet</label>
                    </div>

                    {/* Message */}
                    <div className="relative">
                        <textarea name="message" rows="5" value={form.message} onChange={handleChange}
                                  onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                                  className={inputClass + " resize-none"} required />
                        <label className={floatingLabel("message")}>Message</label>
                    </div>

                    {/* Bouton */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            self-start sm:self-auto
                            inline-block px-8 py-3.5
                            text-sm tracking-[0.12em] uppercase font-semibold
                            transition-all duration-300 active:scale-95
                            border border-[#CDA268] text-[#CDA268]
                            whitespace-nowrap cursor-pointer
                            disabled:opacity-50 disabled:cursor-not-allowed
                        "
                        style={{ backgroundColor: "transparent", boxShadow: "0 0 10px rgba(205,162,104,0.15)" }}
                        onMouseEnter={(e) => {
                            if (loading) return;
                            e.currentTarget.style.backgroundColor = "#CDA268";
                            e.currentTarget.style.color = "#fff";
                            e.currentTarget.style.boxShadow = "0 0 32px rgba(205,162,104,0.65)";
                        }}
                        onMouseLeave={(e) => {
                            if (loading) return;
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = "#CDA268";
                            e.currentTarget.style.boxShadow = "0 0 10px rgba(205,162,104,0.15)";
                        }}
                    >
                        {loading ? "Envoi..." : "Envoyer le message"}
                    </button>
                </form>
            </div>

            {/* Toast */}
            {toast && (
                <div className={`
                    fixed bottom-6 right-6 z-50 px-6 py-3 text-sm rounded-lg shadow-lg text-white
                    transition-all duration-300
                    ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}
                `}>
                    {toast.message}
                </div>
            )}
        </section>
    );
}