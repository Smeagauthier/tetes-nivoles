import { Create } from 'react-admin';
import HeroForm from './HeroForm.jsx';

export default function HeroCreate() {
    return (
        <Create>
            <HeroForm />
        </Create>
    );
}