import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useMembers } from "../../hooks/useMembers";
import RichText from "../ui/RichText";
import "swiper/css";

const COLORS = {
    gold:  "#CDA268",
    night: "#070F2B",
};

const ELLIPSE = "ellipse(50% 50% at 50% 50%)";

const OVERLAY_BG = `linear-gradient(to top,
    rgba(7,15,43,0.97) 0%,
    rgba(7,15,43,0.75) 45%,
    rgba(7,15,43,0.4) 100%)`;
const memberVariant = (index) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay: index * 0.08, ease: "easeOut" },
});

const MemberCard = memo(function MemberCard({ member, index }) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.article
            className="relative overflow-hidden cursor-pointer"
            {...memberVariant(index)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="relative overflow-hidden w-full aspect-square ">
                <img
                    src={member.photo}
                    alt={`Portrait de ${member.name}, ${member.role} des Têtes Nivoles`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full aspect-square object-cover object-top"
                    style={{ clipPath: "circle(50%)" }}
                />

                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            className="absolute inset-0"
                            style={{ background: OVERLAY_BG, clipPath: ELLIPSE }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        />
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            className="absolute bottom-4 left-4 right-4 p-4 text-justify overflow-y-auto max-h-[90%]"                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.35, delay: 0.05 }}
                        >
                            <p className="text-xs leading-relaxed" style={{
                                color: "rgba(255,255,255,0.9)",
                                textWrap: "pretty",
                                wordBreak: "normal",
                            }}>
                                {Array.isArray(member.bio)
                                    ? <RichText segments={member.bio} />
                                    : member.bio
                                }
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="pt-6 pb-2 flex flex-col gap-1">
                <span className="text-white text-md font-light tracking-widest uppercase">
                    {member.name}
                </span>
                <span className="text-xs tracking-widest uppercase" style={{ color: COLORS.gold }}>
                    {member.role}
                </span>
                <motion.div
                    className="mt-2 h-px"
                    style={{ backgroundColor: COLORS.gold }}
                    animate={{ width: hovered ? "70%" : "24px" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                />
            </div>
        </motion.article>
    );
});

const AuthorCard = memo(function AuthorCard({ member }) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.article
            className="w-full max-w-7xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center md:items-start">

                <div className="flex-shrink-0" style={{ width: "clamp(200px, 22vw, 320px)", height: "clamp(200px, 22vw, 320px)" }}>
                    <img
                        src={member.photo}
                        alt={`Portrait de ${member.name}, auteur du recueil De Boue et de Vent`}
                        loading="eager"
                        decoding="async"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "top",
                            clipPath: ELLIPSE,
                        }}
                    />
                </div>

                <div className="flex flex-col gap-6 flex-1 text-center md:text-left">

                    <span
                        className="text-xs tracking-[0.4em] uppercase"
                        style={{ color: COLORS.gold }}
                    >
                        {member.role}
                    </span>

                    <h3
                        className="text-white font-light tracking-widest uppercase"
                        style={{ fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1.1 }}
                    >
                        {member.name}
                    </h3>

                    <motion.div
                        className="h-px mx-auto md:mx-0"
                        style={{ backgroundColor: COLORS.gold }}
                        animate={{ width: hovered ? "120px" : "48px" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    />

                    <p
                        className="leading-relaxed text-justify"
                        style={{
                            color: "rgba(255,255,255,0.7)",
                            fontSize: "clamp(14px, 1.2vw, 16px)",
                            maxWidth: "560px",
                        }}
                    >
                        {Array.isArray(member.bio)
                            ? <RichText segments={member.bio} />
                            : member.bio
                        }
                    </p>
                </div>
            </div>
        </motion.article>
    );
});

export default function Members() {
    const { members, loading, error } = useMembers();
    if (loading || error) return null;

    const author = members.find(m => m.id === 2);
    const rest   = members.filter(m => m.id !== 2);

    return (
        <section
            id="members"
            aria-label="Les membres de la compagnie des Têtes Nivoles"
            style={{
                backgroundColor: COLORS.night,
                paddingTop: "clamp(40px, 12vw, 120px)",
                paddingBottom: "clamp(40px, 12vw, 120px)",
            }}
            className="flex flex-col items-center px-8 md:px-16"
        >
            <header className="w-full max-w-7xl flex flex-col gap-10 mb-0">
                <motion.p
                    className="text-lg uppercase tracking-[0.4em] font-medium"
                    style={{ color: COLORS.gold }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Les Têtes Nivoles
                </motion.p>
                <motion.div
                    className="w-12 h-px"
                    style={{ backgroundColor: COLORS.gold }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                />
            </header>

            {author && (
                <div className="w-full max-w-7xl mt-16">
                    <AuthorCard member={author} />
                </div>
            )}

            <div className="w-full md:hidden mt-16">
                <Swiper
                    modules={[Autoplay]}
                    slidesPerView={1.3}
                    spaceBetween={20}
                    centeredSlides
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    loop
                    className="w-full"
                >
                    {rest.map((member) => (
                        <SwiperSlide key={member.id}>
                            <MemberCard member={member} index={0} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="hidden md:flex flex-col gap-24 w-full max-w-7xl mt-16">
                <div className="hidden md:flex flex-wrap justify-center gap-12 w-full max-w-7xl mt-16">
                    {rest.map((member, i) => (
                        <div key={member.id} className="w-[22%] min-w-[220px] max-w-[260px]">
                            <MemberCard member={member} index={i} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}