import * as yup from 'yup'

export const profileSchema = yup.object({
    name: yup.string().required('Name is required'),
    location: yup.string().required('Location is required'),
    image_url: yup
        .string()
        .url('Must be a valid URL')
        .required('Image URL is required'),
    headline: yup.string().required('Headline is required'),
    bio: yup.string().required('Bio is required'),
})
