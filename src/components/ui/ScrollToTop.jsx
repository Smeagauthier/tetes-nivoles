import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function ScrollTopButton() {
    const [visible, setVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const onScroll = () => {
            setVisible(window.scrollY > 400);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label="Retour en haut"
            className={`
                fixed z-50
                cursor-pointer

                bottom-[calc(3rem+env(safe-area-inset-bottom))]

                right-4
                sm:bottom-8 sm:right-6

                w-11 h-11 sm:w-12 sm:h-12
                rounded-full

                flex items-center justify-center

                border border-[#CDA268]/80
                bg-[#070F2B]/60 backdrop-blur-md
                text-[#CDA268]

                shadow-[0_0_20px_rgba(205,162,104,0.15)]

                transition-all duration-500 ease-out

                hover:bg-[#CDA268]
                hover:text-white
                hover:shadow-[0_0_30px_rgba(205,162,104,0.5)]
                hover:scale-105

                ${mounted && visible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6 pointer-events-none"
            }
            `}
        >
            <FontAwesomeIcon icon={faArrowUp} className="text-sm" />
        </button>
    );
}