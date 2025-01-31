import { Heart } from "lucide-react";
import { useOptimistic, useTransition, useState, useEffect } from "react";

interface State {
	isLike: boolean
	count: number
}

export default function LikeButton() {
	const [state, setState] = useState<State>({ 
		isLike: false,
		count: 0
	})

	const [error, setError] = useState('')

	const [optimisticState, toggleOptimisticIsLike] = useOptimistic<State, State['isLike']>(state, (currentState, optimisticValue) => {
		return {
			isLike: optimisticValue,
			count: optimisticValue ? currentState.count + 1 : currentState.count - 1
		}
	})

	const [isPending, startTransition] = useTransition()

	useEffect(() => {
		const fetchData = async () => {
      const response = await fetch('/api/like', { method: 'GET' })
      const data = (await response.json()) as { isLike: boolean; count: number }
			setState(data)
    }

    fetchData();
	}, [])

	const addLike = async () => {
		try {
			const response = await fetch('/api/like', { method: 'POST' })
			if (!response.ok) {
				throw new Error('Server Error...')
			}
			const data = (await response.json()) as { isLike: boolean; count: number }
			setState(data)
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message)
			}
		}
	}

	const removeLike = async () => {
		const response = await fetch('/api/like', { method: 'DELETE' })
		const data = (await response.json()) as { isLike: boolean; count: number }
		setState(data)
	}

	const handleClick = () => {
		startTransition(async () => {
			const nextIsLike = !optimisticState.isLike
			toggleOptimisticIsLike(nextIsLike)

			if (nextIsLike === true) {
				await addLike()
			} else {
				await removeLike()
			}
		})
	}

	const heartIcon = optimisticState.isLike ? <Heart color="#d04e4e" fill="#d04e4e" size={80} /> : <Heart color="#d04e4e" size={80} />

	return (
		<button type="button" className="flex flex-col gap-2 justify-center items-center" onClick={handleClick}>
			{heartIcon}
			<span className="text-4xl text-center text-slate-600 font-semibold">{optimisticState.count}</span>
			{isPending && <div className="text-2xl text-center text-slate-600">loading...</div>}
			{error && <div className="text-xl text-center text-red-600">{error}</div>}
		</button>
	)
}