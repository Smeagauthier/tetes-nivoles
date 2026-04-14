import { defaultTheme } from 'react-admin';

export const adminTheme = {
    ...defaultTheme,
    palette: {
        mode: 'dark',
        primary:    { main: '#CDA268' },
        secondary:  { main: '#CDA268' },
        error:      { main: '#ff4d4f' },
        background: { default: '#070F2B', paper: '#0D1A3E' },
        text:       { primary: '#FFFFFF', secondary: '#CDA268' },
    },
    typography: {
        fontFamily: '"Inter", sans-serif',
    },
    components: {
        ...defaultTheme.components,

        /* ── APP BAR ── */
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#0D1A3E',
                    borderBottom: '1px solid #CDA268',
                    boxShadow: 'none',
                },
            },
        },

        /* ── DRAWER ── */
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#070F2B',
                    borderRight: '1px solid rgba(205,162,104,0.2)',
                },
            },
        },

        /* ── ROWS ── */
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:hover': { backgroundColor: 'rgba(205,162,104,0.05) !important' },
                },
            },
        },

        /* ── BOUTONS ── */
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    fontSize: '12px',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                },
                // Bouton principal : "Enregistrer"
                contained: {
                    backgroundColor: '#CDA268',
                    color: '#070F2B',
                    border: '1px solid #CDA268',
                    boxShadow: 'none',
                    '&:hover': {
                        backgroundColor: 'transparent',
                        color: '#CDA268',
                        boxShadow: 'none',
                    },
                },
                // Boutons secondaires : "Annuler", retour...
                outlined: {
                    borderColor: 'rgba(205,162,104,0.4)',
                    color: '#CDA268',
                    '&:hover': {
                        borderColor: '#CDA268',
                        backgroundColor: 'rgba(205,162,104,0.05)',
                    },
                },
                // Boutons texte : liens de navigation
                text: {
                    color: '#CDA268',
                    '&:hover': {
                        backgroundColor: 'rgba(205,162,104,0.05)',
                    },
                },
            },
            containedError: {
                backgroundColor: '#ff4d4f',
                color: '#fff',
                border: '1px solid #ff4d4f',
                boxShadow: 'none',
                '&:hover': {
                    backgroundColor: 'transparent',
                    color: '#ff4d4f',
                },
            },
            outlinedError: {
                borderColor: '#ff4d4f',
                color: '#ff4d4f',
                '&:hover': {
                    backgroundColor: 'rgba(255,77,79,0.08)',
                    borderColor: '#ff4d4f',
                },
            },
        },

        /* ── INPUTS ── */
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    borderRadius: '4px',
                    '& fieldset': {
                        borderColor: 'rgba(205,162,104,0.25)',
                    },
                    '&:hover fieldset': {
                        borderColor: 'rgba(205,162,104,0.6) !important',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#CDA268 !important',
                        borderWidth: '1px !important',
                    },
                },
                input: {
                    color: '#fff',
                    fontSize: '14px',
                },
            },
        },

        /* ── LABELS ── */
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '13px',
                    '&.Mui-focused': {
                        color: '#CDA268',
                    },
                },
            },
        },

        /* ── TOOLBAR DU FORMULAIRE (contient le bouton Save) ── */
        RaToolbar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#0D1A3E',
                    borderTop: '1px solid rgba(205,162,104,0.2)',
                    padding: '16px 24px',
                    marginTop: '8px',
                    display: 'flex',
                    gap: '12px',
                },
            },
        },

        /* ── CARD DU FORMULAIRE ── */
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#0D1A3E',
                    border: '1px solid rgba(205,162,104,0.15)',
                    borderRadius: '8px',
                    boxShadow: 'none',
                },
            },
        },

        /* ── PAPER (fond des pages Edit/Create) ── */
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#0D1A3E',
                    backgroundImage: 'none',
                },
            },
        },

        /* ── SIMPLE FORM ── */
        RaSimpleForm: {
            styleOverrides: {
                root: {
                    padding: '24px',
                    '& .RaSimpleForm-form': {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                    },
                },
            },
        },
    },
};