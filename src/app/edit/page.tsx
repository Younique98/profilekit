'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { profileSchema } from '@/lib/validation'
import * as yup from 'yup'
import { useEffect, useState } from 'react'

type FormData = yup.InferType<typeof profileSchema>

const EditProfilePage = () => {
    const [defaultValues, setDefaultValues] = useState<FormData | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(profileSchema),
        defaultValues: defaultValues || {},
    })

    useEffect(() => {
        fetch('/api/profile')
            .then((res) => res.json())
            .then((data) => {
                setDefaultValues(data)
                reset(data)
            })
    }, [reset])

    const onSubmit = async (data: FormData) => {
        const res = await fetch('/api/profile', {
            method: 'POST',
            body: JSON.stringify(data),
        })

        if (res.ok) {
            window.location.href = '/'
        }
    }

    if (!defaultValues) return <p>Loading...</p>

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border space-y-6"
        >
            <h1 className="text-xl font-semibold text-gray-800">
                Edit Your Profile
            </h1>

            <div>
                <label className="block text-sm font-medium text-black mb-1">
                    Name
                </label>
                <input
                    {...register('name')}
                    className="w-full border border-gray-300 rounded text-black px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-black mb-1">
                    Location
                </label>
                <input
                    {...register('location')}
                    className="w-full border text-black border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.location && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.location.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-black mb-1">
                    Image URL
                </label>
                <input
                    {...register('image_url')}
                    className="w-full border text-black border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.image_url && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.image_url.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-black mb-1">
                    Headline
                </label>
                <input
                    {...register('headline')}
                    className="w-full border text-black border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.headline && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.headline.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-black mb-1">
                    Bio
                </label>
                <textarea
                    {...register('bio')}
                    className="w-full border text-black border-gray-300 rounded px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.bio && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.bio.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
            >
                Save
            </button>
        </form>
    )
}

export default EditProfilePage
