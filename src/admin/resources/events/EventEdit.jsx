import { Edit } from 'react-admin';
import EventForm from './EventForm';

export default function EventEdit() {
    return (
        <Edit mutationMode="optimistic">
            <EventForm />
        </Edit>
    );
}