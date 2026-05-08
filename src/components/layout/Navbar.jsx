import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import logo from "../../assets/images/logo-tn.png";
import { NAV_LINKS, SOCIAL_LINKS } from "../../constants/navigation";
import ButtonGold from "../ui/ButtonGold.jsx";
import SocialLink from "../ui/SocialLinks.jsx";


export default function Navbar() {
    const [isOpen, setIsOpen]                   = useState(false);
    const [scrolled, setScrolled]               = useState(false);
    const [isOnGoldSection, setIsOnGoldSection] = useState(false);
    const [navHeight, setNavHeight]             = useState(80);
    const navBarRef                             = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();
    const isHome   = location.pathname === "/";

    const [pendingScroll, setPendingScroll] = useState(null);


    useEffect(() => {
        if (isOpen) {
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";
            document.body.style.touchAction = "none";
        } else {
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
            document.body.style.touchAction = "";
        }
    }, [isOpen]);

    // ── Mesure la hauteur réelle de la barre (safe-area comprise) ────────────
    useEffect(() => {
        const el = navBarRef.current;
        if (!el) return;
        const ro = new ResizeObserver(() => setNavHeight(el.offsetHeight));
        ro.observe(el);
        setNavHeight(el.offsetHeight);
        return () => ro.disconnect();
    }, []);

    const handleNav = (href) => {
        const id = href.replace("#", "");
        setIsOpen(false);

        setTimeout(() => {
            if (!isHome) {
                setPendingScroll(id);
                navigate("/");
            } else {
                const el = document.getElementById(id);
                if (!el) return;
                const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({ top, behavior: "smooth" });
            }
        }, 50); // 50ms suffisent pour que React retire l'overflow:hidden
    };

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const goldSections = document.querySelectorAll(".bg-gold-section");
        const observer = new IntersectionObserver(
            (entries) => setIsOnGoldSection(entries.some(e => e.isIntersecting)),
            { threshold: 0.4 }
        );
        goldSections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    const FA_ICONS = { instagram: faInstagram, facebook: faFacebook };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 text-white">

            {/* ===== BARRE PRINCIPALE =====
             * paddingTop: max(20px, env(safe-area-inset-top))
             * → pousse le contenu sous la Dynamic Island / barre de statut iOS
             * zIndex: 9999 → toujours AU-DESSUS du menu mobile (9998)
             * "relative" → nécessaire pour que zIndex soit respecté
             */}
            <div
                ref={navBarRef}
                className={`
                    w-full transition-all duration-500 border-b relative
                    ${isOpen
                    ? "bg-[#070F2B] backdrop-blur-md border-white/10"
                    : isOnGoldSection || scrolled
                        ? "bg-white/10 backdrop-blur-md border-white/10"
                        : "bg-white/5 backdrop-blur-xs border-transparent"}
                `}
                style={{
                    paddingTop: "max(20px, env(safe-area-inset-top))",
                    zIndex: 9999,
                }}
            >
                <div className="flex items-center justify-between h-20 px-[5%]">

                    <button
                        onClick={() => {
                            setIsOpen(false);
                            navigate("/");
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="focus:outline-none"
                    >
                        <img src={logo} className="h-16" alt="Les Têtes Nivoles" />
                    </button>

                    {/* LIENS DESKTOP
                     * ml-auto → pousse les liens vers la droite
                     * mr-8    → espace entre les liens et les socials/CTA
                     */}
                    <div className="hidden md:flex gap-16 ml-auto mr-40">
                        {NAV_LINKS.map((link) => (
                            <a key={link.href} href={link.href}
                               onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                               className="text-lg tracking-[0.08em] hover:text-[#CDA268] transition-colors duration-200">
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* SOCIALS + CTA DESKTOP */}
                    <div className="hidden md:flex items-center gap-5">
                        {SOCIAL_LINKS.map((l) => <SocialLink key={l.name} link={l} />)}
                        <ButtonGold href="#contact" label="Nous contacter" />
                    </div>

                    {/* MOBILE — contact + burger/croix */}
                    <div className="md:hidden flex items-center gap-2 justify-between">
                        <a href="#"
                           onClick={(e) => { e.preventDefault(); handleNav("#contact"); }}
                           className="text-[10px]
                            uppercase
                            tracking-[0.14em]
                            border border-[#CDA268]
                            text-[#CDA268]
                            px-3.5 py-2
                            rounded-sm
                            whitespace-nowrap
                            transition-all duration-300
                            hover:bg-[#CDA268]
                            hover:text-white">
                            Nous contacter
                        </a>

                        <button
                            onClick={() => setIsOpen(v => !v)}
                            aria-label={isOpen ? "Fermer" : "Menu"}
                            className="relative w-10 h-10 flex items-center justify-center focus:outline-none"
                        >
                            <span className="absolute w-6 h-[2px] bg-white transition-all duration-300"
                                  style={{ transform: isOpen ? "rotate(45deg)" : "translateY(-6px)" }} />
                            <span className="absolute w-6 h-[2px] bg-white transition-all duration-300"
                                  style={{ opacity: isOpen ? 0 : 1 }} />
                            <span className="absolute w-6 h-[2px] bg-white transition-all duration-300"
                                  style={{ transform: isOpen ? "rotate(-45deg)" : "translateY(6px)" }} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ===== MENU MOBILE =====
             *
             * top: navHeight      → s'ouvre exactement sous la barre nav
             * height: 100dvh - navHeight → remplit le reste de l'écran dynamique iOS
             * paddingBottom: env(safe-area-inset-bottom, 50px) → gère barre Safari en bas
             *
             * Animation : opacity + léger translateY(-4) à la fermeture
             * PAS de -translate-y-full → évite que le menu remonte sur la nav
             * et bloque les clics sur le logo / burger
             * pointer-events-none quand fermé → aucune interception de clics
             */}
            <div
                className={`
                    md:hidden fixed left-0 right-0 top-0
                    flex flex-col
                    bg-[#070F2B]
                    transition-all duration-500 ease-in-out
                    ${isOpen
                    ? "opacity-100 pointer-events-auto translate-y-0"
                    : "opacity-0 pointer-events-none -translate-y-4"}
                `}
                style={{
                    paddingTop: navHeight,
                    height: "100dvh",
                    paddingBottom: "env(safe-area-inset-bottom, 50px)",
                    overflow: "hidden",
                    zIndex: 9998,
                }}
            >
                {/* ── 1. SOCIALS EN HAUT ──────────────────────────────────── */}
                <div className="flex flex-col items-center gap-4 pt-10 pb-2">
                    <div className="flex gap-6">
                        {SOCIAL_LINKS.map((l) => (
                            <a key={l.name} href={l.href}
                               target="_blank" rel="noopener noreferrer"
                               aria-label={l.name}
                               className="w-12 h-12 rounded-full flex items-center justify-center border border-[#CDA268]/40 text-white/70 hover:bg-[#CDA268] hover:border-[#CDA268] hover:text-white transition-all duration-300">
                                <FontAwesomeIcon icon={FA_ICONS[l.icon]} style={{ width: "20px", height: "20px" }} />
                            </a>
                        ))}
                    </div>
                    <span className="h-px w-16 bg-[#CDA268]/30 mt-2" />
                </div>

                {/* ── 2. LIENS — flex-1 centre verticalement ──────────────── */}
                <div className="flex flex-col items-center gap-15 px-6 pt-20">
                    {NAV_LINKS.map((link, i) => (
                        <a key={link.href} href="#"
                           onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                           className="text-2xl uppercase tracking-[0.22em] font-light text-white/80 hover:text-white transition-colors text-center"
                           style={{ transitionDelay: isOpen ? `${i * 60}ms` : "0ms" }}>
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}