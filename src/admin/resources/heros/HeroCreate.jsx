import { Create } from 'react-admin';
import HeroForm from './HeroForm';

export default function HeroCreate() {
    return (
        <Create defaultValues={{ is_active: true }}>
            <HeroForm />
        </Create>
    );
}