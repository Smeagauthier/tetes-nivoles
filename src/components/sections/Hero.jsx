import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { useHeros } from "../../hooks/useHeros.js";
import defaultImg from "/images/default-event.png";
import "swiper/css";
import "swiper/css/effect-fade";

import ButtonGold from "../ui/ButtonGold";

export default function Hero() {
    const imgRefs = useRef([]);
    const barRef = useRef(null);
    const swiperRef = useRef(null);

    const { hero, loading, error } = useHeros();
    const [activeIndex, setActiveIndex] = useState(0);

    const heroData = hero?.[0];
    const images = heroData?.images ?? [];
    const canLoop = images.length > 1;

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

    if (loading) return <div className="h-screen bg-black" />;

    if (error)
        return (
            <div className="h-screen flex items-center justify-center text-white bg-black">
                Erreur: {error}
            </div>
        );

    if (!hero) return null;

    return (
        <section id="hero" className="relative w-full h-screen overflow-hidden">

            <Swiper
                loop={canLoop}
                ref={swiperRef}
                modules={[Autoplay, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                speed={3000}
                onSwiper={(swiper) => resetAnimations(swiper.realIndex)}
                onSlideChange={(swiper) => resetAnimations(swiper.realIndex)}
                className="w-full h-full"
            >
                {heroData?.images?.map((img, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            <img
                                ref={(el) => (imgRefs.current[index] = el)}
                                src={img.url || defaultImg}
                                alt={heroData.title || "hero image"}
                                loading={index === 0 ? "eager" : "lazy"}
                                fetchPriority={index === 0 ? "high" : "low"}
                                className={`
                                    absolute inset-0 w-full h-full object-cover object-center
                                    will-change-transform
                                    ${index === 0 ? "kb-active" : ""}
                                `}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    background:
                        "linear-gradient(to top, rgba(7,15,43,0.95) 0%, rgba(7,15,43,0.75) 45%, rgba(7,15,43,0.55) 100%)",
                }}
            />

            {/* TEXTE CENTER */}
            <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center px-6 text-center pointer-events-none">

                <div className="flex flex-col items-center md:items-start">

                    <h1
                        data-aos="fade"
                        data-aos-duration="1200"
                        data-aos-easing="ease-out-quad"
                        className="calligraphy text-white leading-tight drop-shadow-2xl text-center md:text-left pt-28 sm:pt-32 md:pt-40"
                        style={{
                            fontSize: "clamp(2.2rem, 6vw, 5rem)",
                        }}
                    >
                        « L'art est une maison habitée »
                    </h1>

                    {/* SUBTITLE - MÊME ANIMATION */}
                    <p
                        data-aos="fade"
                        data-aos-duration="1200"
                        data-aos-easing="ease-out-quad"
                        data-aos-delay="120"
                        className="text-white/50 tracking-[0.08em] sm:tracking-[0.1em] mt-2 w-full text-center md:text-right"
                        style={{
                            fontSize: "clamp(0.6rem, 1.2vw, 0.78rem)",
                            fontStyle: "italic",
                        }}
                    >
                        {heroData.subtitle}
                    </p>

                </div>

                {/* SEPARATOR (NO ANIMATION) */}
                <div className="mt-10 mb-3 flex items-center gap-3">
                    <span className="h-px w-10 opacity-50" style={{ backgroundColor: "#CDA268" }} />
                    <span className="w-1 h-1 rounded-full opacity-60" style={{ backgroundColor: "#CDA268" }} />
                    <span className="h-px w-10 opacity-50" style={{ backgroundColor: "#CDA268" }} />
                </div>

                {/* H2 (NO ANIMATION) */}
                <h2 className="text-white/70 text-center text-xs sm:text-sm md:text-base tracking-[0.14em] sm:tracking-[0.18em] uppercase max-w-lg leading-relaxed font-normal my-4 px-2">
                    Troupe de comédiens pour des lectures musicales de textes contemporains
                </h2>

                {/* BUTTON (NO ANIMATION) */}
                <div>
                    <ButtonGold
                        href="#contact"
                        label="Nous contacter"
                        className="mt-5 pointer-events-auto"
                    />
                </div>

            </div>

            {/* PROGRESS INDICATORS */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex items-center gap-3">

                {heroData?.images?.map((_, i) => (
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