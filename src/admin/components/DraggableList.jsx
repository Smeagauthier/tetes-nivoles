import { useState, useEffect } from 'react';
import { useListContext } from 'react-admin';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const COLORS = { gold: '#CDA268' };

// Row générique — reçoit les colonnes à afficher via renderRow
function SortableRow({ id, item, renderRow, editPath }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    return (
        <div
            ref={setNodeRef}
            style={{
                transform: CSS.Transform.toString(transform),
                transition,
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                backgroundColor: isDragging ? 'rgba(205,162,104,0.1)' : 'transparent',
                cursor: 'pointer',
            }}
            onClick={() => window.location.href = editPath(item)}
        >
            {/* drag handle + colonnes métier */}
            {renderRow(item, { attributes, listeners })}
        </div>
    );
}

export default function DraggableList({ reorderEndpoint, columns, renderRow, editPath }) {
    const { data, isLoading } = useListContext();
    const [rows, setRows]     = useState([]);
    const sensors             = useSensors(useSensor(PointerSensor));

    useEffect(() => {
        if (data) setRows([...data].sort((a, b) => a.sort_order - b.sort_order));
    }, [data]);

    if (isLoading) return <p style={{ color: '#fff', padding: '1rem' }}>Chargement...</p>;

    const handleDragEnd = async ({ active, over }) => {
        if (!over || active.id === over.id) return;
        const oldIndex  = rows.findIndex(r => r.id === active.id);
        const newIndex  = rows.findIndex(r => r.id === over.id);
        const reordered = arrayMove(rows, oldIndex, newIndex);
        setRows(reordered);
        await fetch(reorderEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order: reordered.map(r => r.id) }),
        });
    };

    return (
        <>
            {/* Header */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: columns.map(c => c.width).join(' '),
                gap: '16px', padding: '8px 16px',
                borderBottom: '1px solid rgba(205,162,104,0.2)',
                color: COLORS.gold, fontSize: '12px',
                textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>
                {columns.map(c => <span key={c.label}>{c.label}</span>)}
            </div>

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={rows.map(r => r.id)} strategy={verticalListSortingStrategy}>
                    {rows.map(item => (
                        <SortableRow
                            key={item.id}
                            id={item.id}
                            item={item}
                            renderRow={renderRow}
                            editPath={editPath}
                        />
                    ))}
                </SortableContext>
            </DndContext>
        </>
    );
}