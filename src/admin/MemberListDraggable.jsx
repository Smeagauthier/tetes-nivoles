import { useState, useEffect } from 'react';
import { useListContext, useDelete, useRefresh } from 'react-admin';
import {
    DndContext, closestCenter,
    PointerSensor, useSensor, useSensors,
} from '@dnd-kit/core';
import {
    SortableContext, verticalListSortingStrategy,
    useSortable, arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function DeleteButton({ member }) {
    const [deleteOne] = useDelete();
    const refresh     = useRefresh();
    const [open, setOpen] = useState(false);

    const handleDelete = (e) => {
        e.stopPropagation();
        setOpen(true);
    };

    const handleConfirm = (e) => {
        e.stopPropagation();
        deleteOne('members', { id: member.id }, {
            onSuccess: () => {
                setOpen(false);
                refresh();
            },
        });
    };

    const handleCancel = (e) => {
        e.stopPropagation();
        setOpen(false);
    };

    return (
        <>
            <span onClick={handleDelete} title="Supprimer" style={{ cursor: 'pointer' }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(205,162,104,0.6)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: '20px', height: '20px' }}
                >
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </span>

            {/* Overlay */}
            {open && (
                <div
                    onClick={handleCancel}
                    style={{
                        position:        'fixed',
                        inset:           0,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        zIndex:          1000,
                        display:         'flex',
                        alignItems:      'center',
                        justifyContent:  'center',
                    }}
                >
                    {/* Modale */}
                    <div
                        onClick={e => e.stopPropagation()}
                        style={{
                            backgroundColor: '#0D1A3E',
                            border:          '1px solid rgba(205,162,104,0.3)',
                            borderRadius:    '8px',
                            padding:         '2rem',
                            width:           '360px',
                            textAlign:       'center',
                        }}
                    >
                        <p style={{
                            color:         '#CDA268',
                            fontSize:      '11px',
                            letterSpacing: '0.3em',
                            textTransform: 'uppercase',
                            marginBottom:  '8px',
                        }}>
                            Confirmation
                        </p>
                        <p style={{
                            color:        '#fff',
                            fontSize:     '16px',
                            fontWeight:   300,
                            marginBottom: '8px',
                        }}>
                            Supprimer <strong style={{ color: '#CDA268' }}>{member.name}</strong> ?
                        </p>
                        <p style={{
                            color:        'rgba(255,255,255,0.4)',
                            fontSize:     '13px',
                            marginBottom: '2rem',
                        }}>
                            Cette action est irréversible.
                        </p>

                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                            <button
                                onClick={handleCancel}
                                style={{
                                    padding:         '8px 24px',
                                    backgroundColor: 'transparent',
                                    border:          '1px solid rgba(255,255,255,0.2)',
                                    borderRadius:    '4px',
                                    color:           'rgba(255,255,255,0.6)',
                                    cursor:          'pointer',
                                    fontSize:        '13px',
                                }}
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleConfirm}
                                style={{
                                    padding:         '8px 24px',
                                    backgroundColor: 'transparent',
                                    border:          '1px solid #f44336',
                                    borderRadius:    '4px',
                                    color:           '#f44336',
                                    cursor:          'pointer',
                                    fontSize:        '13px',
                                }}
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function SortableRow({ member }) {
    const {
        attributes, listeners, setNodeRef,
        transform, transition, isDragging,
    } = useSortable({ id: member.id });

    const style = {
        transform:           CSS.Transform.toString(transform),
        transition,
        display:             'grid',
        gridTemplateColumns: '40px 60px 1fr 1fr 40px 40px',
        gap:                 '16px',
        alignItems:          'center',
        padding:             '12px 16px',
        borderBottom:        '1px solid rgba(255,255,255,0.05)',
        backgroundColor:     isDragging ? 'rgba(205,162,104,0.1)' : 'transparent',
        cursor:              'pointer',
        zIndex:              isDragging ? 999 : 'auto',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            onClick={() => window.location.href = `/admin/members/${member.id}`}
        >
            <span
                {...attributes}
                {...listeners}
                onClick={e => e.stopPropagation()}
                style={{
                    color:      'rgba(205,162,104,0.5)',
                    fontSize:   '18px',
                    cursor:     'grab',
                    userSelect: 'none',
                }}
            >⠿</span>

            {member.photo ? (
                <img
                    src={member.photo}
                    alt={member.name}
                    style={{
                        width: '48px', height: '48px',
                        objectFit: 'cover', borderRadius: '50%',
                        border: '2px solid #CDA268',
                    }}
                />
            ) : (
                <div style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    border: '2px solid rgba(205,162,104,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(205,162,104,0.5)', fontSize: '20px',
                }}>?</div>
            )}

            <span style={{ color: '#fff', fontSize: '14px' }}>{member.name}</span>
            <span style={{ color: '#CDA268', fontSize: '13px' }}>{member.role}</span>

            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(205,162,104,0.6)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: '16px', height: '16px' }}
            >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>

            <DeleteButton member={member} />
        </div>
    );
}

export default function MemberListDraggable() {
    const { data, isLoading } = useListContext();
    const [rows, setRows]     = useState([]);
    const sensors             = useSensors(useSensor(PointerSensor));

    useEffect(() => {
        if (data) setRows([...data].sort((a, b) => a.sort_order - b.sort_order));
    }, [data]);

    if (isLoading) return <p style={{ color: '#fff', padding: '1rem' }}>Chargement...</p>;

    const handleDragEnd = async (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex  = rows.findIndex(r => r.id === active.id);
        const newIndex  = rows.findIndex(r => r.id === over.id);
        const reordered = arrayMove(rows, oldIndex, newIndex);
        setRows(reordered);

        await fetch('/api/members.php?action=reorder', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ order: reordered.map(r => r.id) }),
        });
    };

    return (
        <>
            <div style={{
                display:             'grid',
                gridTemplateColumns: '40px 60px 1fr 1fr 40px 40px',
                gap:                 '16px',
                padding:             '8px 16px',
                borderBottom:        '1px solid rgba(205,162,104,0.2)',
                color:               '#CDA268',
                fontSize:            '12px',
                textTransform:       'uppercase',
                letterSpacing:       '0.05em',
            }}>
                <span></span>
                <span>Photo</span>
                <span>Nom</span>
                <span>Rôle</span>
                <span></span>
                <span></span>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={rows.map(r => r.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {rows.map(member => (
                        <SortableRow key={member.id} member={member} />
                    ))}
                </SortableContext>
            </DndContext>
        </>
    );
}