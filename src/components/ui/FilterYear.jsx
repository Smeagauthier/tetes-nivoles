export default function FilterYear({
                                       years = [],
                                       selectedYear,
                                       onSelectYear,
                                   }) {
    if (!years.length) return null;

    return (
        <div className="flex items-center gap-2 flex-wrap">
            {/* TOUS */}
            <button
                onClick={() => onSelectYear(null)}
                className={`text-xs uppercase tracking-[0.15em] px-3 py-1.5 rounded-sm border transition-colors cursor-pointer ${
                    selectedYear === null
                        ? "border-[#CDA268] bg-[#CDA268]/15 text-[#CDA268]"
                        : "border-white/20 text-white/50 hover:border-white/40"
                }`}
            >
                Tout
            </button>

            {/* YEARS */}
            {years.map((year) => (
                <button
                    key={year}
                    onClick={() => onSelectYear(year)}
                    className={`text-xs uppercase tracking-[0.15em] px-3 py-1.5 rounded-sm border transition-colors cursor-pointer ${
                        selectedYear === year
                            ? "border-[#CDA268] bg-[#CDA268]/15 text-[#CDA268]"
                            : "border-white/20 text-white/50 hover:border-white/40"
                    }`}
                >
                    {year}
                </button>
            ))}
        </div>
    );
}