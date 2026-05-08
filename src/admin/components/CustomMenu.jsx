import { Menu } from 'react-admin';
import FaIcon from './FaIcon';
import { MENU_CONFIG } from './MenuConfig.jsx';

export default function CustomMenu(props) {
    return (
        <Menu {...props}>

            {/* SECTION CONTENU */}
            <div style={{
                padding: '10px 16px 4px',
                fontSize: '10px',
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase'
            }}>
                Contenu
            </div>

            {['heros', 'members', 'books'].map((key) => {
                const config = MENU_CONFIG[key];

                return (
                    <Menu.Item
                        key={key}
                        to={`/${key}`}
                        primaryText={
                            key === 'heros' ? 'Héros'
                                : key === 'members' ? 'Membres'
                                    : 'Livres'
                        }
                        leftIcon={<FaIcon icon={config.icon} color={config.color} />}
                        sx={{
                            borderRadius: '6px',
                            '&.RaMenuItemLink-active': {
                                color: '#CDA268',
                                backgroundColor: 'rgba(205,162,104,0.10)',
                                fontWeight: 600,
                            },
                            '&:hover': {
                                backgroundColor: 'rgba(205,162,104,0.06)',
                            }
                        }}
                    />
                );
            })}

            {/* SECTION ÉVÈNEMENTS */}
            <div style={{
                padding: '16px 16px 4px',
                fontSize: '10px',
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase'
            }}>
                Évènements
            </div>

            <Menu.Item
                to="/events"
                primaryText="Évènements"
                leftIcon={<FaIcon icon={MENU_CONFIG.events.icon} color="#CDA268" />}
                sx={{
                    borderRadius: '6px',
                    '&.RaMenuItemLink-active': {
                        color: '#CDA268',
                        backgroundColor: 'rgba(205,162,104,0.10)',
                        fontWeight: 600,
                    },
                    '&:hover': {
                        backgroundColor: 'rgba(205,162,104,0.06)',
                    }
                }}
            />

        </Menu>
    );
}