import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SocialLink from "../ui/SocialLinks.jsx";
import logo from "../../assets/images/logo-tn.png";
import { NAV_LINKS, SOCIAL_LINKS } from "../../constants/navigation";
import ButtonGold from "../ui/ButtonGold.jsx";

const NavLink = ({ href, label, onClick, isHome }) => {
    const finalHref = isHome ? href : "/";

    return (
        <a
            href={finalHref}
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
            <span className="underline-bar absolute left-0 -bottom-0.5 h-px w-0 transition-all duration-300" />
        </a>
    );
};

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOnGoldSection, setIsOnGoldSection] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const isHome = location.pathname === "/";

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", onScroll);
        onScroll(); // init

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const getHref = (href) => {
        if (isHome) return href;
        return "/";
    };

    const handleNav = (href) => {
        const id = href.replace("#", "");

        if (!isHome) {
            navigate("/");

            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 100);
        } else {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth" });
        }

        setIsOpen(false);
    };

    useEffect(() => {
        if (isHome && location.hash) {
            const id = location.hash.replace("#", "");
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth" });
        }
    }, [location]);

    useEffect(() => {
        const goldSections = document.querySelectorAll(".bg-gold-section");

        const observer = new IntersectionObserver(
            (entries) => {
                let inGold = false;

                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        inGold = true;
                    }
                });

                setIsOnGoldSection(inGold);
            },
            {
                threshold: 0.4,
            }
        );

        goldSections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth >= 768) setIsOpen(false);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const closeMenu = () => setIsOpen(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 text-white">
            <div
                className={`
w-full transition-all duration-500 border-b

${
                    isOnGoldSection
                        ? "bg-white/20 backdrop-blur-md border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                        : scrolled
                            ? "bg-white/25 backdrop-blur-md border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                            : "bg-white/5 backdrop-blur-xs border-transparent"
                }
`}
            >
                <div
                    className="flex items-center justify-between gap-10 h-20"
                    style={{ paddingLeft: "5%", paddingRight: "5%" }}
                >
                    <a href="#" className="flex-shrink-0">
                        <img
                            src={logo}
                            alt="Compagnie les Têtes Nivoles"
                            className="h-16 w-auto object-contain"
                        />
                    </a>

                    <div className="hidden md:flex items-center gap-20 mx-auto flex-nowrap pl-10">
                        {NAV_LINKS.map((link) => (
                            <NavLink
                                key={link.href}
                                href={link.href}
                                label={link.label}
                                isHome={isHome}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNav(link.href);
                                }}
                            />
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-5 flex-shrink-0">
                        <div className="flex items-center gap-2">
                            {SOCIAL_LINKS.map((link) => (
                                <SocialLink key={link.name} link={link} />
                            ))}
                        </div>

                        <span className="h-5 w-px bg-white/20" />

                        <ButtonGold
                            href="#contact"
                            label="Nous contacter"
                            isInverted={isOnGoldSection}
                        />
                    </div>

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
                        <span className={`block w-4 h-[1.5px] bg-white rounded transition-all duration-300 ${isOpen ? "translate-y-[3px] rotate-45" : ""}`} />
                        <span className={`block w-4 h-[1.5px] bg-white rounded transition-all duration-300 ${isOpen ? "opacity-0 scale-x-0" : ""}`} />
                        <span className={`block w-4 h-[1.5px] bg-white rounded transition-all duration-300 ${isOpen ? "-translate-y-[3px] -rotate-45" : ""}`} />
                    </button>
                </div>
            </div>

            <div
                className={`
          md:hidden fixed inset-0 z-40
          flex flex-col
          transition-all duration-500 ease-in-out
          ${
                    isOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }
        `}
            >
                <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" />

                <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2 px-8">
                    {NAV_LINKS.map((link, index) => (
                        <a
                            key={link.href}
                            href={isHome ? link.href : "/"}
                            onClick={(e) => {
                                e.preventDefault();
                                handleNav(link.href);
                                closeMenu();
                            }}
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
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = "#CDA268";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = "";
                            }}
                        >
                            {link.label}
                        </a>
                    ))}

                    <div className="flex flex-col items-center gap-6 mt-12">
                        <div className="flex gap-4">
                            {SOCIAL_LINKS.map((link) => (
                                <SocialLink key={link.name} link={link} />
                            ))}
                        </div>

                        <ButtonGold href="#contact" label="Nous contacter" className="mt-0" />
                    </div>
                </div>

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