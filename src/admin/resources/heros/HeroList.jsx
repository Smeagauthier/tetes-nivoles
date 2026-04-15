import DraggableList from '../../components/DraggableList';
import ConfirmDeleteButton from '../../components/ConfirmDeleteButton';
import EditIcon from '../../components/EditIcon';

const COLUMNS = [
    { label: '', width: '40px' },
    { label: 'Image', width: '60px' },
    { label: 'Titre', width: '1fr' },
    { label: 'Sous-titre', width: '1fr' },
    { label: '', width: '40px' },
    { label: '', width: '40px' },
];

function renderRow(hero, { attributes, listeners }) {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: COLUMNS.map(c => c.width).join(' '),
                gap: '16px',
                alignItems: 'center',
                padding: '12px 16px',
            }}
        >
            {/* drag */}
            <span
                {...attributes}
                {...listeners}
                onClick={e => e.stopPropagation()}
                style={{
                    color: 'rgba(205,162,104,0.5)',
                    fontSize: '18px',
                    cursor: 'grab',
                    userSelect: 'none',
                }}
            >
                ⠿
            </span>

            {/* image preview */}
            {hero.images?.[0]?.url ? (
                <img
                    src={hero.images[0].url}
                    alt={hero.title}
                    style={{
                        width: 48,
                        height: 48,
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: '2px solid #CDA268',
                    }}
                />
            ) : (
                <div
                    style={{
                        width: 48,
                        height: 48,
                        borderRadius: '8px',
                        border: '2px solid rgba(205,162,104,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'rgba(205,162,104,0.5)',
                        fontSize: '16px',
                    }}
                >
                    🎭
                </div>
            )}

            {/* title */}
            <span style={{ color: '#fff', fontSize: '14px' }}>
                {hero.title}
            </span>

            {/* subtitle */}
            <span style={{ color: '#CDA268', fontSize: '13px' }}>
                {hero.subtitle}
            </span>

            {/* edit */}
            <span
                onClick={e => {
                    e.stopPropagation();
                    window.location.href = `/admin/heros/${hero.id}`;
                }}
            >
                <EditIcon />
            </span>

            {/* delete */}
            <ConfirmDeleteButton
                resource="heros"
                record={hero}
                label={hero.title}
            />
        </div>
    );
}

export default function HeroList() {
    return (
        <DraggableList
            reorderEndpoint="/api/heros.php?action=reorder"
            columns={COLUMNS}
            renderRow={renderRow}
            editPath={hero => `/admin/heros/${hero.id}`}
        />
    );
}