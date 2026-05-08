import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FaIcon({ icon, color }) {
    return (
        <FontAwesomeIcon
            icon={icon}
            style={{
                fontSize: '18px',
                color: color,
                transition: '0.2s ease'
            }}
        />
    );
}