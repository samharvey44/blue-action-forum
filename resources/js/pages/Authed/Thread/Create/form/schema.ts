import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
    title: Yup.string()
        .min(5, 'Title must be at least 5 characters.')
        .max(50, 'Title cannot be greater than 50 characters.')
        .required('Email is a required field.'),
    content: Yup.string()
        .max(600, 'Comment cannot be greater than 600 characters.')
        .required('Comment content is required.'),
});
