export default function ButtonGold({
                                       href      = "#contact",
                                       label     = "Nous contacter",
                                       onClick   = null,
                                       className = "",
                                   }) {
    return (

    < a href={href}
    onClick={onClick}
    className={`
        inline-block pointer-events-auto
        px-8 py-3.5 rounded-full z-100
        text-sm tracking-[0.12em] uppercase font-semibold
        text-white transition-all duration-300 active:scale-95
        whitespace-nowrap
        ${className}
      `}
    style={{
        backgroundColor: "#CDA268",
            boxShadow: "0 0 24px rgba(205,162,104,0.4)",
    }}
    onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#b8894f";
        e.currentTarget.style.boxShadow = "0 0 32px rgba(205,162,104,0.65)";
    }}
    onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#CDA268";
        e.currentTarget.style.boxShadow = "0 0 24px rgba(205,162,104,0.4)";
    }}
>
    {label}
</a>
);
}