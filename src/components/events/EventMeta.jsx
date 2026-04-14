import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faLocationDot, faTicket } from "@fortawesome/free-solid-svg-icons";
import { COLORS } from "../../constants/colors";

export default function EventMeta({ event }) {
    const mapsUrl = event.location
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`
        : null;

    const isFree  = event.price === null || event.price === undefined;
    const priceLabel = isFree ? "GRATUIT" : `${event.price} €`;

    return (
        <div className="mt-4 flex flex-col gap-2 text-sm text-white/70">

            <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCalendar} style={{ color: COLORS.gold }} />
                <time>{new Date(event.event_date).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                })}</time>
            </div>

            {event.location && (
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faLocationDot} style={{ color: COLORS.gold }} />

                <a    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline hover:opacity-80 transition"
                    style={{ color: COLORS.gold }}
                    >
                    {event.location}
                </a>
                </div>
                )}

<div className="flex items-center gap-2">
    <FontAwesomeIcon icon={faTicket} style={{ color: COLORS.gold }} />
    <span style={{ fontWeight: isFree ? "bold" : "normal", color: isFree ? COLORS.gold : undefined }}>
                    {priceLabel}
                </span>
</div>

</div>
);
}