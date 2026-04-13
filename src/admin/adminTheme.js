import { defaultTheme } from 'react-admin';

export const adminTheme = {
    ...defaultTheme,
    palette: {
        mode: 'dark',
        primary:    { main: '#CDA268' },
        secondary:  { main: '#CDA268' },
        background: { default: '#070F2B', paper: '#0D1A3E' },
        text:       { primary: '#FFFFFF', secondary: '#CDA268' },
    },
    typography: {
        fontFamily: '"Inter", sans-serif',
    },
    components: {
        ...defaultTheme.components,
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#0D1A3E',
                    borderBottom: '1px solid #CDA268',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#070F2B',
                    borderRight: '1px solid rgba(205,162,104,0.2)',
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:hover': { backgroundColor: 'rgba(205,162,104,0.05) !important' },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: { borderRadius: '4px' },
            },
        },
    },
};