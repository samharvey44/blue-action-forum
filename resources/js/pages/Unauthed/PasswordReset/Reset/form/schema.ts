import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email must be in valid format.')
        .required('Email is a required field.'),
    password: Yup.string()
        .required('Password is a required field.')
        .min(8, 'Password must be at least 8 characters.'),
    passwordConfirmation: Yup.string()
        .required('Password confirmation is a required field.')
        .oneOf([Yup.ref('password')], 'Passwords must match.'),
});
