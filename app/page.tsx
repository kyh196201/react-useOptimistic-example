"use client";

import OptimisticLike from "@/app/OptimisticLike";
import { useEffect, useState } from "react";

const Api = {
	addLike: (): Promise<{ isLiked: boolean; likeCount: number }> => {
		return fetch('/api/like', { method: 'POST' })
			.then((response) => response.json())
	},

	removeLike: (): Promise<{ isLiked: boolean; likeCount: number }> => {
		return fetch('/api/like', { method: 'DELETE' })
			.then((response) => response.json())
	},

  getLikes: (): Promise<{ isLiked: boolean; likeCount: number }> => {
    return fetch('/api/like', { method: 'GET' })
      .then((response) => response.json())
  },
}

export default function Home() {
  const [state, setState] = useState<{
    isLiked: boolean;
    likeCount: number;
  }>({
    isLiked: false,
    likeCount: 0,
  });

  useEffect(() => {
    const fetchLikes = async () => {
      const response = await Api.getLikes();
      setState(response);
    }

    fetchLikes();
  }, []);

  const addLikeAction = async () => {
    const response = await Api.addLike();
    setState(response);
  };

  const removeLikeAction = async () => {
    const response = await Api.removeLike();
    setState(response);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex gap-8 row-start-2 items-center sm:items-start">
        <OptimisticLike 
          isLiked={state.isLiked} 
          likeCount={state.likeCount}
          addAction={addLikeAction}
          removeAction={removeLikeAction}
        />
      </main>
    </div>
  );
}
