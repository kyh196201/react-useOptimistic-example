import "server-only";

let count = 10;
let isLike = false;

export function getLikes() {
  return { count, isLike };
}

export function addLike() {
	isLike = true;
	count += 1;

	return { count, isLike };
}

export function removeLike() {
	isLike = false;
	count -= 1;

	return { count, isLike };
}
