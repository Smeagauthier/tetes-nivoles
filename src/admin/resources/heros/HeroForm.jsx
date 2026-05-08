import { SimpleForm, TextInput, BooleanInput } from "react-admin";
import ImageUploadInput from "../../components/ImageUploadInput";
import BackButton from "../../components/BackButton.jsx";
import FieldHint from "../../components/FieldHint.jsx";

export default function HeroForm() {
    return (
        <SimpleForm>
            <BackButton />

            <TextInput
                source="title"
                label="Titre"
                fullWidth />
            <FieldHint>
                Phrase mise en avant à la première vue du site
            </FieldHint>

            <TextInput
                source="subtitle"
                label="Sous-titre"
                fullWidth />
            <FieldHint>
                Source du titre (Exemple : - Mickaël Crépin, « Tâche d'encre »)
            </FieldHint>

            <ImageUploadInput
                source="images"
                label="Images du hero"
                type="heros"
                multiple
                max={10}
            />
            <FieldHint>
                Formats acceptés : PNG, JPG, JPEG, WEBP et 5 Mo max
            </FieldHint>

            {/* ACTIF */}
            <BooleanInput source="is_active" label="Actif" />
            <FieldHint>
                Affiche ce hero sur le site
            </FieldHint>
        </SimpleForm>
    );
}