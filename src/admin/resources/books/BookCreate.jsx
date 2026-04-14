import { Create } from 'react-admin';
import BookForm from './BookForm';

export default function BookCreate() {
    return (
        <Create>
            <BookForm />
        </Create>
    );
}