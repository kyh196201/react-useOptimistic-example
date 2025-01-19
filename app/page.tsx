import OptimisticLike from "@/app/OptimisticLike";
import { getLikes } from "@/server";

export default function Home() {
  const { isLiked, likeCount } = getLikes();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex gap-8 row-start-2 items-center sm:items-start">
        <OptimisticLike initialIsLiked={isLiked} initialLikeCount={likeCount} />
      </main>
    </div>
  );
}
