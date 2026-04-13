import { useState } from 'react';
import { useInput } from 'react-admin';

export default function MemberPhotoInput({ source }) {
    const { field } = useInput({ source });
    const [preview, setPreview]   = useState(field.value || null);
    const [loading, setLoading]   = useState(false);
    const [error,   setError]     = useState(null);

    const handleFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const allowed = ['image/jpeg', 'image/png', 'image/webp'];
        if (!allowed.includes(file.type)) {
            setError('Format non autorisé (jpg, jpeg, png, webp uniquement)');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setError('Fichier trop lourd (5 Mo max)');
            return;
        }

        setError(null);
        setLoading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res  = await fetch('/api/upload.php', {
                method: 'POST',
                body:   formData,
            });
            const data = await res.json();

            if (data.error) {
                setError(data.error);
            } else {
                field.onChange(data.url);
                setPreview(data.url);
            }
        } catch {
            setError('Erreur réseau');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ marginBottom: '1.5rem', width: '100%' }}>
            <p style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '12px',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
            }}>
                Photo
            </p>

            {/* Aperçu */}
            {preview && (
                <img
                    src={preview}
                    alt="Aperçu"
                    style={{
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                        border: '2px solid #CDA268',
                        display: 'block',
                        marginBottom: '12px',
                    }}
                />
            )}

            {/* Input fichier */}
            <label style={{
                display:         'inline-block',
                padding:         '8px 20px',
                backgroundColor: 'transparent',
                border:          '1px solid #CDA268',
                color:           '#CDA268',
                borderRadius:    '4px',
                cursor:          'pointer',
                fontSize:        '13px',
                letterSpacing:   '0.05em',
            }}>
                {loading ? 'Upload en cours...' : 'Choisir une photo'}
                <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={handleFile}
                    style={{ display: 'none' }}
                />
            </label>

            {/* Formats acceptés */}
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', marginTop: '8px' }}>
                JPG, JPEG, PNG, WEBP — 5 Mo max
            </p>

            {/* Erreur */}
            {error && (
                <p style={{ color: '#f44336', fontSize: '12px', marginTop: '8px' }}>
                    {error}
                </p>
            )}
        </div>
    );
}