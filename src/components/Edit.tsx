'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { profileSchema } from '@/lib/validation'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type TFormData = yup.InferType<typeof profileSchema>

const FIELDS: {
    name: keyof TFormData
    label: string
}[] = [
    { name: 'name', label: 'Name' },
    { name: 'location', label: 'Location' },
    { name: 'image_url', label: 'Image URL' },
    { name: 'headline', label: 'Headline' },
]

export const Edit = () => {
    const [defaultValues, setDefaultValues] = useState<TFormData | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TFormData>({
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

    const onSubmit = async (data: TFormData) => {
        const res = await fetch('/api/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })

        if (res.ok) {
            toast.success('Profile updated successfully!')
            window.location.href = '/'
        } else {
            toast.error('Something went wrong. Please try again.')
        }
    }

    if (!defaultValues)
        return (
            <p className="text-center mt-10" role="status">
                Loading your profile…
            </p>
        )

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border text-gray-800">
            <h1 className="text-xl font-semibold mb-2">Edit your profile</h1>
            <p className="text-sm text-gray-700 mb-6">
                Update the details shown on your public profile. Changes save
                immediately and appear on your profile page as soon as you
                hit save.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                {FIELDS.map(({ name, label }) => {
                    const fieldId = `profile-${name}`
                    const errorId = `${fieldId}-error`
                    const error = errors[name]
                    return (
                        <div key={name}>
                            <label
                                htmlFor={fieldId}
                                className="block text-sm font-medium text-black mb-1"
                            >
                                {label}
                            </label>
                            <input
                                id={fieldId}
                                {...register(name)}
                                aria-invalid={error ? 'true' : undefined}
                                aria-describedby={error ? errorId : undefined}
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {error && (
                                <p
                                    id={errorId}
                                    role="alert"
                                    className="text-red-700 text-sm mt-1"
                                >
                                    {error.message}
                                </p>
                            )}
                        </div>
                    )
                })}

                <div>
                    <label
                        htmlFor="profile-bio"
                        className="block text-sm font-medium text-black mb-1"
                    >
                        About Me
                    </label>
                    <textarea
                        id="profile-bio"
                        {...register('bio')}
                        aria-invalid={errors.bio ? 'true' : undefined}
                        aria-describedby={
                            errors.bio ? 'profile-bio-error' : undefined
                        }
                        className="w-full border border-gray-300 rounded px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.bio && (
                        <p
                            id="profile-bio-error"
                            role="alert"
                            className="text-red-700 text-sm mt-1"
                        >
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
        </div>
    )
}
