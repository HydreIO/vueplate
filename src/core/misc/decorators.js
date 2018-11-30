function _once() {
	let result = undefined
	return (...a) => {
		const [, , d] = a
		if (!result) result = d.value()
		d.value = () => result
		return d
	}
}
export const once = _once()