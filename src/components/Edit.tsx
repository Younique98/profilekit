'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { profileSchema } from '@/lib/validation'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type TFormData = yup.InferType<typeof profileSchema>

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
            body: JSON.stringify(data),
        })

        if (res.ok) {
            toast.success('Profile updated successfully!')
            window.location.href = '/'
        } else {
            toast.error('Something went wrong. Please try again.')
        }
    }

    if (!defaultValues) return <p className="text-center mt-10">Loading...</p>

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border text-gray-800">
            <h1 className="text-xl font-semibold mb-6">Edit Your Profile</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {['name', 'location', 'imageUrl', 'headline'].map((field) => (
                    <div key={field}>
                        <label className="block text-sm font-medium text-black mb-1 capitalize">
                            {field}
                        </label>
                        <input
                            {...register(field as keyof TFormData)}
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors[field as keyof TFormData] && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors[field as keyof TFormData]?.message}
                            </p>
                        )}
                    </div>
                ))}

                <div>
                    <label className="block text-sm font-medium text-black mb-1">
                        About Me
                    </label>
                    <textarea
                        {...register('bio')}
                        className="w-full border border-gray-300 rounded px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.bio && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.bio.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    onClick={() => onSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full"
                >
                    Save
                </button>
            </form>
        </div>
    )
}
