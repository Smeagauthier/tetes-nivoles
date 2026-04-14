import { Button } from '@mui/material';
import { useRedirect } from 'react-admin';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function BackButton({ label = "Retour" }) {
    const redirect = useRedirect();

    return (
        <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => redirect(-1)}
            sx={{ alignSelf: 'flex-start', mb: 2 }}
        >
            {label}
        </Button>
    );
}