import { Edit } from 'react-admin';
import BookForm from './BookForm';

export default function BookEdit() {
    return (
        <Edit mutationMode="optimistic">
            <BookForm />
        </Edit>
    );
}