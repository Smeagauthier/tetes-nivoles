import { Edit } from 'react-admin';
import MemberForm from './MemberForm';

export default function MemberEdit() {
    return (
        <Edit mutationMode="optimistic">
            <MemberForm />
        </Edit>
    );
}