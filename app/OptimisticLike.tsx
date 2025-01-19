"use client"

import Like from "@/app/Like"
import { useOptimistic, useTransition } from "react"

interface State {
	isLiked: boolean
	likeCount: number
}

export default function OptimisticLike({
	isLiked,
	likeCount,
	addAction,
	removeAction,
 }: { 
	isLiked: boolean
	likeCount: number
	addAction: () => Promise<void>
	removeAction: () => Promise<void>
 }) {
	const [, startTransition] = useTransition();

	const [optimisticState, setOptimisticState] = useOptimistic<State, State>({
		isLiked,
		likeCount,
	}, (currentState, newState) => {
		return {
			...currentState,
			...newState,
		}
	});

	const addLike = async () => {
		// 1. 낙관적으로 먼저 상태를 업데이트
		setOptimisticState({
			isLiked: true,
			likeCount: optimisticState.likeCount + 1
		});

		// 2. API 요청
		await addAction();
	}

	const removeLike = async () => {
		setOptimisticState({
			isLiked: false,
			likeCount: optimisticState.likeCount - 1
		});

		await removeAction();
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