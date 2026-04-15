import { SimpleForm, TextInput } from 'react-admin';
import ImageUploadInput from '../../components/ImageUploadInput';

export default function BookForm() {
    return (
        <SimpleForm>
            <TextInput source="title"        label="Titre"       fullWidth  />
            <TextInput source="author"       label="Auteur"      fullWidth  />
            <TextInput source="published_year" label="Année"     fullWidth  />
            <TextInput source="quote"        label="Extrait"     multiline fullWidth  />
            <TextInput source="description"  label="Description" multiline fullWidth  />
            <TextInput source="amazon_url"  label="Lien Amazon"  fullWidth  />
            <TextInput source="fnac_url"  label="Lien FNAC"  fullWidth  />
            <TextInput source="edilivre_url"  label="Lien Ediivre"  fullWidth  />
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