import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useBooks } from "../../hooks/useBooks";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const COLORS = {
    gold: "#CDA268",
    night: "#070F2B",
};

/* ───────────────────── BOOK CARD ───────────────────── */

function BookCard({ book, index }) {
    const [open, setOpen] = useState(false);
    const [ctaOpen, setCtaOpen] = useState(false);

    const slides = [
        book.cover_image,
        book.back_cover_image,
    ]
        .filter(Boolean)
        .map((src) => ({ src }));

    // fermer dropdown si clic ailleurs
    useEffect(() => {
        const handleClick = () => setCtaOpen(false);
        if (ctaOpen) document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [ctaOpen]);

    return (
        <>
            <motion.div
                className="flex flex-col md:flex-row gap-12 md:gap-20 items-center w-full"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
            >
                {/* COVER */}
                <div className="flex-shrink-0 relative group">

                    {/* COVER PRINCIPALE */}
                    <img
                        src={book.cover_image}
                        alt={book.title}
                        onClick={() => setOpen(true)}
                        className="shadow-2xl object-cover cursor-pointer transition duration-300 group-hover:scale-102"
                        style={{
                            width: "clamp(200px, 22vw, 320px)",
                            aspectRatio: "1 / 1",
                        }}
                    />

                    {/* 4E DE COUVERTURE (SYNC HOVER) */}
                    {book.back_cover_image && (
                        <img
                            src={book.back_cover_image}
                            alt="4e de couverture"
                            onClick={() => setOpen(true)}
                            className="absolute bottom-3 right-3 w-16 h-16 object-cover border shadow-lg transition-all duration-300
                       group-hover:scale-102 opacity-90"
                            style={{
                                borderColor: "#CDA268",
                                backgroundColor: "#070F2B",
                            }}
                        />
                    )}
                </div>

                {/* TEXT */}
                <div className="flex flex-col gap-5 flex-1 text-center md:text-left">

                    {/* AUTHOR + YEAR */}
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

                    {/* LINE */}
                    <motion.div
                        className="h-px"
                        style={{ backgroundColor: COLORS.night }}
                        initial={{ width: "40px" }}
                        whileInView={{ width: "120px" }}
                    />

                    {/* QUOTE */}
                    <p
                        className="italic"
                        style={{
                            color: "rgba(255,255,255,0.6)",
                            maxWidth: "560px",
                        }}
                    >
                        “{book.quote}”
                    </p>

                    {/* DESCRIPTION */}
                    <p
                        className="leading-relaxed text-justify"
                        style={{
                            color: "rgba(255,255,255,0.75)",
                            maxWidth: "600px",
                        }}
                    >
                        {book.description}
                    </p>

                    {/* ───────── CTA PREMIUM ───────── */}
                    {(book.amazon_url || book.fnac_url || book.edilivre_url) && (
                        <div className="relative mt-2 inline-block">

                            {/* BUTTON */}
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
                                {/* hover background animé */}
                                <span
                                    className="absolute inset-0 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                                    style={{ backgroundColor: COLORS.night }}
                                />

                                {/* texte */}
                                <span className="relative transition-colors duration-300 group-hover:text-[#CDA268] cursor-pointer">
                Découvrir l'ouvrage
            </span>

                                {/* CHEVRON FONT AWESOME */}
                                <span className="relative flex items-center">
                <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`transition-transform duration-300 ${
                        ctaOpen ? "rotate-180" : ""
                    } group-hover:text-[#CDA268]`}
                    style={{ fontSize: "10px" }}
                />
            </span>
                            </button>

                            {/* DROPDOWN */}
                            {ctaOpen && (
                                <div
                                    className="absolute mt-3 flex flex-col min-w-[200px] border shadow-lg overflow-hidden"
                                    style={{
                                        border: "2px solid rgba(0,0,0,0.15)",
                                        backgroundColor: COLORS.gold,
                                    }}
                                >
                                    {book.amazon_url && (
                                        <a
                                            href={book.amazon_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="px-4 py-3 text-xs uppercase tracking-widest transition-all duration-200 relative overflow-hidden group"
                                            style={{ color: COLORS.night }}
                                        >
                        <span
                            className="absolute inset-0 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                            style={{ backgroundColor: COLORS.night }}
                        />
                                            <span className="relative transition-colors duration-300 group-hover:text-[#CDA268]">
                            Amazon
                        </span>
                                        </a>
                                    )}

                                    {book.fnac_url && (
                                        <a
                                            href={book.fnac_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="px-4 py-3 text-xs uppercase tracking-widest transition-all duration-200 relative overflow-hidden group"
                                            style={{ color: COLORS.night }}
                                        >
                        <span
                            className="absolute inset-0 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                            style={{ backgroundColor: COLORS.night }}
                        />
                                            <span className="relative transition-colors duration-300 group-hover:text-[#CDA268]">
                            Fnac
                        </span>
                                        </a>
                                    )}

                                    {book.edilivre_url && (
                                        <a
                                            href={book.edilivre_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="px-4 py-3 text-xs uppercase tracking-widest transition-all duration-200 relative overflow-hidden group"
                                            style={{ color: COLORS.night }}
                                        >
                        <span
                            className="absolute inset-0 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
                            style={{ backgroundColor: COLORS.night }}
                        />
                                            <span className="relative transition-colors duration-300 group-hover:text-[#CDA268]">
                            Edilivre
                        </span>
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </motion.div>

            {/* LIGHTBOX */}
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={slides}
                controller={{
                    closeOnBackdropClick: true,
                }}
            />
        </>
    );
}

/* ───────────────────── PAGE BOOKS ───────────────────── */

export default function Books() {
    const { books, loading, error } = useBooks();

    if (loading) return null;
    if (error) return null;

    return (
        <section
            id="books"
            style={{
                backgroundColor: COLORS.gold,
                paddingTop: "clamp(80px, 15vw, 200px)",
                paddingBottom: "clamp(80px, 15vw, 200px)",
            }}
            className="flex bg-gold-section flex-col items-center px-8 md:px-16"
        >
            <div className="w-full max-w-7xl flex flex-col gap-10">

                <motion.p
                    className="text-md uppercase tracking-[0.4em] font-medium"
                    style={{ color: COLORS.night }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    Le recueil
                </motion.p>

                <motion.div
                    className="w-12 h-px"
                    style={{ backgroundColor: COLORS.night }}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true, amount: 0.3 }}
                />
            </div>

            <div className="w-full max-w-7xl mt-16 flex flex-col gap-32">
                {books.map((book, index) => (
                    <BookCard key={book.id} book={book} index={index} />
                ))}
            </div>
        </section>
    );
}