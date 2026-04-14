import { SimpleForm, TextInput } from 'react-admin';
import ImageUploadInput from '../../components/ImageUploadInput';

export default function BookForm() {
    return (
        <SimpleForm>
            <TextInput source="title"        label="Titre"       fullWidth  name={"title"}/>
            <TextInput source="author"       label="Auteur"      fullWidth  name={"author"}/>
            <TextInput source="published_year" label="Année"     fullWidth  name={"published_year"}/>
            <TextInput source="quote"        label="Extrait"     multiline fullWidth  name={"quote"}/>
            <TextInput source="description"  label="Description" multiline fullWidth  name={"description"}/>
            <ImageUploadInput
                source="cover_image"
                label="Couverture"
                shape="square"
                preview={160}
                type="books"
                multiple={false}
            />
            <ImageUploadInput
                source="back_cover_image"
                label="Couverture (verso)"
                shape="square"
                preview={160}
                type="books"
                multiple={false}
            />
        </SimpleForm>
    );
}