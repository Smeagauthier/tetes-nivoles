import { Create } from 'react-admin';
import MemberForm from './MemberForm';

export default function MemberCreate() {
    return (
        <Create>
            <MemberForm />
        </Create>
    );
}