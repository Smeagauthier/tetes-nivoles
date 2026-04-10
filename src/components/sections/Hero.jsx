import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
    {
        src: "https://images.unsplash.com/photo-1503095396549-807759245b35",
        alt: "Scène de théâtre",
        kb: "kb-1",
    },
    {
        src: "https://images.unsplash.com/photo-1507924538820-ede94a04019d",
        alt: "Lumières de scène",
        kb: "kb-2",
    },
    {
        src: "https://images.unsplash.com/photo-1518972559570-7cc1309f3229",
        alt: "Coulisses",
        kb: "kb-3",
    },
    {
        src: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6",
        alt: "Représentation",
        kb: "kb-4",
    },
];

export default function Hero() {
    const imgRefs = useRef([]);
    const barRef  = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const resetAnimations = (realIndex) => {
        setActiveIndex(realIndex);

        // Relance Ken Burns sur l'image active uniquement
        imgRefs.current.forEach((img, i) => {
            if (!img) return;
            const kb = slides[i].kb;
            img.classList.remove(kb);
            void img.offsetWidth;
            if (i === realIndex) img.classList.add(kb);
        });

        // Relance la barre de progression
        if (barRef.current) {
            barRef.current.classList.remove("progress-bar");
            void barRef.current.offsetWidth;
            barRef.current.classList.add("progress-bar");
        }
    };

    return (
        <section id="hero" className="relative w-full h-screen overflow-hidden">

            {/* Swiper */}
            <Swiper
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
                        <div className="relative w-full h-screen">
                            <img
                                ref={(el) => (imgRefs.current[index] = el)}
                                src={slide.src}
                                alt={slide.alt}
                                className={`w-full h-full object-cover ${
                                    index === 0 ? slide.kb : ""
                                }`}
                            />
                            {/* Dégradé plus profond en bas pour la lisibilité */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Citation calligraphique — toujours présente, jamais remontée par React */}
            <div className="absolute inset-0 flex items-end justify-center z-10 pb-24 px-6 pointer-events-none">
                <p className="calligraphy text-white text-4xl md:text-6xl text-center leading-relaxed drop-shadow-2xl">
                    l'art est une maison habitée
                </p>
            </div>

            {/* Pagination : tirets avec barre de progression */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        className={`relative overflow-hidden transition-all duration-500 h-px ${
                            i === activeIndex ? "w-12 bg-white/30" : "w-4 bg-white/30"
                        }`}
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