export function touchListen(start, move, end) {
	window.addEventListener('touchstart', start, { passive: true })
	window.addEventListener('touchmove', move, { passive: true })
	window.addEventListener('touchend', end, { passive: true })
}

export function touchRemove(start, move, end) {
	window.removeEventListener('touchstart', start)
	window.removeEventListener('touchmove', move)
	window.removeEventListener('touchend', end)
}
