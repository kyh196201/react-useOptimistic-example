import "server-only";

let likeCount = 10;
let isLiked = false;

export function getLikes() {
  return { likeCount, isLiked };
}

export function addLike() {
	isLiked = true;
	likeCount += 1;

	return { likeCount, isLiked };
}

export function removeLike() {
	isLiked = false;
	likeCount -= 1;

	return { likeCount, isLiked };
}
