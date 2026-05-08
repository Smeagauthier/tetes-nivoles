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
                            Association Les Têtes Nivoles <br />
                            Email : lestetesnivoles@gmailcom
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-[#CDA268] uppercase tracking-[0.2em] text-xs font-medium">
                            Hébergeur
                        </h2>
                        <p className="text-white/70 leading-relaxed text-sm">
                            O2Switch<br />
                            Chem. des Pardiaux, 63000 Clermont-Ferrand, France<br />
                            <a
                                href="https://www.o2switch.fr/?gad_source=1&gad_campaignid=23767720734&gbraid=0AAAAAD21va7Y-cppX0x1a6tQzmLaQryuQ&gclid=Cj0KCQjw8PDPBhCeARIsAOJwmWXAHwSTrZk7MQ5d6bpCzy2YQmrBIOeiwx77OYfNA-Vi3N9N9sYUyf4aAuqQEALw_wcB"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#CDA268]/70 hover:text-[#CDA268] transition-colors"
                            >
                                o2switch.fr
                            </a>
                        </p>
                    </section>

                    {/* Propriété intellectuelle */}
                    <section className="space-y-3">
                        <h2 className="text-[#CDA268] uppercase tracking-[0.2em] text-xs font-medium">
                            Propriété intellectuelle
                        </h2>
                        <p className="text-white/70 leading-relaxed text-sm">
                            L'ensemble du contenu de ce site (textes, design, logo) et la majorité des images
                            sont la propriété exclusive de l'association Les Têtes Nivoles. Toute reproduction
                            est interdite sans autorisation préalable.
                        </p>
                    </section>
                    <section className="space-y-3">
                        <h2 className="text-[#CDA268] uppercase tracking-[0.2em] text-xs font-medium">
                            Formulaire de contact
                        </h2>
                        <p className="text-white/70 leading-relaxed text-sm">
                            Les informations collectées via le formulaire de contact
                            sont utilisées uniquement pour répondre à vos demandes.
                            Vous pouvez exercer vos droits en contactant : lestetesnivoles@gmail.com
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