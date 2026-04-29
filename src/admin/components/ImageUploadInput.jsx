import { useState } from 'react';
import { useInput } from 'react-admin';

export default function ImageUploadInput({
                                             source,
                                             label = 'Images',
                                             uploadPath = '/api/upload.php',
                                             shape = 'square',
                                             preview = null,
                                             multiple = true,
                                             type = 'members' // IMPORTANT (events / members / books)
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
        <div style={{ marginBottom: 24, width: '100%' }}>

            {/* LABEL */}
            <p style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: 12,
                marginBottom: 12,
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
            }}>
                {label}
            </p>

            {/* IMAGES PREVIEW */}
            <div style={{
                display: 'flex',
                gap: 12,
                flexWrap: 'wrap',
                marginBottom: 16
            }}>
                {images.map((img, i) => {
                    const url = typeof img === 'string' ? img : img.url;

                    return (
                        <div key={i} style={{ position: 'relative' }}>

                            <img
                                src={url}
                                style={{
                                    width: previewSize,
                                    height: previewSize,
                                    objectFit: 'cover',
                                    borderRadius: shape === 'circle' ? '50%' : 8,
                                    border: '2px solid #CDA268'
                                }}
                            />

                            {/* replace image */}
                            <label style={{
                                position: 'absolute',
                                bottom: 4,
                                left: 4,
                                background: '#000',
                                color: '#CDA268',
                                fontSize: 20,
                                padding: '2px 6px',
                                cursor: 'pointer'
                            }}>
                                {loadingIndex === i ? '...' : '✎'}
                                <input
                                    type="file"
                                    hidden
                                    onChange={(e) => handleFile(e, i)}
                                />
                            </label>

                            {/* delete image */}
                            <button
                                onClick={() => removeImage(i)}
                                style={{
                                    position: 'absolute',
                                    top: 4,
                                    right: 4,
                                    background: 'red',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: 4,
                                    cursor: 'pointer',
                                    width: 20,
                                    height: 20,
                                    fontSize: 15,
                                    lineHeight: '18px'
                                }}
                            >
                                ×
                            </button>

                        </div>
                    );
                })}
            </div>

            {/* ADD IMAGE */}
            <label style={{
                display: 'inline-block',
                padding: '8px 16px',
                border: '1px solid #CDA268',
                color: '#CDA268',
                cursor: 'pointer',
                fontSize: 13,
                borderRadius: 4
            }}>
                + Ajouter une image
                <input
                    type="file"
                    hidden
                    onChange={(e) => handleFile(e)}
                />
            </label>

            {/* ERROR */}
            {error && (
                <p style={{ color: 'red', fontSize: 12, marginTop: 8 }}>
                    {error}
                </p>
            )}

        </div>
    );
}