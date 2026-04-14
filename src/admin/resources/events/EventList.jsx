import DraggableList        from '../../components/DraggableList';
import ConfirmDeleteButton  from '../../components/ConfirmDeleteButton';
import EditIcon             from '../../components/EditIcon';

const COLUMNS = [
    { label: '',         width: '40px' },
    { label: 'Image',    width: '60px' },
    { label: 'Titre',    width: '1fr'  },
    { label: 'Spectacle',width: '1fr'  },
    { label: 'Date',     width: '1fr'  },
    { label: 'Prix',     width: '120px'},
    { label: '',         width: '40px' },
    { label: '',         width: '40px' },
];

function renderRow(event, { attributes, listeners }) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: COLUMNS.map(c => c.width).join(' '),
            gap: '16px',
            alignItems: 'center',
            padding: '12px 16px',
        }}>
            {/* drag handle */}
            <span
                {...attributes}
                {...listeners}
                onClick={e => e.stopPropagation()}
                style={{
                    color: 'rgba(205,162,104,0.5)',
                    fontSize: '18px',
                    cursor: 'grab',
                    userSelect: 'none'
                }}
            >
                ⠿
            </span>

            {/* image */}
            {event.images?.[0]?.url
                ? <img
                    src={event.images[0].url}
                    alt={event.title}
                    style={{
                        width: 48,
                        height: 48,
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: '2px solid #CDA268',
                    }}
                />
                : <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: '8px',
                    border: '2px solid rgba(205,162,104,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(205,162,104,0.5)',
                    fontSize: '16px',
                }}>
                    🎭
                </div>
            }

            {/* title */}
            <span style={{ color: '#fff', fontSize: '14px' }}>
                {event.title}
            </span>

            {/* show name */}
            <span style={{ color: '#CDA268', fontSize: '13px' }}>
                {event.show_name || '—'}
            </span>

            {/* date */}
            <span style={{ color: '#fff', fontSize: '13px', opacity: 0.8 }}>
                {new Date(event.event_date).toLocaleDateString('fr-FR')}
            </span>

            {/* price */}
            <span style={{ color: '#fff', fontSize: '13px' }}>
                {event.price ? `${event.price} €` : 'Gratuit'}
            </span>

            {/* edit */}
            <span
                onClick={e => {
                    e.stopPropagation();
                    window.location.href = `/admin/events/${event.id}`;
                }}
            >
                <EditIcon />
            </span>

            {/* delete */}
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
        />
    );
}