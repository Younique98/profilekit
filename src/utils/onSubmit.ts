import toast from 'react-hot-toast'

export const onSubmit = async (data: FormData) => {
  const res = await fetch('/api/profile', {
    method: 'POST',
    body: JSON.stringify(data),
  })

  if (res.ok) {
    toast.success('Profile updated successfully!')
    window.location.href = '/'
  } else {
    toast.error('Something went wrong.')
  }
}
