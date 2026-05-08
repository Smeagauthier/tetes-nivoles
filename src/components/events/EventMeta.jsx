import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faLocationDot, faTicket } from "@fortawesome/free-solid-svg-icons";

export default function EventMeta({ event, showPrice = true, accentColor = "#CDA268" }) {
    const mapsUrl = event.location
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`
        : null;

    const date = new Date(event.event_date);

    const dateStr = date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const timeStr = date.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
    });

    const hasTime = date.getHours() !== 0 || date.getMinutes() !== 0;

    const isFree = event.price == null;

    function getBookingData(value) {
        if (!value) return null;

        // EMAIL
        if (value.includes("@")) {
            return {
                href: `mailto:${value}`,
                label: "Mail pour réserver",
            };
        }

        // TELEPHONE
        const phoneRegex = /^[+()\d\s-]+$/;

        if (phoneRegex.test(value)) {
            return {
                href: `tel:${value.replace(/\s/g, "")}`,
                label: "Appeler pour réserver",
            };
        }

        // URL
        const hasProtocol = value.startsWith("http");

        return {
            href: hasProtocol ? value : `https://${value}`,
            label: "Réserver",
        };
    }

    const booking = getBookingData(event.booking_url);

    return (
        <div className="mt-4 flex flex-col gap-2 text-sm text-white/70">

            {/* DATE */}
            <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCalendar} style={{ color: accentColor }} />

                <span>
                    {dateStr}{hasTime && ` à ${timeStr}`}
                </span>
            </div>

            {/* LOCATION */}
            {event.location && (
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faLocationDot} style={{ color: accentColor }} />

                    <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:opacity-80 transition"
                        style={{ color: accentColor }}
                    >
                        {event.location}
                    </a>
                </div>
            )}

            {/* PRICE */}
            {showPrice && (
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faTicket} style={{ color: accentColor }} />

                    <span
                        style={{
                            fontWeight: isFree ? "bold" : "normal",
                            color: isFree ? accentColor : undefined,
                        }}
                    >
                        {isFree ? "GRATUIT" : `${event.price} €`}
                    </span>
                </div>
            )}

            {/* BOOKING */}
            {booking && (
                <div className="flex justify-center mt-3">
                    <a
                        href={booking.href}
                        target={booking.href.startsWith("http") ? "_blank" : undefined}
                        rel={booking.href.startsWith("http") ? "noreferrer" : undefined}
                        className="
                            text-center text-xs uppercase tracking-[0.2em]
                            border px-4 py-2 rounded-sm
                            transition-all duration-300
                        "
                        style={{
                            borderColor: accentColor,
                            color: accentColor,
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = accentColor;
                            e.currentTarget.style.color = "#ffffff";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = accentColor;
                        }}
                    >
                        {booking.label}
                    </a>
                </div>
            )}
        </div>
    );
}