import { Layout, AppBar, UserMenu, Logout } from 'react-admin';
import logo from '../assets/images/logo-tn.png';
const CustomUserMenu = (props) => (
    <UserMenu {...props}>
        <Logout />
    </UserMenu>
);

const CustomAppBar = (props) => (
    <AppBar
        {...props}
        userMenu={<CustomUserMenu />}
        sx={{
            backgroundColor: '#070F2B',
            borderBottom: '1px solid rgba(205,162,104,0.2)',
        }}
    >
        {/* LEFT */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src={logo} style={{ height: '32px' }} />

            <div>
                <div style={{
                    color: '#CDA268',
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase'
                }}>
                    Les Têtes Nivoles
                </div>

                <div style={{ color: '#fff', fontSize: '14px' }}>
                    Administration
                </div>
            </div>
        </div>

        {/* RIGHT */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <a
                href="https://tetesnivoles.fr"
                target="_blank"
                style={{
                    color: '#CDA268',
                    textDecoration: 'none',
                    fontSize: '12px',
                    letterSpacing: '0.1em'
                }}
            >
                Voir le site ↗
            </a>

            {props.userMenu}
        </div>
    </AppBar>
);

export const AdminLayout = (props) => (
    <Layout {...props} appBar={CustomAppBar} />
);