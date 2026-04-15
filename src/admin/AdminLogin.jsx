import { useState } from 'react';
import { useLogin } from 'react-admin';

export default function AdminLogin() {
    const login = useLogin();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ username, password });
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#070F2B',
        }}>
            <form
                onSubmit={handleSubmit}
                style={{
                    background: '#0D1A3E',
                    padding: '2rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(205,162,104,0.3)',
                    width: '320px',
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <p style={{ color: '#CDA268', letterSpacing: '0.3em' }}>
                        Les Têtes Nivoles
                    </p>

                </div>

                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    style={{
                        width: '100%',
                        marginBottom: '10px',
                        padding: '10px',
                    }}
                />

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    style={{
                        width: '100%',
                        marginBottom: '20px',
                        padding: '10px',
                    }}
                />

                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '10px',
                        background: '#CDA268',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                >
                    Login
                </button>
            </form>
        </div>
    );
}