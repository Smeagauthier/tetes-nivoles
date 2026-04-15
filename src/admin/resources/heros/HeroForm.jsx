import { SimpleForm, TextInput } from "react-admin";
import ImageUploadInput from "../../components/ImageUploadInput";
import BackButton from "../../components/BackButton.jsx";

export default function HeroForm() {
    return (
        <SimpleForm>
            <BackButton />

            <TextInput
                source="title"
                label="Titre"
                fullWidth />

            <TextInput
                source="subtitle"
                label="Sous-titre"
                fullWidth/>

            <ImageUploadInput
                source="images"
                label="Images du hero"
                type="heros"
                multiple
                max={10}
            />
        </SimpleForm>
    );
}