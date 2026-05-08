import { SimpleForm, TextInput, NumberInput, DateTimeInput, BooleanInput } from 'react-admin';
import ImageUploadInput from '../../components/ImageUploadInput';
import BackButton from "../../components/BackButton.jsx";
import { useRecordContext } from 'react-admin';
import FieldHint from "../../components/FieldHint.jsx";

function ImagesPreview() {
    const record = useRecordContext();

    const images = record?.images || [];

    if (!images.length) return null;

    return (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            {images.map((img, i) => {
                const url = typeof img === 'string' ? img : img.url;

                return (
                    <img
                        key={i}
                        src={url}
                        style={{
                            width: 80,
                            height: 80,
                            objectFit: 'cover',
                            borderRadius: 8,
                            border: '2px solid #CDA268'
                        }}
                    />
                );
            })}
        </div>
    );
}

export default function EventForm() {

    return (
        <SimpleForm>

            <BackButton />

            {/* PREVIEW EXISTANT */}
            <ImagesPreview />

            {/* TITRE */}
            <TextInput source="title" label="Titre de l'événement" fullWidth />

            {/* SPECTACLE */}
            {/*<TextInput source="show_name" label="Nom du spectacle" fullWidth />*/}

            {/* DESCRIPTION */}
            <TextInput source="description" label="Description" multiline fullWidth />

            {/* LIEU */}
            <TextInput source="location" label="Lieu" fullWidth />
            <FieldHint>
                Adresse ou lieu-dit présent sur Google Maps
            </FieldHint>

            {/* DATE */}
            <DateTimeInput source="event_date" label="Date de l'événement" fullWidth />
            <FieldHint>
                Date et heure
            </FieldHint>

            {/* PRIX */}
            <NumberInput source="price" label="Prix (€)" fullWidth />
            <FieldHint>
                Par défaut gratuit
            </FieldHint>

            {/* BOOKING */}
            <TextInput source="booking_url" label="Lien de réservation" fullWidth />
            <FieldHint>
                Tu peux mettre un lien, un numéro de téléphone ou un mail, le bouton s'adaptera
            </FieldHint>


            {/* UPLOAD IMAGES (frontend simplifié) */}
            <ImageUploadInput
                source="images"
                label="Ajouter des images"
                shape="square"
                multiple
                type="events"
            />
            <FieldHint>
                Formats acceptés : PNG, JPG, JPEG, WEBP et 5 Mo max. Ajoute des images que si l'event est passé
            </FieldHint>

            {/* PUBLISHED */}
            <BooleanInput source="is_published" label="Publié" />
            <FieldHint>
                Indispensable pour afficher l'évent sur le site
            </FieldHint>

        </SimpleForm>
    );
}