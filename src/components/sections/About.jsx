import { motion } from "framer-motion";
import { aboutData } from "../../data/about";
import troupe from "../../assets/images/troupe.jpg";

const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut", delay },
    }),
};

const fadeLeft = {
    hidden: { opacity: 0, x: 40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.9, ease: "easeOut" },
    },
};

const COLORS = {
    gold:  "#CDA268",
    night: "#070F2B",
};

export default function About() {
    return (
        <section
            id="about"
            style={{
                backgroundColor: COLORS.night,
                paddingTop: "clamp(50px, 12vw, 150px)",
                paddingBottom: "clamp(50px, 12vw, 150px)"
            }}
            className="flex justify-center px-8 md:px-16"
        >
            <div className="w-full max-w-7xl flex flex-col md:flex-row gap-28 items-center">

                {/* ── Colonne gauche : texte ── */}
                <div className="flex-1 flex flex-col gap-12">

                    {/* Surtitre */}
                    <motion.p
                        style={{ color: COLORS.gold }}
                        className="text-md uppercase tracking-[0.4em] font-medium"
                        variants={fadeUp}
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        La compagnie
                    </motion.p>

                    {/* Trait doré */}
                    <motion.div
                        className="w-12 h-px"
                        style={{ backgroundColor: COLORS.gold }}
                        variants={fadeUp}
                        custom={0.05}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    />

                    {/* Intro */}
                    <motion.p
                        className="text-2xl md:text-3xl font-light leading-relaxed text-white text-justify"
                        variants={fadeUp}
                        custom={0.1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {aboutData.intro}
                    </motion.p>

                    {/* Corps */}
                    <motion.p
                        className="text-lg leading-loose text-justify"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                        variants={fadeUp}
                        custom={0.2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {aboutData.body}
                    </motion.p>

                </div>

                {/* ── Colonne droite : image grande ── */}
                <motion.div
                    className="flex-shrink-0 flex items-center justify-center"
                    variants={fadeLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <div className="relative">
                        <div
                            className="absolute -bottom-4 -right-4 w-full h-full"
                            style={{ border: `1px solid rgba(205,162,104,0.3)` }}
                        />
                        <img
                            src={troupe}
                            alt="La compagnie des Têtes Nivoles"
                            className="relative z-10 w-full max-w-lg object-contain block"
                        />
                        {/* Copyright */}
                        <p
                            className="absolute bottom-2 right-2 z-20 text-[12px] tracking-wide"
                            style={{ color: "rgba(255,255,255,0.9)" }}
                        >
                            © La Voix du Nord
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}