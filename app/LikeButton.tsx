import { Heart } from "lucide-react";
import { useOptimistic, startTransition } from "react";

interface State {
	isLike: boolean
	count: number
}

export default function LikeButton() {
	const [optimisticState, toggleOptimisticIsLike] = useOptimistic<State, State['isLike']>({ 
		isLike: false,
		count: 0
	}, (currentState, optimisticValue) => {
		return {
			isLike: optimisticValue,
			count: optimisticValue ? currentState.count + 1 : currentState.count - 1
		}
	})

	const handleClick = () => {
		startTransition(async () => {
			toggleOptimisticIsLike(!optimisticState.isLike)

			// 비동기 액션이 바로 종료되는 것을 방지하기 위해 2초 지연 추가
			await new Promise<void>((resolve) => {
				setTimeout(resolve, 2000)
			})
		})
	}

	const heartIcon = optimisticState.isLike ? <Heart color="#d04e4e" fill="#d04e4e" size={80} /> : <Heart color="#d04e4e" size={80} />

	return (
		<button type="button" className="flex flex-col gap-2 justify-center items-center" onClick={handleClick}>
			{heartIcon}
			<span className="text-4xl text-center text-slate-600 font-semibold">{optimisticState.count}</span>
		</button>
	)
}