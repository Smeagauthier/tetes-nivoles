import { useState } from 'react';
import { useLogin } from 'react-admin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/images/logo-tn.png';

export default function AdminLogin() {
    const login = useLogin();

    const [username, setUsername]       = useState('');
    const [password, setPassword]       = useState('');
    const [showPassword, setShowPassword] = useState(false);

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
                    background: 'rgba(13,26,62,0.9)',
                    backdropFilter: 'blur(10px)',
                    padding: '48px 36px',
                    borderRadius: '14px',
                    border: '1px solid rgba(205,162,104,0.3)',
                    width: '360px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
                }}
            >
                {/* LOGO */}
                <div style={{ textAlign: 'center', marginBottom: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={logo} style={{ height: '80px', marginBottom: '12px', display: 'block' }} />
                    <p style={{
                        color: '#CDA268',
                        letterSpacing: '0.3em',
                        fontSize: '12px',
                        margin: 0,
                        marginTop:'20px',
                        textTransform: 'uppercase',
                    }}>
                        Administration
                    </p>
                </div>

                {/* SEPARATEUR */}
                <div style={{
                    height: '1px',
                    background: 'linear-gradient(to right, transparent, rgba(205,162,104,0.3), transparent)',
                }} />

                {/* IDENTIFIANT */}
                <div style={{ position: 'relative' }}>
                    <FontAwesomeIcon
                        icon={faUser}
                        style={{
                            position: 'absolute',
                            left: '14px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'rgba(205,162,104,0.5)',
                            fontSize: '13px',
                            pointerEvents: 'none',
                        }}
                    />
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Identifiant"
                        autoComplete="username"
                        style={{ ...inputStyle, paddingLeft: '40px' }}
                    />
                </div>

                {/* MOT DE PASSE */}
                <div style={{ position: 'relative' }}>
                    <FontAwesomeIcon
                        icon={faLock}
                        style={{
                            position: 'absolute',
                            left: '14px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'rgba(205,162,104,0.5)',
                            fontSize: '13px',
                            pointerEvents: 'none',
                        }}
                    />
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                        autoComplete="current-password"
                        style={{ ...inputStyle, paddingLeft: '40px', paddingRight: '44px' }}
                    />
                    {/* Toggle visibilité */}
                    <button
                        type="button"
                        onClick={() => setShowPassword(v => !v)}
                        style={{
                            position: 'absolute',
                            right: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: showPassword ? '#CDA268' : 'rgba(255,255,255,0.3)',
                            padding: '4px',
                            transition: 'color 0.2s ease',
                        }}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{ fontSize: '14px' }} />
                    </button>
                </div>

                {/* BOUTON */}
                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseEnter={e => e.currentTarget.style.background = '#b8893a'}
                    onMouseLeave={e => e.currentTarget.style.background = '#CDA268'}
                >
                    <FontAwesomeIcon icon={faArrowRightToBracket} style={{ marginRight: '8px' }} />
                    Se connecter
                </button>

            </form>
        </div>
    );
}

const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    background: 'rgba(7,15,43,0.8)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#fff',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease',
};

const buttonStyle = {
    width: '100%',
    padding: '13px',
    background: '#CDA268',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 700,
    borderRadius: '8px',
    fontSize: '14px',
    letterSpacing: '0.08em',
    color: '#070F2B',
    transition: 'background 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};