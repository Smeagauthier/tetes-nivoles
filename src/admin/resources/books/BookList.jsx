import DraggableList        from '../../components/DraggableList';
import ConfirmDeleteButton  from '../../components/ConfirmDeleteButton';
import EditIcon             from '../../components/EditIcon';

const COLORS = { gold: '#CDA268' };

const COLUMNS = [
    { label: '#',          width: '40px' },
    { label: 'Cover',      width: '60px' },
    { label: 'Titre',      width: '1fr'  },
    { label: 'Description',width: '1fr'  },
    { label: 'Citation',   width: '1fr'  },
    { label: '',           width: '40px' },
    { label: '',           width: '40px' },
];

const truncate = (str, n) =>
    str && str.length > n ? str.slice(0, n) + '…' : str || '—';

function renderRow(book, _dragHandle, index) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: COLUMNS.map(c => c.width).join(' '),
            gap: '12px',
            alignItems: 'center',
            padding: '12px 16px',
        }}>

            {/* # */}
            <span style={{
                color: 'rgba(205,162,104,0.4)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textAlign: 'center',
            }}>
                {String(index + 1).padStart(2, '0')}
            </span>

            {/* Cover */}
            {book.cover_image ? (
                <img
                    src={book.cover_image}
                    alt={book.title}
                    style={{
                        width: 40, height: 60,
                        objectFit: 'cover',
                        borderRadius: '4px',
                        border: `1px solid ${COLORS.gold}`,
                    }}
                />
            ) : (
                <div style={{
                    width: 40, height: 60,
                    borderRadius: '4px',
                    border: '1px solid rgba(205,162,104,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(205,162,104,0.4)', fontSize: '18px',
                }}>
                    📖
                </div>
            )}

            {/* Titre */}
            <span style={{ color: '#fff', fontSize: '14px' }}>
                {truncate(book.title, 50)}
            </span>

            {/* Description */}
            <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px' }}>
                {truncate(book.description, 50)}
            </span>

            {/* Citation */}
            <span style={{
                color: 'rgba(255,255,255,0.35)',
                fontSize: '12px',
                fontStyle: 'italic',
            }}>
                {truncate(book.quote, 30)}
            </span>

            {/* Edit */}
            <span onClick={e => {
                e.stopPropagation();
                window.location.href = `/admin/books/${book.id}`;
            }}>
                <EditIcon />
            </span>

            {/* Delete */}
            <ConfirmDeleteButton resource="books" record={book} label={book.title} />
        </div>
    );
}

export default function BookList() {
    return (
        <DraggableList
            reorderEndpoint="/api/books.php?action=reorder"
            columns={COLUMNS}
            renderRow={renderRow}
            editPath={book => `/admin/books/${book.id}`}
            draggable={false}
            header={(items) => (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '24px',
                }}>
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
                            livre{items.length > 1 ? 's' : ''}
                        </span>
                    </div>
                </div>
            )}
        />
    );
}