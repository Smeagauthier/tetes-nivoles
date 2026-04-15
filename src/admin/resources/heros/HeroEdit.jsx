import { Edit } from 'react-admin';
import HeroForm from './HeroForm.jsx';

export default function HeroEdit() {
    return (
        <Edit mutationMode="optimistic">
            <HeroForm />
        </Edit>
    );
}