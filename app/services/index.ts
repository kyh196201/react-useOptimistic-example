export const getLike = async () => {
	const response = await fetch('/api/like', { method: 'GET' })
	return (await response.json()) as { isLike: boolean; count: number }
}

export const addLike = async () => {
	const response = await fetch('/api/like', { method: 'POST' })
	if (!response.ok) {
		throw new Error('Server Error')
	}
	return (await response.json()) as { isLike: boolean; count: number }
}

export const removeLike = async () => {
	const response = await fetch('/api/like', { method: 'DELETE' })
	if (!response.ok) {
		throw new Error('Server Error')
	}
	return (await response.json()) as { isLike: boolean; count: number }
}