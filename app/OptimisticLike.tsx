"use client"

import Like from "@/app/Like"
import { useOptimistic, useState, useTransition } from "react"

interface State {
	isLiked: boolean
	likeCount: number
}

const Api = {
	addLike: (): Promise<{ isLiked: boolean; likeCount: number }> => {
		return fetch('/api/like', { method: 'POST' })
			.then((response) => response.json())
	},

	removeLike: (): Promise<{ isLiked: boolean; likeCount: number }> => {
		return fetch('/api/like', { method: 'DELETE' })
			.then((response) => response.json())
	}
}

export default function OptimisticLike({
	initialIsLiked,
	initialLikeCount,
 }: { 
	initialIsLiked: boolean
	initialLikeCount: number
 }) {
	const [state, setState] = useState<State>({
		isLiked: initialIsLiked,
		likeCount: initialLikeCount
	});

	const [, startTransition] = useTransition();

	const [optimisticState, addOptimisticValue] = useOptimistic<State, State['isLiked']>(state, (currentState, newIsLiked) => {
		// ⚠️: setState로 서버 상태를 반영할 때 likeCount가 한번 더 증가하는 오류 방지
		if (currentState.isLiked === newIsLiked) {
			return currentState;
		}

		return {
			...currentState,
			isLiked: newIsLiked,
			likeCount: newIsLiked ? currentState.likeCount + 1 : currentState.likeCount - 1
		}
	});

	const addLike = async () => {
		addOptimisticValue(true);

		const response = await Api.addLike();

		setState(response);
	}

	const removeLike = async () => {
		addOptimisticValue(false);

		const response = await Api.removeLike();

		setState(response);
	}

	const handleLike = () => {
		startTransition(async () => {
			if (optimisticState.isLiked) {
				await removeLike();
			} else {
				await addLike();
			}
		})
	}

	return (
		<div className="flex flex-col gap-2 justify-center">
			<Like isLiked={optimisticState.isLiked} type="button" onClick={handleLike} />
			<span className="text-2xl text-center text-slate-600 font-semibold">{optimisticState.likeCount}</span>
		</div>
	)
}