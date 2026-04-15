import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SocialLink from "../ui/SocialLinks.jsx";
import logo from "../../assets/images/logo-tn.png";
import { NAV_LINKS, SOCIAL_LINKS } from "../../constants/navigation";
import ButtonGold from "../ui/ButtonGold.jsx";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isOnGoldSection, setIsOnGoldSection] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const isHome = location.pathname === "/";

    /* ================= LOCK SCROLL ================= */
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => (document.body.style.overflow = "");
    }, [isOpen]);

    /* ================= OFFSET SCROLL ================= */
    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const offset = window.innerHeight * 0.03;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({ top, behavior: "smooth" });
    };

    const handleNav = (href) => {
        const id = href.replace("#", "");
        setIsOpen(false);

        if (!isHome) {
            navigate("/");
            setTimeout(() => scrollToSection(id), 120);
        } else {
            scrollToSection(id);
        }
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
            (entries) => {
                setIsOnGoldSection(entries.some(e => e.isIntersecting));
            },
            { threshold: 0.4 }
        );

        goldSections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 text-white">

            {/* ================= TOP BAR ================= */}
            <div
                className={`
                    w-full transition-all duration-500 border-b
                    ${
                    isOnGoldSection
                        ? "bg-white/10 backdrop-blur-md border-white/10"
                        : scrolled
                            ? "bg-white/10 backdrop-blur-md border-white/10"
                            : "bg-white/5 backdrop-blur-xs border-transparent"
                }
                `}
            >
                <div className="flex items-center justify-between h-20 px-[5%]">

                    <img src={logo} className="h-16" />

                    <div className="hidden md:flex gap-16">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.href}
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNav(link.href);
                                }}
                                className="text-lg tracking-[0.08em] hover:text-[#CDA268]"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-5">
                        {SOCIAL_LINKS.map((l) => (
                            <SocialLink key={l.name} link={l} />
                        ))}

                        <ButtonGold href="#contact" label="Nous contacter" />
                    </div>

                    {/* BURGER */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden relative w-10 h-10 flex items-center justify-center z-[60]"
                    >
                        <span
                            className="absolute w-6 h-[2px] bg-white transition-all duration-300"
                            style={{
                                transform: isOpen
                                    ? "rotate(45deg)"
                                    : "translateY(-6px)",
                            }}
                        />
                        <span
                            className="absolute w-6 h-[2px] bg-white transition-all duration-300"
                            style={{
                                opacity: isOpen ? 0 : 1,
                            }}
                        />
                        <span
                            className="absolute w-6 h-[2px] bg-white transition-all duration-300"
                            style={{
                                transform: isOpen
                                    ? "rotate(-45deg)"
                                    : "translateY(6px)",
                            }}
                        />
                    </button>
                </div>
            </div>

            {/* ================= MOBILE MENU ================= */}
            <div
                className={`
                    md:hidden fixed inset-0 z-40 flex flex-col
                    transition-all duration-500 ease-out
                    ${
                    isOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-6 pointer-events-none"
                }
                `}
            >
                <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

                {/* CROIX */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-6 right-6 z-[9999] text-white text-3xl"
                >
                    ✕
                </button>

                {/* ================= CONTENT (REMONTÉ + SPACÉ PROPREMENT) ================= */}
                <div className="relative z-50 flex flex-col h-full px-8 pt-6">

                    {/* SOCIAL */}
                    <div className="flex justify-center gap-8 mt-10 mb-6 scale-105">
                        {SOCIAL_LINKS.map((l) => (
                            <SocialLink key={l.name} link={l} />
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="flex justify-center mb-6">
                        <ButtonGold
                            href="#contact"
                            label="Nous contacter"
                            onClick={() => setIsOpen(false)}
                        />
                    </div>

                    {/* LINKS */}
                    <div className="flex flex-col items-center gap-12 flex-1 justify-center">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.href}
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNav(link.href);
                                }}
                                className="
                                    text-xl md:text-2xl
                                    uppercase tracking-[0.18em]
                                    font-light
                                "
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}