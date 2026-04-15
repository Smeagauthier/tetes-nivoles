import { useNavigate, useLocation } from "react-router-dom";

export default function ButtonGold({
                                       href = "#contact",
                                       label = "Nous contacter",
                                       onClick = null,
                                       className = "",
                                   }) {
    const navigate = useNavigate();
    const location = useLocation();

    const isHome = location.pathname === "/";

    const handleClick = (e) => {
        if (onClick) onClick(e);
        if (e.defaultPrevented) return;

        e.preventDefault();

        const id = href.replace("#", "");

        if (!isHome) {
            navigate("/");

            setTimeout(() => {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 100);
        } else {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <a
            href={href}
            onClick={handleClick}
            className={`
                inline-block pointer-events-auto
                px-8 py-3.5 z-50
                text-sm tracking-[0.12em] uppercase font-semibold
                whitespace-nowrap
                transition-all duration-300 active:scale-95
                border border-[#CDA268]
                text-[#CDA268]
                hover:text-white
                ${className}
            `}
            style={{
                backgroundColor: "transparent",
                boxShadow: "0 0 10px rgba(205,162,104,0.15)",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#CDA268";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.boxShadow =
                    "0 0 32px rgba(205,162,104,0.65)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#CDA268";
                e.currentTarget.style.boxShadow =
                    "0 0 10px rgba(205,162,104,0.15)";
            }}
        >
            {label}
        </a>
    );
}