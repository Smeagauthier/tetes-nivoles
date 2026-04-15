import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function ScrollTopButton() {
    const [visible, setVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const onScroll = () => {
            const show = window.scrollY > 400;
            setVisible(show);
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
                fixed bottom-6 right-6 z-50
                w-12 h-12 rounded-full
                cursor-pointer
                flex items-center justify-center
                border border-[#CDA268]/80
                bg-[#070F2B]/60 backdrop-blur-md
                text-[#CDA268]
                shadow-[0_0_20px_rgba(205,162,104,0.15)]
                transition-all duration-500 ease-out
                hover:bg-[#CDA268] hover:text-white
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