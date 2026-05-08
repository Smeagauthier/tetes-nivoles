import { useState, memo, useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useMembers } from "../../hooks/useMembers";
import RichText from "../ui/RichText";
import "swiper/css";

import spfLogo from "../../assets/images/spf.png";

const COLORS = {
    gold: "#CDA268",
    night: "#070F2B",
};

const ELLIPSE = "ellipse(50% 50% at 50% 50%)";

/* ===================== AUTHOR ===================== */

const AuthorCard = memo(function AuthorCard({ member }) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.article
            className="w-full max-w-7xl mb-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-center md:items-start">

                <div
                    className="flex-shrink-0"
                    style={{
                        width: "clamp(200px, 22vw, 320px)",
                        height: "clamp(200px, 22vw, 320px)",
                    }}
                >
                    <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover object-top"
                        style={{ clipPath: ELLIPSE }}
                    />
                </div>

                <div className="flex flex-col gap-5 flex-1 text-center md:text-left">

                    <div className="flex flex-col gap-5 flex-1 text-center md:text-left">

                        <div className="flex flex-col items-center md:items-start gap-3 pt-5">
        <span
            className="text-xs sm:text-sm tracking-[0.4em] uppercase"
            style={{ color: COLORS.gold }}
        >
            {member.role}
        </span>
                        </div>

                        <h3
                            className="text-white font-light tracking-widest uppercase"
                            style={{ fontSize: "clamp(22px, 3vw, 40px)" }}
                        >
                            {member.name}
                        </h3>

                        <div
                            className="h-px mx-auto md:mx-0 transition-all duration-300"
                            style={{
                                backgroundColor: COLORS.gold,
                                width: hovered ? "120px" : "48px",
                            }}
                        />

                        <p
                            className="leading-relaxed text-justify"
                            style={{
                                color: "rgba(255,255,255,0.7)",
                                fontSize: "clamp(16px, 1.3vw, 18px)",
                                maxWidth: "560px",
                            }}
                        >
                            {Array.isArray(member.bio)
                                ? <RichText segments={member.bio} />
                                : member.bio}
                        </p>

                        <a href="https://www.societedespoetesfrancais.fr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 group w-fit mt-2 mx-auto md:mx-0"
                        title="Membre de la Société des Poètes Français"
                        >
                            <img
                                src={spfLogo}
                                alt="Société des Poètes Français"
                                className="h-13 sm:h-17 object-contain opacity-50 group-hover:opacity-100 transition-all duration-300"
                            />
                            <span
                                className="text-[10px] tracking-[0.15em] uppercase text-white/35 group-hover:text-white/80 transition-colors duration-300"
                            >
                                Membre de la société des Poètes Français
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </motion.article>
    );
});

/* ===================== CARD ===================== */

const MemberCard = memo(function MemberCard({
                                                member,
                                                index = 0,
                                                onHoverChange
                                            }) {
    const [hovered, setHovered] = useState(false);

    const setHoverState = (state) => {
        setHovered(state);
        onHoverChange?.(state);
    };

    return (
        <motion.article
            className="relative cursor-pointer w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            onMouseEnter={() => setHoverState(true)}
            onMouseLeave={() => setHoverState(false)}
            onClick={() => setHoverState(!hovered)}
        >

            {/* IMAGE */}
            <div
                className="relative w-full aspect-square overflow-hidden mx-auto scale-[0.82] sm:scale-90 md:scale-100"
                style={{ clipPath: "circle(50%)" }}
            >
                <img
                    src={member.photo}
                    className="w-full h-full object-cover object-top transition-transform duration-500"
                    style={{
                        transform: hovered ? "scale(1.05)" : "scale(1)",
                    }}
                />

                <div
                    className="absolute inset-0 transition-all duration-300"
                    style={{
                        background: hovered
                            ? "rgba(7,15,43,0.05)"
                            : "rgba(7,15,43,0.65)",
                    }}
                />
            </div>

            {/* TEXT */}
            <div className="relative z-20 -mt-6 text-center flex flex-col items-center gap-3 sm:gap-3">

                <span className="text-white text-sm uppercase tracking-widest mt-2">
                    {member.name}
                </span>

                <span
                    className="text-xs uppercase tracking-widest"
                    style={{ color: COLORS.gold }}
                >
                    {member.role}
                </span>

                <div
                    className="h-px mt-1 transition-all duration-300"
                    style={{
                        backgroundColor: COLORS.gold,
                        width: hovered ? "65%" : "24px",
                    }}
                />

                {/* BIO */}
                <div
                    className="mt-3 max-w-[240px]"
                    style={{
                        opacity: hovered ? 1 : 0,
                        transform: hovered ? "translateY(0)" : "translateY(8px)",
                        transition: "all 0.3s ease",
                    }}
                >
                    <p className="text-[12px] sm:text-sm text-white/85 leading-relaxed">
                        {Array.isArray(member.bio)
                            ? <RichText segments={member.bio} />
                            : member.bio}
                    </p>
                </div>
            </div>
        </motion.article>
    );
});

/* ===================== MAIN ===================== */

export default function Members() {
    const { members, loading, error } = useMembers();
    const swiperRef = useRef(null);
    const [isAnyCardOpen, setIsAnyCardOpen] = useState(false);

    if (loading || error) return null;

    const author = Array.isArray(members) ? members.find(m => m.id === 2) : null;
    const rest = Array.isArray(members) ? members.filter(m => m.id !== 2) : [];

    const handleCardOpen = (isOpen) => {
        setIsAnyCardOpen(isOpen);

        const swiper = swiperRef.current;
        if (!swiper) return;

        if (isOpen) {
            swiper.autoplay?.stop();
            swiper.allowTouchMove = false;
        } else {
            swiper.autoplay?.start();
            swiper.allowTouchMove = true;
        }
    };

    return (
        <section
            id="members"
            className="flex flex-col items-center px-6 md:px-16 -mb-px"
            style={{
                backgroundColor: COLORS.night,
                paddingTop: "clamp(60px, 10vw, 140px)",
                paddingBottom: "clamp(60px, 10vw, 140px)",
            }}
        >

            {/* HEADER */}
            <header className="w-full max-w-7xl flex flex-col gap-4 mb-10">

                <motion.p
                    className="text-md uppercase tracking-[0.4em] font-medium"
                    style={{ color: COLORS.gold }}
                >
                    Les Têtes Nivoles
                </motion.p>

                {/* underline restauré */}
                <motion.div
                    className="w-12 h-px"
                    style={{ backgroundColor: COLORS.gold }}
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{ opacity: 1, width: 48 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />
            </header>

            {/* AUTHOR */}
            {author && (
                <div className="w-full max-w-7xl mt-14">
                    <AuthorCard member={author} />
                </div>
            )}

            {/* SWIPER */}
            <div className="relative w-full md:hidden mt-14">

                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-white/70 text-3xl"
                >
                    ‹
                </button>

                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-white/70 text-3xl"
                >
                    ›
                </button>

                <Swiper
                    onSwiper={(s) => (swiperRef.current = s)}
                    modules={[Autoplay]}
                    slidesPerView={1.05}
                    spaceBetween={12}
                    centeredSlides
                    speed={1500}
                    autoplay={{ delay: 6000 }}
                    loop
                >
                    {rest.map((member, i) => (
                        <SwiperSlide key={member.id}>
                            <MemberCard
                                member={member}
                                index={i}
                                onHoverChange={handleCardOpen}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* DESKTOP */}
            <div className="hidden md:flex flex-wrap justify-center gap-10 w-full max-w-7xl mt-16">
                {rest.map((member, i) => (
                    <div key={member.id} className="w-[22%] min-w-[200px] max-w-[260px]">
                        <MemberCard member={member} index={i} />
                    </div>
                ))}
            </div>

        </section>
    );
}