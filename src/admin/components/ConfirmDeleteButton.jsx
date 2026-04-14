import { useState } from 'react';
import { useDelete, useRefresh } from 'react-admin';

export default function ConfirmDeleteButton({ resource, record, label }) {
    const [deleteOne] = useDelete();
    const refresh = useRefresh();

    const [open, setOpen] = useState(false);
    const [hover, setHover] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleConfirm = (e) => {
        e.stopPropagation();
        setLoading(true);

        deleteOne(resource, { id: record.id }, {
            onSuccess: () => {
                setOpen(false);
                setLoading(false);
                refresh();
            },
            onError: () => {
                setLoading(false);
            }
        });
    };

    return (
        <>
            <span
                onClick={(e) => { e.stopPropagation(); setOpen(true); }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                title="Supprimer"
                style={{ cursor: 'pointer', display: 'inline-flex' }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={hover ? '#ff4d4f' : 'rgba(205,162,104,0.6)'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        width: 20,
                        height: 20,
                        transition: 'stroke 0.2s ease'
                    }}
                >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </span>

            {open && (
                <div
                    onClick={() => setOpen(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        style={{
                            backgroundColor: '#0D1A3E',
                            border: '1px solid rgba(205,162,104,0.3)',
                            borderRadius: '8px',
                            padding: '2rem',
                            width: '360px',
                            textAlign: 'center',
                            transform: 'scale(1)',
                            animation: 'fadeIn 0.2s ease'
                        }}
                    >
                        <p style={{
                            color: '#CDA268',
                            fontSize: '11px',
                            letterSpacing: '0.3em',
                            textTransform: 'uppercase',
                            marginBottom: '8px'
                        }}>
                            Confirmation
                        </p>

                        <p style={{
                            color: '#fff',
                            fontSize: '16px',
                            fontWeight: 300,
                            marginBottom: '8px'
                        }}>
                            Supprimer <strong style={{ color: '#CDA268' }}>{label}</strong> ?
                        </p>

                        <p style={{
                            color: 'rgba(255,255,255,0.4)',
                            fontSize: '13px',
                            marginBottom: '2rem'
                        }}>
                            Cette action est irréversible.
                        </p>

                        <div style={{
                            display: 'flex',
                            gap: '12px',
                            justifyContent: 'center'
                        }}>
                            <button
                                onClick={() => setOpen(false)}
                                disabled={loading}
                                style={{
                                    padding: '8px 24px',
                                    backgroundColor: 'transparent',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    borderRadius: '4px',
                                    color: 'rgba(255,255,255,0.6)',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    fontSize: '13px',
                                }}
                            >
                                Annuler
                            </button>

                            <button
                                onClick={handleConfirm}
                                disabled={loading}
                                style={{
                                    padding: '8px 24px',
                                    backgroundColor: 'transparent',
                                    border: '1px solid #ff4d4f',
                                    borderRadius: '4px',
                                    color: '#ff4d4f',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    fontSize: '13px',
                                    transition: 'all 0.2s ease',
                                }}
                                onMouseEnter={e => {
                                    if (!loading) {
                                        e.target.style.backgroundColor = '#ff4d4f';
                                        e.target.style.color = '#070F2B';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (!loading) {
                                        e.target.style.backgroundColor = 'transparent';
                                        e.target.style.color = '#ff4d4f';
                                    }
                                }}
                            >
                                {loading ? 'Suppression...' : 'Supprimer'}
                            </button>
                        </div>
                    </div>

                    {/* animation simple */}
                    <style>
                        {`
                        @keyframes fadeIn {
                            from {
                                opacity: 0;
                                transform: scale(0.95);
                            }
                            to {
                                opacity: 1;
                                transform: scale(1);
                            }
                        }
                        `}
                    </style>
                </div>
            )}
        </>
    );
}