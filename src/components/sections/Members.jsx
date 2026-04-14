import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useMembers } from "../../hooks/useMembers";
import "swiper/css";

const COLORS = {
    gold:  "#CDA268",
    night: "#070F2B",
};

function MemberCard({ member, index }) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            className="member-card relative overflow-hidden group cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="relative overflow-hidden">
                <img
                    src={member.photo}
                    alt={member.name}
                    className="member-photo w-full h-80 object-cover object-top"
                    style={{ clipPath: "ellipse(50% 50% at 50% 50%)" }}
                />
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            className="absolute inset-0"
                            style={{
                                background: `linear-gradient(to top,
                                    ${COLORS.night}EE 0%,
                                    ${COLORS.night}99 40%,
                                    rgba(205,162,104,0.15) 100%)`,
                                clipPath: "ellipse(50% 50% at 50% 50%)"
                            }}
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
                            className="absolute bottom-7 left-0 right-0 p-5 text-justify"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.35, delay: 0.05 }}
                        >
                            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.9)" }}>
                                {member.bio}
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
        </motion.div>
    );
}

function AuthorCard({ member }) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            className="w-full max-w-7xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/*/!* Séparateur haut *!/*/}
            {/*<div style={{*/}
            {/*    width:        '100%',*/}
            {/*    height:       '1px',*/}
            {/*    background:   `linear-gradient(to right, ${COLORS.gold}, transparent)`,*/}
            {/*    marginBottom: 'clamp(40px, 6vw, 80px)',*/}
            {/*    opacity:      0.4,*/}
            {/*}} />*/}

            <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center md:items-start">

                {/* Photo */}
                <div className="flex-shrink-0" style={{
                    width:  'clamp(200px, 22vw, 320px)',
                    height: 'clamp(200px, 22vw, 320px)',
                }}>
                    <img
                        src={member.photo}
                        alt={member.name}
                        style={{
                            width:          '100%',
                            height:         '100%',
                            objectFit:      'cover',
                            objectPosition: 'top',
                            clipPath:       'ellipse(50% 50% at 50% 50%)',
                        }}
                    />
                </div>

                {/* Contenu */}
                <div className="flex flex-col gap-6 flex-1 text-center md:text-left">

                    {/* Rôle */}
                    <span
                        className="text-xs tracking-[0.4em] uppercase"
                        style={{ color: COLORS.gold }}
                    >
                        {member.role}
                    </span>

                    {/* Nom */}
                    <h3
                        className="text-white font-light tracking-widest uppercase"
                        style={{ fontSize: 'clamp(24px, 3vw, 40px)', lineHeight: 1.1 }}
                    >
                        {member.name}
                    </h3>

                    {/* Trait doré animé */}
                    <motion.div
                        className="h-px mx-auto md:mx-0"
                        style={{ backgroundColor: COLORS.gold }}
                        animate={{ width: hovered ? '120px' : '48px' }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    />

                    {/* Bio */}
                    <p
                        className="leading-relaxed text-justify"
                        style={{
                            color:    'rgba(255,255,255,0.7)',
                            fontSize: 'clamp(14px, 1.2vw, 16px)',
                            maxWidth: '560px',
                        }}
                    >
                        {member.bio}
                    </p>
                </div>
            </div>

            {/*/!* Séparateur bas *!/*/}
            {/*<div style={{*/}
            {/*    width:      '100%',*/}
            {/*    height:     '1px',*/}
            {/*    background: `linear-gradient(to right, ${COLORS.gold}, transparent)`,*/}
            {/*    marginTop:  'clamp(40px, 6vw, 80px)',*/}
            {/*    opacity:    0.4,*/}
            {/*}} />*/}
        </motion.div>
    );
}

export default function Members() {
    const { members, loading, error } = useMembers();
    if (loading) return null;
    if (error)   return null;

    const author = members.find(m => m.id === 2);
    const rest   = members.filter(m => m.id !== 2);

    return (
        <section
            id="members"
            style={{
                backgroundColor: COLORS.night,
                paddingTop:      "clamp(80px, 15vw, 200px)",
                paddingBottom:   "clamp(80px, 15vw, 200px)",
            }}
            className="flex flex-col items-center px-8 md:px-16"
        >
            {/* En-tête */}
            <div className="w-full max-w-7xl flex flex-col gap-10 mb-0">
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
            </div>

            {/* ── Carte auteur ── */}
            {author && (
                <div className="w-full max-w-7xl mt-16">
                    <AuthorCard member={author} />
                </div>
            )}

            {/* ── Mobile : Swiper ── */}
            <div className="w-full md:hidden mt-16">
                <Swiper
                    modules={[Autoplay]}
                    slidesPerView={1.3}
                    spaceBetween={20}
                    centeredSlides={true}
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    loop={true}
                    className="w-full"
                >
                    {rest.map((member) => (
                        <SwiperSlide key={member.id}>
                            <MemberCard member={member} index={0} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* ── Desktop : grille ── */}
            <div className="hidden md:flex flex-col gap-16 w-full max-w-7xl mt-16">
                <div className="grid grid-cols-4 gap-15">
                    {rest.slice(0, 4).map((member, i) => (
                        <MemberCard key={member.id} member={member} index={i} />
                    ))}
                </div>
                <div className="grid grid-cols-3 gap-6 w-3/4 mx-auto">
                    {rest.slice(4).map((member, i) => (
                        <MemberCard key={member.id} member={member} index={i + 4} />
                    ))}
                </div>
            </div>
        </section>
    );
}