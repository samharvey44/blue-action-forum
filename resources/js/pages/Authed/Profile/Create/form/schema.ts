import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is a required field.')
        .min(3, 'Username must be a minimum of 3 characters long.')
        .max(30, 'Username must not be longer than 30 characters.')
        .matches(
            /^[a-zA-Z0-9-_]+$/,
            'Username must contain only letters, numbers, dashes and underscores!',
        ),
    location: Yup.string().max(
        30,
        'Location must not be longer than 30 characters.',
    ),
    bio: Yup.string().max(100, 'Bio must not be longer than 100 characters.'),
});
