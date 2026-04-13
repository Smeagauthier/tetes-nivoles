import { Admin, Resource, List, SimpleForm,
    TextInput, Edit, Create,
    useNotify, useRefresh } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import frenchMessages from 'ra-language-french';
import { dataProvider } from './dataProvider';
import { adminTheme } from './adminTheme';
import AdminLogin from './AdminLogin';
import MemberListDraggable from './MemberListDraggable';
import MemberPhotoInput from './MemberPhotoInput';

const i18nProvider = polyglotI18nProvider(() => frenchMessages, 'fr');

const authProvider = {
    login: ({ username, password }) => {
        if (username === 'admin' && password === 'tetes2024') {
            localStorage.setItem('auth', 'true');
            return Promise.resolve();
        }
        return Promise.reject(new Error('Identifiants incorrects'));
    },
    logout: () => {
        localStorage.removeItem('auth');
        return Promise.resolve();
    },
    checkAuth: () =>
        localStorage.getItem('auth') ? Promise.resolve() : Promise.reject(),
    checkError: ({ status }) =>
        status === 401 || status === 403 ? Promise.reject() : Promise.resolve(),
    getPermissions: () => Promise.resolve(),
};

const MemberList = () => (
    <List pagination={false}>
        <MemberListDraggable />
    </List>
);

const MemberForm = () => (
    <SimpleForm>
        <TextInput source="name" label="Prénom - Nom"  fullWidth />
        <TextInput source="role" label="Rôle" fullWidth />
        <TextInput source="bio"  label="Bio"  multiline fullWidth />
        <MemberPhotoInput source="photo" />
    </SimpleForm>
);

const MemberEdit = () => {
    const refresh = useRefresh();
    const notify  = useNotify();

    return (
        <Edit
            mutationMode="optimistic"
            onSuccess={() => {
                notify('Membre mis à jour');
                refresh();
            }}
        >
            <MemberForm />
        </Edit>
    );
};

const MemberCreate = () => (
    <Create>
        <MemberForm />
    </Create>
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
                name="members"
                list={MemberList}
                edit={MemberEdit}
                create={MemberCreate}
                options={{ label: 'Membres' }}
            />
        </Admin>
    );
}