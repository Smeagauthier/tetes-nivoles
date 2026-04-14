export default function ButtonGold({
                                       href = "#contact",
                                       label = "Nous contacter",
                                       onClick = null,
                                       className = "",
                                   }) {
    return (
        <a
            href={href}
            onClick={onClick}
            className={`
                inline-block pointer-events-auto
                px-8 py-3.5 rounded-full z-100
                text-sm tracking-[0.12em] uppercase font-semibold
                whitespace-nowrap
                transition-all duration-300 active:scale-95
                border border-[#CDA268]
                text-[#CDA268]
                hover:text-white
                hover:border-[#CDA268]
                ${className}
            `}
            style={{
                backgroundColor: "transparent",
                boxShadow: "0 0 10px rgba(205,162,104,0.15)",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#CDA268";
                e.currentTarget.style.boxShadow = "0 0 32px rgba(205,162,104,0.65)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.boxShadow = "0 0 10px rgba(205,162,104,0.15)";
            }}
        >
            {label}
        </a>
    );
}