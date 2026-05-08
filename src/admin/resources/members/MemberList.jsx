import DraggableList        from '../../components/DraggableList';
import ConfirmDeleteButton  from '../../components/ConfirmDeleteButton';
import EditIcon             from '../../components/EditIcon';

const COLORS = { gold: '#CDA268' };

const COLUMNS = [
    { label: '',    width: '40px' },
    { label: 'Photo', width: '60px' },
    { label: 'Nom',   width: '1fr'  },
    { label: 'Rôle',  width: '1fr'  },
    { label: 'Bio',   width: '2fr'  },
    { label: '',      width: '40px' },
    { label: '',      width: '40px' },
];

const truncate = (str, n) =>
    str && str.length > n ? str.slice(0, n) + '…' : str || '—';

function renderRow(member, { attributes, listeners }) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: COLUMNS.map(c => c.width).join(' '),
            gap: '16px',
            alignItems: 'center',
            padding: '12px 16px',
        }}>

            {/* Drag handle */}
            <span
                {...attributes}
                {...listeners}
                onClick={e => e.stopPropagation()}
                style={{
                    color: 'rgba(205,162,104,0.5)',
                    fontSize: '18px',
                    cursor: 'grab',
                    userSelect: 'none',
                    textAlign: 'center',
                }}
            >
                ⠿
            </span>

            {/* Photo */}
            {member.photo ? (
                <img
                    src={member.photo}
                    alt={member.name}
                    style={{
                        width: 48, height: 48,
                        objectFit: 'cover',
                        borderRadius: '50%',
                        border: `2px solid ${COLORS.gold}`,
                    }}
                />
            ) : (
                <div style={{
                    width: 48, height: 48,
                    borderRadius: '50%',
                    border: '2px solid rgba(205,162,104,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(205,162,104,0.5)', fontSize: '20px',
                }}>
                    ?
                </div>
            )}

            {/* Nom */}
            <span style={{ color: '#fff', fontSize: '14px' }}>
                {member.name}
            </span>

            {/* Rôle */}
            <span style={{ color: COLORS.gold, fontSize: '13px' }}>
                {member.role}
            </span>

            {/* Bio */}
            <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', fontStyle: 'italic' }}>
                {truncate(Array.isArray(member.bio)
                        ? member.bio.map(s => s.text ?? s).join(' ')
                        : member.bio,
                    50)}
            </span>

            {/* Edit */}
            <span onClick={e => {
                e.stopPropagation();
                window.location.href = `/admin/members/${member.id}`;
            }}>
                <EditIcon />
            </span>

            {/* Delete */}
            <ConfirmDeleteButton resource="members" record={member} label={member.name} />
        </div>
    );
}

export default function MemberList() {
    return (
        <DraggableList
            reorderEndpoint="/api/members.php?action=reorder"
            columns={COLUMNS}
            renderRow={renderRow}
            editPath={member => `/admin/members/${member.id}`}
            draggable={true}
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
                            membre{items.length > 1 ? 's' : ''}
                        </span>
                    </div>
                </div>
            )}
        />
    );
}