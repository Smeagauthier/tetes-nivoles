import logo from "../../assets/images/logo-tn.png";
import SocialLink from "../ui/SocialLinks.jsx";
import { SOCIAL_LINKS } from "../../constants/navigation";
import { Link } from "react-router-dom";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-[#040a1a] relative overflow-hidden -mb-px">

            {/* Glow subtil en haut */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(205,162,104,0.08),transparent_60%)] pointer-events-none" />

            {/* Séparation haut élégante */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#CDA268]/20 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 pt-10 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">

                {/* LOGO */}
                <a
                    href="/"
                    className="flex flex-col items-center md:items-start gap-2 text-center md:text-left"
                >
                    <img
                        src={logo}
                        alt="Les Têtes Nivoles"
                        className="h-14 sm:h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
                    />
                </a>

                {/* LINKS */}
                <nav
                    aria-label="Mentions légales"
                    className="flex flex-col md:flex-row items-center gap-3 md:gap-6"
                >
                    <Link
                        to="/mentions-legales"
                        className="text-white/40 text-xs tracking-wider hover:text-[#CDA268] transition-colors duration-300 border-b border-transparent hover:border-[#CDA268]/60"
                    >
                        Mentions légales
                    </Link>
                </nav>
            </div>

            {/* DESCRIPTION */}
            <div className="max-w-3xl mx-auto px-6 text-center pb-8 relative z-10">
                <p className="text-white/40 text-xs sm:text-sm italic leading-relaxed max-w-xl mx-auto">
                    Collectif artistique français dédié à la poésie contemporaine, aux performances scéniques et à la création littéraire.
                </p>
            </div>

            {/* BOTTOM BAR */}
            <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 pb-15 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">

                <p className="text-white/25 text-xs tracking-wider text-center sm:text-left">
                    © {year} Les Têtes Nivoles — Tous droits réservés
                </p>

                <div className="flex gap-4 sm:gap-3 opacity-80 hover:opacity-100 transition">
                    {SOCIAL_LINKS.map((link) => (
                        <SocialLink key={link.name} link={link} />
                    ))}
                </div>
            </div>
        </footer>
    );
}