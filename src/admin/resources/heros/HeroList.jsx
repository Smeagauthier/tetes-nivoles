import DraggableList        from '../../components/DraggableList';
import ConfirmDeleteButton  from '../../components/ConfirmDeleteButton';
import EditIcon             from '../../components/EditIcon';

const COLORS = { gold: '#CDA268' };

const COLUMNS = [
    { label: '#',         width: '40px' },
    { label: 'Image',     width: '60px' },
    { label: 'Titre',     width: '1fr'  },
    { label: 'Sous-titre',width: '1fr'  },
    { label: '',          width: '40px' },
    { label: '',          width: '40px' },
];

function renderRow(hero, _dragHandle, index) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: COLUMNS.map(c => c.width).join(' '),
            gap: '16px',
            alignItems: 'center',
            padding: '12px 16px',
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
            {hero.images?.[0]?.url ? (
                <img
                    src={hero.images[0].url}
                    alt={hero.title}
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

            {/* Titre */}
            <span style={{ color: '#fff', fontSize: '14px' }}>
                {hero.title}
            </span>

            {/* Sous-titre */}
            <span style={{ color: COLORS.gold, fontSize: '13px' }}>
                {hero.subtitle}
            </span>

            {/* Edit */}
            <span onClick={e => {
                e.stopPropagation();
                window.location.href = `/admin/heros/${hero.id}`;
            }}>
                <EditIcon />
            </span>

            {/* Delete */}
            <ConfirmDeleteButton resource="heros" record={hero} label={hero.title} />
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
            draggable={false}
            header={(items) => {
                const activeItems  = items.filter(h => h.is_active);
                const photosCount  = activeItems.reduce((acc, h) => acc + (h.images?.length ?? 0), 0);

                return (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>

                        {/* Total heroes */}
                        <div style={{
                            display: 'flex', alignItems: 'baseline', gap: '6px',
                            background: 'rgba(205,162,104,0.08)',
                            border: '1px solid rgba(205,162,104,0.2)',
                            borderRadius: '10px', padding: '8px 16px',
                        }}>
                <span style={{ fontSize: '26px', fontWeight: 700, color: '#CDA268', lineHeight: 1 }}>
                    {items.length}
                </span>
                            <span style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(205,162,104,0.6)' }}>
                    hero{items.length > 1 ? 's' : ''}
                </span>
                        </div>

                        <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: '20px' }}>|</span>

                        {/* Photos actives */}
                        <div style={{
                            display: 'flex', alignItems: 'baseline', gap: '6px',
                            background: 'rgba(74,222,128,0.06)',
                            border: '1px solid rgba(74,222,128,0.2)',
                            borderRadius: '10px', padding: '8px 16px',
                        }}>
                <span style={{ fontSize: '26px', fontWeight: 700, color: '#4ade80', lineHeight: 1 }}>
                    {photosCount}
                </span>
                            <span style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(74,222,128,0.6)' }}>
                    photo{photosCount > 1 ? 's' : ''} affichée{photosCount > 1 ? 's' : ''}
                </span>
                        </div>

                    </div>
                );
            }}
        />
    );
}