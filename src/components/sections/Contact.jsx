import { useState } from "react";

const COLORS = {
    gold: "#CDA268",
    night: "#070F2B",
};

export default function Contact() {
    const [form, setForm] = useState({
        prenom: "",
        nom: "",
        email: "",
        sujet: "",
        message: "",
    });

    const [status, setStatus] = useState("idle");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        if (!form.prenom.trim()) return "Veuillez indiquer votre prénom.";
        if (!form.nom.trim()) return "Veuillez indiquer votre nom.";
        if (!form.email.includes("@")) return "Email invalide.";
        if (form.message.trim().length < 10) return "Message trop court.";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const error = validate();
        if (error) {
            setStatus(error);
            return;
        }

        try {
            setStatus("sending");

            const res = await fetch("http://localhost:3001/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error();

            setStatus("success");
            setForm({
                prenom: "",
                nom: "",
                email: "",
                sujet: "",
                message: "",
            });

        } catch (err) {
            setStatus("error");
        }
    };

    return (
        <section
            id="contact"
            style={{ backgroundColor: COLORS.night }}
            className="py-32 px-8 flex justify-center"
        >
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-xl flex flex-col gap-6"
            >

                {/* PRÉNOM */}
                <input
                    name="prenom"
                    placeholder="Prénom"
                    value={form.prenom}
                    onChange={handleChange}
                    className="bg-transparent border-b text-white py-3 outline-none"
                />

                {/* NOM */}
                <input
                    name="nom"
                    placeholder="Nom"
                    value={form.nom}
                    onChange={handleChange}
                    className="bg-transparent border-b text-white py-3 outline-none"
                />

                {/* EMAIL */}
                <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="bg-transparent border-b text-white py-3 outline-none"
                />

                {/* SUJET */}
                <input
                    name="sujet"
                    placeholder="Sujet (optionnel)"
                    value={form.sujet}
                    onChange={handleChange}
                    className="bg-transparent border-b text-white py-3 outline-none"
                />

                {/* MESSAGE */}
                <textarea
                    name="message"
                    placeholder="Message"
                    rows="4"
                    value={form.message}
                    onChange={handleChange}
                    className="bg-transparent border-b text-white py-3 outline-none resize-none"
                />

                {/* STATUS */}
                <p
                    className="text-sm"
                    style={{
                        color:
                            status === "success"
                                ? COLORS.gold
                                : status === "error"
                                    ? "red"
                                    : "rgba(255,255,255,0.6)",
                    }}
                >
                    {status === "sending" && "Envoi en cours..."}
                    {status === "success" && "Message envoyé avec succès."}
                    {status === "error" && "Une erreur est survenue."}
                    {!["idle", "sending", "success", "error"].includes(status) &&
                        status}
                </p>

                {/* BUTTON */}
                <button
                    type="submit"
                    className="mt-4 py-3 uppercase tracking-widest"
                    style={{
                        border: `1px solid ${COLORS.gold}`,
                        color: COLORS.gold,
                    }}
                    disabled={status === "sending"}
                >
                    {status === "sending" ? "Envoi..." : "Envoyer"}
                </button>
            </form>
        </section>
    );
}