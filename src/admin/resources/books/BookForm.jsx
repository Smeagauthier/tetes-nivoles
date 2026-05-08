import { SimpleForm, TextInput } from 'react-admin';
import ImageUploadInput from '../../components/ImageUploadInput';
import FieldHint from "../../components/FieldHint.jsx";
import BackButton from "../../components/BackButton.jsx";

export default function BookForm() {
    return (
        <SimpleForm>

            <BackButton />

            <TextInput
                source="title"
                label="Titre"
                fullWidth
            />

            <TextInput
                source="author"
                label="Auteur"
                fullWidth
            />

            <TextInput
                source="published_year"
                label="Année"
                fullWidth
            />

            <TextInput
                source="quote"
                label="Extrait"
                multiline
                fullWidth
            />
            <FieldHint>
                Vers que tu veux mettre en avant
            </FieldHint>

            <TextInput
                source="description"
                label="Description"
                multiline
                fullWidth
            />
            <FieldHint>
                Description du livre
            </FieldHint>

            <TextInput
                source="amazon_url"
                label="Lien Amazon"
                fullWidth
            />
            <FieldHint>
                Tu peux ne rien mettre
            </FieldHint>

            <TextInput
                source="fnac_url"
                label="Lien FNAC"
                fullWidth
            />
            <FieldHint>
                Tu peux ne rien mettre
            </FieldHint>

            <TextInput
                source="edilivre_url"
                label="Lien Edilivre"
                fullWidth
            />
            <FieldHint>
                Tu peux ne rien mettre
            </FieldHint>

            <ImageUploadInput
                source="cover_image"
                label="Couverture"
                shape="square"
                preview={160}
                type="books"
                multiple={false}
            />
            <FieldHint>
                Couverture principale du livre (1 photo)
            </FieldHint>

            <ImageUploadInput
                source="back_cover_image"
                label="4ème de couverture"
                shape="square"
                preview={160}
                type="books"
                multiple={false}
            />
            <FieldHint>
                4ème de couverture (1 photo)
            </FieldHint>

        </SimpleForm>
    );
}