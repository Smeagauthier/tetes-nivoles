import DraggableList        from '../../components/DraggableList';
import ConfirmDeleteButton  from '../../components/ConfirmDeleteButton';
import EditIcon             from '../../components/EditIcon';

const COLUMNS = [
    { label: '',      width: '40px' },
    { label: 'Photo', width: '60px' },
    { label: 'Nom',   width: '1fr'  },
    { label: 'Rôle',  width: '1fr'  },
    { label: '',      width: '40px' },
    { label: '',      width: '40px' },
];

function renderRow(member, { attributes, listeners }) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: COLUMNS.map(c => c.width).join(' '),
            gap: '16px', alignItems: 'center', padding: '12px 16px',
        }}>
            <span {...attributes} {...listeners}
                  onClick={e => e.stopPropagation()}
                  style={{ color: 'rgba(205,162,104,0.5)', fontSize: '18px', cursor: 'grab', userSelect: 'none' }}>
                ⠿
            </span>

            {member.photo
                ? <img src={member.photo} alt={member.name} style={{
                    width: 48, height: 48, objectFit: 'cover',
                    borderRadius: '50%', border: '2px solid #CDA268',
                }} />
                : <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    border: '2px solid rgba(205,162,104,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(205,162,104,0.5)', fontSize: '20px',
                }}>?</div>
            }

            <span style={{ color: '#fff', fontSize: '14px' }}>{member.name}</span>
            <span style={{ color: '#CDA268', fontSize: '13px' }}>{member.role}</span>

            <span onClick={e => { e.stopPropagation(); window.location.href = `/admin/members/${member.id}`; }}>
                <EditIcon />
            </span>

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
        />
    );
}