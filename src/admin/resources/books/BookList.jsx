import DraggableList        from '../../components/DraggableList';
import ConfirmDeleteButton  from '../../components/ConfirmDeleteButton';
import EditIcon             from '../../components/EditIcon';

const COLUMNS = [
    { label: '',       width: '40px'  },
    { label: 'Cover',  width: '60px'  },
    { label: 'Titre',  width: '2fr'   },
    { label: 'Auteur', width: '1fr'   },
    { label: 'Année',  width: '80px'  },
    { label: 'Edit',   width: '80px'  },
    { label: '',       width: '40px'  },
];

function renderRow(book, { attributes, listeners }) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: COLUMNS.map(c => c.width).join(' '),
            gap: '12px', alignItems: 'center', padding: '12px 16px',
        }}>
            <span {...attributes} {...listeners} style={{ cursor: 'grab', color: '#CDA268' }}>⠿</span>

            <img src={book.cover_image} alt={book.title} style={{
                width: 40, height: 60, objectFit: 'cover',
                borderRadius: '4px', border: '1px solid #CDA268',
            }} />

            <span style={{ color: '#fff' }}>{book.title}</span>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>{book.author}</span>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>{book.published_year || '—'}</span>

            <span onClick={e => { e.stopPropagation(); window.location.href = `/admin/books/${book.id}`; }}>
                <EditIcon />
            </span>

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
        />
    );
}