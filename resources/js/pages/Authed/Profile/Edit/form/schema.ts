import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
    location: Yup.string().max(
        30,
        'Location must not be longer than 30 characters.',
    ),
    bio: Yup.string().max(100, 'Bio must not be longer than 100 characters.'),
});
