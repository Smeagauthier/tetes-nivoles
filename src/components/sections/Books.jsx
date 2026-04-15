import { motion } from "framer-motion";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useBooks } from "../../hooks/useBooks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const COLORS = {
    gold: "#CDA268",
    night: "#070F2B",
};

/* ===================== BOOK CARD ===================== */

function BookCard({ book, index }) {
    const [open, setOpen] = useState(false);
    const [ctaOpen, setCtaOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const slides = [
        book.cover_image,
        book.back_cover_image,
    ]
        .filter(Boolean)
        .map((src) => ({ src }));

    return (
        <>
            <motion.div
                className="flex flex-col md:flex-row gap-12 md:gap-20 items-center w-full"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
            >
                {/* COVER (RECTANGLE LIVRE) */}
                <div className="flex-shrink-0 relative group">

                    <img
                        src={book.cover_image}
                        alt={book.title}
                        onClick={() => setOpen(true)}
                        className="shadow-2xl object-cover cursor-pointer transition duration-300 group-hover:scale-[1.02]"
                        style={{
                            width: "clamp(260px, 28vw, 420px)",
                            aspectRatio: "3 / 4",
                        }}
                    />

                    {book.back_cover_image && (
                        <img
                            src={book.back_cover_image}
                            alt="4e de couverture"
                            onClick={() => setOpen(true)}
                            className="absolute bottom-3 right-3 w-16 h-16 object-cover border shadow-lg opacity-90"
                            style={{
                                borderColor: "#CDA268",
                                backgroundColor: "#070F2B",
                            }}
                        />
                    )}
                </div>

                {/* TEXT CONTENT */}
                <div className="flex flex-col gap-5 flex-1 text-center md:text-left">

                    <div className="flex flex-col gap-1">
                        <span
                            className="text-xs tracking-[0.4em] uppercase"
                            style={{ color: COLORS.night }}
                        >
                            {book.author}
                        </span>

                        {book.published_year && (
                            <span
                                className="text-xs tracking-[0.3em] opacity-60"
                                style={{ color: COLORS.night }}
                            >
                                {book.published_year}
                            </span>
                        )}
                    </div>

                    {/* TITLE */}
                    <h2
                        className="text-white font-light tracking-widest uppercase"
                        style={{
                            fontSize: "clamp(26px, 3vw, 42px)",
                            lineHeight: 1.1,
                        }}
                    >
                        {book.title}
                    </h2>

                    {/* ANIMATED UNDERLINE (comme tes autres sections) */}
                    <motion.div
                        className="h-px"
                        style={{ backgroundColor: COLORS.night }}
                        initial={{ opacity: 0, width: 0 }}
                        whileInView={{ opacity: 1, width: 120 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    />

                    {/* QUOTE */}
                    <p
                        className="italic"
                        style={{
                            color: "rgba(255,255,255,0.6)",
                            maxWidth: "560px",
                        }}
                    >
                        {book.quote}
                    </p>

                    {/* DESCRIPTION + READ MORE */}
                    <div className="relative max-w-[600px]">

                        <motion.div
                            initial={false}
                            animate={{
                                height: expanded ? "auto" : "6.5em",
                            }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <motion.p
                                initial={false}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="leading-relaxed text-justify"
                                style={{
                                    color: "rgba(255,255,255,0.75)",
                                }}
                            >
                                {book.description}
                            </motion.p>
                        </motion.div>

                        {/* fade gradient quand c'est fermé */}
                        {!expanded && (
                            <div className="absolute bottom-8 left-0 right-0 h-12 bg-gradient-to-t from-[#A26721] to-transparent pointer-events-none" />
                        )}

                        <button
                            type="button"
                            onClick={() => setExpanded(!expanded)}
                            className="
            mt-3 text-xs uppercase tracking-[0.3em]
            text-white/70 hover:text-white transition
            underline decoration-white/40 hover:decoration-white
        "
                        >
                            {expanded ? "Réduire" : "En savoir plus"}
                        </button>

                    </div>

                    {/* CTA LINKS */}
                    {(book.amazon_url || book.fnac_url || book.edilivre_url) && (
                        <div className="relative mt-2 inline-block">

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCtaOpen(!ctaOpen);
                                }}
                                className="flex items-center gap-2 px-6 py-2 text-xs uppercase tracking-[0.35em] border transition-all duration-300 group relative overflow-hidden"
                                style={{
                                    borderColor: COLORS.night,
                                    color: COLORS.night,
                                }}
                            >
                                <span className="absolute inset-0 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                                      style={{ backgroundColor: COLORS.night }}
                                />

                                <span className="relative group-hover:text-[#CDA268]">
                                    Découvrir l'ouvrage
                                </span>

                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    className={`transition-transform duration-300 ${ctaOpen ? "rotate-180" : ""}`}
                                    style={{ fontSize: "10px" }}
                                />
                            </button>

                            {ctaOpen && (
                                <div
                                    className="absolute mt-3 flex flex-col min-w-[200px] shadow-lg overflow-hidden"
                                    style={{
                                        border: "2px solid rgba(0,0,0,0.15)",
                                        backgroundColor: COLORS.gold,
                                    }}
                                >
                                    {book.amazon_url && (
                                        <a className="px-4 py-3 text-xs uppercase tracking-widest hover:bg-[#070F2B] hover:text-[#CDA268] transition"
                                           href={book.amazon_url}
                                           target="_blank"
                                        >
                                            Amazon
                                        </a>
                                    )}

                                    {book.fnac_url && (
                                        <a className="px-4 py-3 text-xs uppercase tracking-widest hover:bg-[#070F2B] hover:text-[#CDA268] transition"
                                           href={book.fnac_url}
                                           target="_blank"
                                        >
                                            Fnac
                                        </a>
                                    )}

                                    {book.edilivre_url && (
                                        <a className="px-4 py-3 text-xs uppercase tracking-widest hover:bg-[#070F2B] hover:text-[#CDA268] transition"
                                           href={book.edilivre_url}
                                           target="_blank"
                                        >
                                            Edilivre
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </motion.div>

            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={slides}
                controller={{ closeOnBackdropClick: true }}
            />
        </>
    );
}

/* ===================== SECTION ===================== */

export default function Books() {
    const { books, loading, error } = useBooks();

    if (loading || error) return null;

    return (
        <section
            id="books"
            className="flex flex-col items-center px-8 md:px-16 bg-[#A26721]"
            style={{
                paddingTop: "clamp(40px, 12vw, 120px)",
                paddingBottom: "clamp(40px, 12vw, 120px)",
            }}
        >

            {/* HEADER ANIMÉ IDENTIQUE À TES AUTRES SECTIONS */}
            <header className="w-full max-w-7xl flex flex-col gap-4 mb-10">

                <motion.p
                    className="text-md uppercase tracking-[0.4em] font-medium"
                    style={{ color: COLORS.night }}
                >
                    Le recueil
                </motion.p>

                <motion.div
                    className="w-12 h-px"
                    style={{ backgroundColor: COLORS.night }}
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{ opacity: 1, width: 48 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />
            </header>

            <div className="w-full max-w-7xl mt-16 flex flex-col gap-32">
                {books.map((book, index) => (
                    <BookCard key={book.id} book={book} index={index} />
                ))}
            </div>
        </section>
    );
}