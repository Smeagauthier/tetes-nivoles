import { useState, useEffect } from 'react';
import { useListContext } from 'react-admin';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import '../../index.css';

const COLORS = { gold: '#CDA268' };

function StaticRow({ item, index, renderRow, editPath }) {
    const [hover, setHover] = useState(false);
    const isEven = index % 2 === 0;

    return (
        <div
            style={{
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '10px',
                padding: '2px 0',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease',
                backgroundColor: hover
                    ? 'rgba(205,162,104,0.06)'
                    : isEven
                        ? 'rgba(255,255,255,0.02)'
                        : 'transparent',
            }}
            onClick={() => window.location.href = editPath(item)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {renderRow(item, {}, index)}
        </div>
    );
}

function SortableRow({ id, item, index, renderRow, editPath }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const isEven = index % 2 === 0;
    const [hover, setHover] = useState(false);

    return (
        <div
            ref={setNodeRef}
            style={{
                transform: CSS.Transform.toString(transform),
                transition,
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                cursor: 'pointer',
                borderRadius: '10px',
                padding: '2px 0',

                backgroundColor: isDragging
                    ? 'rgba(205,162,104,0.12)'
                    : hover
                        ? 'rgba(205,162,104,0.06)'   // couleur au hover
                        : isEven
                            ? 'rgba(255,255,255,0.02)'  // alternance
                            : 'transparent',
            }}
            onClick={() => window.location.href = editPath(item)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {renderRow(item, { attributes, listeners }, index)}
        </div>
    );
}

export default function DraggableList({ reorderEndpoint, columns, renderRow, editPath, header, draggable = true }) {
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
            {/* Compteur / slot header */}
            {header?.(rows)}

            {/* Header colonnes */}
            <div
                style={{
                display: 'grid',
                gridTemplateColumns: columns.map(c => c.width).join(' '),
                gap: '16px', padding: '8px 16px',
                borderBottom: '1px solid rgba(205,162,104,0.2)',
                color: COLORS.gold, fontSize: '12px',
                textTransform: 'uppercase', letterSpacing: '0.05em',
            }}>
                {columns.map(c => <span key={c.label}>{c.label}</span>)}
            </div>

            {draggable ? (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={rows.map(r => r.id)} strategy={verticalListSortingStrategy}>
                        {rows.map((item, index) => (
                            <SortableRow
                                key={item.id}
                                id={item.id}
                                item={item}
                                index={index}
                                renderRow={renderRow}
                                editPath={editPath}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            ) : (
                /* Mode non-draggable : simple liste */
                <div>
                    {rows.map((item, index) => (
                        <StaticRow
                            key={item.id}
                            item={item}
                            index={index}
                            renderRow={renderRow}
                            editPath={editPath}
                        />
                    ))}
                </div>
            )}
        </>
    );
}