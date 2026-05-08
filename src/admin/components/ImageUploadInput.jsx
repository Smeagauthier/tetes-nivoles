import { useState } from 'react';
import { useInput } from 'react-admin';

export default function ImageUploadInput({
                                             source,
                                             label = 'Images',
                                             uploadPath = '/api/upload.php',
                                             shape = 'square',
                                             preview = null,
                                             multiple = true,
                                             type = 'members' // 👈 IMPORTANT (events / members / books)
                                         }) {
    const { field } = useInput({ source });

    const [loadingIndex, setLoadingIndex] = useState(null);
    const [error, setError] = useState(null);

    // normalisation robuste (string / array / null)
    const images = Array.isArray(field.value)
        ? field.value
        : field.value
            ? [field.value]
            : [];

    const previewSize = preview || (shape === 'circle' ? 100 : 120);

    const updateImages = (newImages) => {
        field.onChange(newImages);
    };

    const handleFile = async (e, index = null) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type); // IMPORTANT pour ton PHP

        const token = localStorage.getItem('token');


        try {
            const res = await fetch(uploadPath, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await res.json();

            if (data.error) {
                setError(data.error);
                return;
            }

            if (!multiple) {
                field.onChange({ url: data.url });
                return;
            }

            const newImages = [...images];

            if (index !== null) {
                newImages[index] = { url: data.url };
            } else {
                newImages.push({ url: data.url });
            }

            field.onChange(newImages);

        } catch {
            setError('Erreur réseau');
        }
    };

    const removeImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        updateImages(newImages);
    };

    return (
        <div style={{ marginBottom: 28, width: '100%' }}>

            {/* LABEL */}
            <div style={{
                marginBottom: 12,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <p style={{
                    color: '#fff',
                    fontSize: 12,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    opacity: 0.8
                }}>
                    {label}
                </p>

                <span style={{
                    fontSize: 11,
                    color: 'rgba(205,162,104,0.8)'
                }}>
                {multiple ? 'Images multiples' : 'Image unique'}
            </span>
            </div>

            {/* GRID IMAGES */}
            <div style={{
                display: 'flex',
                gap: 14,
                flexWrap: 'wrap',
                marginBottom: 16
            }}>

                {images.map((img, i) => {
                    const url = typeof img === 'string' ? img : img.url;

                    return (
                        <div
                            key={i}
                            style={{
                                position: 'relative',
                                width: previewSize,
                                height: previewSize,
                                borderRadius: shape === 'circle' ? '50%' : 10,
                                overflow: 'hidden',
                                border: '1px solid rgba(205,162,104,0.3)',
                                background: 'rgba(255,255,255,0.03)',
                                transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) =>
                                e.currentTarget.style.transform = 'scale(1.02)'
                            }
                            onMouseLeave={(e) =>
                                e.currentTarget.style.transform = 'scale(1)'
                            }
                        >

                            <img
                                src={url}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />

                            {/* OVERLAY ACTIONS */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                                opacity: 0,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                                padding: 8,
                                transition: '0.2s'
                            }}
                                 className="img-overlay"
                            >

                                {/* replace */}
                                <label style={{
                                    background: 'rgba(0,0,0,0.7)',
                                    color: '#CDA268',
                                    fontSize: 14,
                                    padding: '4px 8px',
                                    borderRadius: 6,
                                    cursor: 'pointer',
                                    backdropFilter: 'blur(4px)'
                                }}>
                                    ✎
                                    <input
                                        type="file"
                                        hidden
                                        onChange={(e) => handleFile(e, i)}
                                    />
                                </label>

                                {/* delete */}
                                <button
                                    onClick={() => removeImage(i)}
                                    style={{
                                        background: 'rgba(255,0,0,0.8)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: 6,
                                        cursor: 'pointer',
                                        width: 26,
                                        height: 26,
                                        fontSize: 14,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    ×
                                </button>

                            </div>

                        </div>
                    );
                })}

            </div>

            {/* ADD BUTTON */}
            <label style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 14px',
                border: '1px dashed rgba(205,162,104,0.6)',
                color: '#CDA268',
                cursor: 'pointer',
                fontSize: 12,
                borderRadius: 8,
                transition: '0.2s',
                background: 'rgba(205,162,104,0.03)'
            }}
                   onMouseEnter={(e) =>
                       e.currentTarget.style.background = 'rgba(205,162,104,0.08)'
                   }
                   onMouseLeave={(e) =>
                       e.currentTarget.style.background = 'rgba(205,162,104,0.03)'
                   }
            >
                + Ajouter une image
                <input
                    type="file"
                    hidden
                    onChange={(e) => handleFile(e)}
                />
            </label>

            {/* ERROR */}
            {error && (
                <p style={{
                    color: '#ff4d4f',
                    fontSize: 12,
                    marginTop: 10
                }}>
                    {error}
                </p>
            )}

        </div>
    );
}