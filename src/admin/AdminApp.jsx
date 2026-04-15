// import { Admin, Resource, List } from 'react-admin';
// import polyglotI18nProvider from 'ra-i18n-polyglot';
// import frenchMessages from 'ra-language-french';
//
// import { dataProvider } from './dataProvider';
// import { adminTheme }   from './adminTheme';
// import AdminLogin       from './AdminLogin';
//
// // Members
// import MemberListDraggable from './resources/members/MemberList';
// import MemberEdit          from './resources/members/MemberEdit';
// import MemberCreate        from './resources/members/MemberCreate';
//
// // Books
// import BookListDraggable   from './resources/books/BookList';
// import BookEdit            from './resources/books/BookEdit';
// import BookCreate          from './resources/books/BookCreate';
//
// //Events
// import EventListDraggable   from './resources/events/EventList';
// import EventEdit            from './resources/events/EventEdit';
// import EventCreate          from './resources/events/EventCreate';
//
// //Heros
// import HeroListDraggable   from './resources/heros/HeroList';
// import HeroEdit            from './resources/heros/HeroEdit';
// import HeroCreate          from './resources/heros/HeroCreate';
//
// const i18nProvider = polyglotI18nProvider(() => frenchMessages, 'fr');
//
// const authProvider = {
//     login: ({ username, password }) => {
//         if (username === 'admin' && password === 'tetes2024') {
//             localStorage.setItem('auth', 'true');
//             return Promise.resolve();
//         }
//         return Promise.reject(new Error('Identifiants incorrects'));
//     },
//     logout:         () => { localStorage.removeItem('auth'); return Promise.resolve(); },
//     checkAuth:      () => localStorage.getItem('auth') ? Promise.resolve() : Promise.reject(),
//     checkError:     ({ status }) => status === 401 || status === 403 ? Promise.reject() : Promise.resolve(),
//     getPermissions: () => Promise.resolve(),
// };
//
// const MemberListPage = () => <List pagination={false}><MemberListDraggable /></List>;
// const BookListPage   = () => <List pagination={false}><BookListDraggable /></List>;
// const EventListPage   = () => <List pagination={false}><EventListDraggable /></List>;
// const HeroListPage   = () => <List pagination={false}><HeroListDraggable /></List>;
//
// export default function AdminApp() {
//     return (
//         <Admin
//             dataProvider={dataProvider}
//             authProvider={authProvider}
//             i18nProvider={i18nProvider}
//             theme={adminTheme}
//             loginPage={<AdminLogin />}
//             basename="/admin"
//             disableTelemetry
//         >
//             <Resource
//                 name="heros"
//                 list={HeroListPage}
//                 edit={HeroEdit}
//                 create={HeroCreate}
//                 options={{ label: 'Héros' }}
//             />
//             <Resource
//                 name="members"
//                 list={MemberListPage}
//                 edit={MemberEdit}
//                 create={MemberCreate}
//                 options={{ label: 'Membres' }}
//             />
//             <Resource
//                 name="books"
//                 list={BookListPage}
//                 edit={BookEdit}
//                 create={BookCreate}
//                 options={{ label: 'Livres' }}
//             />
//             <Resource
//                 name="events"
//                 list={EventListPage}
//                 edit={EventEdit}
//                 create={EventCreate}
//                 options={{ label: 'Evènements' }}
//             />
//         </Admin>
//     );
// }

import { Admin, Resource, List } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import frenchMessages from 'ra-language-french';

import { dataProvider } from './dataProvider';
import { adminTheme } from './adminTheme';
import AdminLogin from './AdminLogin';

// Members
import MemberListDraggable from './resources/members/MemberList';
import MemberEdit from './resources/members/MemberEdit';
import MemberCreate from './resources/members/MemberCreate';

// Books
import BookListDraggable from './resources/books/BookList';
import BookEdit from './resources/books/BookEdit';
import BookCreate from './resources/books/BookCreate';

// Events
import EventListDraggable from './resources/events/EventList';
import EventEdit from './resources/events/EventEdit';
import EventCreate from './resources/events/EventCreate';

// Heros
import HeroListDraggable from './resources/heros/HeroList';
import HeroEdit from './resources/heros/HeroEdit';
import HeroCreate from './resources/heros/HeroCreate';

const i18nProvider = polyglotI18nProvider(() => frenchMessages, 'fr');

const API_URL = '/api';

export const authProvider = {
    login: async ({ username, password }) => {
        const res = await fetch(`${API_URL}/login.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            throw new Error("Invalid JSON from server");
        }

        if (!res.ok) {
            throw new Error(data.error || 'Login failed');
        }

        localStorage.setItem('token', data.token);

        return Promise.resolve();
    },

    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },

    checkAuth: () => {
        return localStorage.getItem('token')
            ? Promise.resolve()
            : Promise.reject();
    },

    checkError: (error) => {
        const status = error?.status;

        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }

        return Promise.resolve();
    },

    getPermissions: () => Promise.resolve(),
};

const MemberListPage = () => (
    <List pagination={false}>
        <MemberListDraggable />
    </List>
);

const BookListPage = () => (
    <List pagination={false}>
        <BookListDraggable />
    </List>
);

const EventListPage = () => (
    <List pagination={false}>
        <EventListDraggable />
    </List>
);

const HeroListPage = () => (
    <List pagination={false}>
        <HeroListDraggable />
    </List>
);

export default function AdminApp() {
    return (
        <Admin
            dataProvider={dataProvider}
            authProvider={authProvider}
            i18nProvider={i18nProvider}
            theme={adminTheme}
            loginPage={<AdminLogin />}
            basename="/admin"
            disableTelemetry
        >
            <Resource
                name="heros"
                list={HeroListPage}
                edit={HeroEdit}
                create={HeroCreate}
                options={{ label: 'Héros' }}
            />

            <Resource
                name="members"
                list={MemberListPage}
                edit={MemberEdit}
                create={MemberCreate}
                options={{ label: 'Membres' }}
            />

            <Resource
                name="books"
                list={BookListPage}
                edit={BookEdit}
                create={BookCreate}
                options={{ label: 'Livres' }}
            />

            <Resource
                name="events"
                list={EventListPage}
                edit={EventEdit}
                create={EventCreate}
                options={{ label: 'Évènements' }}
            />
        </Admin>
    );
}