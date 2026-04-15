import logo from "../../assets/images/logo-tn.png";
import SocialLink from "../ui/SocialLinks.jsx";
import { SOCIAL_LINKS } from "../../constants/navigation";
import { Link } from "react-router-dom";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-[#040a1a] border-t border-[#CDA268]/10">

            <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 pt-10 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-8">

                <a
                    href="/"
                    className="flex flex-col items-center md:items-start gap-2 text-center md:text-left"
                >
                    <img
                        src={logo}
                        alt="Les Têtes Nivoles"
                        className="h-14 sm:h-16 w-auto object-contain"
                    />
                </a>

                <nav
                    aria-label="Mentions légales"
                    className="flex flex-col md:flex-row items-center gap-3 md:gap-6"
                >
                    <Link
                        to="/mentions-legales"
                        className="text-white/40 text-xs tracking-wider hover:text-[#CDA268] transition-colors duration-300 underline"
                    >
                        Mentions légales
                    </Link>

                    <span className="hidden md:block w-px h-4 bg-white/10" />
                </nav>
            </div>

            <div className="max-w-3xl mx-auto px-6 text-center pb-8">
                <p className="text-white/40 text-xs sm:text-sm italic leading-relaxed">
                    Collectif artistique français dédié à la poésie contemporaine, aux performances scéniques et à la création littéraire.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 pb-15 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-6">

                <p className="text-white/25 text-xs tracking-wider text-center sm:text-left">
                    © {year} Les Têtes Nivoles — Tous droits réservés
                </p>

                <div className="flex gap-4 sm:gap-3">
                    {SOCIAL_LINKS.map((link) => (
                        <SocialLink key={link.name} link={link} />
                    ))}
                </div>
            </div>
        </footer>
    );
}