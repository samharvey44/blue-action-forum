import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
    content: Yup.string()
        .max(600, 'Comment cannot be greater than 600 characters.')
        .required('Comment content is required.'),
});
