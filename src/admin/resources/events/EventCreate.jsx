import { Create } from 'react-admin';
import EventForm from './EventForm';

export default function EventCreate() {
    return (
        <Create>
            <EventForm />
        </Create>
    );
}