import { motion } from "framer-motion";
import { aboutData } from "../../data/about";
import troupe from "../../assets/images/troupe.jpg";
import RichText from "../ui/RichText.jsx";

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut", delay },
    }),
};

const fadeLeft = {
    hidden: { opacity: 0, x: 32 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.9, ease: "easeOut" },
    },
};

const COLORS = {
    gold: "#CDA268",
    night: "#070F2B",
};

export default function About() {
    return (
        <section
            id="about"
            style={{
                backgroundColor: COLORS.night,
                paddingTop: "clamp(60px, 10vw, 140px)",
                paddingBottom: "clamp(60px, 10vw, 140px)",
            }}
            className="flex justify-center px-6 sm:px-10 md:px-16"
        >
            <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-14 lg:gap-24 items-center">

                {/* LEFT TEXT */}
                <div className="flex-1 flex flex-col gap-8 sm:gap-10">

                    {/* TITLE */}
                    <header className="w-full max-w-7xl flex flex-col gap-4 mb-10">

                        <motion.p
                            className="text-md uppercase tracking-[0.4em] font-medium"
                            style={{ color: COLORS.gold }}
                        >
                            La compagnie
                        </motion.p>

                        <motion.div
                            className="w-12 h-px"
                            style={{ backgroundColor: COLORS.gold }}
                            initial={{ opacity: 0, width: 0 }}
                            whileInView={{ opacity: 1, width: 48 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                    </header>

                    {/* INTRO (STATIC TEXT MAIS HIÉRARCHISÉ) */}
                    <p className="text-xl sm:text-2xl md:text-3xl font-light leading-relaxed text-gray-200 text-justify">
                        <RichText segments={aboutData.intro} />
                    </p>

                    {/* BODY */}
                    <p className="text-sm sm:text-base md:text-lg leading-loose text-justify text-white/50">
                        <RichText segments={aboutData.body} />
                    </p>

                    {/* BODY 2 */}
                    <p className="text-sm sm:text-base md:text-lg leading-loose text-justify text-white/50">
                        <RichText segments={aboutData.body2} />
                    </p>
                </div>

                {/* IMAGE (ONLY ANIMATED ELEMENT) */}
                <motion.div
                    className="flex-shrink-0 flex items-center justify-center w-full lg:w-auto"
                    variants={fadeLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">

                        <div
                            className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-full h-full"
                            style={{ border: `1px solid rgba(205,162,104,0.3)` }}
                        />

                        <img
                            src={troupe}
                            alt="La compagnie des Têtes Nivoles"
                            className="relative z-10 w-full object-contain block"
                        />

                        <p className="absolute bottom-2 right-2 z-20 text-[10px] sm:text-[12px] tracking-wide text-white/90">
                            © La Voix du Nord
                        </p>

                    </div>
                </motion.div>

            </div>
        </section>
    );
}