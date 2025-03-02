"use client";

import { useEffect, useState } from "react";
import LikeButton from "@/app/LikeButton";
import { getLike, addLike, removeLike } from "@/app/services";

interface State {
	isLike: boolean
	count: number
}

export default function Home() {
  const [state, setState] = useState<State>({ 
    isLike: false,
    count: 0
  })

  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const response = await getLike()
      setState(response)
    }

    fetchData();
  }, [])

  const toggleAction = async (isLike: boolean) => {
    try {
      const response = isLike ? await addLike() : await removeLike()
      setState(response)
      setError('')
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex gap-8 row-start-2 items-center sm:items-start">
        <LikeButton count={state.count} isLike={state.isLike} error={error} toggleAction={toggleAction} />
      </main>
    </div>
  );
}
