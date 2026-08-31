import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface IProfile {
    id: number
    name: string
    location: string
    image_url: string
    headline: string
    bio: string
}

export const View = () => {
    const [data, setData] = useState<IProfile | null>(null)
    const router = useRouter()

    useEffect(() => {
        fetch('/api/profile')
            .then((res) => res.json())
            .then(setData)
    }, [])

    if (!data) return <div className="text-center mt-10">Loading...</div>

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border text-gray-800">
            <div className="flex flex-col items-center">
                <Image
                    src={data.image_url}
                    alt="Profile"
                    width={200}
                    height={300}
                    className="w-28 h-28 rounded-full object-cover mb-4"
                />
                <h1 className="text-2xl font-semibold mb-1">{data.name}</h1>
                <p className="text-sm text-gray-500 mb-2">{data.location}</p>
                <p className="italic text-blue-600 mb-4">{data.headline}</p>
            </div>
            <div className="mt-4">
                <h2 className="text-lg font-medium mb-2">About Me</h2>
                <p className="whitespace-pre-line border border-gray-200 bg-gray-50 p-4 rounded">
                    {data.bio}
                </p>
            </div>
            <button
                type="button"
                className="rounded-md mt-2 bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => router.push('/edit')}
            >
                {' '}
                Edit Your Profile
            </button>
        </div>
    )
}
