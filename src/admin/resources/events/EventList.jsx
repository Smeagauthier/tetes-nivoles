import DraggableList        from '../../components/DraggableList';
import ConfirmDeleteButton  from '../../components/ConfirmDeleteButton';
import EditIcon             from '../../components/EditIcon';

const COLORS = {
    gold:    '#CDA268',
    night:   '#070F2B',
    upcoming: '#4ade80',   // vert
    past:     '#94a3b8',   // gris bleuté
};

const COLUMNS = [
    { label: '#',          width: '40px'  },
    { label: 'Image',      width: '60px'  },
    { label: 'Titre',      width: '1fr'   },
    { label: 'Description',width: '1fr'   },
    { label: 'Date',       width: '140px' },
    { label: '',           width: '40px'  },
    { label: '',           width: '40px'  },
];

function isUpcoming(event) {
    return new Date(event.event_date) >= new Date(new Date().toDateString());
}

function StatusBadge({ upcoming }) {
    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: upcoming ? COLORS.upcoming : COLORS.past,
            background: upcoming ? 'rgba(74,222,128,0.08)' : 'rgba(148,163,184,0.08)',
            border: `1px solid ${upcoming ? 'rgba(74,222,128,0.25)' : 'rgba(148,163,184,0.2)'}`,
            borderRadius: '999px',
            padding: '2px 8px',
            width:'15%',
            justifyContent: 'center',
        }}>
            <span style={{
                width: '5px', height: '5px',
                borderRadius: '50%',
                backgroundColor: upcoming ? COLORS.upcoming : COLORS.past,
                display: 'inline-block',
            }} />
            {upcoming ? 'À venir' : 'Archivé'}
        </span>
    );
}

function renderRow(event, _dragHandle, index) {

    const shortDescription =
        event.description
            ? event.description.length > 50
                ? event.description.slice(0, 50) + '…'
                : event.description
            : '—';

    const upcoming = isUpcoming(event);

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: COLUMNS.map(c => c.width).join(' '),
            gap: '16px',
            alignItems: 'center',
            padding: '12px 16px',
            transition: 'opacity 0.2s ease',
        }}>

            {/* Numéro */}
            <span style={{
                color: 'rgba(205,162,104,0.4)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textAlign: 'center',
            }}>
                {String(index + 1).padStart(2, '0')}
            </span>

            {/* Image */}
            {event.images?.[0]?.url ? (
                <img
                    src={event.images[0].url}
                    alt={event.title}
                    style={{
                        width: 48, height: 48,
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: `2px solid ${COLORS.gold}`,
                    }}
                />
            ) : (
                <div style={{
                    width: 48, height: 48,
                    borderRadius: '8px',
                    border: '2px solid rgba(205,162,104,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(205,162,104,0.5)', fontSize: '16px',
                }}>
                    🎭
                </div>
            )}

            {/* Titre + badge */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ color: '#fff', fontSize: '14px' }}>
                    {event.title}
                </span>
                <StatusBadge upcoming={upcoming} />
            </div>

            {/* Description */}
            <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px' }}>
                {shortDescription}
            </span>

            {/* Date */}
            <span style={{
                color: upcoming ? '#fff' : 'rgba(255,255,255,0.4)',
                fontSize: '13px',
            }}>
                {new Date(event.event_date).toLocaleDateString('fr-FR', {
                    day: '2-digit', month: 'short', year: 'numeric',
                })}
            </span>

            {/* Edit */}
            <span onClick={e => {
                e.stopPropagation();
                window.location.href = `/admin/events/${event.id}`;
            }}>
                <EditIcon />
            </span>

            {/* Delete */}
            <ConfirmDeleteButton
                resource="events"
                record={event}
                label={event.title}
            />
        </div>
    );
}

export default function EventList() {
    return (
        <DraggableList
            reorderEndpoint="/api/events.php?action=reorder"
            columns={COLUMNS}
            renderRow={renderRow}
            editPath={event => `/admin/events/${event.id}`}
            draggable={false}
            header={(items) => {
                const upcomingCount = items.filter(isUpcoming).length;
                const pastCount     = items.length - upcomingCount;

                return (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '24px',
                        flexWrap: 'wrap',
                    }}>

                        {/* Total */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '6px',
                            background: 'rgba(205,162,104,0.08)',
                            border: '1px solid rgba(205,162,104,0.2)',
                            borderRadius: '10px',
                            padding: '8px 16px',
                        }}>
                            <span style={{ fontSize: '26px', fontWeight: 700, color: COLORS.gold, lineHeight: 1 }}>
                                {items.length}
                            </span>
                            <span style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(205,162,104,0.6)' }}>
                                événement{items.length > 1 ? 's' : ''}
                            </span>
                        </div>

                        {/* Séparateur */}
                        <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: '20px' }}>|</span>

                        {/* À venir */}
                        <div style={{
                            display: 'flex', alignItems: 'baseline', gap: '6px',
                            background: 'rgba(74,222,128,0.06)',
                            border: '1px solid rgba(74,222,128,0.2)',
                            borderRadius: '10px', padding: '8px 16px',
                        }}>
                            <span style={{ fontSize: '26px', fontWeight: 700, color: COLORS.upcoming, lineHeight: 1 }}>
                                {upcomingCount}
                            </span>
                            <span style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(74,222,128,0.6)' }}>
                                à venir
                            </span>
                        </div>

                        {/* Archivés */}
                        <div style={{
                            display: 'flex', alignItems: 'baseline', gap: '6px',
                            background: 'rgba(148,163,184,0.06)',
                            border: '1px solid rgba(148,163,184,0.15)',
                            borderRadius: '10px', padding: '8px 16px',
                        }}>
                            <span style={{ fontSize: '26px', fontWeight: 700, color: COLORS.past, lineHeight: 1 }}>
                                {pastCount}
                            </span>
                            <span style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(148,163,184,0.5)' }}>
                                archivé{pastCount > 1 ? 's' : ''}
                            </span>
                        </div>

                    </div>
                );
            }}
        />
    );
}