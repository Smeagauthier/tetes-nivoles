import ButtonGold from "../ui/ButtonGold";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

const COLORS = {
    gold: "#CDA268",
    night: "#070F2B",
};

const SUBJECTS = [
    "Demander une collaboration",
    "Prendre un café",
    "Parler poésie",
    "Question sur le livre",
];

export default function Contact() {
    const [form, setForm] = useState({
        prenom: "",
        nom: "",
        email: "",
        sujet: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState(null);
    const [openSubject, setOpenSubject] = useState(false);
    const subjectRef = useRef(null);
    const [toast, setToast] = useState(null);
    const [errors, setErrors] = useState({});


    useEffect(() => {
        const handleClickOutside = (e) => {
            if (subjectRef.current && !subjectRef.current.contains(e.target)) {
                setOpenSubject(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        if (!form.prenom.trim()) return "Veuillez indiquer votre prénom.";
        if (!form.nom.trim()) return "Veuillez indiquer votre nom.";
        if (!form.email.includes("@")) return "Email invalide.";
        if (form.message.trim().length < 5) return "Votre message trop court.";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const error = validate();
        if (error) {
            setToast({ type: "error", message: error });
            setTimeout(() => setToast(null), 3000);
            return;
        }

        try {
            setLoading(true);

            const res = await fetch("http://localhost:3001/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            let data = null;
            try {
                data = await res.json();
            } catch {
                // backend down ou réponse non JSON
            }

            if (!res.ok) {
                throw new Error(data?.error || "Erreur serveur");
            }

            setToast({
                type: "success",
                message: "Votre message a bien été envoyé, nous vous recontacterons très rapidement !",
            });

            setForm({
                prenom: "",
                nom: "",
                email: "",
                sujet: "",
                message: "",
            });

        } catch (err) {
            console.log(err);

            setToast({
                type: "error",
                message: "Serveur indisponible. Veuillez réessayer plus tard.",
            });

        } finally {
            setLoading(false);

            setTimeout(() => {
                setToast(null);
            }, 3000);
        }
    };

    const inputClass =
        "peer w-full bg-transparent border-b border-white/20 text-white pt-6 pb-2 text-base md:text-lg focus:outline-none focus:border-[#CDA268] transition-all focus:shadow-[0_0_20px_rgba(205,162,104,0.2)]";

    const labelClass =
        "absolute left-0 top-4 text-white/50 text-base md:text-lg transition-all duration-300 pointer-events-none " +
        "peer-focus:-translate-y-5 peer-focus:scale-90 peer-focus:text-[#CDA268] " +
        "peer-valid:-translate-y-5 peer-valid:scale-90 peer-valid:text-[#CDA268]";



    return (
        <section
            id="contact"
            className="flex justify-center px-6 sm:px-10 md:px-16 py-[80px] md:py-[120px] bg-[#070F2B]"
        >
            <div className="w-full max-w-7xl flex flex-col md:flex-row gap-12 md:gap-20">

                {/* ───── LEFT ───── */}
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
                </div>

                {/* ───── FORM ───── */}
                <form
                    onSubmit={handleSubmit}
                    className="flex-1 flex flex-col gap-8"
                >

                    {/* GRID RESPONSIVE */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">

                        {/* PRÉNOM */}
                        <div className="relative">
                            <input
                                name="prenom"
                                value={form.prenom}
                                onChange={handleChange}
                                className={inputClass}
                                required
                            />
                            <label className={labelClass}>Prénom</label>
                        </div>

                        {/* NOM */}
                        <div className="relative">
                            <input
                                name="nom"
                                value={form.nom}
                                onChange={handleChange}
                                className={inputClass}
                                required
                            />
                            <label className={labelClass}>Nom</label>
                        </div>
                    </div>

                    {/* EMAIL */}
                    <div className="relative">
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className={inputClass}
                            required
                        />
                        <label className={labelClass}>Email</label>
                    </div>

                    {/*Sujet*/}
                    <div className="relative">
                        <input
                            name="sujet"
                            value={form.sujet}
                            onChange={handleChange}
                            className={inputClass}
                            onBlur={(e) => setFocused(null)}
                            onFocus={() => setFocused("sujet")}
                        />
                        <label
                            className={`
        absolute left-0 top-4 text-white/50 text-base md:text-lg
        transition-all duration-300 pointer-events-none

        ${focused === "sujet" || form.sujet
                                ? "-translate-y-5 scale-90 !text-[#CDA268]"
                                : ""
                            }
    `}
                        >
                            Sujet
                        </label>
                    </div>

                    {/* MESSAGE */}
                    <div className="relative">
                        <textarea
                            name="message"
                            rows="5"
                            value={form.message}
                            onChange={handleChange}
                            className={inputClass + " resize-none"}
                            required
                        />
                        <label className={labelClass}>Message</label>
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="
        inline-block px-8 py-3.5
        text-sm tracking-[0.12em] uppercase font-semibold
        transition-all duration-300 active:scale-95
        border border-[#CDA268]
        text-[#CDA268]
        whitespace-nowrap
        cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
    "
                        style={{
                            backgroundColor: "transparent",
                            boxShadow: "0 0 10px rgba(205,162,104,0.15)",
                        }}
                        onMouseEnter={(e) => {
                            if (loading) return;
                            e.currentTarget.style.backgroundColor = "#CDA268";
                            e.currentTarget.style.color = "#fff";
                            e.currentTarget.style.boxShadow =
                                "0 0 32px rgba(205,162,104,0.65)";
                        }}
                        onMouseLeave={(e) => {
                            if (loading) return;
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = "#CDA268";
                            e.currentTarget.style.boxShadow =
                                "0 0 10px rgba(205,162,104,0.15)";
                        }}
                    >
                        {loading ? "Envoi..." : "Envoyer le message"}
                    </button>
                </form>
            </div>

            {toast && (
                <div
                    className={`
            fixed bottom-6 right-6 px-6 py-3 text-sm
            rounded-lg shadow-lg text-white
            transition-all duration-300
            ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}
        `}
                >
                    {toast.message}
                </div>
            )}

        </section>
    );
}