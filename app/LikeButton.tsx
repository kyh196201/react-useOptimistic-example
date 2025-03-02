import { useOptimistic, useTransition } from "react";
import { Heart } from "lucide-react";

interface State {
	isLike: boolean
	count: number
}

interface Props {
	isLike: boolean
	count: number
	error: string
	toggleAction: (isLike: boolean) => Promise<void>
}

export default function LikeButton({ count, isLike, error, toggleAction }: Props) {
	const [optimisticState, toggleOptimisticIsLike] = useOptimistic<State, State['isLike']>({
		count,
		isLike
	}, (currentState, optimisticValue) => {
		return {
			isLike: optimisticValue,
			count: optimisticValue ? currentState.count + 1 : currentState.count - 1
		}
	})

	const [isPending, startTransition] = useTransition()

	const handleClick = () => {
		startTransition(async () => {
			const nextIsLike = !optimisticState.isLike
			toggleOptimisticIsLike(nextIsLike)

			await toggleAction(nextIsLike)
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