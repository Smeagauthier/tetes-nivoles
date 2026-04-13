import { useState, useEffect } from "react";


import SocialLink from "../ui/SocialLinks.jsx";
import logo from "../../assets/images/logo-tn.png";
import { NAV_LINKS, SOCIAL_LINKS } from "../../constants/navigation";
import ButtonGold from "../ui/ButtonGold.jsx";



// ─── NavLink ──────────────────────────────────────────────────────────────────

const NavLink = ({ href, label, onClick }) => (

<a    href={href}
onClick={onClick}
className="
relative text-lg tracking-[0.08em]
text-white
transition-colors duration-200
"
onMouseEnter={(e) => {
    e.currentTarget.style.color = "#CDA268";
    e.currentTarget.querySelector(".underline-bar").style.width = "100%";
    e.currentTarget.querySelector(".underline-bar").style.backgroundColor = "#CDA268";
}}
onMouseLeave={(e) => {
    e.currentTarget.style.color = "";
    e.currentTarget.querySelector(".underline-bar").style.width = "0";
}}
>
{label}
<span
    className="underline-bar absolute left-0 -bottom-0.5 h-px w-0 transition-all duration-300"
/>
</a>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────

export default function Navbar() {
    const [isOpen,   setIsOpen]   = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const onResize = () => { if (window.innerWidth >= 768) setIsOpen(false); };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 text-white">

            {/* ── Barre principale ─────────────────────────────────────────────── */}
            <div
                className={`
                w-full transition-all duration-500 border-b
                ${scrolled
                    ? "bg-white/20 backdrop-blur-md border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                    : "bg-white/5 backdrop-blur-xs border-transparent"
                }
        `}
            >
                <div
                    className="flex items-center justify-between gap-10 h-20"
                    style={{ paddingLeft: "5%", paddingRight: "5%" }}
                >

                    {/* Logo */}
                    <a href="#" className="flex-shrink-0">
                        <img
                            src={logo}
                            alt="Compagnie les Têtes Nivoles"
                            className="h-16 w-auto object-contain"
                        />
                    </a>

                    {/* Liens desktop — centrés */}
                    <div className="hidden md:flex items-center gap-20 mx-auto flex-nowrap pl-10">
                        {NAV_LINKS.map((link) => (
                            <NavLink
                                key={link.href}
                                href={link.href}
                                label={link.label}
                            />
                        ))}
                    </div>

                    {/* Réseaux + CTA desktop */}
                    <div className="hidden md:flex items-center gap-5 flex-shrink-0">

                        <div className="flex items-center gap-2">
                            {SOCIAL_LINKS.map((link) => (
                                <SocialLink key={link.name} link={link} />
                            ))}
                        </div>

                        <span className="h-5 w-px bg-white/20" />

                        {/* CTA */}
                        <ButtonGold href="#contact" label="Nous contacter" className="mt-0"/>
                    </div>

                {/* Burger mobile */}
                <button
                    className="
              md:hidden flex flex-col justify-center items-center gap-[5px]
              w-9 h-9 rounded-lg p-2
              border border-white/20
              hover:border-white/40 hover:bg-white/10
              transition-all duration-200
            "
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
                    aria-expanded={isOpen}
                >
            <span className={`block w-4 h-[1.5px] bg-white rounded transition-all duration-300
              ${isOpen ? "translate-y-[3px] rotate-45" : ""}`}
            />
                    <span className={`block w-4 h-[1.5px] bg-white rounded transition-all duration-300
              ${isOpen ? "opacity-0 scale-x-0" : ""}`}
                    />
                    <span className={`block w-4 h-[1.5px] bg-white rounded transition-all duration-300
              ${isOpen ? "-translate-y-[3px] -rotate-45" : ""}`}
                    />
                </button>

            </div>
        </div>

    {/* ── Menu mobile ───────────────────────────────────────────────────── */}
            {/* ── Menu mobile ───────────────────────────────────────────────────── */}
            <div
                className={`
          md:hidden fixed inset-0 z-40
          flex flex-col
          transition-all duration-500 ease-in-out
          ${isOpen
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }
        `}
            >
                {/* Fond verre plein écran */}
                <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" />

                {/* Contenu centré verticalement */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2 px-8">

                    {/* Liens — grands, bien espacés */}
                    {NAV_LINKS.map((link, index) => (

                    <a    key={link.href}
                        href={link.href}
                        onClick={closeMenu}
                        className="
                        w-full text-center
                        py-6 text-2xl tracking-[0.12em] uppercase font-light
                        border-b border-white/10 last:border-0
                        transition-all duration-200
                        "
                        style={{
                        transitionDelay: isOpen ? `${index * 60}ms` : "0ms",
                        transform: isOpen ? "translateY(0)" : "translateY(12px)",
                        opacity: isOpen ? 1 : 0,
                    }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "#CDA268"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = ""; }}
                        >
                    {link.label}
                        </a>
                        ))}

                    {/* Réseaux + CTA en bas */}
                    <div className="flex flex-col items-center gap-6 mt-12">

                        <div className="flex gap-4">
                            {SOCIAL_LINKS.map((link) => (
                                <SocialLink key={link.name} link={link} />
                            ))}
                        </div>
                        <ButtonGold href="#contact" label="Nous contacter" className="mt-0"/>
                    </div>
            </div>

            {/* Croix de fermeture */}
            <button
                onClick={closeMenu}
                className="
            absolute top-6 right-6 z-20
            w-10 h-10 rounded-full
            flex items-center justify-center
            border border-white/20
            text-white/60 hover:text-white hover:border-white/50
            transition-all duration-200
            text-xl
          "
                aria-label="Fermer le menu"
            >
                ✕
            </button>
        </div>
 </nav>
);
}