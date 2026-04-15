import {useEffect} from "react";

export default function MentionsLegales() {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    return (
        <div className="min-h-screen bg-[#070F2B] px-6 sm:px-10 md:px-16 py-28">

            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <h1 className="text-white text-4xl font-light tracking-wide mb-12">
                    Mentions légales
                </h1>

                {/* Card */}
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 sm:p-10 shadow-[0_0_60px_rgba(0,0,0,0.4)] backdrop-blur-sm space-y-10">

                    {/* Éditeur */}
                    <section className="space-y-3">
                        <h2 className="text-[#CDA268] uppercase tracking-[0.2em] text-xs font-medium">
                            Éditeur
                        </h2>
                        <p className="text-white/70 leading-relaxed text-sm">
                            Prénom Nom<br />
                            Adresse postale<br />
                            Email : contact@monsite.com
                        </p>
                    </section>

                    {/* Hébergeur */}
                    <section className="space-y-3">
                        <h2 className="text-[#CDA268] uppercase tracking-[0.2em] text-xs font-medium">
                            Hébergeur
                        </h2>
                        <p className="text-white/70 leading-relaxed text-sm">
                            Vercel Inc.<br />
                            440 N Barranca Ave #4133, Covina, CA 91723, USA<br />
                            <a
                                href="https://vercel.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#CDA268]/70 hover:text-[#CDA268] transition-colors"
                            >
                                vercel.com
                            </a>
                        </p>
                    </section>

                    {/* Propriété intellectuelle */}
                    <section className="space-y-3">
                        <h2 className="text-[#CDA268] uppercase tracking-[0.2em] text-xs font-medium">
                            Propriété intellectuelle
                        </h2>
                        <p className="text-white/70 leading-relaxed text-sm">
                            L'ensemble du contenu de ce site (textes, images, design)
                            est la propriété exclusive de l'éditeur. Toute reproduction
                            est interdite sans autorisation préalable.
                        </p>
                    </section>

                </div>

                {/* Footer mini */}
                <p className="text-center text-white/20 text-xs mt-10">
                    Les Têtes Nivoles — Collectif artistique
                </p>

            </div>
        </div>
    );
}