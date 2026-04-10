import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const images = [
    "https://images.unsplash.com/photo-1503095396549-807759245b35",
    "https://images.unsplash.com/photo-1507924538820-ede94a04019d",
    "https://images.unsplash.com/photo-1518972559570-7cc1309f3229",
    "https://images.unsplash.com/photo-1465847899084-d164df4dedc6",
];

export default function Hero() {
    return (
        <section className="relative w-full h-screen overflow-hidden">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                speed={1500}
                loop={true}
                pagination={{ clickable: true }}
                className="w-full h-full"
            >
                {images.map((src, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-screen">
                            <img
                                src={src}
                                alt={`slide-${index}`}
                                className="w-full h-full object-cover scale-110 animate-zoom"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
                <h1 className="text-white text-3xl md:text-5xl font-semibold text-center tracking-wide max-w-3xl animate-fadeInUp">
                    l'art est une maison habitée
                </h1>
            </div>
        </section>
    );
}