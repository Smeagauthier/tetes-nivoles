import { SimpleForm, TextInput } from 'react-admin';
import ImageUploadInput from '../../components/ImageUploadInput';
import BackButton from "../../components/BackButton.jsx";


export default function MemberForm() {

    return (
        <SimpleForm>

            <BackButton />
            <TextInput source="name"  label="Prénom - Nom" fullWidth  />
            <TextInput source="role"  label="Rôle"         fullWidth  />
            <TextInput source="bio"   label="Bio" multiline fullWidth  />
            <ImageUploadInput
                source="photo"
                label="Photo"
                shape="circle"
                type="members"
            />
        </SimpleForm>
    );
}