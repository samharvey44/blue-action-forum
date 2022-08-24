import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email must be in valid format.')
        .required('Email is a required field.'),
});
