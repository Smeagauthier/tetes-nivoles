import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useEvents } from "../../hooks/useEvents";
import { COLORS } from "../../constants/colors";
import EventMeta from "../../components/events/EventMeta";
import FilterYear from "../ui/FilterYear";
import ExpandableText from "../ui/ExpendableText.jsx";

const DEFAULT_EVENT_IMG = "/images/default-event.png";

function isPast(date) {
    return new Date(date) < new Date();
}

/* ===================== UPCOMING ===================== */
function UpcomingCard({ event }) {
    return (
        <motion.article
            className="
                bg-white/5 backdrop-blur-md rounded-xl
                p-4 sm:p-6
                flex flex-col gap-3 sm:gap-4
                w-full min-w-0
                h-full
            "
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            <h3 className="text-base sm:text-lg uppercase tracking-widest text-[#CDA268] break-words">
                {event.title}
            </h3>

            {event.show_name && (
                <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-white/60 break-words">
                    {event.show_name}
                </p>
            )}

            {event.description && (
                <div className="min-w-0 flex-1">
                    <ExpandableText text={event.description} limit={160} />
                </div>
            )}

            <div className="min-w-0">
                <EventMeta event={event} showPrice={true} />
            </div>
        </motion.article>
    );
}

/* ===================== ARCHIVE ===================== */
function ArchiveCard({ event }) {
    const [open, setOpen] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);

    const slides = event.images?.map(i => ({ src: i.url })) || [];
    const coverUrl = event.images?.[0]?.url || DEFAULT_EVENT_IMG;

    const MAX_THUMB = 4;
    const visibleImgs = event.images?.slice(0, MAX_THUMB) || [];
    const remaining = (event.images?.length || 0) - MAX_THUMB;

    const openAt = (index) => {
        setSlideIndex(index);
        setOpen(true);
    };

    return (
        <>
            <motion.article
                layout
                className="group relative border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden rounded-xl"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <div
                    className="h-56 relative overflow-hidden cursor-pointer"
                    onClick={() => slides.length > 0 && openAt(0)}
                >
                    <img
                        src={coverUrl}
                        className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                        alt={event.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070F2B]/70 to-transparent" />
                </div>

                <div className="p-6 flex flex-col gap-4 min-h-[280px]">

                    <h3 className="uppercase tracking-widest text-[#CDA268] line-clamp-2">
                        {event.title}
                    </h3>

                    {event.description && (
                        <ExpandableText text={event.description} limit={160} />
                    )}

                    <EventMeta event={event} showPrice={false} />

                    {event.images?.length > 1 && (
                        <div className="flex gap-2 flex-wrap mt-2">
                            {visibleImgs.map((img, i) => {
                                const isLast = i === MAX_THUMB - 1 && remaining > 0;

                                return (
                                    <div
                                        key={i}
                                        className="relative w-14 h-14 cursor-pointer overflow-hidden rounded"
                                        onClick={() => openAt(i)}
                                    >
                                        <img
                                            src={img.url}
                                            className="w-full h-full object-cover"
                                        />

                                        {isLast && (
                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                <span className="text-white text-xs">
                                                    +{remaining}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </motion.article>

            {open && (
                <Lightbox
                    open={open}
                    close={() => setOpen(false)}
                    slides={slides}
                    index={slideIndex}
                    controller={{ closeOnBackdropClick: true }}
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
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <p className="text-white/70 text-sm leading-relaxed max-w-xl mx-auto">
                Aucun événement n'est prévu pour le moment.
            </p>
        </motion.div>
    );
}

/* ===================== MAIN ===================== */
export default function Events() {
    const { events, loading, error } = useEvents();

    const [selectedYear, setSelectedYear] = useState(null);
    const [showMoreUpcoming, setShowMoreUpcoming] = useState(false);
    const [showMoreArchive, setShowMoreArchive] = useState(false);

    const { upcoming, past, archiveYears } = useMemo(() => {
        const published = events.filter(e => e.is_published);

        const upcoming = published
            .filter(e => !isPast(e.event_date))
            .sort((a, b) => new Date(a.event_date) - new Date(b.event_date));

        const past = published
            .filter(e => isPast(e.event_date))
            .sort((a, b) => new Date(b.event_date) - new Date(a.event_date));

        const years = [...new Set(past.map(e => new Date(e.event_date).getFullYear()))]
            .sort((a, b) => b - a);

        return { upcoming, past, archiveYears: years };
    }, [events]);

    const filteredPast = selectedYear
        ? past.filter(e => new Date(e.event_date).getFullYear() === selectedYear)
        : past;

    if (loading || error) return null;

    const upcomingToShow = upcoming.slice(0, showMoreUpcoming ? upcoming.length : 3);
    const pastToShow = filteredPast.slice(0, showMoreArchive ? filteredPast.length : 3);

    const canShowMoreArchive =
        filteredPast.length > pastToShow.length;

    const canShowMoreUpcoming = upcoming.length > upcomingToShow.length;

    return (
        <section id="events" className="bg-[#070F2B] px-6 md:px-16 py-16 md:py-24 -mb-px">

            {/* HEADER */}
            <div className="max-w-7xl mx-auto mb-16">
                <h2 className="text-[#CDA268] uppercase tracking-[0.4em]">
                    Nos spectacles
                </h2>
            </div>

            {/* UPCOMING */}
            <section className="max-w-7xl mx-auto mb-24">
                <h2 className="text-white uppercase tracking-[0.4em] mb-6">
                    À venir
                </h2>

                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch"
                    transition={{
                        layout: {
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1]
                        }
                    }}
                >
                    <AnimatePresence mode="popLayout">
                        {upcomingToShow.map((event) => (
                            <motion.div
                                key={event.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.35 }}
                            >
                                <UpcomingCard event={event} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {canShowMoreUpcoming && (
                    <div className="mt-10 flex justify-center">
                        <button
                            onClick={() => {
                                setShowMoreUpcoming(true);
                            }}
                            className="
                                px-6 py-2
                                border border-[#CDA268]
                                text-[#CDA268]
                                uppercase tracking-[0.25em]
                                text-xs
                                transition-all duration-300
                                cursor-pointer
                                hover:bg-[#CDA268]
                                hover:text-white
                                hover:scale-[1.02]
                            "
                        >
                            Voir plus
                        </button>
                    </div>
                )}
            </section>

            {/* ARCHIVE */}
            <section className="max-w-7xl mx-auto">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white uppercase tracking-[0.4em]">
                        Archives
                    </h2>

                    <FilterYear
                        years={archiveYears}
                        selectedYear={selectedYear}
                        onSelectYear={(year) => {
                            setSelectedYear(year);
                            setShowMoreArchive(false);
                        }}
                    />
                </div>

                <motion.div
                    layout
                    className="grid md:grid-cols-3 gap-6"
                    transition={{
                        layout: {
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1]
                        }
                    }}
                >
                    <AnimatePresence mode="popLayout">
                        {pastToShow.map((event) => (
                            <motion.div
                                key={event.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.35 }}
                            >
                                <ArchiveCard event={event} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {canShowMoreArchive && (
                    <div className="mt-10 flex justify-center">
                        <button
                            onClick={() => setShowMoreArchive(true)}
                            className="
                                px-6 py-2
                                border border-[#CDA268]
                                text-[#CDA268]
                                uppercase tracking-[0.25em]
                                text-xs
                                transition-all duration-300
                                hover:bg-[#CDA268]
                                hover:text-white
                                hover:scale-[1.02]
                                cursor-pointer
                            "
                        >
                            Voir plus
                        </button>
                    </div>
                )}
            </section>
        </section>
    );
}