import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useEvents } from "../../hooks/useEvents";

import { COLORS } from "../../constants/colors";
import EventMeta from "../../components/events/EventMeta";

const DEFAULT_EVENT_IMG = "/images/default-event.png";

function isPast(date) {
    return new Date(date) < new Date();
}

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut", delay },
    }),
};

/* ===================== UPCOMING ===================== */

function UpcomingCard({ event, index }) {
    return (
        <motion.article
            className="bg-white/5 p-6 backdrop-blur-md rounded-xl"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
        >
            <h3 className="text-lg uppercase tracking-widest" style={{ color: COLORS.gold }}>
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

/* ===================== ARCHIVE ===================== */

function ArchiveCard({ event, index }) {
    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const slides = event.images?.map(i => ({ src: i.url })) || [];
    const coverUrl = event.images?.[0]?.url || DEFAULT_EVENT_IMG;

    const shortDesc =
        event.description?.length > 160
            ? event.description.slice(0, 160).trim() + "…"
            : event.description;

    return (
        <>
            <motion.article
                className="group relative border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden rounded-xl"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
            >
                {/* IMAGE */}
                <div
                    className="h-56 relative overflow-hidden cursor-pointer"
                    onClick={() => slides.length > 0 && setOpen(true)}
                >
                    <img
                        src={coverUrl}
                        className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                        alt={event.title}
                        loading="lazy"
                    />

                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(to top, rgba(7,15,43,0.6), rgba(7,15,43,0.15))",
                        }}
                    />
                </div>

                {/* CONTENT */}
                <div className="p-6 flex flex-col gap-4">

                    <h3 className="uppercase tracking-widest" style={{ color: COLORS.gold }}>
                        {event.title}
                    </h3>

                    {/* DESCRIPTION (expandable conservé) */}
                    <p className="text-sm text-white/70 leading-relaxed">
                        {expanded ? event.description : shortDesc}
                    </p>

                    {event.description?.length > 160 && (
                        <button
                            onClick={() => setExpanded(v => !v)}
                            className="text-xs uppercase tracking-[0.25em] border-b border-[#CDA268] text-[#CDA268] w-fit hover:opacity-80 transition"
                        >
                            {expanded ? "Réduire" : "En savoir plus"}
                        </button>
                    )}

                    <EventMeta event={event} />

                    {event.images?.length > 1 && (
                        <div className="flex gap-2 mt-2">
                            {event.images.slice(0, 4).map((img, i) => (
                                <img
                                    key={i}
                                    src={img.url}
                                    onClick={() => setOpen(true)}
                                    className="w-14 h-14 object-cover rounded cursor-pointer"
                                    alt={event.title}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </motion.article>

            {open && (
                <Lightbox
                    open={open}
                    close={() => setOpen(false)}
                    slides={slides}
                />
            )}
        </>
    );
}

/* ===================== EMPTY STATE ===================== */

function EmptyUpcoming() {
    return (
        <motion.div
            className="text-center py-12 px-6 border border-white/10 bg-white/5 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto">
                Aucun événement n’est prévu pour le moment.
                De nouvelles dates seront annoncées prochainement, n’hésitez pas à revenir consulter cette page.
            </p>

            <motion.div
                className="h-px w-24 mx-auto mt-6"
                style={{ backgroundColor: COLORS.gold }}
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: 96, opacity: 1 }}
                transition={{ duration: 0.6 }}
            />
        </motion.div>
    );
}

/* ===================== MAIN ===================== */

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
        <section className="bg-[#070F2B] px-6 md:px-16 py-24" id="events">

            {/* HEADER */}
            <div className="max-w-7xl mx-auto flex flex-col gap-10 mb-16">
                <header className="flex flex-col gap-4">
                    <motion.p
                        className="text-md uppercase tracking-[0.4em]"
                        style={{ color: COLORS.gold }}
                    >
                        Nos spectacles
                    </motion.p>

                    <motion.div
                        className="w-12 h-px"
                        style={{ backgroundColor: COLORS.gold }}
                        initial={{ opacity: 0, width: 0 }}
                        whileInView={{ opacity: 1, width: 48 }}
                        transition={{ duration: 0.6 }}
                    />
                </header>
            </div>

            {/* UPCOMING */}
            <section className="max-w-7xl mx-auto mb-24">
                <h2 className="text-white uppercase tracking-[0.4em] mb-6">
                    À venir
                </h2>

                {upcoming.length === 0 ? (
                    <EmptyUpcoming />
                ) : (
                    <div className="grid md:grid-cols-3 gap-6">
                        {upcomingToShow.map((event, i) => (
                            <UpcomingCard key={event.id} event={event} index={i} />
                        ))}
                    </div>
                )}

                {upcoming.length > 3 && (
                    <div className="flex justify-center mt-10">
                        <button
                            onClick={() => setShowMoreUpcoming(v => !v)}
                            className="text-[#CDA268] uppercase tracking-[0.25em] border-b border-[#CDA268]"
                        >
                            {showMoreUpcoming ? "Réduire" : "Voir plus"}
                        </button>
                    </div>
                )}
            </section>

            {/* ARCHIVE */}
            <section className="max-w-7xl mx-auto">
                <h2 className="text-white uppercase tracking-[0.4em] mb-6">
                    Archives
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                    {pastToShow.map((event, i) => (
                        <ArchiveCard key={event.id} event={event} index={i} />
                    ))}
                </div>

                {past.length > 3 && (
                    <div className="flex justify-center mt-10">
                        <button
                            onClick={() => setShowMoreArchive(v => !v)}
                            className="text-[#CDA268] uppercase tracking-[0.25em] border-b border-[#CDA268]"
                        >
                            {showMoreArchive ? "Réduire" : "Voir plus"}
                        </button>
                    </div>
                )}
            </section>
        </section>
    );
}