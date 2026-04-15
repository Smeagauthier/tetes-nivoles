import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Helmet } from "react-helmet-async";


import { useEvents } from "../../hooks/useEvents";
import { COLORS } from "../../constants/colors";
import EventMeta from "../../components/events/EventMeta";

const DEFAULT_EVENT_IMG = "/images/default-event.png";

function isPast(date) {
    return new Date(date) < new Date();
}

const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut", delay },
    }),
};

const fadeLeft = {
    hidden: { opacity: 0, x: 40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.9, ease: "easeOut" },
    },
};

/* ───────────────────────── UPCOMING ───────────────────────── */

function UpcomingCard({ event, index }) {
    return (
        <motion.article
            className=" bg-white/5 p-6 backdrop-blur-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            style={{ borderRadius: 18 }}
        >
            <h3 style={{ color: COLORS.gold }} className="text-lg uppercase tracking-widest">
                {event.title}
            </h3>

            {event.show_name && (
                <p className="text-xs uppercase tracking-[0.3em] text-white/60 mt-2">
                    {event.show_name}
                </p>
            )}

            <EventMeta event={event} />
        </motion.article>
    );
}

/* ───────────────────────── ARCHIVE ───────────────────────── */

function ArchiveCard({ event, index }) {
    const [open, setOpen] = useState(false);

    const slides = event.images?.map(i => ({ src: i.url })) || [];
    const coverUrl = event.images?.[0]?.url || DEFAULT_EVENT_IMG;

    const description =
        event.description?.length > 150
            ? event.description.slice(0, 150).trim() + "…"
            : event.description;

    return (
        <>
            <Helmet>
                <title>Têtes Nivoles</title>
                <meta
                    name="description"
                    content="Découvrez les événements des Têtes Nivoles : spectacles, archives et artistes."
                />

                {/* Open Graph */}
                <meta property="og:title" content="Événements | Têtes Nivoles" />
                <meta property="og:description" content="Spectacles, archives et artistes." />
                <meta property="og:type" content="website" />
            </Helmet>

            <motion.article
                className="group relative border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                style={{ borderRadius: 18 }}
            >
                {/* IMAGE */}
                <div
                    className="h-56 relative overflow-hidden cursor-pointer"
                    onClick={() => slides.length > 0 && setOpen(true)}
                >
                    <img
                        src={coverUrl}
                        className="
                            w-full h-full object-cover
                            transition-all duration-700
                            group-hover:scale-105
                            group-hover:brightness-110
                        "
                        alt={event.title}
                        loading="lazy"
                    />

                    {/* overlay doux */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(to top, rgba(7,15,43,0.55), rgba(7,15,43,0.15))",
                            pointerEvents: "none",
                        }}
                    />
                </div>

                {/* CONTENT */}
                <div className="p-6">
                    <h3 style={{ color: COLORS.gold }} className="text-lg uppercase tracking-widest">
                        {event.title}
                    </h3>

                    {event.description && (
                        <p className="text-sm text-white/70 mt-3 leading-relaxed min-h-[60px]">
                            {description}
                        </p>
                    )}

                    <EventMeta event={event} />

                    {/* MINI GALLERY */}
                    {event.images?.length > 1 && (
                        <div className="flex gap-2 mt-4">

                            {event.images.slice(0, 4).map((img, i) => (
                                <img
                                    key={i}
                                    src={img.url}
                                    onClick={() => setOpen(true)}
                                    className="w-14 h-14 object-cover rounded cursor-pointer flex-shrink-0"
                                    alt="Images du spectacle"
                                    loading="lazy"
                                />
                            ))}

                            {/* +X overlay si images restantes */}
                            {event.images.length > 5 && (
                                <div
                                    onClick={() => setOpen(true)}
                                    className="w-14 h-14 rounded cursor-pointer flex items-center justify-center text-white text-xs font-bold relative overflow-hidden"
                                    style={{
                                        backgroundImage: `url(${event.images[4].url})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    {/* assombrissement */}
                                    <div className="absolute inset-0 bg-black/60" />

                                    {/* texte +X */}
                                    <span className="relative z-10">
                    +{event.images.length - 4}
                </span>
                                </div>
                            )}

                        </div>
                    )}
                </div>
            </motion.article>

            {/* ✅ LIGHTBOX FIX */}
            {open && (
                <Lightbox
                    open={open}
                    close={() => setOpen(false)}
                    slides={slides}
                    controller={{
                        closeOnBackdropClick: true,
                    }}
                />
            )}
        </>
    );
}


export default function Events() {
    const { events, loading, error } = useEvents();

    const [showMoreUpcoming, setShowMoreUpcoming] = useState(false);
    const [showMoreArchive, setShowMoreArchive] = useState(false);

    const { upcoming, past } = useMemo(() => {
        const published = events.filter(e => e.is_published);

        return {
            upcoming: published
                .filter(e => !isPast(e.event_date))
                .sort((a, b) => new Date(a.event_date) - new Date(b.event_date)),

            past: published
                .filter(e => isPast(e.event_date))
                .sort((a, b) => new Date(b.event_date) - new Date(a.event_date)),
        };
    }, [events]);

    if (loading || error) return null;

    const upcomingToShow = upcoming.slice(0, showMoreUpcoming ? upcoming.length : 3);
    const pastToShow = past.slice(0, showMoreArchive ? past.length : 3);

    return (
        <section style={{ background: COLORS.night }} className="px-6 md:px-16 py-32" id="events">

            {/* HEADER GLOBAL */}
            <div className="max-w-7xl mx-auto flex flex-col gap-12 mb-20">

                <motion.p
                    style={{ color: COLORS.gold }}
                    className="text-md uppercase tracking-[0.4em] font-medium"
                    variants={fadeUp}
                    custom={0}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    Nos activités
                </motion.p>

                {/* Trait doré */}
                <motion.div
                    className="w-12 h-px"
                    style={{ backgroundColor: COLORS.gold }}
                    variants={fadeUp}
                    custom={0.05}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                />

            </div>

            {/* ───────── À VENIR ───────── */}
            <section className="max-w-7xl mx-auto mb-24">

                <h2 className="text-white uppercase tracking-[0.5em] text-md  md:text-base font-normal pb-5">
                    À venir
                </h2>

                <div className="mt-4 grid md:grid-cols-3 gap-6">
                    {upcomingToShow.map((event, i) => (
                        <UpcomingCard key={event.id} event={event} index={i} />
                    ))}
                </div>

                {!showMoreUpcoming && upcoming.length > 3 && (
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={() => setShowMoreUpcoming(true)}
                            className="px-8 py-3.5 text-sm tracking-[0.12em] uppercase font-semibold border border-[#CDA268] text-[#CDA268]"
                            style={{
                                backgroundColor: "transparent",
                                boxShadow: "0 0 10px rgba(205,162,104,0.15)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#CDA268";
                                e.currentTarget.style.color = "#fff";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                                e.currentTarget.style.color = "#CDA268";
                            }}
                        >
                            Voir plus
                        </button>
                    </div>
                )}
            </section>

            {/* ───────── ARCHIVES ───────── */}
            <section className="max-w-7xl mx-auto">

                <h2 className="text-white uppercase tracking-[0.5em] text-sm md:text-base font-normal text-md pb-5">
                    Archives
                </h2>

                <div className="mt-4 grid md:grid-cols-3 gap-6">
                    {pastToShow.map((event, i) => (
                        <ArchiveCard key={event.id} event={event} index={i} />
                    ))}
                </div>

                {!showMoreArchive && past.length > 3 && (
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={() => setShowMoreArchive(true)}
                            className="px-8 py-3.5 text-sm tracking-[0.12em] uppercase font-semibold border border-[#CDA268] text-[#CDA268]"
                            style={{
                                backgroundColor: "transparent",
                                boxShadow: "0 0 10px rgba(205,162,104,0.15)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#CDA268";
                                e.currentTarget.style.color = "#fff";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                                e.currentTarget.style.color = "#CDA268";
                            }}
                        >
                            Voir plus
                        </button>
                    </div>
                )}
            </section>
        </section>
    );
}