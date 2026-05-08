import { SimpleForm, TextInput } from 'react-admin';
import ImageUploadInput from '../../components/ImageUploadInput';
import BackButton from "../../components/BackButton.jsx";
import FieldHint from "../../components/FieldHint.jsx";


export default function MemberForm() {

    return (
        <SimpleForm>

            <BackButton />

            <TextInput source="name"  label="Prénom" fullWidth  />
            <TextInput source="role"  label="Rôle"         fullWidth  />
            <FieldHint>
                Garde une cohérence avec tous les rôles (& au lieu de et, ...)
            </FieldHint>
            <TextInput source="bio"   label="Bio" multiline fullWidth  />
            <FieldHint>
                Une ligne et demi maximum, veille à vérifier ce que ça donne sur le site
            </FieldHint>
            <ImageUploadInput
                source="photo"
                label="Photo"
                shape="circle"
                type="members"
            />
            <FieldHint>
                Formats acceptés : PNG, JPG, JPEG, WEBP et 5 Mo max. Une seule photo
            </FieldHint>
        </SimpleForm>
    );
}