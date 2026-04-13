import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

import ButtonGold from "../ui/ButtonGold";
import photo1 from "../../assets/images/photo1.jpg";
import photo2 from "../../assets/images/photo2.jpg";
import photo3 from "../../assets/images/photo3.jpg";
import photo4 from "../../assets/images/photo4.jpg";

// ─── Slides ───────────────────────────────────────────────────────────────────

const slides = [
    { src: photo2, alt: "Lumières de scène",  focus: "center center" },
    { src: photo3, alt: "Coulisses",          focus: "center 30%"    },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
    const imgRefs    = useRef([]);
    const barRef     = useRef(null);
    const swiperRef  = useRef(null);
    const contentRef = useRef(null);

    const [activeIndex, setActiveIndex] = useState(0);

    // ── Parallax au scroll ──────────────────────────────────────────────────────
    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;

            // Images : descendent doucement (effet profondeur)
            imgRefs.current.forEach((img) => {
                if (!img) return;
                img.style.transform = `translateY(${y * 0.35}px)`;
            });

            // Contenu texte : monte légèrement plus vite
            if (contentRef.current) {
                contentRef.current.style.transform = `translateY(${y * 0.15}px)`;
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // ── Ken Burns + barre progression ──────────────────────────────────────────
    const resetAnimations = (realIndex) => {
        setActiveIndex(realIndex);
        imgRefs.current.forEach((img, i) => {
            if (!img) return;
            img.classList.remove("kb-active");
            void img.offsetWidth;
            if (i === realIndex) img.classList.add("kb-active");
        });
        if (barRef.current) {
            barRef.current.classList.remove("progress-bar");
            void barRef.current.offsetWidth;
            barRef.current.classList.add("progress-bar");
        }
    };

    return (
        <section id="hero" className="relative w-full h-screen overflow-hidden">

            {/* ── Swiper ──────────────────────────────────────────────────────────── */}
            <Swiper
                ref={swiperRef}
                modules={[Autoplay, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                speed={3000}
                loop={true}
                onSwiper={(swiper) => resetAnimations(swiper.realIndex)}
                onSlideChange={(swiper) => resetAnimations(swiper.realIndex)}
                className="w-full h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        {/* ↓ height 130% pour que l'image déborde et que le parallax */}
                        {/* ne montre pas de bord blanc en bas au scroll               */}
                        <div className="relative w-full h-full">
                            <img
                                ref={(el) => (imgRefs.current[index] = el)}
                                src={slide.src}
                                alt={slide.alt}
                                loading={index === 0 ? "eager" : "lazy"}
                                fetchPriority={index === 0 ? "high" : "low"}
                                className={`
                            absolute inset-0 w-full object-cover
                            will-change-transform
                            ${index === 0 ? "kb-active" : ""}
                          `}
                                style={{
                                    height:         "130%",
                                    top:            "-15%",
                                    objectPosition: slide.focus,
                                }}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* ── Voile sombre ────────────────────────────────────────────────────── */}
            <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.50) 50%, rgba(0,0,0,0.5) 100%)" }}
            />

            {/* ── Contenu ─────────────────────────────────────────────────────────── */}
            <div
                ref={contentRef}
                className="absolute inset-0 z-[2] flex flex-col items-center justify-center px-6 text-center pointer-events-none"
                style={{ willChange: "transform" }}
            >
                {/* Bloc citation + source — même largeur */}
                <div className="flex flex-col items-center md:items-start">

                    <h1
                        className="calligraphy text-white leading-relaxed drop-shadow-2xl text-center md:text-left"
                        style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
                    >
                        « L'art est une maison habitée »
                    </h1>

                    <p
                        className="text-white/50 tracking-[0.1em] mt-1 w-full text-right"
                        style={{ fontSize: "clamp(0.65rem, 1.2vw, 0.78rem)", fontStyle: "italic" }}
                    >
                        — Mickaël Crépin,{" "}

                    <a    href="https://www.amazon.fr/boue-vent-Micka%C3%ABl-Cr%C3%A9pin/dp/2414635401"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 underline underline-offset-2 pointer-events-auto
                        hover:text-[#CDA268] transition-colors duration-200"
                        >
                        De Boue et de Vent
                    </a>
                </p>

                </div>

                {/* Séparateur doré */}
                <div className="mt-20 mb-3 flex items-center gap-3">
                    <span className="h-px w-10 opacity-50" style={{ backgroundColor: "#CDA268" }} />
                    <span className="w-1 h-1 rounded-full opacity-60" style={{ backgroundColor: "#CDA268" }} />
                    <span className="h-px w-10 opacity-50" style={{ backgroundColor: "#CDA268" }} />
                </div>

                {/* H2 — sous-titre pour le SEO */}
                <h2 className="text-white/70 text-sm md:text-base tracking-[0.18em] uppercase max-w-md leading-relaxed font-normal">
                    Troupe de comédiens pour des lectures musicales de textes contemporains
                </h2>

                {/* CTA */}
                <ButtonGold
                    href="#contact"
                    label="Nous contacter"
                    className="mt-10 pointer-events-auto"
                />
            </div>

            {/* ── Pagination ──────────────────────────────────────────────────────── */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex items-center gap-3">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        className={`relative overflow-hidden transition-all duration-500 h-px
              ${i === activeIndex ? "w-12" : "w-4"}`}
                        style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
                    >
                        {i === activeIndex && (
                            <div
                                ref={barRef}
                                className="progress-bar absolute top-0 left-0 h-full bg-white"
                            />
                        )}
                    </div>
                ))}
            </div>

        </section>
    );
}