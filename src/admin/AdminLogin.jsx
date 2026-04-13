import { Login, LoginForm } from 'react-admin';

export default function AdminLogin() {
    return (
        <Login
            sx={{
                backgroundImage: 'none',
                backgroundColor: '#070F2B',
                '& .RaLogin-card': {
                    backgroundColor: '#0D1A3E',
                    border: '1px solid rgba(205,162,104,0.3)',
                    borderRadius: '8px',
                    padding: '2rem',
                    boxShadow: '0 0 40px rgba(205,162,104,0.1)',
                },
            }}
        >
            {/* Logo + titre */}
            <div style={{
                textAlign: 'center',
                padding: '1.5rem 0 1rem',
            }}>
                <p style={{
                    color: '#CDA268',
                    letterSpacing: '0.4em',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                }}>
                    Les Têtes Nivoles
                </p>
                <h1 style={{
                    color: '#FFFFFF',
                    fontSize: '20px',
                    fontWeight: 300,
                    letterSpacing: '0.1em',
                    margin: 0,
                }}>
                    Backoffice
                </h1>
                <div style={{
                    width: '40px',
                    height: '1px',
                    backgroundColor: '#CDA268',
                    margin: '16px auto 0',
                }} />
            </div>

            <LoginForm />
        </Login>
    );
}